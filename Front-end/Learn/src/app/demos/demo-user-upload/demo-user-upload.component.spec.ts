import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUserUploadComponent } from './demo-user-upload.component';

describe('DemoUserUploadComponent', () => {
  let component: DemoUserUploadComponent;
  let fixture: ComponentFixture<DemoUserUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoUserUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoUserUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
