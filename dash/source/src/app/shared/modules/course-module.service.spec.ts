import { TestBed, inject } from '@angular/core/testing';

import { CourseModuleService } from './course-module.service';

describe('CourseModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseModuleService]
    });
  });

  it('should be created', inject([CourseModuleService], (service: CourseModuleService) => {
    expect(service).toBeTruthy();
  }));
});
