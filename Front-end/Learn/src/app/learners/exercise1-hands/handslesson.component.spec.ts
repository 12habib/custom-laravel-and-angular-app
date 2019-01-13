import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandslessonComponent } from './handslesson.component';

describe('HandslessonComponent', () => {
  let component: HandslessonComponent;
  let fixture: ComponentFixture<HandslessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandslessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandslessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
