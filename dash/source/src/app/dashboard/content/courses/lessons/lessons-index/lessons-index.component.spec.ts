import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsIndexComponent } from './lessons-index.component';

describe('LessonsIndexComponent', () => {
  let component: LessonsIndexComponent;
  let fixture: ComponentFixture<LessonsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
