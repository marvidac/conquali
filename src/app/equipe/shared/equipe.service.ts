import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Equipe } from './equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  constructor(private db: DatabaseService) { }

  save(equipe: Equipe) {
    if(equipe.id > 0) {
      return this.update(equipe);
    } else {
      return this.insert(equipe);
    }
  }  

  private insert(equipe: Equipe) { 
    console.log('insert equipe.service.ts')
    const sql = 'INSERT INTO equipe (nome, created) values (?,?)';
    const data = [equipe.nome, new Date().toString()];

    return this.db.executeSQL(sql, data);
  }

  private update(equipe: Equipe) {
    const sql = 'UPDATE equipe SET nome = ? WHERE id = ?';
    const data = [equipe.nome, equipe.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM equipe where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM equipe where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const equipe = new Equipe();
    if(rows && rows.length > 0) {
      equipe.id = rows.item(0).id;
      equipe.nome = rows.item(0).nome;
    }

    return equipe;
  }

  async getAll() {
    const sql = 'SELECT * FROM equipe';
    const result = await this.db.executeSQL(sql);
    const equipes = this.fillEquipes(result.rows);

    return equipes;
  }

  async filterByNome(text: string) {
    const sql = 'SELECT * FROM equipe WHERE nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const equipes = this.fillEquipes(result.rows);
    return equipes;
  }

  private fillEquipes(rows: any) {
    const equipes: Equipe[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const equipe = new Equipe();
      equipe.id = item.id;
      equipe.nome = item.nome;

      equipes.push(equipe);
    }

    return equipes;
  }
}