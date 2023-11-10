import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { IShopUser, ShopUser } from '../components/shop-user/shop-user.model';
import { Account } from '../core/auth/account.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShopUserService } from '../components/shop-user/service/shop-user.service';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;
  authenticationError = false;
  account: Account | null = null;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private shopUserService: ShopUserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    this.getUserAccount();
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        () => (this.authenticationError = true)
      );
  }

  getUserAccount(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        const params: any = {};
        params['name.equals'] = this.account?.login;
        this.shopUserService.query(params).subscribe(res => {
          const user = res.body;
          if (user === null) {
            this.shopUserService.shopUser = this.createShopUser();
          } else {
            this.shopUserService.shopUser = user[0];
          }
        });
      });
  }

  createShopUser(): IShopUser {
    return {
      ...new ShopUser(),
      name: this.account?.login,
      email: this.account?.email,
    };
  }
}
