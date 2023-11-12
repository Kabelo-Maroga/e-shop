import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart/service/shopping-cart.service';
import { IProduct } from '../product.model';
import { IShoppingCart } from '../../shopping-cart/shopping-cart.model';
import { ToolTipLabel } from '../../enumerations/tool-tip-label.model';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product?: IProduct;
  @Input() shoppingCart?: IShoppingCart | undefined;

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
