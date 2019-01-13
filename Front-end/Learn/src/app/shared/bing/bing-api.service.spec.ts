import { TestBed, inject } from '@angular/core/testing';

import { BingApiService } from './bing-api.service';

describe('BingApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BingApiService]
    });
  });

  it('should be created', inject([BingApiService], (service: BingApiService) => {
    expect(service).toBeTruthy();
  }));
});
