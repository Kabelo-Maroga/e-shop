import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShopUser } from '../shop-user.model';
import { ShopUserService } from '../service/shop-user.service';
import { ShopUserDeleteDialogComponent } from '../delete/shop-user-delete-dialog.component';

@Component({
  selector: 'jhi-shop-user',
  templateUrl: './shop-user.component.html',
})
export class ShopUserComponent implements OnInit {
  shopUsers?: IShopUser[];
  isLoading = false;

  constructor(protected shopUserService: ShopUserService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.shopUserService.query().subscribe({
      next: (res: HttpResponse<IShopUser[]>) => {
        this.isLoading = false;
        this.shopUsers = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IShopUser): number {
    return item.id!;
  }

  delete(shopUser: IShopUser): void {
    const modalRef = this.modalService.open(ShopUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shopUser = shopUser;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
