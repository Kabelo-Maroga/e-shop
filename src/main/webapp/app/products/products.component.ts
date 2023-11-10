import { Component, OnInit } from '@angular/core';
import { ProductService } from '../components/product/service/product.service';
import { IProduct } from '../components/product/product.model';
import { ShoppingCartService } from '../components/shopping-cart/service/shopping-cart.service';
import { Category } from '../components/enumerations/category.model';
import { IShoppingCart } from '../components/shopping-cart/shopping-cart.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts?: IProduct[];
  shoppingCart?: IShoppingCart;

  isLoading = true;
  category?: string;
  categories: Category[] = [Category.BREAD, Category.FRUITS, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  constructor(private productService: ProductService, public shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.fetchShoppingCart();
  }

  filterProducts(category: Category): void {
    this.category = category;
    this.filteredProducts = this.products?.filter(product => product.category?.toLowerCase() === this.category?.toLowerCase());
  }

  seeAllCategories(): void {
    this.filteredProducts = this.products;
    this.category = undefined;
  }

  getShoppingCartByProduct(product: IProduct): IShoppingCart | undefined {
    this.shoppingCart = this.shoppingCartService.shoppingCarts.find(shoppingCart => shoppingCart.product?.id === product.id);
    return this.shoppingCart;
  }

  private fetchProducts(): void {
    this.productService.query().subscribe(res => (this.products = this.filteredProducts = res.body ?? []));
  }

  private fetchShoppingCart(): void {
    this.shoppingCartService.query().subscribe(res => {
      this.shoppingCartService.shoppingCarts = res.body ?? [];
      this.fetchProducts();
      this.isLoading = false;
    });
  }
}
