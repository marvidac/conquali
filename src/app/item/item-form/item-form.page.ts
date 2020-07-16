import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { Servico } from '../../servico/shared/servico';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ItemService } from '../shared/item.service';
import { ItemServicoService } from '../shared/item-servico.service';
import { ServicoService } from '../../servico/shared/servico.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit {
  title: string = 'Novo Item';
  item: Item;

  servicos: Servico[] = [];
  servicosSelecionados: Servico[] = [];

  compareWithFn(o1, o2) {
    return o1.id === o2.id;
  };

  constructor(
    private itemService: ItemService,
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.item = new Item();
  }

  ngOnInit() {
    this.item = new Item();

    this.loadAllServicos();

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      this.title = 'Editar Item';
      this.loadItem(parseInt(idParam));
    }

    
  }
  
  async onSubmit() {
    try {
      const result = await this.itemService.save(this.item);
      if(result.insertId)
        this.item.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Item salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Item.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadItem(id: number) {
    this.item = await this.itemService.getById(id);
  }

  async loadAllServicos(idItem?: number) {
    console.log('loadAllServicos item-form.page.ts');
    this.servicos = await this.servicoService.getAll();
  }

  onSelectChange(selectedValue: any) {
    this.servicosSelecionados = selectedValue.detail;
  }

}
