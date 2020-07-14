import { Component, OnInit } from '@angular/core';
import { Servico } from '../shared/servico';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicoService } from '../shared/servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.page.html',
  styleUrls: ['./servico-form.page.scss'],
})
export class ServicoFormPage implements OnInit {
  title: string = 'Novo Serviço';
  servico: Servico;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.servico = new Servico();
  }

  ngOnInit() {
    this.servico = new Servico();

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      this.title = 'Editar Serviço';
      this.loadServico(parseInt(idParam));
    }
  }
  
  async onSubmit() {
    try {
      const result = await this.servicoService.save(this.servico);
      if(result.insertId)
        this.servico.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Serviço salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Serviço.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadServico(id: number) {
    this.servico = await this.servicoService.getById(id);
  }

}
