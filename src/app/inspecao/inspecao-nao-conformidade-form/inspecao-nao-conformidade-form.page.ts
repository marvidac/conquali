import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servico } from '../../servico/shared/servico';
import { ServicoService } from 'src/app/servico/shared/servico.service';
import { InspecaoService } from '../shared/inspecao.service';
import { InspecaoItemServicoService } from '../shared/inspecao-item-servico.service';
import { Inspecao } from '../shared/inspecao';
import { InspecaoItemServico } from '../shared/inspecao-item-servico';
import { ItemServico } from 'src/app/item/shared/item-servico';
import { ItemServicoService } from 'src/app/item/shared/item-servico.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inspecao-nao-conformidade-form',
  templateUrl: './inspecao-nao-conformidade-form.page.html',
  styleUrls: ['./inspecao-nao-conformidade-form.page.scss'],
})
export class InspecaoNaoConformidadeFormPage implements OnInit {
  
  title: string = 'Nova Inspeção';
  
  data: string = '';
  idLocal: number;
  idEquipe: number;
  idItem: number;
  itemServicoConformes: ItemServico[] = [];
  itemServicoNaoConformes: any[] = [];

  constructor(
    private itemServicoService: ItemServicoService,
    private inspecaoService: InspecaoService,
    private inspecaoItemServicoService: InspecaoItemServicoService,
    private route: ActivatedRoute, 
    private toastCtrl: ToastController
    ) {
    console.log('inspecao-nao-conformidade-form.page.ts');
  }

  ngOnInit() {
    // se possivel, capture o parametro 
    let questoesParam = this.route
      .queryParamMap.forEach(par => {
        this.data = par.get('data');
        this.idLocal = parseInt(par.get('idLocal'));
        this.idEquipe = parseInt(par.get('idEquipe'));
        this.idItem = parseInt(par.get('idItem'));
        
        par.getAll('itemServicosConformes').map(s => {
          this.populaConformes(parseInt(s));
        });
        
        par.getAll('itemServicosNaoConformes').map(s => {
          this.populaNaoConformes(parseInt(s));
        });
      });
  }

  async populaConformes(id: number) {
    this.itemServicoConformes.push(await this.getItemServicoById(id));
  }

  async populaNaoConformes(id: number) {
    let itemServico = await this.getItemServicoById(id);
    this.itemServicoNaoConformes.push({
      id: itemServico.id,
      item: itemServico.item,
      itemNome: itemServico.itemNome,
      servico: itemServico.servico,
      servicoNome: itemServico.servicoNome,
      obs: ''
    });
  }

  async getItemServicoById(id: number) {
    let itemServico: ItemServico = await this.itemServicoService.getById(id);
    return itemServico;
  }

  async salvarInspecao() {
    let inspecao: Inspecao = new Inspecao();
    let sucesso = false;
    inspecao.local = this.idLocal;
    inspecao.equipe = this.idEquipe;
    inspecao.data = this.data;

    const result = await this.inspecaoService.save(inspecao);
      if(result.insertId) {
        sucesso = true;
        inspecao.id = result.insertId;
        
        this.itemServicoConformes.map(is => {
          sucesso = true;
          let inspecaoItemServico: InspecaoItemServico = new InspecaoItemServico();
          inspecaoItemServico.inspecao = inspecao.id;
          inspecaoItemServico.itemServico = is.id;
          
          inspecaoItemServico.conforme=true;
          inspecaoItemServico.obs = '';
          
          try {
            this.inspecaoItemServicoService.save(inspecaoItemServico);
            sucesso = true;
          } catch(error) {
            sucesso = false;
          }
        });
        
        this.itemServicoNaoConformes.map(is => {
          let inspecaoItemServico: InspecaoItemServico = new InspecaoItemServico();
          inspecaoItemServico.inspecao = inspecao.id;
          inspecaoItemServico.itemServico = is.id;
          
          inspecaoItemServico.conforme = false;
          inspecaoItemServico.obs = is.obs;
          try {
            this.inspecaoItemServicoService.save(inspecaoItemServico);
            sucesso = true;
          } catch(error) {
            sucesso = false;
          }
        });
        
      }

      if(sucesso) {
        const toast = await this.toastCtrl.create({
          header: 'Sucesso',
          message: 'Inspeção salva com sucesso.',
          color: 'success',
          position: 'bottom',
          duration: 3000
        });
        
        toast.present();
      } else {
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

}