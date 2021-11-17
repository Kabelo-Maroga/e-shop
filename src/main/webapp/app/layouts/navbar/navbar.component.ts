import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ShoppingCartUpdateComponent } from '../../entities/shopping-cart/update/shopping-cart-update.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShoppingCartService } from '../../entities/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  dialogRef?: DynamicDialogRef;

  constructor(
    private sessionStorageService: SessionStorageService,
    private shoppingCartService: ShoppingCartService,
    private translateService: TranslateService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private loginService: LoginService,
    private router: Router
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
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
    this.router.navigate(['/login']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  itemsInTheCart(): number {
    return this.shoppingCartService.numberOfItemsInTheCart();
  }

  show1(): void {
    this.dialogRef = this.dialogService.open(ShoppingCartUpdateComponent, {
      header: 'Shopping Cart',
      width: '70%',
      style: { padding: '0px' },
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
