import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Servico } from './servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private db: DatabaseService) { }

  save(servico: Servico) {
    if(servico.id > 0) {
      return this.update(servico);
    } else {
      return this.insert(servico);
    }
  }  

  private insert(servico: Servico) { 
    console.log('insert servico.service.ts')
    const sql = 'INSERT INTO servico (nome) values (?)';
    const data = [servico.nome];

    return this.db.executeSQL(sql, data);
  }

  private update(servico: Servico) {
    const sql = 'UPDATE servico SET nome = ? WHERE id = ?';
    const data = [servico.nome, servico.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM servico where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM servico where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const servico = new Servico();
    if(rows && rows.length > 0) {
      servico.id = rows.item(0).id;
      servico.nome = rows.item(0).nome;
    }

    return servico;
  }

  async getAll() {
    const sql = 'SELECT * FROM servico';
    const result = await this.db.executeSQL(sql);
    const servicos = this.fillServicos(result.rows);

    return servicos;
  }
  
  async filterByNome(text: string) {
    const sql = 'SELECT * FROM servico WHERE nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const servicos = this.fillServicos(result.rows);
    return servicos;
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