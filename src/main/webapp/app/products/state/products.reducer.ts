import { Products } from './Products';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IProduct } from '../../components/product/product.model';
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';

export const featureKey = 'products';
export interface State extends EntityState<Products> {
  products: IProduct[];
}
export const adapter = createEntityAdapter<Products>();
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
