import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseService {

  db:any;
  private isOpen: boolean;

  //Konstruktor početak
  constructor( public _platform: Platform, private sqlite: SQLite) {
    
    console.log('Hello Database Provider');

    this._platform.ready().then(() => {

     if(!this.isOpen) {
            this.sqlite = new SQLite();
            this.sqlite.create({name: "baza.db", location: "default"}).then((db: SQLiteObject) => {
                 //Prva tablica
                 db.executeSql('CREATE TABLE IF NOT EXISTS mojaTablica (mojaTablicaId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, user_name TEXT, location TEXT)', {})
                 .then(() => console.log('Executed SQL - PrvaTablica'))
                 .catch(e => console.log(e));
                 //Druga tablica
                 db.executeSql('CREATE TABLE IF NOT EXISTS mojaDrugaTablica (mojaDrugaTablicaId INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)', {})
                 .then(() => console.log('Executed SQL - DrugaTablica'))
                 .catch(e => console.log(e));
             })
             .catch(e => console.log(e));
     }


     });
  }
  //Konstruktor kraj
   //////////Tablica\\\\\\\\\\
   //SPREMI
    public saveTablicaToSqlite(DataArray){
	  this.sqlite.create({
      name: 'baza.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
           db.executeSql("INSERT INTO mojaTablica (name, user_name, location) VALUES (?,?,?)", [DataArray.name, DataArray.user_name, DataArray.location]).then((data) => {
           console.log("INSERTED: " + JSON.stringify(data));
           }, (error) => {
           console.log("ERROR kod inserta: " + JSON.stringify(error.err));
        });
	  })
     .catch(e => console.log(e));
    }
    //DOHVATI
    public getTablicaMyOfflineData() {
        return new Promise((resolve, reject) => {
          this.sqlite.create({
          name: 'baza.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {
            db.executeSql("SELECT * FROM mojaTablica", []).then((data) => {
                let DataArray = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        DataArray.push({
                            name: data.rows.item(i).name,
                            user_name: data.rows.item(i).user_name,
                            location: data.rows.item(i).location
                        });
                    }
                }
                resolve(DataArray);
            }, (error) => {
                reject(error);
            });
          })
         .catch(e => console.log(e));
        });
    }
    //OBRIŠI
    public deleteTablicaMyOfflineData(){
	  this.sqlite.create({
      name: 'baza.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
           db.executeSql("DELETE FROM mojaTablica",[]).then((data) => {
           console.log("DELETED: " + JSON.stringify(data));
           }, (error) => {
           console.log("ERROR kod brisanja: " + JSON.stringify(error.err));
        });
	 })
     .catch(e => console.log(e));
    }
   //////////DrugaTablica\\\\\\\\\\
   //SPREMI
    public saveToSqlite(DataArrayTwo){
	  this.sqlite.create({
      name: 'baza.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
           db.executeSql("INSERT INTO mojaDrugaTablica (firstname, lastname) VALUES (?,?)", [DataArrayTwo.firstname, DataArrayTwo.lastname]).then((data) => {
           console.log("INSERTED: " + JSON.stringify(data));
           }, (error) => {
           console.log("ERROR kod inserta: " + JSON.stringify(error.err));
        });
	  })
     .catch(e => console.log(e));
    }
    //DOHVATI
    public getMyOfflineData() {
        return new Promise((resolve, reject) => {
          this.sqlite.create({
          name: 'baza.db',
          location: 'default'
          })
          .then((db: SQLiteObject) => {
            db.executeSql("SELECT * FROM mojaDrugaTablica", []).then((data) => {
                let LocalArrayTwo = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        LocalArrayTwo.push({
                            firstname: data.rows.item(i).firstname,
                            lastname: data.rows.item(i).lastname
                        });
                    }
                }
                resolve(LocalArrayTwo);
            }, (error) => {
                reject(error);
            });
          })
         .catch(e => console.log(e));
        });
    }
    //OBRIŠI
    public deleteMyOfflineData(){
	  this.sqlite.create({
      name: 'baza.db',
      location: 'default'
      })
      .then((db: SQLiteObject) => {
           db.executeSql("DELETE FROM mojaDrugaTablica",[]).then((data) => {
           console.log("DELETED: " + JSON.stringify(data));
           }, (error) => {
           console.log("ERROR kod brisanja: " + JSON.stringify(error.err));
        });
	 })
     .catch(e => console.log(e));
    }

  }
