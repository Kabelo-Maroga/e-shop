import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { Category } from '../../enumerations/category.model';
import { ShoppingCartService } from '../../shopping-cart/service/shopping-cart.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ProductUpdateComponent } from '../update/product-update.component';
import { StatusCode } from '../../enumerations/status-code';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IShoppingCart } from '../../shopping-cart/shopping-cart.model';
import { ProductsFacade } from '../../../products/products.facade';

@Component({
  selector: 'jhi-product',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.html'],
})
export class ProductTableComponent implements OnInit {
  ref?: DynamicDialogRef;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  allProducts$ = this.productsFacade.allProducts$;

  categories: Category[] = [Category.BREAD, Category.FRUITS, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  category?: string;
  cart: any;

  constructor(
    private productService: ProductService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
    private dialogService: DialogService,
    private productsFacade: ProductsFacade
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
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

          const index2 = this.filteredProducts.findIndex(product => product === selectedProduct);
          this.filteredProducts?.splice(index2, 1);

          this.productService.delete(selectedProduct.id).subscribe(
            res => {
              console.log(res.body);
            },
            error => {
              if (error.status === StatusCode.OK) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Deleted',
                  life: 3000,
                });
              } else if (error.status === StatusCode.INTERNAL_SERVER_ERROR) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Deletion Failed',
                  detail: 'Internal Server Error',
                  life: 3000,
                });
              }
            }

            //   if (res.status === StatusCode.OK) {
            //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            //   }
            //   else if(res.status === StatusCode.INTERNAL_SERVER_ERROR)  {
            //     this.messageService.add({ severity: 'Error', summary: 'Deletion Failed', detail: 'Internal Server Error', life: 3000 });
            //   }
            // }
          );
          // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
      // this.productService.products = this.filteredProducts = res.body ?? [];
      this.productService.products.reverse();
    });
  }
}
