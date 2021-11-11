import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShopUser } from '../shop-user.model';

@Component({
  selector: 'jhi-shop-user-detail',
  templateUrl: './shop-user-detail.component.html',
})
export class ShopUserDetailComponent implements OnInit {
  shopUser: IShopUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopUser }) => {
      this.shopUser = shopUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
