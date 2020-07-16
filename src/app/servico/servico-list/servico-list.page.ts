import { Component, OnInit } from '@angular/core';
import { Servico } from '../shared/servico';
import { ServicoService } from '../shared/servico.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.page.html',
  styleUrls: ['./servico-list.page.scss'],
})
export class ServicoListPage implements OnInit {
   servicos: Servico[] = [];

  constructor(
    private servicoService: ServicoService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async loadServicos() {
    this.servicos = await this.servicoService.getAll();
  }

  ionViewWillEnter() {
    this.loadServicos();
  }

  doSearchClear() {
    this.loadServicos();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.servicos = await this.servicoService.filterByNome(value);
    }
  }

  async delete(servico: Servico) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o serviço: ${servico.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(servico);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(servico: Servico) {
    try {
      await this.servicoService.delete(servico.id);
      const index = this.servicos.indexOf(servico);
      this.servicos.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Serviço excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Serviço.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
