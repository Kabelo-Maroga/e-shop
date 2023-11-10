import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopUser } from '../shop-user.model';
import { ShopUserService } from '../service/shop-user.service';

@Component({
  templateUrl: './shop-user-delete-dialog.component.html',
})
export class ShopUserDeleteDialogComponent {
  shopUser?: IShopUser;

  constructor(protected shopUserService: ShopUserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shopUserService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
