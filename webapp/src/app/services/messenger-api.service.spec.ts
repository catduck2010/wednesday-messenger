import { TestBed } from '@angular/core/testing';

import { MessengerApiService } from './messenger-api.service';

describe('MessengerApiService', () => {
  let service: MessengerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
