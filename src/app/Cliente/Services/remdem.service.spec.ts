import { TestBed } from '@angular/core/testing';

import { RemdemService } from './remdem.service';

describe('RemdemService', () => {
  let service: RemdemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemdemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
