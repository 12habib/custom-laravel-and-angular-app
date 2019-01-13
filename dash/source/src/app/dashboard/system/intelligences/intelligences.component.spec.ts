import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligencesComponent } from './intelligences.component';

describe('IntelligencesComponent', () => {
  let component: IntelligencesComponent;
  let fixture: ComponentFixture<IntelligencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
