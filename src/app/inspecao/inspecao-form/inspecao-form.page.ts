import { Component, OnInit } from '@angular/core';
import { Inspecao } from '../shared/inspecao';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InspecaoService } from '../shared/inspecao.service';
import { Local } from '../../local/shared/local';
import { LocalService } from '../../local/shared/local.service';

@Component({
  selector: 'app-inspecao-form',
  templateUrl: './inspecao-form.page.html',
  styleUrls: ['./inspecao-form.page.scss'],
})
export class InspecaoFormPage implements OnInit {
  idParam:number;
  title: string = 'Nova Inspeção';
  inspecao: Inspecao;
  
  locais: any[] = [];
  localSelecionado: Local;

  constructor(
    private inspecaoService: InspecaoService,
    private localService: LocalService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.inspecao = new Inspecao();
  }

  ngOnInit() {
    console.log('ngOnInit inspecao-form.page.ts');
    this.inspecao = new Inspecao();
    //Pegando id do Inspecao passado como parâmetro a partir da tela de listagem
    this.idParam = parseInt(this.route.snapshot.paramMap.get('id'));

    
    if(this.idParam) {
      this.title = 'Editar Inspecao';
      this.loadInspecao(this.idParam);
      //this.loadItemServicosPorInspecao(this.idParam);
    }

    //Deve ser o último a ser chamado, pois é necessário construir lista de serviços do Inspecao (apenas na edição)
    this.loadAllLocais();
  }
  
  async onSubmit() {
    try {
      //Salva inspecao
      const result = await this.inspecaoService.save(this.inspecao);
    
      try {
      if(result.insertId != undefined)
        this.inspecao.id = result.insertId;
      } catch(error) {}
      
    const toast = await this.toastCtrl.create({
      header: 'Sucesso',
      message: 'Inspeção salva com sucesso.',
      color: 'success',
      position: 'bottom',
      duration: 3000
    });

    toast.present();

    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar a Inspeção.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }

  }

  async loadInspecao(id: number) {
    await this.inspecaoService.getById(id).then(e => {
      this.inspecao = e;
      console.log('ITEM LOADED');
      console.table(this.inspecao);
    })
  }

  loadAllLocais(idInspecao?: number) {
    this.geraListaDeLocais();
  }

  limparFormulario() {
    this.inspecao = new Inspecao();
    this.geraListaDeLocais();
  }
  
  async geraListaDeLocais() {
    this.locais = await this.localService.getAll();
  }
  
}
