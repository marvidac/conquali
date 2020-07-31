import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Local } from '../../local/shared/local';
import { LocalService } from '../../local/shared/local.service';

@Component({
  selector: 'app-local-form',
  templateUrl: './inspecao-local-form.page.html',
  styleUrls: ['./inspecao-local-form.page.scss'],
})
export class InspecaoLocalFormPage implements OnInit {
  idParam:number;
  title: string = 'Nova Inspeção';

  data: string;
  locais: Local[] = [];
  localSelecionado: Local;

  constructor(
    private localService: LocalService,
    private route: ActivatedRoute
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
  
}
