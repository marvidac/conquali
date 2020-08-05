import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../servico/shared/servico';

@Component({
  selector: 'app-inspecao-nao-conformidade-form',
  templateUrl: './inspecao-nao-conformidade-form.page.html',
  styleUrls: ['./inspecao-nao-conformidade-form.page.scss'],
})
export class InspecaoNaoConformidadeFormPage implements OnInit {
  
  idLocal: number;
  idEquipe: number;
  idItem: number;
  servicosNaoConformes: any[] = [];

  constructor(private route: ActivatedRoute) {
    console.log('inspecao-nao-conformidade-form.page.ts');
  }

  ngOnInit() {
    // se possivel, capture o parametro 
    let questoesParam = this.route
      .queryParamMap.forEach(par => {
        this.idLocal = parseInt(par.get('idLocal'));
        this.idEquipe = parseInt(par.get('idEquipe'));
        this.idItem = parseInt(par.get('idItem'));
        
        par.getAll('servicos').map(s => {
          let t = Object.entries(s);
          console.log(t);
        })
        //this.servicosNaoConformes = par.get('servicos');
      })
      //.map(params => params.get('atributo') || 'None');
  }

}
