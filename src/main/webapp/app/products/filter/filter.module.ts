import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { FILTER_ROUTE } from './filter.route';
import { FilterComponent } from './filter.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([FILTER_ROUTE])],
  declarations: [FilterComponent],
  exports: [FilterComponent],
})
export class FilterModule {}
