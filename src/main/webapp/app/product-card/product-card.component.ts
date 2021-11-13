import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { IProduct } from '../entities/product/product.model';
import { IShoppingCart, ShoppingCart } from '../entities/shopping-cart/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: IProduct;
  // @Input() shoppingCart?: IShoppingCart;

  // shoppingCarts: IShoppingCart[] = [];

  constructor(public shoppingCartService: ShoppingCartService) {}

  addToCart(): void {
    let productInCart = false;

    this.shoppingCartService.shoppingCarts.forEach(shoppingCart => {
      if (shoppingCart.product === this.product && shoppingCart.quantity) {
        shoppingCart.quantity += 1;
        productInCart = true;
      }
    });

    if (!productInCart) {
      const cart = this.createFromForm();
      this.shoppingCartService.shoppingCarts.push(cart);
    }
  }

  createFromForm(): IShoppingCart {
    return {
      ...new ShoppingCart(),
      quantity: 1,
      // shopUser: this.editForm.get(['shopUser'])!.value,
      product: this.product,
    };
  }

  removeFromCart(): void {
    if (this.shoppingCartService.shoppingCarts.length !== 0) {
      this.shoppingCartService.shoppingCarts.forEach(shoppingCart => {
        if (shoppingCart.product === this.product && shoppingCart.quantity === 0) {
          const index = this.shoppingCartService.shoppingCarts.findIndex(cart => cart.product === this.product);
          this.shoppingCartService.shoppingCarts.splice(index, 1);
        }
        if (shoppingCart.product === this.product && shoppingCart.quantity) {
          shoppingCart.quantity -= 1;
        }
      });
    }
  }

  getQuantity(): any {
    let quantity: any = 0;
    if (this.shoppingCartService.shoppingCarts.length === 0) {
      return quantity;
    }

    this.shoppingCartService.shoppingCarts.forEach(cart => {
      if (cart.product === this.product) {
        quantity = cart.quantity;
      }
    });
    // if (this.shoppingCartService.shoppingCart && this.product?.id) {
    //   quantity = this.shoppingCartService.shoppingCart[this.product.id].quantity;
    // }
    console.log('qua', quantity);
    // if(this.product?.id) {
    //   return this.shoppingCart.product
    // }

    // let item = this.shoppingCart[this.product?.id];
    return quantity;
  }
}
