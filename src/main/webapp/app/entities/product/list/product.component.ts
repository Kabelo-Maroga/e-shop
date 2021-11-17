import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { Category } from '../../enumerations/category.model';
import { ShoppingCartService } from '../../shopping-cart/service/shopping-cart.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShoppingCartUpdateComponent } from '../../shopping-cart/update/shopping-cart-update.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { AccountService } from '../../../core/auth/account.service';
import { LoginService } from '../../../login/login.service';
import { Route, Router } from '@angular/router';
import { ProductUpdateComponent } from '../update/product-update.component';
import { GlobalService } from '../../../shared/service/global.service';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.html'],
})
export class ProductComponent implements OnInit {
  ref?: DynamicDialogRef;
  products: IProduct[] = [];
  filteredProducts?: IProduct[];

  categories: Category[] = [Category.BREAD, Category.FRUIT, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  category?: string;
  cart: any;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    private dialogService: DialogService,
    private globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  filterProducts(category: Category): void {
    this.category = category;
    this.filteredProducts = this.products?.filter(product => product.category === this.category);
  }

  filter(query: string): void {
    this.filteredProducts = query ? this.products?.filter(p => p.title?.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  reset(): void {
    this.filteredProducts = this.products;
    this.category = undefined;
  }

  deleteProduct(selectedProduct: IProduct): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (selectedProduct.id) {
          const index = this.products.findIndex(product => product === selectedProduct);
          this.products?.splice(index, 1);
          this.productService.delete(selectedProduct.id).subscribe();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
      },
    });
  }

  show(product: IProduct): void {
    this.productService.selectedProduct = product;
    this.ref = this.dialogService.open(ProductUpdateComponent, {
      header: 'Update Product',
      width: '70%',
      style: { padding: '0px' },
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.productService.modalRef = this.ref;
  }

  show2(): void {
    this.productService.selectedProduct = undefined;
    this.ref = this.dialogService.open(ProductUpdateComponent, {
      header: 'New Product',
      width: '70%',
      style: { padding: '0px' },
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.productService.modalRef = this.ref;
  }

  private fetchProducts(): void {
    this.productService.query().subscribe(res => {
      this.products = this.filteredProducts = res.body ?? [];
      this.products.reverse();
    });
  }
}
