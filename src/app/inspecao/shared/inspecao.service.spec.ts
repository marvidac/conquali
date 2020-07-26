import { TestBed } from '@angular/core/testing';

import { InspecaoService } from './inspecao.service';

describe('InspecaoService', () => {
  let service: InspecaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspecaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
