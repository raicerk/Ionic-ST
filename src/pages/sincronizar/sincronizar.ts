import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'Sincronizar',
  templateUrl: 'sincronizar.html'
})
export class Sincronizar {

  lat = 0;
  long = 0;
  latt = 0;
  longg = 0;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  Ubicar() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latt = data.coords.latitude;
      this.longg = data.coords.longitude;
    });
  }



}
