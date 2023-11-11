import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductReducer from './products.reducer';

// const { selectAll } = ProductReducer.adapter.getSelectors();

export const getProductState = createFeatureSelector<ProductReducer.State>(ProductReducer.featureKey);

// export const selectAllCustomFilterConfigs = createSelector(getProductState, selectAll);

export const selectAllProducts = createSelector(getProductState, state => state.products);
