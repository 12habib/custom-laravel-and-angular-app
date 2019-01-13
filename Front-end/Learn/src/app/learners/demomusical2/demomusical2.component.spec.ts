import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demomusical2Component } from './demomusical2.component';

describe('Demomusical2Component', () => {
  let component: Demomusical2Component;
  let fixture: ComponentFixture<Demomusical2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demomusical2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demomusical2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
