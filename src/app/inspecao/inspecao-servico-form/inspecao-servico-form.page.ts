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

  data: string = '';
  idLocal:number;
  idEquipe:number;
  idItem:number;

  title: string = 'Nova Inspeção';
 
  itensServicos: any[] = [];
 
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
    
    this.carregaApartirDeQueryParams();

    if(this.idItem)
      this.loadAllServicosPorIdItem();
  }

  carregaApartirDeQueryParams() {
    this.route
    .queryParamMap
    .forEach(params => {
      if(params.get('data')) {
        this.data = params.get('data');
      }
    });
  }

  loadAllServicosPorIdItem(idServico?: number) {
    this.getAllServicosByIdItem();
  }

  limparFormulario() {
    this.getAllServicosByIdItem();
  }
  
  async getAllServicosByIdItem() {
    this.itensServicos = [];
    await this.itemServicoService.getAllServicosByIdItem(this.idItem).then((retorno) => {
      retorno.map( itemServ => {
        this.itensServicos.push(
          {
          id: itemServ.id,
          item: itemServ.item,
          itemNome: itemServ.itemNome,
          servico: itemServ.servico,
          servicoNome: itemServ.servicoNome,
          checked: false
        }
        );
      });
    });

  }

  irParaNaoConformidades() {
    let conformes: number[] = [];
    let naoConformes: number[] = [];

    this.itensServicos.forEach(e => {
      if(e.checked) {
        conformes.push(e.id);
      } else  {
        naoConformes.push(e.id);
      }
    })

    let params = {
      data: this.data, 
      idLocal: this.idLocal, 
      idEquipe: this.idEquipe, 
      idItem: this.idItem,
      itemServicosConformes: conformes,
      itemServicosNaoConformes: naoConformes,
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
