import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bodilylesson2part2Component } from './bodilylesson2part2.component';

describe('Bodilylesson2part2Component', () => {
  let component: Bodilylesson2part2Component;
  let fixture: ComponentFixture<Bodilylesson2part2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bodilylesson2part2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bodilylesson2part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
