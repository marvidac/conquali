import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Inspecao } from './inspecao';

@Injectable({
  providedIn: 'root'
})
export class InspecaoService {

  constructor(private db: DatabaseService) { 
    console.log('inspecao.service.ts');
  }

  save(inspecao: Inspecao) {
    if(inspecao.id > 0) {
      return this.update(inspecao);
    } else {
      return this.insert(inspecao);
    }
  }  

  private insert(inspecao: Inspecao) { 
    const sql = 'INSERT INTO inspecao (local, equipe, data, created) values (?,?,?,?)';
    const data = [inspecao.local, inspecao.equipe, inspecao.data, new Date().toString()];

    return this.db.executeSQL(sql, data);
  }

  private update(inspecao: Inspecao) {
    const sql = 'UPDATE inspecao SET local = ? and equipe = ? and data = ? WHERE id = ?';
    const data = [inspecao.local, inspecao.equipe, inspecao.data, inspecao.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM inspecao where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM inspecao where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const inspecao = new Inspecao();
    if(rows && rows.length > 0) {
      inspecao.id = rows.item(0).id;
      inspecao.local = rows.item(0).local;
      inspecao.equipe = rows.item(0).equipe;
      inspecao.data = rows.item(0).data;
      inspecao.created = rows.item(0).created;
    }

    return inspecao;
  }

  async getAll() {
    const sql = 'SELECT * FROM inspecao';
    const result = await this.db.executeSQL(sql);
    const inspecoes = this.fillInspecoes(result.rows);

    return inspecoes;
  }
  async filterByEquipeNome(text: string) {
    const sql = 'SELECT * FROM inspecao i INNER JOIN equipe e on e.id = i.equipe WHERE e.nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const inspecoes = this.fillInspecoes(result.rows);
    return inspecoes;
  }

  async filterByLocalNome(text: string) {
    const sql = 'SELECT * FROM inspecao i INNER JOIN local l on l.id = i.local WHERE l.nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const inspecoes = this.fillInspecoes(result.rows);
    return inspecoes;
  }

  private fillInspecoes(rows: any) {
    const inspecoes: Inspecao[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const inspecao = new Inspecao();
      inspecao.id = item.id;
      inspecao.local = item.local;
      inspecao.equipe = item.equipe;
      inspecao.data = item.data;
      inspecao.created = item.created;

      inspecoes.push(inspecao);
    }

    return inspecoes;
  }
}