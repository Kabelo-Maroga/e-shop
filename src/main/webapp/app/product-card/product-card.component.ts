import { Component, Input, OnInit } from '@angular/core';
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
  @Input() shoppingCart?: IShoppingCart | undefined;

  options = {
    text: 'testing',
  };

  constructor(public shoppingCartService: ShoppingCartService) {}

  //
  // ngOnInit(): void {
  //   this.shoppingCartService.query().subscribe(res => {
  //     this.shoppingCart = res.body;
  //     console.log('this.shoppingCart: ', this.shoppingCart);
  //   });
  // }

  addToCart(): void {
    if (!this.isAddedToCart()) {
      this.shoppingCartService.addProductToCart(this.product);
    }
  }

  toolTipLabel(): string {
    const ADD_TO_CART = 'add to cart';
    const IN_CART = 'in cart';
    return this.isAddedToCart() ? IN_CART : ADD_TO_CART;
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
