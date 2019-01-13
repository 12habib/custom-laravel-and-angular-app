import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLevelsComponent } from './course-levels.component';

describe('CourseLevelsComponent', () => {
  let component: CourseLevelsComponent;
  let fixture: ComponentFixture<CourseLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
