import { TestBed } from '@angular/core/testing';

import { ItemServicoService } from './item-servico.service';

describe('ItemServicoService', () => {
  let service: ItemServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
