import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraComponent } from './intra.component';

describe('IntraComponent', () => {
  let component: IntraComponent;
  let fixture: ComponentFixture<IntraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
