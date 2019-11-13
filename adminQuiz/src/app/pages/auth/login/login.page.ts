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
  userDetails:any={userEmail:"",password:""}
  constructor(private navCtrl: NavController,private helper: HelperService, private crudService: CrudService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
  }
  doLogin(){
    this.helper.presentLoadingWithOptions()

      this.crudService.loginUser(this.userDetails)
      .then(res => {
        this.helper.hideLoader()
      //  console.log(res);
      //  this.errorMessage = "";
        this.navCtrl.navigateRoot('/home');
      }, err => {
       this.helper.presentToast(err)
       this.helper.hideLoader()
        //this.errorMessage = err.message;
      })
    
}
}
