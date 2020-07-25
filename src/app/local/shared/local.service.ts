import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Local } from './local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private db: DatabaseService) { 
    console.log('local.service.ts');
  }

  save(local: Local) {
    if(local.id > 0) {
      return this.update(local);
    } else {
      return this.insert(local);
    }
  }  

  private insert(local: Local) { 
    const sql = 'INSERT INTO local (nome, created) values (?,?)';
    const data = [local.nome, new Date().toString()];

    return this.db.executeSQL(sql, data);
  }

  private update(local: Local) {
    const sql = 'UPDATE local SET nome = ? WHERE id = ?';
    const data = [local.nome, local.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM local where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM local where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const local = new Local();
    if(rows && rows.length > 0) {
      const item = rows.item(0);
      local.id = item.id;
      local.nome = item.nome;
      local.created = item.created;
    }

    return local;
  }

  async getAll() {
    const sql = 'SELECT * FROM local';
    const result = await this.db.executeSQL(sql);
    const locais = this.fillLocals(result.rows);

    return locais;
  }

  async filterByNome(text: string) {
    const sql = 'SELECT * FROM local WHERE nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const locais = this.fillLocals(result.rows);
    return locais;
  }

  private fillLocals(rows: any) {
    const locais: Local[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const local = new Local();
      local.id = item.id;
      local.nome = item.nome;
      local.created = item.created;

      locais.push(local);
    }

    return locais;
  }


}
