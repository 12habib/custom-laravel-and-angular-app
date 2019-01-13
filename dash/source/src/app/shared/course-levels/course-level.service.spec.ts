import { TestBed, inject } from '@angular/core/testing';

import { CourseLevelService } from './course-level.service';

describe('CourseLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseLevelService]
    });
  });

  it('should be created', inject([CourseLevelService], (service: CourseLevelService) => {
    expect(service).toBeTruthy();
  }));
});
