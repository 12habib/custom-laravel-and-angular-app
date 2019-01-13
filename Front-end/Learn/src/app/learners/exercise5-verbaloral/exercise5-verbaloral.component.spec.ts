import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5VerbaloralComponent } from './exercise5-verbaloral.component';

describe('Exercise5VerbaloralComponent', () => {
  let component: Exercise5VerbaloralComponent;
  let fixture: ComponentFixture<Exercise5VerbaloralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5VerbaloralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5VerbaloralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
