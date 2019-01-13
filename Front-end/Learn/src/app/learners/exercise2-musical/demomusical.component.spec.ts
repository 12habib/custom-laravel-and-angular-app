import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemomusicalComponent } from './demomusical.component';

describe('DemomusicalComponent', () => {
  let component: DemomusicalComponent;
  let fixture: ComponentFixture<DemomusicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemomusicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemomusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
