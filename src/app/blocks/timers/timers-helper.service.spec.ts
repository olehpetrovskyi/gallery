import { TestBed } from '@angular/core/testing';

import { TimersHelperService } from './timers-helper.service';

describe('TimersHelperService', () => {
  let service: TimersHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimersHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
