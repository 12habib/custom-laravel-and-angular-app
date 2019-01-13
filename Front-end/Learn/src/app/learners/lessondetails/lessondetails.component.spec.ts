import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessondetailsComponent } from './lessondetails.component';

describe('LessondetailsComponent', () => {
  let component: LessondetailsComponent;
  let fixture: ComponentFixture<LessondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
