import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { NAV_BAR_ROUTE } from './bs-navbar.route';
import { BsNavbarComponent } from './bs-navbar.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([NAV_BAR_ROUTE]), ButtonModule],
  declarations: [BsNavbarComponent],
  exports: [BsNavbarComponent],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class BsNavbarModule {}
