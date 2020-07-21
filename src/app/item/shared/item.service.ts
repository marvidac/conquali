import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db: DatabaseService) { }

  save(item: Item) {
    if(item.id > 0) {
      return this.update(item);
    } else {
      return this.insert(item);
    }
  }  

  private insert(item: Item) { 
    const sql = 'INSERT INTO item (nome) values (?)';
    const data = [item.nome];

    return this.db.executeSQL(sql, data);
  }

  private update(item: Item) {
    const sql = 'UPDATE item SET nome = ? WHERE id = ?';
    const data = [item.nome, item.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM item where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    console.log('getById item.service.ts');
    const sql = 'SELECT * FROM item where id = ? LIMIT 1';
    const data = [id];
    const item = new Item();
    try {
      const result = await this.db.executeSQL(sql, data);
      const rows = result.rows;
      if(rows && rows.length > 0) {
        item.id = rows.item(0).id;
        item.nome = rows.item(0).nome;
      }
    } catch(ex) {
      console.error(ex);
    }

    return item;
  }

  async getAll() {
    const sql = 'SELECT * FROM item';
    const result = await this.db.executeSQL(sql);
    const items = this.fillItems(result.rows);

    return items;
  }

  async filterByNome(text: string) {
    const sql = 'SELECT * FROM item WHERE nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const items = this.fillItems(result.rows);
    return items;
  }

  private fillItems(rows: any) {
    const items: Item[] = [];

    for(let i = 0; i < rows.length; i++) {
      const obj = rows.item(i);
      const item = new Item();
      item.id = obj.id;
      item.nome = obj.nome;

      items.push(item);
    }

    return items;
  }
}
