import { Component } from '@angular/core';
import { ShoppingCartService } from '../components/shopping-cart/service/shopping-cart.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Account } from '../core/auth/account.model';
import { Subject } from 'rxjs';
import { AccountService } from '../core/auth/account.service';
import { takeUntil } from 'rxjs/operators';
import { Authority } from '../config/authority.constants';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartUpdateComponent } from '../components/shopping-cart/update/shopping-cart-update.component';
import { ProductUpdateComponent } from '../components/product/update/product-update.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  isNavbarCollapsed?: boolean;
  account: Account | null = null;
  ref?: DynamicDialogRef;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  itemsInTheCart(): number {
    return this.shoppingCartService.numberOfItemsInTheCart();
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  isAdmin(): boolean {
    const role = this.account?.authorities.find(authority => authority === Authority.ADMIN.valueOf());
    return role != null;
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  show1(): void {
    this.ref = this.dialogService.open(ShoppingCartUpdateComponent, {
      header: 'Shopping Cart',
      width: '70%',
      style: { padding: '0px' },
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
