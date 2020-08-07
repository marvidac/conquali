import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../../equipe/shared/equipe';
import { Local } from '../../local/shared/local';
import { EquipeService } from '../../equipe/shared/equipe.service';
import { LocalService } from '../../local/shared/local.service';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './inspecao-equipe-form.page.html',
  styleUrls: ['./inspecao-equipe-form.page.scss'],
})
export class InspecaoEquipeFormPage implements OnInit {

  idLocal:number;
  local:Local;

  title: string = 'Nova Inspeção';

  data: string = '';
  
  equipes: Equipe[] = [];
  equipeSelecionado: Equipe;

  constructor(
    private equipeService: EquipeService,
    private localService: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit inspecao-equipe-form.page.ts');
    
    this.data = this.route.snapshot.paramMap.get('data');
    this.idLocal = parseInt(this.route.snapshot.paramMap.get('idLocal'));
    if(this.idLocal) {
      this.loadLocal(this.idLocal);
    }

    this.loadAllEquipes();
  }

  loadAllEquipes(idEquipe?: number) {
    this.geraListaDeEquipes();
  }

  limparFormulario() {
    this.geraListaDeEquipes();
  }
  
  async geraListaDeEquipes() {
    this.equipes = await this.equipeService.getAll();
  }
  
  async loadLocal(id: number) {
    await this.localService.getById(id).then(e => {
      this.local = e;
    })
  }

  irParaItens(equipe: Equipe) {
    let params = {
      data: this.data
    }
    this.router.navigate(['/inspecao/item', this.idLocal, equipe.id], {queryParams: params});
  }
}
