import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bodilylesson2Component } from './bodilylesson2.component';

describe('Bodilylesson2Component', () => {
  let component: Bodilylesson2Component;
  let fixture: ComponentFixture<Bodilylesson2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bodilylesson2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bodilylesson2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
