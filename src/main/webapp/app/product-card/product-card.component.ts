import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../components/shopping-cart/service/shopping-cart.service';
import { IProduct } from '../components/product/product.model';
import { IShoppingCart } from '../components/shopping-cart/shopping-cart.model';
import { ToolTipLabel } from '../components/enumerations/tool-tip-label.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  @Input() shoppingCart?: IShoppingCart | undefined;

  // options = {
  //   text: 'testing',
  // };

  constructor(public shoppingCartService: ShoppingCartService) {}

  addToCart(): void {
    if (!this.isAddedToCart()) {
      this.shoppingCartService.addProductToCart(this.product);
    }
  }

  toolTipLabel(): string {
    return this.isAddedToCart() ? ToolTipLabel.IN_CART : ToolTipLabel.ADD_TO_CART;
  }

  isAddedToCart(): boolean {
    return this.shoppingCart?.quantity !== null && this.shoppingCart?.quantity !== undefined;
  }

  removeFromCart(): void {
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity(): number {
    return this.shoppingCartService.getQuantity(this.product);
  }
}
