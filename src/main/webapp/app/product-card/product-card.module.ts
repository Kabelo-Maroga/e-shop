import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from 'app/shared/shared.module';
import {PRODUCT_CARD_ROUTE} from './product-card.route';
import {ProductCardComponent} from './product-card.component';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PRODUCT_CARD_ROUTE]), ButtonModule, TooltipModule],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
