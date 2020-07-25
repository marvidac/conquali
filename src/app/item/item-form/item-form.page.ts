import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { Servico } from '../../servico/shared/servico';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ItemService } from '../shared/item.service';
import { ItemServicoService } from '../shared/item-servico.service';
import { ServicoService } from '../../servico/shared/servico.service';
import { ItemServico } from '../shared/item-servico';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.page.html',
  styleUrls: ['./item-form.page.scss'],
})
export class ItemFormPage implements OnInit {
  idParam:number;
  title: string = 'Novo Item';
  item: Item;

  servicos: any[] = [];
  servicosSelecionados: any[] = [];

  constructor(
    private itemService: ItemService,
    private servicoService: ServicoService,
    private itemServicoService: ItemServicoService,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) { 
    this.item = new Item();
  }

  ngOnInit() {
    console.log('ngOnInit item-form.page.ts');
    this.item = new Item();
    //Pegando id do Item passado como parâmetro a partir da tela de listagem
    this.idParam = parseInt(this.route.snapshot.paramMap.get('id'));

    
    if(this.idParam) {
      this.title = 'Editar Item';
      this.loadItem(this.idParam);
      this.loadServicosPorItem(this.idParam);
    }

    //Deve ser o último a ser chamado, pois é necessário construir lista de serviços do Item (apenas na edição)
    this.loadAllServicos();
  }
  
  async onSubmit() {
    try {
      //Salva item
      const result = await this.itemService.save(this.item);


      try {
        if(result.insertId != undefined)
          this.item.id = result.insertId;
        } catch(error) {}
        
      //Deleta todos os equipe_funcionario por Id de Equipe antes de salvá-los novamente
      this.itemServicoService.deleteAllByItemId(this.item.id);

       //Salvar Serviços Selecionados ao item
       this.servicos.filter(e => {
         if(e.checked) {
            let is = new ItemServico();
            is.item = this.item.id;
            is.servico = e.id;

            this.itemServicoService.save(is).catch(error => {
                console.error(error);
            });
         }
       })

      const toast = await this.toastCtrl.create({
        header: 'Sucesso',
        message: 'Item salvo com sucesso.',
        color: 'success',
        position: 'bottom',
        duration: 3000
      });
      
      toast.present();
      
    } catch(error) {
      const toast = await this.toastCtrl.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao tentar salvar o Item.',
        color: 'danger',
        position: 'bottom',
        duration: 3000
      });

      toast.present();
    }
  }

  async loadItem(id: number) {
    await this.itemService.getById(id).then(e => {
      this.item = e;
      console.log('ITEM LOADED');
      console.table(this.item);
    })
  }

  loadAllServicos(idItem?: number) {
    this.geraListaServicos();
  }

  async geraListaServicos() {
    this.servicos = [];
    
    let lista = await this.servicoService.getAll();

    lista.forEach(element => {
      const checked = this.servicosSelecionados.find( 
        e => { 
          return (e.id === element.id ? true : false);
        }
      );

      this.servicos.push(
        {
          id: element.id,
          nome: element.nome,
          checked: (checked != undefined ? true : false)
        }
      );
    });
  }

  onSelectChange(servico: Servico) {
    this.servicos.find(e => {
      if(e.id === servico.id) {
        e.checked = !e.checked;
      }
    })
  }

  limparFormulario() {
    this.item = new Item();
    this.servicosSelecionados = [];
    this.geraListaServicos();
  }

  async loadServicosPorItem(idItem: number) {
    await this.itemServicoService.getAllByItem(idItem).then(lista => {
      lista.forEach(element => {
        this.servicosSelecionados.push(
          {
            id: element.servico
          }
        )
      });
    })
  }

}
