import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemocategorizationComponent } from './democategorization.component';

describe('DemocategorizationComponent', () => {
  let component: DemocategorizationComponent;
  let fixture: ComponentFixture<DemocategorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemocategorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemocategorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
