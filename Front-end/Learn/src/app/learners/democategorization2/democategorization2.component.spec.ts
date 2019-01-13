import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Democategorization2Component } from './democategorization2.component';

describe('Democategorization2Component', () => {
  let component: Democategorization2Component;
  let fixture: ComponentFixture<Democategorization2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Democategorization2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Democategorization2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
