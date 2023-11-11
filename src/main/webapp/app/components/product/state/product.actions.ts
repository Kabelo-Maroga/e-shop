import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model';

export const getAllProducts = createAction('[Product] Get All Product');
export const getAllProductsSuccess = createAction('[Product] Get All Product Success', props<{ products: Product[] }>());
export const getAllProductsFail = createAction('[Product] Get All Product Fail', props<{ error: string }>());
