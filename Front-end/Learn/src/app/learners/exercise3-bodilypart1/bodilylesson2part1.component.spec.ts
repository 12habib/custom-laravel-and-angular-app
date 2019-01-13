import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bodilylesson2part1Component } from './bodilylesson2part1.component';

describe('Bodilylesson2part1Component', () => {
  let component: Bodilylesson2part1Component;
  let fixture: ComponentFixture<Bodilylesson2part1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bodilylesson2part1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bodilylesson2part1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
