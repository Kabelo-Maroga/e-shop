import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IShoppingCart, ShoppingCart } from '../shopping-cart.model';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { IShopUser } from 'app/components/shop-user/shop-user.model';
import { ShopUserService } from 'app/components/shop-user/service/shop-user.service';
import { IProduct } from 'app/components/product/product.model';
import { ProductService } from 'app/components/product/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-shopping-cart-update',
  templateUrl: './shopping-cart-update.component.html',
  styleUrls: ['./shopping-cart-update.component.scss'],
})
export class ShoppingCartUpdateComponent implements OnInit {
  shoppingCarts: IShoppingCart[] = [];

  isSaving = false;
  isLoading = false;

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
    protected router: Router,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.shoppingCartService.query().subscribe(res => {
      this.shoppingCarts = this.shoppingCartService.shoppingCarts = res.body ?? [];
      this.isLoading = false;
    });

    // if (this.shoppingCarts) {
    //   this.shoppingCartService.updateCart(this.shoppingCartService.shoppingCarts).subscribe(res => {
    //     this.shoppingCarts = res.body ?? [];
    //     this.isLoading = false;
    //   });
    // }
  }

  createCart(): void {
    this.shoppingCarts?.forEach(shoppingCart => {
      this.shoppingCartService.create(shoppingCart).subscribe();
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
    this.shoppingCartService.addProductToCart(product);
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to clear the cart?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingCarts = [];
        this.shoppingCartService.clearCart();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Shopping Cart Cleared',
          life: 3000,
        });
        this.router.navigate(['/']);
      },
    });
  }

  deleteSelectedProduct(product?: IProduct): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingCartService.deleteProductFromCart(product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        if (this.shoppingCartService.shoppingCarts?.length === 0) {
          this.router.navigate(['/']);
        }
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
