import { Component } from '@angular/core';
import { ShoppingCartService } from '../entities/shopping-cart/service/shopping-cart.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Account } from '../core/auth/account.model';
import { Subject } from 'rxjs';
import { AccountService } from '../core/auth/account.service';
import { takeUntil } from 'rxjs/operators';
import { Role } from '../entities/enumerations/role.model';
import { Authority } from '../config/authority.constants';

@Component({
  selector: 'nav-bar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  isNavbarCollapsed?: boolean;
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService,
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
