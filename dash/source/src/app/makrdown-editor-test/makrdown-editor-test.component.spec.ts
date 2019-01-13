import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakrdownEditorTestComponent } from './makrdown-editor-test.component';

describe('MakrdownEditorTestComponent', () => {
  let component: MakrdownEditorTestComponent;
  let fixture: ComponentFixture<MakrdownEditorTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakrdownEditorTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakrdownEditorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
