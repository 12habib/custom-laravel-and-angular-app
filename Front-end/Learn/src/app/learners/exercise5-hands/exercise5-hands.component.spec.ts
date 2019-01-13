import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5HandsComponent } from './exercise5-hands.component';

describe('Exercise5HandsComponent', () => {
  let component: Exercise5HandsComponent;
  let fixture: ComponentFixture<Exercise5HandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5HandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5HandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
