import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Funcionario } from './funcionario';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private db: DatabaseService) { }

  save(funcionario: Funcionario) {
    if(funcionario.id > 0) {
      return this.update(funcionario);
    } else {
      return this.insert(funcionario);
    }
  }  

  private insert(funcionario: Funcionario) { 
    const sql = 'INSERT INTO funcionario (nome, contato) values (?,?)';
    const data = [funcionario.nome, funcionario.contato];

    return this.db.executeSQL(sql, data);
  }

  private update(funcionario: Funcionario) {
    const sql = 'UPDATE funcionario SET nome = ?, contato = ? WHERE id = ?';
    const data = [funcionario.nome, funcionario.contato, funcionario.id];

    return this.db.executeSQL(sql, data);
  }

  delete(id: number) {
    const sql = 'DELETE FROM funcionario where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM funcionario where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const funcionario = new Funcionario();
    if(rows && rows.length > 0) {
      const item = rows.item(0);
      funcionario.id = item.id;
      funcionario.nome = item.nome;
      funcionario.contato = item.contato;
    }

    return funcionario;
  }

  async getAll() {
    const sql = 'SELECT * FROM funcionario';
    const result = await this.db.executeSQL(sql);
    const funcionarios = this.fillFuncionarios(result.rows);

    return funcionarios;
  }

  async filterByNome(text: string) {
    const sql = 'SELECT * FROM funcionario WHERE nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const funcionarios = this.fillFuncionarios(result.rows);
    return funcionarios;
  }



  private fillFuncionarios(rows: any) {
    const funcionarios: Funcionario[] = [];

    for(let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const funcionario = new Funcionario();
      funcionario.id = item.id;
      funcionario.nome = item.nome;
      funcionario.contato = item.contato;

      funcionarios.push(funcionario);
    }

    return funcionarios;
  }


}
