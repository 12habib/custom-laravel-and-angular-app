import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorization2part1Component } from './categorization2part1.component';

describe('Categorization2part1Component', () => {
  let component: Categorization2part1Component;
  let fixture: ComponentFixture<Categorization2part1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categorization2part1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categorization2part1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
