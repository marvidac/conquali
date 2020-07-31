import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  db: SQLiteObject;
  dataBaseName:string = 'conquali.db';

  constructor(private sqlite: SQLite, private sqliPorter: SQLitePorter) { }

  async openDataBase() {
    try {
      this.db = await this.sqlite.create({name: this.dataBaseName, location: 'default'});
      await this.createDatabase();
    } catch(error) {
      console.error('Ocorreu um erro ao tentar criar o banco de dados.');
    }
  }

  async createDatabase() {
    const sqlCreateDatabase = this.getCreateTable();
    const result = await this.sqliPorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  getCreateTable() {
    const sqls = [];
    /*sqls.push('CREATE TABLE IF NOT EXISTS funcionario (id integer primary key AUTOINCREMENT, nome VARCHAR(100), contato VARCHAR (100));');
    sqls.push('CREATE TABLE IF NOT EXISTS item (id integer primary key AUTOINCREMENT, nome VARCHAR(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS servico (id integer primary key AUTOINCREMENT, nome VARCHAR(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS item_servico (id integer primary key AUTOINCREMENT, item integer, servico integer, FOREIGN KEY(item) REFERENCES item(id), FOREIGN KEY(servico) REFERENCES servico(id));');

    sqls.push('CREATE TABLE equipe(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, status BOOL, created TEXT NOT NULL);');
    sqls.push('CREATE TABLE equipe_funcionario(id INTEGER PRIMARY KEY AUTOINCREMENT, equipe INTEGER NOT NULL, funcionario INTEGER NOT NULL, created TEXT NOT NULL, FOREIGN KEY(equipe) REFERENCES equipe(id), FOREIGN KEY(funcionario) REFERENCES funcionario(id));');
    sqls.push('CREATE TABLE local(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, status BOOL, created TEXT NOT NULL);');
    sqls.push('DROP TABLE inspecao;');
    sqls.push('CREATE TABLE inspecao(id INTEGER PRIMARY KEY AUTOINCREMENT, local INTEGER NOT NULL, equipe INTEGER NOT NULL, data TEXT NOT NULL, created TEXT NOT NULL);');
    sqls.push('CREATE TABLE inspecao_item_servico(id INTEGER PRIMARY KEY AUTOINCREMENT, inspecao INTEGER NOT NULL, item_servico INTEGER NOT NULL, conforme BOOL NOT NULL, obs TEXT, created TEXT NOT NULL, FOREIGN KEY(inspecao) REFERENCES inspecao(id), FOREIGN KEY(item_servico) REFERENCES item_servico(id));');*/
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
