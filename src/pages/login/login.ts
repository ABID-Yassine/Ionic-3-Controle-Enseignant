import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, IonicPage, ToastController} from 'ionic-angular';
import { RegistersService } from '../../services/register.service';

import { AnimationService, AnimationBuilder } from 'css-animator';

import { MatierePage } from '../matiere/matiere';

import { MenuController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  auth= { email: '', password: '' };

  email:any;
  password:any;

  constructor(public toastCtrl: ToastController,private registersservice:RegistersService,public menuCtrl: MenuController,private nav: NavController,   private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false, 'authenticated');
    this.menuCtrl.close();
  }

  public MatierePage() {
    this.nav.setRoot(MatierePage);
  }

  public login() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      duration: 1000
    });

    let valpassowrd=this.password;
    this.registersservice.Auth(this.email).then(data=>{

      if(data["password"]==valpassowrd)
        this.MatierePage();
      else {
        this.showtoast('Error Authentification !!');
      }
      this.loading.present();
    });
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
