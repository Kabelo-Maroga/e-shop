import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ShoppingCartService } from '../../shopping-cart/service/shopping-cart.service';
import { Category } from '../../enumerations/category.model';
import { IShoppingCart } from '../../shopping-cart/shopping-cart.model';
import { ProductFacade } from '../product.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jhi-home',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  allProducts$ = this.productsFacade.allProducts$;
  shoppingCart?: IShoppingCart;

  isLoading = true;
  category?: string;
  categories: Category[] = [Category.BREAD, Category.FRUITS, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  constructor(public productsFacade: ProductFacade, public shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.productsFacade.getProducts();
    this.fetchShoppingCart();
  }

  filterProducts(category: Category): void {
    this.category = category;
    this.allProducts$ = this.allProducts$.pipe(
      map(products => products?.filter(product => product.category?.toLowerCase() === this.category?.toLowerCase()))
    );
  }

  seeAllCategories(): void {
    this.allProducts$ = this.productsFacade.allProducts$;
    this.category = undefined;
  }

  getShoppingCartByProduct(product: IProduct): IShoppingCart | undefined {
    this.shoppingCart = this.shoppingCartService.shoppingCarts.find(shoppingCart => shoppingCart.product?.id === product.id);
    return this.shoppingCart;
  }

  private fetchShoppingCart(): void {
    this.shoppingCartService.query().subscribe(res => {
      this.shoppingCartService.shoppingCarts = res.body ?? [];
      // this.fetchProducts();
      this.isLoading = false;
    });
  }
}
