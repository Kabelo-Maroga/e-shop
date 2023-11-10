import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'shop-user',
        data: { pageTitle: 'eshopApp.shopUser.home.title' },
        loadChildren: () => import('./shop-user/shop-user.module').then(m => m.ShopUserModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'eshopApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'shopping-cart',
        data: { pageTitle: 'eshopApp.shoppingCart.home.title' },
        loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
