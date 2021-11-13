import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IShoppingCart, ShoppingCart } from '../shopping-cart.model';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { IShopUser } from 'app/entities/shop-user/shop-user.model';
import { ShopUserService } from 'app/entities/shop-user/service/shop-user.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-shopping-cart-update',
  templateUrl: './shopping-cart-update.component.html',
  styleUrls: ['./shopping-cart-update.component.scss'],
})
export class ShoppingCartUpdateComponent implements OnInit {
  shoppingCarts: any[];

  isSaving = false;

  shopUsersCollection: IShopUser[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    shopUser: [],
    product: [],
  });

  constructor(
    protected shoppingCartService: ShoppingCartService,
    protected shopUserService: ShopUserService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    protected fb: FormBuilder
  ) {
    this.shoppingCarts = this.shoppingCartService.shoppingCarts;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCart }) => {
      this.updateForm(shoppingCart);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shoppingCart = this.createFromForm();
    if (shoppingCart.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingCartService.update(shoppingCart));
    } else {
      this.subscribeToSaveResponse(this.shoppingCartService.create(shoppingCart));
    }
  }

  trackShopUserById(index: number, item: IShopUser): number {
    return item.id!;
  }

  trackProductById(index: number, item: IProduct): number {
    return item.id!;
  }

  addToCart(product: IProduct): void {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product: IProduct): void {
    this.shoppingCartService.removeFromCart(product);
  }

  getQuantity(product?: IProduct): number {
    return this.shoppingCartService.getQuantity(product);
  }

  getTotalPrice(): number {
    return this.shoppingCartService.totalPrice();
  }

  clearCart(): void {
    this.shoppingCarts = [];
    this.shoppingCartService.clearCart();
  }

  deleteSelectedProducts(product?: IProduct): void {
    console.log('we here!');
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingCartService.deleteFromCart(product);
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      },
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingCart>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(shoppingCart: IShoppingCart): void {
    this.editForm.patchValue({
      id: shoppingCart.id,
      quantity: shoppingCart.quantity,
      shopUser: shoppingCart.shopUser,
      product: shoppingCart.product,
    });

    this.shopUsersCollection = this.shopUserService.addShopUserToCollectionIfMissing(this.shopUsersCollection, shoppingCart.shopUser);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      shoppingCart.product
    );
  }

  protected loadRelationshipsOptions(): void {
    this.shopUserService
      .query({ filter: 'shoppingcart-is-null' })
      .pipe(map((res: HttpResponse<IShopUser[]>) => res.body ?? []))
      .pipe(
        map((shopUsers: IShopUser[]) =>
          this.shopUserService.addShopUserToCollectionIfMissing(shopUsers, this.editForm.get('shopUser')!.value)
        )
      )
      .subscribe((shopUsers: IShopUser[]) => (this.shopUsersCollection = shopUsers));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing(products, this.editForm.get('product')!.value))
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IShoppingCart {
    return {
      ...new ShoppingCart(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      shopUser: this.editForm.get(['shopUser'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }
}
