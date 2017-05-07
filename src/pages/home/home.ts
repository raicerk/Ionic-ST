import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseService } from "../../providers/DatabaseService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  nombre = "";
  usuario = "";
  ubicacion = "";
  bebe = 'valentina';

  public DataArray: Array<Object>;

  //Podaci potrebni API-ju da bi vratio podatke
  parameters = { user_id: localStorage.getItem('user_id'), access_token: localStorage.getItem('access_token') };

  constructor(public navCtrl: NavController, public _database: DatabaseService) {
  }

  storeMyOfflineData() {
    var res = [{ name: this.nombre, user_name: this.usuario, location: this.ubicacion }];

    this.DataArray = res;

    console.log(res);

    if (res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        this._database.saveTablicaToSqlite(this.DataArray[i]);
        console.log("Exito");
      }
    }
  }

  pareja = "Carolina";

  getMyOfflineData() {
    this._database.getTablicaMyOfflineData().then((result) => {
      this.DataArray = <Array<Object>>result;
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

}
