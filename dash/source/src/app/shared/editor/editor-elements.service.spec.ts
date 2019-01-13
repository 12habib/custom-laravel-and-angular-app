import { TestBed, inject } from '@angular/core/testing';

import { EditorElementsService } from './editor-elements.service';

describe('EditorElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorElementsService]
    });
  });

  it('should be created', inject([EditorElementsService], (service: EditorElementsService) => {
    expect(service).toBeTruthy();
  }));
});
