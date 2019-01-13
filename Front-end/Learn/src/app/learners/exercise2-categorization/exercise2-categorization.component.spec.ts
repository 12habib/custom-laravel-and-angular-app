import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise2CategorizationComponent } from './exercise2-categorization.component';

describe('Exercise2CategorizationComponent', () => {
  let component: Exercise2CategorizationComponent;
  let fixture: ComponentFixture<Exercise2CategorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise2CategorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise2CategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
