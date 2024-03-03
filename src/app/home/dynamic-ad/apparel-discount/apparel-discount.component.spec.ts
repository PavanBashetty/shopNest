import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelDiscountComponent } from './apparel-discount.component';

describe('ApparelDiscountComponent', () => {
  let component: ApparelDiscountComponent;
  let fixture: ComponentFixture<ApparelDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApparelDiscountComponent]
    });
    fixture = TestBed.createComponent(ApparelDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
