import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Logicallesson2Component } from './logicallesson2.component';

describe('Logicallesson2Component', () => {
  let component: Logicallesson2Component;
  let fixture: ComponentFixture<Logicallesson2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Logicallesson2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Logicallesson2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
