import { Component, OnInit } from '@angular/core';
import { ProductService } from '../entities/product/service/product.service';
import { IProduct } from '../entities/product/product.model';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { Category } from '../entities/enumerations/category.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  constructor(private shoppingCartService: ShoppingCartService) {}
}
