import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Role } from 'app/components/enumerations/role.model';
import { IShopUser, ShopUser } from '../shop-user.model';

import { ShopUserService } from './shop-user.service';

describe('ShopUser Service', () => {
  let service: ShopUserService;
  let httpMock: HttpTestingController;
  let elemDefault: IShopUser;
  let expectedResult: IShopUser | IShopUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ShopUserService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      email: 'AAAAAAA',
      password: 'AAAAAAA',
      role: Role.USER,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ShopUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ShopUser()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ShopUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          email: 'BBBBBB',
          password: 'BBBBBB',
          role: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ShopUser', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new ShopUser()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ShopUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          email: 'BBBBBB',
          password: 'BBBBBB',
          role: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ShopUser', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addShopUserToCollectionIfMissing', () => {
      it('should add a ShopUser to an empty array', () => {
        const shopUser: IShopUser = { id: 123 };
        expectedResult = service.addShopUserToCollectionIfMissing([], shopUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopUser);
      });

      it('should not add a ShopUser to an array that contains it', () => {
        const shopUser: IShopUser = { id: 123 };
        const shopUserCollection: IShopUser[] = [
          {
            ...shopUser,
          },
          { id: 456 },
        ];
        expectedResult = service.addShopUserToCollectionIfMissing(shopUserCollection, shopUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ShopUser to an array that doesn't contain it", () => {
        const shopUser: IShopUser = { id: 123 };
        const shopUserCollection: IShopUser[] = [{ id: 456 }];
        expectedResult = service.addShopUserToCollectionIfMissing(shopUserCollection, shopUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopUser);
      });

      it('should add only unique ShopUser to an array', () => {
        const shopUserArray: IShopUser[] = [{ id: 123 }, { id: 456 }, { id: 71191 }];
        const shopUserCollection: IShopUser[] = [{ id: 123 }];
        expectedResult = service.addShopUserToCollectionIfMissing(shopUserCollection, ...shopUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const shopUser: IShopUser = { id: 123 };
        const shopUser2: IShopUser = { id: 456 };
        expectedResult = service.addShopUserToCollectionIfMissing([], shopUser, shopUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(shopUser);
        expect(expectedResult).toContain(shopUser2);
      });

      it('should accept null and undefined values', () => {
        const shopUser: IShopUser = { id: 123 };
        expectedResult = service.addShopUserToCollectionIfMissing([], null, shopUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(shopUser);
      });

      it('should return initial array if no ShopUser is added', () => {
        const shopUserCollection: IShopUser[] = [{ id: 123 }];
        expectedResult = service.addShopUserToCollectionIfMissing(shopUserCollection, undefined, null);
        expect(expectedResult).toEqual(shopUserCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
