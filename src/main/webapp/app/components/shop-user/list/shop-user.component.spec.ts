import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ShopUserService } from '../service/shop-user.service';

import { ShopUserComponent } from './shop-user.component';

describe('ShopUser Management Component', () => {
  let comp: ShopUserComponent;
  let fixture: ComponentFixture<ShopUserComponent>;
  let service: ShopUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ShopUserComponent],
    })
      .overrideTemplate(ShopUserComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ShopUserComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ShopUserService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.shopUsers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
