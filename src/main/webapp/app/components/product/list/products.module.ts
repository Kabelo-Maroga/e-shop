// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
//
// import { SharedModule } from 'app/shared/shared.module';
// import { PRODUCTS_ROUTE } from './products.route';
// import { ListComponent } from './list.component';
// import { ProductCardModule } from '../../../product-card/product-card.module';
// import { ButtonModule } from 'primeng/button';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import * as ProductReducer from '../state/product.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { ProductEffects } from '../state/product.effects';
// import { StoreModule } from '@ngrx/store';
//
// @NgModule({
//   imports: [
//     SharedModule,
//     ProductCardModule,
//     RouterModule.forChild([PRODUCTS_ROUTE]),
//     EffectsModule.forFeature([ProductEffects]),
//     StoreModule.forFeature(ProductReducer.featureKey, ProductReducer.ProductReducer),
//     ButtonModule,
//     ProgressSpinnerModule,
//   ],
//   declarations: [ListComponent],
// })
// export class ProductsModule {}
