import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5InterpersonalComponent } from './exercise5-interpersonal.component';

describe('Exercise5InterpersonalComponent', () => {
  let component: Exercise5InterpersonalComponent;
  let fixture: ComponentFixture<Exercise5InterpersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5InterpersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5InterpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
