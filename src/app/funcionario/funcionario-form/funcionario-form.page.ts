import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../shared/funcionario';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FuncionarioService } from '../shared/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.page.html',
  styleUrls: ['./funcionario-form.page.scss'],
})
export class FuncionarioFormPage implements OnInit {
  title: string = 'Novo Funcionário';
  funcionario: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.funcionario = new Funcionario();
  }

  ngOnInit() {
    this.funcionario = new Funcionario();

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      this.title = 'Editar Funcionário';
      this.loadFuncionario(parseInt(idParam));
    }
  }
  
  async onSubmit() {
    try {
      const result = await this.funcionarioService.save(this.funcionario);
      this.funcionario.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Funcionário salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Funcionário.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadFuncionario(id: number) {
    this.funcionario = await this.funcionarioService.getById(id);
  }

}
