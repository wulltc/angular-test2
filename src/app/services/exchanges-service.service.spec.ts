import { TestBed } from '@angular/core/testing';

import { ExchangesServiceService } from './exchanges-service.service';

describe('ExchangesServiceService', () => {
  let service: ExchangesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
