import { Component, OnInit } from '@angular/core';
import { Equipe } from '../shared/equipe';
import { Funcionario } from '../../funcionario/shared/funcionario';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EquipeService } from '../shared/equipe.service';
import { EquipeFuncionarioService } from '../shared/equipe-funcionario.service';
import { FuncionarioService } from '../../funcionario/shared/funcionario.service';
import { EquipeFuncionario } from '../shared/equipe-funcionario';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './equipe-form.page.html',
  styleUrls: ['./equipe-form.page.scss'],
})
export class EquipeFormPage implements OnInit {
  idParam:number;
  title: string = 'Nova Equipe';
  equipe: Equipe;

  funcionarios: any[] = [];
  funcionariosSelecionados: any[] = [];

  constructor(
    private equipeService: EquipeService,
    private funcionarioService: FuncionarioService,
    private equipeFuncionarioService: EquipeFuncionarioService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.equipe = new Equipe();
  }

  ngOnInit() {
    console.log('ngOnInit equipe-form.page.ts');
    this.equipe = new Equipe();
    //Pegando id do Equipe passado como parâmetro a partir da tela de listagem
    this.idParam = parseInt(this.route.snapshot.paramMap.get('id'));

    
    if(this.idParam) {
      this.title = 'Editar Equipe';
      this.loadEquipe(this.idParam);
      this.loadFuncionariosPorEquipe(this.idParam);
    }

    //Deve ser o último a ser chamado, pois é necessário construir lista de serviços do Equipe (apenas na edição)
    this.loadAllFuncionarios();
  }
  
  async onSubmit() {
    try {
      //Salva equipe
      const result = await this.equipeService.save(this.equipe);

      if(result.insertId) {
        this.equipe.id = result.insertId;
       //Salvar Serviços Selecionados ao equipe
       this.funcionarios.filter(e => {
         if(e.checked) {
            let is = new EquipeFuncionario();
            is.equipe = this.equipe.id;
            is.funcionario = e.id;

            this.equipeFuncionarioService.save(is).catch(error => {
                console.error(error);
            });
         }
       })
      }



      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Equipe salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Equipe.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadEquipe(id: number) {
    await this.equipeService.getById(id).then(e => {
      this.equipe = e;
      console.log('ITEM LOADED');
      console.table(this.equipe);
    })
  }

  loadAllFuncionarios(idEquipe?: number) {
    this.geraListaFuncionarios();
  }

  async geraListaFuncionarios() {
    this.funcionarios = [];
    
    let lista = await this.funcionarioService.getAll();

    lista.forEach(element => {
      const checked = this.funcionariosSelecionados.find( 
        e => { 
          return (e.id === element.id ? true : false);
        }
      );

      this.funcionarios.push(
        {
          id: element.id,
          nome: element.nome,
          checked: (checked != undefined ? true : false)
        }
      );
    });
  }

  onSelectChange(funcionario: Funcionario) {
    this.funcionarios.find(e => {
      if(e.id === funcionario.id) {
        e.checked = !e.checked;
      }
    })
  }

  limparFormulario() {
    this.equipe = new Equipe();
    this.funcionariosSelecionados = [];
    this.geraListaFuncionarios();
  }

  async loadFuncionariosPorEquipe(idEquipe: number) {
    await this.equipeFuncionarioService.getAllByEquipe(idEquipe).then(lista => {
      lista.forEach(element => {
        this.funcionariosSelecionados.push(
          {
            id: element.funcionario
          }
        )
      });
    })
  }

}
