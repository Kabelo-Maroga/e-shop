import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'shop-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  // categories: any[] = [];
  //
  // subscribtion: Subscription;
  //
  // @Input("category") category;
  //
  // constructor(private categoryService: CategoryService) {
  //   this.subscribtion = this.categoryService.getCategories().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ key: c.payload.key, value: c.payload.val() })
  //       )
  //     )
  //   ).subscribe(categories => this.categories = categories);
  // }
}
