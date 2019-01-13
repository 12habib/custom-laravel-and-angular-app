import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Verballesson2Component } from './verballesson2.component';

describe('Verballesson2Component', () => {
  let component: Verballesson2Component;
  let fixture: ComponentFixture<Verballesson2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verballesson2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verballesson2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
