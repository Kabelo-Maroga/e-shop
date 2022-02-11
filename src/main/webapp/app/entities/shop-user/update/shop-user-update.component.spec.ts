import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ShopUserService } from '../service/shop-user.service';
import { IShopUser, ShopUser } from '../shop-user.model';

import { ShopUserUpdateComponent } from './shop-user-update.component';

describe('ShopUser Management Update Component', () => {
  let comp: ShopUserUpdateComponent;
  let fixture: ComponentFixture<ShopUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shopUserService: ShopUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ShopUserUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ShopUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shopUserService = TestBed.inject(ShopUserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const shopUser: IShopUser = { id: 456 };

      activatedRoute.data = of({ shopUser });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(shopUser));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopUser>>();
      const shopUser = { id: 123 };
      jest.spyOn(shopUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopUser }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(shopUserService.update).toHaveBeenCalledWith(shopUser);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopUser>>();
      const shopUser = new ShopUser();
      jest.spyOn(shopUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shopUser }));
      saveSubject.complete();

      // THEN
      expect(shopUserService.create).toHaveBeenCalledWith(shopUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShopUser>>();
      const shopUser = { id: 123 };
      jest.spyOn(shopUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shopUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shopUserService.update).toHaveBeenCalledWith(shopUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
