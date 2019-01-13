import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalTestComponent } from './pay-pal-test.component';

describe('PayPalTestComponent', () => {
  let component: PayPalTestComponent;
  let fixture: ComponentFixture<PayPalTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
