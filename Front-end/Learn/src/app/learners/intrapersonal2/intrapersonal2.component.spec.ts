import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Intrapersonal2Component } from './intrapersonal2.component';

describe('Intrapersonal2Component', () => {
  let component: Intrapersonal2Component;
  let fixture: ComponentFixture<Intrapersonal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Intrapersonal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Intrapersonal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
