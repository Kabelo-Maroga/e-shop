import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { Category } from '../../enumerations/category.model';
import { ShoppingCartService } from '../../shopping-cart/service/shopping-cart.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.html'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts?: IProduct[];

  categories: Category[] = [Category.BREAD, Category.FRUIT, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  category?: string;
  cart: any;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService
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

  deleteProduct(selectedProduct?: IProduct): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const index = this.products.findIndex(product => product === selectedProduct);
        this.products?.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      },
    });
  }

  private fetchProducts(): void {
    this.productService.query().subscribe(res => (this.products = this.filteredProducts = res.body ?? []));
  }

  // products?: IProduct[];
  // isLoading = false;
  // totalItems = 0;
  // itemsPerPage = ITEMS_PER_PAGE;
  // page?: number;
  // predicate!: string;
  // ascending!: boolean;
  // ngbPaginationPage = 1;
  //
  // constructor(
  //   protected productService: ProductService,
  //   protected activatedRoute: ActivatedRoute,
  //   protected router: Router,
  //   protected modalService: NgbModal
  // ) {}
  //
  // loadPage(page?: number, dontNavigate?: boolean): void {
  //   this.isLoading = true;
  //   const pageToLoad: number = page ?? this.page ?? 1;
  //
  //   this.productService
  //     .query({
  //       page: pageToLoad - 1,
  //       size: this.itemsPerPage,
  //       sort: this.sort(),
  //     })
  //     .subscribe(
  //       (res: HttpResponse<IProduct[]>) => {
  //         this.isLoading = false;
  //         this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
  //       },
  //       () => {
  //         this.isLoading = false;
  //         this.onError();
  //       }
  //     );
  // }
  //
  // ngOnInit(): void {
  //   this.handleNavigation();
  // }
  //
  // trackId(index: number, item: IProduct): number {
  //   return item.id!;
  // }
  //
  // delete(product: IProduct): void {
  //   const modalRef = this.modalService.open(ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.product = product;
  //   // unsubscribe not needed because closed completes on modal close
  //   modalRef.closed.subscribe(reason => {
  //     if (reason === 'deleted') {
  //       this.loadPage();
  //     }
  //   });
  // }
  //
  // protected sort(): string[] {
  //   const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
  //   if (this.predicate !== 'id') {
  //     result.push('id');
  //   }
  //   return result;
  // }
  //
  // protected handleNavigation(): void {
  //   combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
  //     const page = params.get('page');
  //     const pageNumber = +(page ?? 1);
  //     const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
  //     const predicate = sort[0];
  //     const ascending = sort[1] === ASC;
  //     if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
  //       this.predicate = predicate;
  //       this.ascending = ascending;
  //       this.loadPage(pageNumber, true);
  //     }
  //   });
  // }
  //
  // protected onSuccess(data: IProduct[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
  //   this.totalItems = Number(headers.get('X-Total-Count'));
  //   this.page = page;
  //   if (navigate) {
  //     this.router.navigate(['/product'], {
  //       queryParams: {
  //         page: this.page,
  //         size: this.itemsPerPage,
  //         sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
  //       },
  //     });
  //   }
  //   this.products = data ?? [];
  //   this.ngbPaginationPage = this.page;
  // }
  //
  // protected onError(): void {
  //   this.ngbPaginationPage = this.page ?? 1;
  // }
}
