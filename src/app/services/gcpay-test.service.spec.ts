import { TestBed } from '@angular/core/testing';

import { GcpayTestService } from './gcpay-test.service';

describe('GcpayTestService', () => {
  let service: GcpayTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GcpayTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
