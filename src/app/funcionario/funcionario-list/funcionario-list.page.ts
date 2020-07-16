import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../shared/funcionario';
import { FuncionarioService } from '../shared/funcionario.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.page.html',
  styleUrls: ['./funcionario-list.page.scss'],
})
export class FuncionarioListPage implements OnInit {
   funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async loadFuncionarios() {
    this.funcionarios = await this.funcionarioService.getAll();
  }

  ionViewWillEnter() {
    this.loadFuncionarios();
  }

  doSearchClear() {
    this.loadFuncionarios();
  }

  async doSearchBarChange($event: any) {
    const value = $event.target.value;

    if(value && value.length >= 2) {
      this.funcionarios = await this.funcionarioService.filterByNome(value);
    }
  }

  async delete(funcionario: Funcionario) {
    const alert = await this.alertCtrl.create({
      header: 'Deletar?',
      message: `Deseja excluir o funcionário: ${funcionario.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.executeDelete(funcionario);
          }
        }
      ]
    });

    alert.present();
  }

  async executeDelete(funcionario: Funcionario) {
    try {
      await this.funcionarioService.delete(funcionario.id);
      const index = this.funcionarios.indexOf(funcionario);
      this.funcionarios.splice(index, 1);

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Funcionário excluído com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar excluir o Funcionário.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

}
