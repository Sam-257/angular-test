import { TestBed } from '@angular/core/testing';

import { SiblingEventService } from './sibling-event.service';

describe('SiblingEventService', () => {
  let service: SiblingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiblingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
