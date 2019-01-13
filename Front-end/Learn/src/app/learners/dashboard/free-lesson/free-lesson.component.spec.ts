import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeLessonComponent } from './free-lesson.component';

describe('FreeLessonComponent', () => {
  let component: FreeLessonComponent;
  let fixture: ComponentFixture<FreeLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
