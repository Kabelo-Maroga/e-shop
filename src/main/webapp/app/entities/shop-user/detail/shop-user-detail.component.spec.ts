import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShopUserDetailComponent } from './shop-user-detail.component';

describe('ShopUser Management Detail Component', () => {
  let comp: ShopUserDetailComponent;
  let fixture: ComponentFixture<ShopUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopUserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ shopUser: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ShopUserDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ShopUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load shopUser on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.shopUser).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
