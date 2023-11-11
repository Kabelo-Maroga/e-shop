import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductReducer from './product.reducer';

export const getProductState = createFeatureSelector<ProductReducer.State>(ProductReducer.featureKey);
export const selectAllProducts = createSelector(getProductState, state => state.products);
