import { Component } from '@angular/core';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  constructor(private shoppingCartService: ShoppingCartService) {}

  itemsInTheCart(): number {
    return this.shoppingCartService.numberOfItemsInTheCart();
  }
}
