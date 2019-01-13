import { TestBed, inject } from '@angular/core/testing';

import { UploadHelperService } from './upload-helper.service';

describe('UploadHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadHelperService]
    });
  });

  it('should be created', inject([UploadHelperService], (service: UploadHelperService) => {
    expect(service).toBeTruthy();
  }));
});
