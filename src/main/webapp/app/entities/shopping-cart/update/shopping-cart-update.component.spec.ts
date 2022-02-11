jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ShoppingCartService } from '../service/shopping-cart.service';
import { IShoppingCart, ShoppingCart } from '../shopping-cart.model';
import { IShopUser } from 'app/entities/shop-user/shop-user.model';
import { ShopUserService } from 'app/entities/shop-user/service/shop-user.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { ShoppingCartUpdateComponent } from './shopping-cart-update.component';

describe('ShoppingCart Management Update Component', () => {
  let comp: ShoppingCartUpdateComponent;
  let fixture: ComponentFixture<ShoppingCartUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let shoppingCartService: ShoppingCartService;
  let shopUserService: ShopUserService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShoppingCartUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(ShoppingCartUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shoppingCartService = TestBed.inject(ShoppingCartService);
    shopUserService = TestBed.inject(ShopUserService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call shopUser query and add missing value', () => {
      const shoppingCart: IShoppingCart = { id: 456 };
      const shopUser: IShopUser = { id: 54675 };
      shoppingCart.shopUser = shopUser;

      const shopUserCollection: IShopUser[] = [{ id: 41828 }];
      jest.spyOn(shopUserService, 'query').mockReturnValue(of(new HttpResponse({ body: shopUserCollection })));
      const expectedCollection: IShopUser[] = [shopUser, ...shopUserCollection];
      jest.spyOn(shopUserService, 'addShopUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      expect(shopUserService.query).toHaveBeenCalled();
      expect(shopUserService.addShopUserToCollectionIfMissing).toHaveBeenCalledWith(shopUserCollection, shopUser);
      expect(comp.shopUsersCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const shoppingCart: IShoppingCart = { id: 456 };
      const product: IProduct = { id: 84067 };
      shoppingCart.product = product;

      const productCollection: IProduct[] = [{ id: 33773 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const shoppingCart: IShoppingCart = { id: 456 };
      const shopUser: IShopUser = { id: 59476 };
      shoppingCart.shopUser = shopUser;
      const product: IProduct = { id: 78586 };
      shoppingCart.product = product;

      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(shoppingCart));
      expect(comp.shopUsersCollection).toContain(shopUser);
      expect(comp.productsSharedCollection).toContain(product);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShoppingCart>>();
      const shoppingCart = { id: 123 };
      jest.spyOn(shoppingCartService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shoppingCart }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(shoppingCartService.update).toHaveBeenCalledWith(shoppingCart);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShoppingCart>>();
      const shoppingCart = new ShoppingCart();
      jest.spyOn(shoppingCartService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: shoppingCart }));
      saveSubject.complete();

      // THEN
      expect(shoppingCartService.create).toHaveBeenCalledWith(shoppingCart);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ShoppingCart>>();
      const shoppingCart = { id: 123 };
      jest.spyOn(shoppingCartService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ shoppingCart });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(shoppingCartService.update).toHaveBeenCalledWith(shoppingCart);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackShopUserById', () => {
      it('Should return tracked ShopUser primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackShopUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProductById', () => {
      it('Should return tracked Product primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProductById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
