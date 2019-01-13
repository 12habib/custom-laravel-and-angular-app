import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hands2Component } from './hands2.component';

describe('Hands2Component', () => {
  let component: Hands2Component;
  let fixture: ComponentFixture<Hands2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hands2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hands2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
