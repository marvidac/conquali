import { Component, OnInit } from '@angular/core';
import { Local } from '../shared/local';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LocalService } from '../shared/local.service';

@Component({
  selector: 'app-local-form',
  templateUrl: './local-form.page.html',
  styleUrls: ['./local-form.page.scss'],
})
export class LocalFormPage implements OnInit {
  title: string = 'Novo Local';
  local: Local;

  constructor(
    private localService: LocalService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    console.log('local-form.page.ts');
    this.local = new Local();
  }

  ngOnInit() {
    this.local = new Local();

    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      this.title = 'Editar Local';
      this.loadLocal(parseInt(idParam));
    }
  }
  
  async onSubmit() {
    try {
      const result = await this.localService.save(this.local);
      if(result.insertId)
        this.local.id = result.insertId;

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Local salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Local.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadLocal(id: number) {
    this.local = await this.localService.getById(id);
  }

}
