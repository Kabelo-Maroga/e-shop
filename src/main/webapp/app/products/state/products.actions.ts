import { createAction, props } from '@ngrx/store';
import { Product } from '../../components/product/product.model';

export const getAllProducts = createAction('[Products] Get All Products');
export const getAllProductsSuccess = createAction('[Products] Get All Products Success', props<{ products: Product[] }>());
export const getAllProductsFail = createAction('[Products] Get All Products Fail', props<{ error: string }>());
