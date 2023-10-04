import { TestBed } from '@angular/core/testing';

import { XbetService } from './xbet.service';

describe('XbetService', () => {
  let service: XbetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XbetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
