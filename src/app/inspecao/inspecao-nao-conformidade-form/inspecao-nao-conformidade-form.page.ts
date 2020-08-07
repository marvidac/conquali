import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../servico/shared/servico';
import { ServicoService } from 'src/app/servico/shared/servico.service';

@Component({
  selector: 'app-inspecao-nao-conformidade-form',
  templateUrl: './inspecao-nao-conformidade-form.page.html',
  styleUrls: ['./inspecao-nao-conformidade-form.page.scss'],
})
export class InspecaoNaoConformidadeFormPage implements OnInit {
  
  title: string = 'Nova Inspeção';
  
  data: string = '';
  idLocal: number;
  idEquipe: number;
  idItem: number;
  servicosConformes: Servico[] = [];
  servicosNaoConformes: any[] = [];

  constructor(private route: ActivatedRoute, private servicoService: ServicoService) {
    console.log('inspecao-nao-conformidade-form.page.ts');
  }

  ngOnInit() {
    // se possivel, capture o parametro 
    let questoesParam = this.route
      .queryParamMap.forEach(par => {
        this.data = par.get('data');
        this.idLocal = parseInt(par.get('idLocal'));
        this.idEquipe = parseInt(par.get('idEquipe'));
        this.idItem = parseInt(par.get('idItem'));
        
        par.getAll('servicosConformes').map(s => {
          this.populaConformes(parseInt(s));
        });
        
        par.getAll('servicosNaoConformes').map(s => {
          this.populaNaoConformes(parseInt(s));
        });
      });
  }

  async populaConformes(id: number) {
    this.servicosConformes.push(await this.getServicoById(id));
  }

  async populaNaoConformes(id: number) {
    let servico = await this.getServicoById(id);
    this.servicosNaoConformes.push({
      id: servico.id,
      nome: servico.nome,
      obs: ''
    });
  }

  async getServicoById(id: number) {
    let servico: Servico = await this.servicoService.getById(id);
    return servico;
  }

  salvarInspecao() {

  }

}