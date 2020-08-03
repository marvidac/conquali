import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../item/shared/item';
import { ItemService } from '../../item/shared/item.service';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './inspecao-equipe-form.page.html',
  styleUrls: ['./inspecao-equipe-form.page.scss'],
})
export class InspecaoItemFormPage implements OnInit {

  idLocal:number;
  idEquipe:number;

  title: string = 'Nova Inspeção';

  data: string;
  
  itens: Item[] = [];
  
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-item-form.page.ts');
    
    this.idLocal = parseInt(this.route.snapshot.paramMap.get('idLocal'));
    this.idEquipe = parseInt(this.route.snapshot.paramMap.get('idEquipe'));
    
    this.loadAllItens();
  }

  loadAllItens(idItem?: number) {
    this.geraListaDeItens();
  }

  limparFormulario() {
    this.geraListaDeItens();
  }
  
  async geraListaDeItens() {
    this.itens = await this.itemService.getAll();
  }
  
}
