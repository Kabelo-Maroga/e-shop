import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { NAV_BAR_ROUTE } from './bs-navbar.route';
import { BsNavbarComponent } from './bs-navbar.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([NAV_BAR_ROUTE])],
  declarations: [BsNavbarComponent],
  exports: [BsNavbarComponent],
})
export class BsNavbarModule {}
