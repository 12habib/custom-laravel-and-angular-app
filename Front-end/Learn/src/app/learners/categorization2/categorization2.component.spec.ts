import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorization2Component } from './categorization2.component';

describe('Categorization2Component', () => {
  let component: Categorization2Component;
  let fixture: ComponentFixture<Categorization2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categorization2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categorization2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
