import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { HelperService } from './services/helper.service';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router:Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private navCtrl: NavController,private helper: HelperService, private crudService: CrudService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
      this.splashScreen.hide();
      this.router.navigateByUrl('/login');
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#7044ff');
      this.statusBar.styleBlackTranslucent()
      this.setAndroidBackButtonBehavior()

    });
  }
 
  exit(){
    navigator['app'].exitApp();
  //   this.subscription = this.platform.backButton.subscribe(()=>{
  //     navigator['app'].exitApp();
  // });

}
private setAndroidBackButtonBehavior(): void {
  
    this.platform.backButton.subscribe(() => {
      if (window.location.pathname == "/login") {
        navigator['app'].exitApp();
      }
    });
  
}
  logout(){
    this.menu.close()
    this.helper.presentLoadingWithOptions()
    this.crudService.logoutUser()
    .then(res => {
      this.helper.hideLoader()
      this.navCtrl.navigateRoot('/login')
    })
    .catch(err => {
      this.helper.hideLoader()
      this.helper.presentToast(err)
     
    })
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
