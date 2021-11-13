import { Component, OnInit } from '@angular/core';
import { ProductService } from '../entities/product/service/product.service';
import { IProduct } from '../entities/product/product.model';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { Category } from '../entities/enumerations/category.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products?: IProduct[];
  filteredProducts?: IProduct[];

  categories: Category[] = [Category.BREAD, Category.FRUIT, Category.SEASONING, Category.DAIRY, Category.VEGETABLE];

  category?: string;
  cart: any;

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.fetchProducts();
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

  private fetchProducts(): void {
    this.productService.query().subscribe(res => (this.products = this.filteredProducts = res.body ?? []));
  }

  private fetchShoppingCart(): void {
    this.shoppingCartService.query().subscribe(res => (this.shoppingCartService.shoppingCarts = res.body ?? []));
  }
}
