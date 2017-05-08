import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'Consultas',
  templateUrl: 'consultas.html'
})
export class Consultas {

  private imageSrc: string;
  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  private openGallery(): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    }

    this.camera.getPicture(cameraOptions)
      .then(imageData => this.imageSrc = "data:image/jpeg;base64," + imageData,
      err => console.log(err));
  }

}
