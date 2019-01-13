import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessoncompleteComponent } from './lessoncomplete.component';

describe('LessoncompleteComponent', () => {
  let component: LessoncompleteComponent;
  let fixture: ComponentFixture<LessoncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessoncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessoncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
