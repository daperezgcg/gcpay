import { TestBed } from '@angular/core/testing';

import { GcPayService } from './gcpay.service';

describe('GcPayService', () => {
   let service: GcPayService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(GcPayService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
