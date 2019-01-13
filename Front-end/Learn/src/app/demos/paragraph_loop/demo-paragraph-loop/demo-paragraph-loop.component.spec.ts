import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoParagraphLoopComponent } from './demo-paragraph-loop.component';

describe('DemoParagraphLoopComponent', () => {
  let component: DemoParagraphLoopComponent;
  let fixture: ComponentFixture<DemoParagraphLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoParagraphLoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoParagraphLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
