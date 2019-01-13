import { TestBed, inject } from '@angular/core/testing';

import { LoginTokenService } from './login-token.service';

describe('LoginTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginTokenService]
    });
  });

  it('should be created', inject([LoginTokenService], (service: LoginTokenService) => {
    expect(service).toBeTruthy();
  }));
});
