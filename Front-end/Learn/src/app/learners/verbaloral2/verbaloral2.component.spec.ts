import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Verbaloral2Component } from './verbaloral2.component';

describe('Verbaloral2Component', () => {
  let component: Verbaloral2Component;
  let fixture: ComponentFixture<Verbaloral2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Verbaloral2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Verbaloral2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
