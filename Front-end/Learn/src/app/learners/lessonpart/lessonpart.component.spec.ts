import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonpartComponent } from './lessonpart.component';

describe('LessonpartComponent', () => {
  let component: LessonpartComponent;
  let fixture: ComponentFixture<LessonpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
