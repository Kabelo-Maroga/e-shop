import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductTableComponent } from './table/product-table.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductUpdateComponent } from './update/product-update.component';
import { ProductDeleteDialogComponent } from './delete/product-delete-dialog.component';
import { ProductRoutingModule } from './route/product-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { StoreModule } from '@ngrx/store';
import * as ProductReducer from './state/product.reducer';
import { ListComponent } from './list/list.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardComponent } from './card/card.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    RippleModule,
    TooltipModule,
    ProgressSpinnerModule,
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(ProductReducer.featureKey, ProductReducer.ProductReducer),
  ],
  declarations: [
    CardComponent,
    ListComponent,
    ProductTableComponent,
    ProductDetailComponent,
    ProductUpdateComponent,
    ProductDeleteDialogComponent,
  ],
  entryComponents: [ProductDeleteDialogComponent],
  providers: [MessageService, ConfirmationService],
})
export class ProductModule {}
