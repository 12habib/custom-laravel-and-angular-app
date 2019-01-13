import { TestBed, inject } from '@angular/core/testing';

import { PartDataService } from './part-data.service';

describe('PartDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartDataService]
    });
  });

  it('should be created', inject([PartDataService], (service: PartDataService) => {
    expect(service).toBeTruthy();
  }));
});
