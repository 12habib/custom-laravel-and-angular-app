import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrapersonalComponent } from './intrapersonal.component';

describe('IntrapersonalComponent', () => {
  let component: IntrapersonalComponent;
  let fixture: ComponentFixture<IntrapersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrapersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrapersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
