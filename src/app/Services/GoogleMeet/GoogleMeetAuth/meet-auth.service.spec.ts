import { TestBed } from '@angular/core/testing';

import { MeetAuthService } from './meet-auth.service';

describe('MeetAuthService', () => {
  let service: MeetAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
