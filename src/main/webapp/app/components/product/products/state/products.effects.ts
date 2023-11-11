import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../service/product.service';
import * as ProductActions from './products.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IProduct } from '../../product.model';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getAllProducts),
      switchMap(() =>
        this.productService.query().pipe(
          map((products: IProduct[]) => ProductActions.getAllProductsSuccess({ products })),
          catchError(error => of(ProductActions.getAllProductsFail(error)))
        )
      )
    )
  );
  constructor(private actions$: Actions, private productService: ProductService) {}
}
