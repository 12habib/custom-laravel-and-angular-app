import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodilylessonComponent } from './bodilylesson.component';

describe('BodilylessonComponent', () => {
  let component: BodilylessonComponent;
  let fixture: ComponentFixture<BodilylessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodilylessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodilylessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
