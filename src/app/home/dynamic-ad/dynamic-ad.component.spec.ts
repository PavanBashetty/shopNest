import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAdComponent } from './dynamic-ad.component';

describe('DynamicAdComponent', () => {
  let component: DynamicAdComponent;
  let fixture: ComponentFixture<DynamicAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicAdComponent]
    });
    fixture = TestBed.createComponent(DynamicAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
