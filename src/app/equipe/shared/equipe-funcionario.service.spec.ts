import { TestBed } from '@angular/core/testing';

import { EquipeFuncionarioService } from './equipe-funcionario.service';

describe('EquipeFuncionarioService', () => {
  let service: EquipeFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
