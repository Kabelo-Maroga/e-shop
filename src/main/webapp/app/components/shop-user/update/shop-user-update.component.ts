import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IShopUser, ShopUser } from '../shop-user.model';
import { ShopUserService } from '../service/shop-user.service';
import { Role } from 'app/components/enumerations/role.model';

@Component({
  selector: 'jhi-shop-user-update',
  templateUrl: './shop-user-update.component.html',
})
export class ShopUserUpdateComponent implements OnInit {
  isSaving = false;
  roleValues = Object.keys(Role);

  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    password: [],
    role: [],
  });

  constructor(protected shopUserService: ShopUserService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shopUser }) => {
      this.updateForm(shopUser);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shopUser = this.createFromForm();
    if (shopUser.id !== undefined) {
      this.subscribeToSaveResponse(this.shopUserService.update(shopUser));
    } else {
      this.subscribeToSaveResponse(this.shopUserService.create(shopUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShopUser>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(shopUser: IShopUser): void {
    this.editForm.patchValue({
      id: shopUser.id,
      name: shopUser.name,
      email: shopUser.email,
      password: shopUser.password,
      role: shopUser.role,
    });
  }

  protected createFromForm(): IShopUser {
    return {
      ...new ShopUser(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      role: this.editForm.get(['role'])!.value,
    };
  }
}
