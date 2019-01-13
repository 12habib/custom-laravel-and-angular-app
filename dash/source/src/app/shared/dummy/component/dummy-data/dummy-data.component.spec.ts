import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyDataComponent } from './dummy-data.component';

describe('DummyDataComponent', () => {
  let component: DummyDataComponent;
  let fixture: ComponentFixture<DummyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
