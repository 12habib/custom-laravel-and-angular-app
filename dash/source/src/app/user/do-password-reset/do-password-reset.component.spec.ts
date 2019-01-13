import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoPasswordResetComponent } from './do-password-reset.component';

describe('DoPasswordResetComponent', () => {
  let component: DoPasswordResetComponent;
  let fixture: ComponentFixture<DoPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
