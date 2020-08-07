import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../item/shared/item';
import { ItemService } from '../../item/shared/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './inspecao-item-form.page.html',
  styleUrls: ['./inspecao-item-form.page.scss'],
})
export class InspecaoItemFormPage implements OnInit {

  data: string = '';

  idLocal:number;
  idEquipe:number;

  title: string = 'Nova Inspeção';

  
  itens: Item[] = [];
  
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-item-form.page.ts');
    
    this.data = this.route.snapshot.paramMap.get('data');
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

  irParaServicos(item: Item) {
    this.router.navigate(['/inspecao/item', this.idLocal, this.idEquipe, item.id, this.data]);
  }
  
}
