import { TestBed } from '@angular/core/testing';

import { MessageEmitterService } from './message-emitter.service';

describe('MessageEmitterService', () => {
  let service: MessageEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
