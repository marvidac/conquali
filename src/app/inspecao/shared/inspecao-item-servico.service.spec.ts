import { TestBed } from '@angular/core/testing';

import { InspecaoItemServicoService } from './inspecao-item-servico.service';

describe('InspecaoItemServicoService', () => {
  let service: InspecaoItemServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspecaoItemServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
