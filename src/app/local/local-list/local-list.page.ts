import { Component, OnInit } from '@angular/core';
import { Local } from '../shared/local';
import { LocalService } from '../shared/local.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.page.html',
  styleUrls: ['./local-list.page.scss'],
})
export class LocalListPage implements OnInit {
   locais: Local[] = [];

  constructor(
    private localService: LocalService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { 
      console.log('local-list.page.ts');
    }

  ngOnInit() {
  }

  async loadLocais() {
    this.locais = await this.localService.getAll();
  }

  ionViewWillEnter() {
    this.loadLocais();
  }

  doSearchClear() {
    this.loadLocais();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.locais = await this.localService.filterByNome(value);
    }
  }

  async delete(local: Local) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o local: ${local.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(local);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(local: Local) {
    try {
      await this.localService.delete(local.id);
      const index = this.locais.indexOf(local);
      this.locais.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Local excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Local.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
