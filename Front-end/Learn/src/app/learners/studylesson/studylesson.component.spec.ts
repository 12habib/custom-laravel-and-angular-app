import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudylessonComponent } from './studylesson.component';

describe('StudylessonComponent', () => {
  let component: StudylessonComponent;
  let fixture: ComponentFixture<StudylessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudylessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudylessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
