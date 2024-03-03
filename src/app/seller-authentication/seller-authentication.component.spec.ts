import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAuthenticationComponent } from './seller-authentication.component';

describe('SellerAuthenticationComponent', () => {
  let component: SellerAuthenticationComponent;
  let fixture: ComponentFixture<SellerAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAuthenticationComponent]
    });
    fixture = TestBed.createComponent(SellerAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
