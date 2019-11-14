import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userDetails: any = { userEmail: "", password: "", isLoggedIn: "" }
  storedUser: any = { userEmail: "", password: "", isLoggedIn: "" }
  constructor(private navCtrl: NavController,
    private helper: HelperService, private crudService: CrudService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {

    this.helper.getStored("isLogged").then(data => {
      this.storedUser = data
      if (this.storedUser.isLoggedIn == "true") {
        this.userDetails = this.storedUser
        this.doLogin()
      }
    }, err => {

    })
  }
  doLogin() {
    this.helper.presentLoadingWithOptions()

    this.crudService.loginUser(this.userDetails).then(res => {
      this.userDetails.isLoggedIn = "true"
      this.helper.storeData("isLogged", this.userDetails)
      this.helper.hideLoader()
      this.navCtrl.navigateRoot('/home');
    }, err => {
      setTimeout(() => {
        this.helper.hideLoader()
      }, 1500);

      this.helper.presentToast(err)

    })

  }
}
