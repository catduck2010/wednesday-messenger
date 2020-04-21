import { TestBed } from '@angular/core/testing';

import { GrandService } from './grand.service';

describe('GrandService', () => {
  let service: GrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
