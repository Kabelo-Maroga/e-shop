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

@NgModule({
  imports: [SharedModule, ProductRoutingModule, ToastModule, TableModule, ConfirmDialogModule, RippleModule],
  declarations: [ProductTableComponent, ProductDetailComponent, ProductUpdateComponent, ProductDeleteDialogComponent],
  entryComponents: [ProductDeleteDialogComponent],
  providers: [MessageService, ConfirmationService],
})
export class ProductModule {}
