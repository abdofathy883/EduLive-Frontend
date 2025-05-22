import { TestBed } from '@angular/core/testing';

import { AuthZoomService } from './auth-zoom.service';

describe('AuthZoomService', () => {
  let service: AuthZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
