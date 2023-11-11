import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from './state/products.actions';
import * as ProductSelectors from './state/products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  allProducts$ = this.store.select(ProductSelectors.selectAllProducts);
  constructor(private store: Store) {}
  getProducts(): void {
    this.store.dispatch(ProductActions.getAllProducts());
  }
}
