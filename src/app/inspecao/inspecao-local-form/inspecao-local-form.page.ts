import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from '../../local/shared/local';
import { LocalService } from '../../local/shared/local.service';
import * as moment from 'moment';

@Component({
  selector: 'app-local-form',
  templateUrl: './inspecao-local-form.page.html',
  styleUrls: ['./inspecao-local-form.page.scss'],
})
export class InspecaoLocalFormPage implements OnInit {
  idParam:number;
  title: string = 'Nova Inspeção';

  data: string = '';
  locais: Local[] = [];
  localSelecionado: Local;

  constructor(
    private localService: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-local-form.page.ts');
    
    this.idParam = parseInt(this.route.snapshot.paramMap.get('idInspecao'));
    
    if(this.idParam) {
      this.title = 'Editar Inspeção';
    }

    this.loadAllLocais();
  }

  loadAllLocais(idLocal?: number) {
    this.geraListaDeLocais();
  }

  limparFormulario() {
    this.geraListaDeLocais();
  }
  
  async geraListaDeLocais() {
    this.locais = await this.localService.getAll();
  }
  
  change(event) {
    this.data = event.target.value;
  }
  
  irParaEquipe(local: Local) {
    this.router.navigate(['inspecao/equipe', local.id, moment(this.data).format('YYYY-MM-DD')]);
  }
}
