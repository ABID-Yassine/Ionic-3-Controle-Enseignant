
import { Component } from '@angular/core';
import {MenuController,NavController, AlertController, LoadingController, Loading, IonicPage, ToastController} from 'ionic-angular';
import { RegistersService } from '../../services/register.service';

import { AnimationService, AnimationBuilder } from 'css-animator';

import { DashboardPage } from '../dashboard/dashboard';
import { EnseignementPage } from '../enseignement/enseignement';
import { Storage } from '@ionic/storage';
import {errorHandler} from "@angular/platform-browser/src/browser";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  auth= { email: '', password: '' };

  email:any;
  password:any;
  private animator: AnimationBuilder;

  constructor(public  animationService: AnimationService,public storage: Storage,public toastCtrl: ToastController,private registersservice:RegistersService,public menuCtrl: MenuController,private nav: NavController,   private loadingCtrl: LoadingController) {
    this.animator = animationService.builder();
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad()
  {
    this.storage.get('connect').then((val) => {
      //console.log('user connect', val);
      if(val!=null)
      this.storage.clear();
    });
  }




  public login() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      duration: 1000
    });

    let valpassowrd=this.password;

    if(this.email =="" && this.password=="")
      this.showtoast('Error email and password !!');

    this.registersservice.Auth(this.email).then(data=>{

      if(data["password"]==valpassowrd)
      {

        this.storage.set('connect', data["username"]);
        this.storage.set('admin', data["admin"]);

          if(data["admin"]==1)
          this.nav.setRoot(DashboardPage);
         else
          this.nav.setRoot(EnseignementPage);

      }
      else {
        this.showtoast('Error Authentification !!');
      }
      this.loading.present();
    }).catch(() => {
      this.showtoast('Error Authentification !!');
    });



  }
  dashPage()
  {
    this.nav.setRoot(DashboardPage);
  }

  showtoast(val)
  {
    const toast = this.toastCtrl.create({
      message: val,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: "classtoastCtrl",
    });
    toast.present();
  }



}
