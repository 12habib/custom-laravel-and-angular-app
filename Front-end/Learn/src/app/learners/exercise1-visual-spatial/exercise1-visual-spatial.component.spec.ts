import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise1VisualSpatialComponent } from './exercise1-visual-spatial.component';

describe('Exercise1VisualSpatialComponent', () => {
  let component: Exercise1VisualSpatialComponent;
  let fixture: ComponentFixture<Exercise1VisualSpatialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise1VisualSpatialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise1VisualSpatialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
