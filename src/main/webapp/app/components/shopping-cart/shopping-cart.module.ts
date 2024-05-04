import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShoppingCartComponent } from './list/shopping-cart.component';
import { ShoppingCartDetailComponent } from './detail/shopping-cart-detail.component';
import { ShoppingCartUpdateComponent } from './update/shopping-cart-update.component';
import { ShoppingCartDeleteDialogComponent } from './delete/shopping-cart-delete-dialog.component';
import { ShoppingCartRoutingModule } from './route/shopping-cart-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    FileUploadModule,
    TableModule,
    RatingModule,
    ConfirmDialogModule,
    DropdownModule,
  ],
  declarations: [ShoppingCartComponent, ShoppingCartDetailComponent, ShoppingCartUpdateComponent, ShoppingCartDeleteDialogComponent],
  entryComponents: [ShoppingCartDeleteDialogComponent],
  providers: [MessageService, ConfirmationService],
})
export class ShoppingCartModule {}
