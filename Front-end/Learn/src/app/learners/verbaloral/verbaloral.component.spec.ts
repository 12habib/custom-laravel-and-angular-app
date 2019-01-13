import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbaloralComponent } from './verbaloral.component';

describe('VerbaloralComponent', () => {
  let component: VerbaloralComponent;
  let fixture: ComponentFixture<VerbaloralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerbaloralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbaloralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
