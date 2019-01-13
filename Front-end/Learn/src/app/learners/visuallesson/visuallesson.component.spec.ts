import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuallessonComponent } from './visuallesson.component';

describe('VisuallessonComponent', () => {
  let component: VisuallessonComponent;
  let fixture: ComponentFixture<VisuallessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisuallessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuallessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
