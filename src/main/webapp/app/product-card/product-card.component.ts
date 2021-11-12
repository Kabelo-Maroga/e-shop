import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { IProduct } from '../entities/product/product.model';
import { IShoppingCart } from '../entities/shopping-cart/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  @Input() shoppingCart?: IShoppingCart;

  constructor(public shoppingCartService: ShoppingCartService) {}

  addToCart(): void {
    this.shoppingCartService.shoppingCart?.forEach(shoppingCart => {
      if (shoppingCart.product === this.product) {
        console.log('here');
        shoppingCart.quantity = (shoppingCart.quantity ?? 0) + 1;
      }
    });
    // const params: any = {};
    // params['productId.equals'] = this.product?.id;
    // this.shoppingCartService.query(params).subscribe();
  }

  removeFromCart(): void {
    this.shoppingCartService.shoppingCart?.forEach(shoppingCart => {
      if (shoppingCart.product === this.product) {
        shoppingCart.quantity = (shoppingCart.quantity ?? 0) - 1;
      }
    });
    // const params: any = {};
    // params['productId.equals'] = this.product?.id;
    // this.shoppingCartService.query(params).subscribe();
  }

  getQuantity(): any {
    const quantity: any = 0;
    // if (!this.shoppingCart) {
    //   return quantity;
    // }
    // if (this.shoppingCartService.shoppingCart && this.product?.id) {
    //   quantity = this.shoppingCartService.shoppingCart[this.product.id].quantity;
    // }
    console.log('qua', quantity);
    // if(this.product?.id) {
    //   return this.shoppingCart.product
    // }

    // let item = this.shoppingCart[this.product?.id];
    return 2;
  }
}
