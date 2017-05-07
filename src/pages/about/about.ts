import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  CameraPosition,
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
      // create a new map by passing HTMLElement
      let element: HTMLElement = document.getElementById('map');

      let map = new GoogleMap(element);

      // listen to MAP_READY event
      map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

      // create LatLng object
      //let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);
      let ionic: LatLng = new LatLng(43.0741904, -89.3809802);

      // create CameraPosition
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: MarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };

      map.addMarker(markerOptions)
        .then((marker: MarkerOptions) => {
          //marker.showInfoWindow();
        });
    }

}
