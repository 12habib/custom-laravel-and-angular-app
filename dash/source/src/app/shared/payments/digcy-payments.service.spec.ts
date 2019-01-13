import { TestBed, inject } from '@angular/core/testing';

import { DigcyPaymentsService } from './digcy-payments.service';

describe('DigcyPaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DigcyPaymentsService]
    });
  });

  it('should be created', inject([DigcyPaymentsService], (service: DigcyPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
