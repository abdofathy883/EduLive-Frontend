import { TestBed } from '@angular/core/testing';

import { IntelTelService } from './intel-tel.service';

describe('IntelTelService', () => {
  let service: IntelTelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntelTelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
