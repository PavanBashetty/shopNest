import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWidgetComponent } from './product-widget.component';

describe('ProductWidgetComponent', () => {
  let component: ProductWidgetComponent;
  let fixture: ComponentFixture<ProductWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductWidgetComponent]
    });
    fixture = TestBed.createComponent(ProductWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
