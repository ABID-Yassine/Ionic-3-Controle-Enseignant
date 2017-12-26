import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
// import { AuthService } from '../../providers/auth-service';

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

  constructor(public menuCtrl: MenuController,private nav: NavController,   private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false, 'authenticated');
    this.menuCtrl.close();
  }

  public createAccount() {
    this.nav.setRoot(MatierePage);
  }

  public login() {
    this.showLoading()
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      duration: 1000
    });
    this.loading.present();
  }


}
