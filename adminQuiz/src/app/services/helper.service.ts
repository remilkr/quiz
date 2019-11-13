import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  loaderToShow:any;
  isLoading = false;
  constructor(public toastController: ToastController,private  loadingController : LoadingController, private alertController:AlertController) { 


    
  }

  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'top',

    });
    toast.present();
  }
  sort(datas){
    return datas.sort((a, b) => {
      if (a.catName < b.catName) return -1;
      else if (a.catName > b.catName) return 1;
      else return 0;
  })
}
  presentLoadingWithOptions() {
    this.isLoading=true
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait',
      translucent: true,
    cssClass: 'custom-class custom-loading custom-css',
    spinner:"circles"
    }).then((res) => {
      res.present();
    });
  
  }

  hideLoader() {
     if(this.isLoading)
      this.loadingController.dismiss();
      this.isLoading=false
  }
  presentAlertConfirm(title,msg) {
    return new Promise((resolve,reject)=>{
    const alert =  this.alertController.create({
      header: title,
      message: msg,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            reject(false)
          }
        }, {
          text: 'Okay',
          handler: () => {
            resolve(true)
          
          }
        }
      ]
    }).then((res) => {
      res.present();
    });

  })
   // await alert.present();
  }

}
