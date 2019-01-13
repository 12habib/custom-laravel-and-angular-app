import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Intralesson2Component } from './intralesson2.component';

describe('Intralesson2Component', () => {
  let component: Intralesson2Component;
  let fixture: ComponentFixture<Intralesson2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Intralesson2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Intralesson2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
