import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise3HandsComponent } from './exercise3-hands.component';

describe('Exercise3HandsComponent', () => {
  let component: Exercise3HandsComponent;
  let fixture: ComponentFixture<Exercise3HandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise3HandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise3HandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
