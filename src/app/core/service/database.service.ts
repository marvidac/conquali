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
    sqls.push('CREATE TABLE IF NOT EXISTS funcionario (id integer primary key AUTOINCREMENT, nome VARCHAR(100), contato VARCHAR (100));');
    sqls.push('CREATE TABLE IF NOT EXISTS item (id integer primary key AUTOINCREMENT, nome VARCHAR(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS servicos (id integer primary key AUTOINCREMENT, nome VARCHAR(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS item_servicos (id integer primary key AUTOINCREMENT, item integer, servico integer, FOREIGN KEY(item) REFERENCES item(id), FOREIGN KEY(servico) REFERENCES servico(id));');
    return sqls.join('\n');
  }

  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }
}
