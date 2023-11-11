import { Product } from './Product';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IProduct } from '../../product.model';
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export const featureKey = 'products';
export interface State extends EntityState<Product> {
  products: IProduct[];
}
export const adapter = createEntityAdapter<Product>();
export const initialState: State = adapter.getInitialState({
  products: [],
});
export const ProductReducer = createReducer(
  initialState,
  on(ProductActions.getAllProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
  }))
);
