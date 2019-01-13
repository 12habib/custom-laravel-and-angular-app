import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise1MusicalComponent } from './exercise1-musical.component';

describe('Exercise1MusicalComponent', () => {
  let component: Exercise1MusicalComponent;
  let fixture: ComponentFixture<Exercise1MusicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise1MusicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise1MusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
