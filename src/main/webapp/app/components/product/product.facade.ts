import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductActions from './state/product.actions';
import * as ProductSelectors from './state/product.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  allProducts$ = this.store.select(ProductSelectors.selectAllProducts);
  constructor(private store: Store) {}
  getProducts(): void {
    this.store.dispatch(ProductActions.getAllProducts());
  }
}
