import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PRODUCTS_ROUTE } from './products.route';
import { ProductsComponent } from './products.component';
import { ProductCardModule } from '../product-card/product-card.module';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import * as ProductReducer from './state/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/products.effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    SharedModule,
    ProductCardModule,
    RouterModule.forChild([PRODUCTS_ROUTE]),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(ProductReducer.featureKey, ProductReducer.ProductReducer),
    ButtonModule,
    ProgressSpinnerModule,
  ],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
