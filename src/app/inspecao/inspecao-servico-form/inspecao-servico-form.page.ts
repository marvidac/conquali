import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../servico/shared/servico';
import { ServicoService } from '../../servico/shared/servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './inspecao-servico-form.page.html',
  styleUrls: ['./inspecao-servico-form.page.scss'],
})
export class InspecaoServicoFormPage implements OnInit {

  idLocal:number;
  idEquipe:number;
  idItem:number;
  teste:[];

  title: string = 'Nova Inspeção';
 
  servicos: Servico[] = [];
  
  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-servico-form.page.ts');
    
    this.idLocal = parseInt(this.route.snapshot.paramMap.get('idLocal'));
    this.idEquipe = parseInt(this.route.snapshot.paramMap.get('idEquipe'));
    this.idItem = parseInt(this.route.snapshot.paramMap.get('idItem'));
    console.log(this.route.snapshot.paramMap.get('teste'));
    
    this.loadAllServicos();
  }

  loadAllServicos(idServico?: number) {
    this.geraListaDeServicos();
  }

  limparFormulario() {
    this.geraListaDeServicos();
  }
  
  async geraListaDeServicos() {
    this.servicos = await this.servicoService.getAll();
  }
  
}
