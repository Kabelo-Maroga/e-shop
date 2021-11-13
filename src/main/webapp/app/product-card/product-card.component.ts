import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { IProduct } from '../entities/product/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: IProduct;

  constructor(public shoppingCartService: ShoppingCartService) {}

  addToCart(): void {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(): void {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity(): number {
    return this.shoppingCartService.getQuantity(this.product);
  }
}
