import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { InspecaoItemServico } from './inspecao-item-servico';

@Injectable({
  providedIn: 'root'
})
export class InspecaoItemServicoService {

  constructor(private db: DatabaseService) {
    console.log('inspecaoItemServicoService');
   }

  save(inspecaoItemServico: InspecaoItemServico) {
    if(inspecaoItemServico.id > 0) {
      return this.update(inspecaoItemServico);
    } else {
      return this.insert(inspecaoItemServico);
    }
  }  

  private insert(inspecaoItemServico: InspecaoItemServico) { 
    const sql = 'INSERT INTO inspecao_item_servico (inspecao, item_servico, conforme, obs, created) values (?,?,?)';
    const data = [inspecaoItemServico.inspecao, inspecaoItemServico.itemServico, inspecaoItemServico.conforme, inspecaoItemServico.obs, new Date().toString()];

    return this.db.executeSQL(sql, data);
  }

  private update(inspecaoItemServico: InspecaoItemServico) {
    const sql = 'UPDATE inspecao_item_servico SET inspecao = ?, itemServico = ?, conforme = ?, obs = ? WHERE id = ?';
    const data = [inspecaoItemServico.inspecao, inspecaoItemServico.itemServico, inspecaoItemServico.conforme, inspecaoItemServico.obs, inspecaoItemServico.id];

    return this.db.executeSQL(sql, data);
  }

  deleteAllByInspecaoId(inspecaoId: number) {
    const sql = 'DELETE FROM inspecao_item_servico where inspecao = ?';
    const data = [inspecaoId];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM inspecao_item_servico where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const inspecaoItemServico = new InspecaoItemServico();
    if(rows && rows.length > 0) {
      const inspecao = rows.inspecao(0);
      inspecaoItemServico.id = inspecao.id;
      inspecaoItemServico.inspecao = inspecao.inspecao;
      inspecaoItemServico.itemServico = inspecao.itemServico;
      inspecaoItemServico.conforme = inspecao.conforme;
      inspecaoItemServico.obs = inspecao.obs;
      inspecaoItemServico.created = inspecao.created;
    }

    return inspecaoItemServico;
  }

  async getAllByInspecao(inspecaoId: number) {
    const sql = 'SELECT * FROM inspecao_item_servico where inspecao = ?';
    const data = [inspecaoId];
    const result = await this.db.executeSQL(sql, data);
    const inspecaoItemServicos = this.fillInspecaoItemServicos(result.rows);

    return inspecaoItemServicos;
  }

  private fillInspecaoItemServicos(rows: any) {
    const inspecaoItemServicos: InspecaoItemServico[] = [];

    for(let i = 0; i < rows.length; i++) {
      const inspecao = rows.item(i);
      const inspecaoItemServico = new InspecaoItemServico();
      inspecaoItemServico.id = inspecao.id;
      inspecaoItemServico.inspecao = inspecao.inspecao;
      inspecaoItemServico.itemServico = inspecao.itemServico;
      inspecaoItemServico.conforme = inspecao.conforme;
      inspecaoItemServico.obs = inspecao.obs;
      inspecaoItemServico.created = inspecao.created;

      inspecaoItemServicos.push(inspecaoItemServico);
    }

    return inspecaoItemServicos;
  }
}
