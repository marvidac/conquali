import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { EquipeFuncionario } from './equipe-funcionario';

@Injectable({
  providedIn: 'root'
})
export class EquipeFuncionarioService {

  constructor(private db: DatabaseService) {
    console.log('equipeFuncionarioService');
   }

  save(equipeFuncionario: EquipeFuncionario) {
    if(equipeFuncionario.id > 0) {
      return this.update(equipeFuncionario);
    } else {
      return this.insert(equipeFuncionario);
    }
  }  

  private insert(equipeFuncionario: EquipeFuncionario) { 
    const sql = 'INSERT INTO equipe_funcionario (equipe, funcionario, created) values (?,?,?)';
    const data = [equipeFuncionario.equipe, equipeFuncionario.funcionario, new Date().toString()];

    return this.db.executeSQL(sql, data);
  }

  private update(equipeFuncionario: EquipeFuncionario) {
    const sql = 'UPDATE equipe_funcionario SET equipe = ?, funcionario = ? WHERE id = ?';
    const data = [equipeFuncionario.equipe, equipeFuncionario.funcionario, equipeFuncionario.id];

    return this.db.executeSQL(sql, data);
  }

  deleteAllByEquipeId(equipeId: number) {
    const sql = 'DELETE FROM equipe_funcionario where equipe = ?';
    const data = [equipeId];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM equipe_funcionario where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const equipeFuncionario = new EquipeFuncionario();
    if(rows && rows.length > 0) {
      const equipe = rows.equipe(0);
      equipeFuncionario.id = equipe.id;
      equipeFuncionario.equipe = equipe.equipe;
      equipeFuncionario.funcionario = equipe.funcionario;
    }

    return equipeFuncionario;
  }

  async getAllByEquipe(equipeId: number) {
    const sql = 'SELECT * FROM equipe_funcionario where equipe = ?';
    const data = [equipeId];
    const result = await this.db.executeSQL(sql, data);
    const equipeFuncionarios = this.fillEquipeFuncionarios(result.rows);

    return equipeFuncionarios;
  }

  async filterByEquipeNome(text: string) {
    const sql = 'SELECT * FROM equipe_funcionario its INNER JOIN equipe it on it.id = its.equipe WHERE it.nome like ?';
    const data = [`%${text}%`];
    const result = await this.db.executeSQL(sql, data);
    const equipeFuncionarios = this.fillEquipeFuncionarios(result.rows);
    return equipeFuncionarios;
  }

  private fillEquipeFuncionarios(rows: any) {
    const equipeFuncionarios: EquipeFuncionario[] = [];

    for(let i = 0; i < rows.length; i++) {
      const equipe = rows.item(i);
      const equipeFuncionario = new EquipeFuncionario();
      equipeFuncionario.id = equipe.id;
      equipeFuncionario.equipe = equipe.equipe;
      equipeFuncionario.funcionario = equipe.funcionario;

      equipeFuncionarios.push(equipeFuncionario);
    }

    return equipeFuncionarios;
  }
}
