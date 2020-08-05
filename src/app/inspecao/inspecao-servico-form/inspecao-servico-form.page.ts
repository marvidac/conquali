import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemServicoService } from '../../item/shared/item-servico.service';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-servico-form',
  templateUrl: './inspecao-servico-form.page.html',
  styleUrls: ['./inspecao-servico-form.page.scss'],
})
export class InspecaoServicoFormPage implements OnInit {

  idLocal:number;
  idEquipe:number;
  idItem:number;

  title: string = 'Nova Inspeção';
 
  servicos: any[] = [];
 
  constructor(
    private itemServicoService: ItemServicoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-servico-form.page.ts');
    
    this.idLocal = parseInt(this.route.snapshot.paramMap.get('idLocal'));
    this.idEquipe = parseInt(this.route.snapshot.paramMap.get('idEquipe'));
    this.idItem = parseInt(this.route.snapshot.paramMap.get('idItem'));
    
    if(this.idItem)
      this.loadAllServicosPorIdItem();
  }

  loadAllServicosPorIdItem(idServico?: number) {
    this.getAllServicosByIdItem();
  }

  limparFormulario() {
    this.getAllServicosByIdItem();
  }
  
  async getAllServicosByIdItem() {
    this.servicos = [];
    await this.itemServicoService.getAllServicosByIdItem(this.idItem).then((retorno) => {
      retorno.map( serv => {
        this.servicos.push(
          {
          id: serv.id,
          nome: serv.nome,
          checked: false
        }
        );
      });
    });

  }

  irParaNaoConformidades() {
    let params = {
      idLocal: this.idLocal, 
      idEquipe: this.idEquipe, 
      idItem: this.idItem,
      servicos: this.servicos
    }
    this.router.navigate(['inspecao/naoConformidade'], {queryParams: params});
  }

  /*
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // se possivel, capture o parametro 
    let questoesParam = this.route
      .queryParamMap
      .map(params => params.get('atributo') || 'None');
  }*/
  
}
