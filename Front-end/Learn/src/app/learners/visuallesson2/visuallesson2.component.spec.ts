import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visuallesson2Component } from './visuallesson2.component';

describe('Visuallesson2Component', () => {
  let component: Visuallesson2Component;
  let fixture: ComponentFixture<Visuallesson2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visuallesson2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visuallesson2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
