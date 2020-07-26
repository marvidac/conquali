import { Component, OnInit } from '@angular/core';
import { Inspecao } from '../shared/inspecao';
import { InspecaoService } from '../shared/inspecao.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inspecao-list',
  templateUrl: './inspecao-list.page.html',
  styleUrls: ['./inspecao-list.page.scss'],
})
export class InspecaoListPage implements OnInit {
   inspecoes: Inspecao[] = [];

  constructor(
    private inspecaoService: InspecaoService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async loadInspecoes() {
    this.inspecoes = await this.inspecaoService.getAll();
  }

  ionViewWillEnter() {
    this.loadInspecoes();
  }

  doSearchClear() {
    this.loadInspecoes();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.inspecoes = await this.inspecaoService.filterByLocalNome(value);
    }
  }

  async delete(inspecao: Inspecao) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir a inspeção?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(inspecao);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(inspecao: Inspecao) {
    try {
      await this.inspecaoService.delete(inspecao.id);
      const index = this.inspecoes.indexOf(inspecao);
      this.inspecoes.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Inspeção excluída com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir a inspeção.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
