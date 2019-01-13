import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise5VerbalwriteComponent } from './exercise5-verbalwrite.component';

describe('Exercise5VerbalwriteComponent', () => {
  let component: Exercise5VerbalwriteComponent;
  let fixture: ComponentFixture<Exercise5VerbalwriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise5VerbalwriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise5VerbalwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
