import { TestBed } from '@angular/core/testing';

import { ExchangetranslateTextService } from './exchangetranslate-text.service';

describe('ExchangetranslateTextService', () => {
  let service: ExchangetranslateTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangetranslateTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
