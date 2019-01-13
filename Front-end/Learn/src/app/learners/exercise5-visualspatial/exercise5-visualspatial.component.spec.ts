import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5VisualspatialComponent } from './exercise5-visualspatial.component';

describe('Exercise5VisualspatialComponent', () => {
  let component: Exercise5VisualspatialComponent;
  let fixture: ComponentFixture<Exercise5VisualspatialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5VisualspatialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5VisualspatialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
