import { TestBed } from '@angular/core/testing';

import { KibanaHttpService } from './kibana-http.service';

describe('KibanaHttpService', () => {
  let service: KibanaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KibanaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
