import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildmanLessonComponent } from './buildman-lesson.component';

describe('BuildmanLessonComponent', () => {
  let component: BuildmanLessonComponent;
  let fixture: ComponentFixture<BuildmanLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildmanLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildmanLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
