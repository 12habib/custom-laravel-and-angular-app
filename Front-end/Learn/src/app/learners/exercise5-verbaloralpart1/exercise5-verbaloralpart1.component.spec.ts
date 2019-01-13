import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5Verbaloralpart1Component } from './exercise5-verbaloralpart1.component';

describe('Exercise5Verbaloralpart1Component', () => {
  let component: Exercise5Verbaloralpart1Component;
  let fixture: ComponentFixture<Exercise5Verbaloralpart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5Verbaloralpart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5Verbaloralpart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
