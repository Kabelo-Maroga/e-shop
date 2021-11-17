import { Component, OnInit } from '@angular/core';
import { ProductService } from '../entities/product/service/product.service';
import { IProduct } from '../entities/product/product.model';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { Category } from '../entities/enumerations/category.model';
import { IShoppingCart } from '../entities/shopping-cart/shopping-cart.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  cart: IShoppingCart[] = [];
  filteredProducts?: IProduct[];

  shoppingCart?: IShoppingCart;

  isLoading = true;

  categories: Category[] = [Category.BREAD, Category.FRUIT, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  category?: string;
  // cart: any;

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    // console.log("ProductsComponent");
    this.fetchShoppingCart();
  }

  filterProducts(category: Category): void {
    this.category = category;
    this.filteredProducts = this.products?.filter(product => product.category === this.category);
  }

  reset(): void {
    this.filteredProducts = this.products;
    this.category = undefined;
  }

  getShoppingCart(product: IProduct): IShoppingCart | undefined {
    this.shoppingCart = this.cart.find(shoppingCart => shoppingCart.product?.id === product.id);
    // if(this.shoppingCart)
    console.log('shoppingCart: ', this.shoppingCart);
    return this.shoppingCart;
    // return this.cart.find(shoppingCart => {
    //   if(shoppingCart.product === product) {
    //     console.log('Checking');
    //     console.log('shoppingCart: ', shoppingCart);
    //   }
    // });
  }

  private fetchProducts(): void {
    this.productService.query().subscribe(res => (this.products = this.filteredProducts = res.body ?? []));
  }

  private fetchShoppingCart(): void {
    this.shoppingCartService.query().subscribe(res => {
      this.shoppingCartService.shoppingCarts = this.cart = res.body ?? [];
      console.log('this.shoppingCartService.shoppingCarts: ', this.shoppingCartService.shoppingCarts);
      this.fetchProducts();
      this.isLoading = false;
    });
  }
}
