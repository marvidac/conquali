import { Component, OnInit } from '@angular/core';
import { Equipe } from '../shared/equipe';
import { EquipeService } from '../shared/equipe.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.page.html',
  styleUrls: ['./equipe-list.page.scss'],
})
export class EquipeListPage implements OnInit {
   equipes: Equipe[] = [];

  constructor(
    private equipeService: EquipeService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async loadEquipes() {
    this.equipes = await this.equipeService.getAll();
  }

  ionViewWillEnter() {
    this.loadEquipes();
  }

  doSearchClear() {
    this.loadEquipes();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.equipes = await this.equipeService.filterByNome(value);
    }
  }

  async delete(equipe: Equipe) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o serviço: ${equipe.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(equipe);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(equipe: Equipe) {
    try {
      await this.equipeService.delete(equipe.id);
      const index = this.equipes.indexOf(equipe);
      this.equipes.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Equipe excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Equipe.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
