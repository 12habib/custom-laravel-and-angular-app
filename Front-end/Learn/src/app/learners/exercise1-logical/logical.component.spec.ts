import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalComponent } from './logical.component';

describe('LogicalComponent', () => {
  let component: LogicalComponent;
  let fixture: ComponentFixture<LogicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
