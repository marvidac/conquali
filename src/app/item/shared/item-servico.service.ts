import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { ItemServico } from './item-servico';
import { Servico } from '../../servico/shared/servico';

@Injectable({
  providedIn: 'root'
})
export class ItemServicoService {

  constructor(private db: DatabaseService) { 
    console.log('item-servico.service.ts');
  }

  save(itemServico: ItemServico) {
    if(itemServico.id > 0) {
      return this.update(itemServico);
    } else {
      return this.insert(itemServico);
    }
  }  

  private insert(itemServico: ItemServico) { 
    const sql = 'INSERT INTO item_servico (item, servico) values (?,?)';
    const data = [itemServico.item, itemServico.servico];

    return this.db.executeSQL(sql, data);
  }

  private update(itemServico: ItemServico) {
    const sql = 'UPDATE item_servico SET item = ?, servico = ? WHERE id = ?';
    const data = [itemServico.item, itemServico.servico, itemServico.id];

    return this.db.executeSQL(sql, data);
  }

  deleteAllByItemId(itemId: number) {
    const sql = 'DELETE FROM item_servico where item = ?';
    const data = [itemId];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM item_servico where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const itemServico = new ItemServico();
    if(rows && rows.length > 0) {
      const item = rows.item(0);
      itemServico.id = item.id;
      itemServico.item = item.item;
      itemServico.servico = item.servico;
    }

    return itemServico;
  }

  async getAllByItem(itemId: number) {
    const sql = `SELECT 
                    its.id, 
                    it.id as item, 
                    it.nome as itemNome, 
                    ser.id as servico, 
                    ser.nome as servicoNome 
                FROM item_servico its 
                INNER JOIN servico ser on ser.id = its.servico 
                INNER JOIN item it on it.id = its.item 
                WHERE its.item = ?`;
    const data = [itemId];
    const result = await this.db.executeSQL(sql, data);
    const itemServicos = this.fillItensServicos(result.rows);

    return itemServicos;
  }

  async filterByItemNome(text: string) {
    const sql = `SELECT 
                  its.id, 
                  it.id as item, 
                  it.nome as itemNome, 
                  ser.id as servico, 
                  ser.nome as servicoNome 
              FROM item_servico its 
              INNER JOIN servico ser on ser.id = its.servico 
              INNER JOIN item it on it.id = its.item 
              WHERE it.nome like ?`;
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const itemServicos = this.fillItensServicos(result.rows);
    return itemServicos;
  }

  async getAllServicosByIdItem(idItem: number) {
    const sql = `SELECT 
                    its.id, 
                    it.id as item, 
                    it.nome as itemNome, 
                    ser.id as servico, 
                    ser.nome as servicoNome 
                FROM item_servico its 
                INNER JOIN servico ser on ser.id = its.servico 
                INNER JOIN item it on it.id = its.item 
                WHERE its.item = ?`;
    const data = [idItem];
    const result = await this.db.executeSQL(sql, data);
    const itensServicos = this.fillItensServicos(result.rows);
    return itensServicos;
  }

  private fillItensServicos(rows: any) {
    const itemServicos: ItemServico[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const itemServico = new ItemServico();

      itemServico.id = item.id;
      itemServico.item = item.item;
      itemServico.itemNome = item.itemNome;
      itemServico.servico = item.servico;
      itemServico.servicoNome = item.servicoNome;

      itemServicos.push(itemServico);
    }

    return itemServicos;
  }

  private fillServicos(rows: any) {
    const servicos: Servico[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const servico = new Servico();
      servico.id = item.id;
      servico.nome = item.nome;

      servicos.push(servico);
    }

    return servicos;
  }
}
