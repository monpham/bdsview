import { TestBed } from '@angular/core/testing';

import { HttpsServiceService } from './https-service.service';

describe('HttpsServiceService', () => {
  let service: HttpsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
