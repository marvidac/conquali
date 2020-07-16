import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
   items: Item[] = [];

  constructor(
    private itemService: ItemService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async loadItems() {
    this.items = await this.itemService.getAll();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  doSearchClear() {
    this.loadItems();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.items = await this.itemService.filterByNome(value);
    }
  }

  async delete(item: Item) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o item: ${item.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(item);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(item: Item) {
    try {
      await this.itemService.delete(item.id);
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Item excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Item.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
