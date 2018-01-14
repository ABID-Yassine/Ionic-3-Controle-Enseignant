import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { EnseignementService } from './../../services/enseignement.service';


import { LoadingController,AlertController,MenuController   } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import {AddEnseignementsPage} from "../add-enseignements/add-enseignements";
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-enseignement',
  templateUrl: 'enseignement.html',
})
export class EnseignementPage {

  @ViewChild('myElementitem') myitem;

  private animator: AnimationBuilder;
  enseignements;
  enseignement;
  dorefresh:any;
  searchQuery: string = '';

  public isToggled: boolean;
  stor:any;

  constructor (public storage: Storage,public menuCtrl: MenuController,private nav: NavController, public atrCtrl: AlertController,public navCtrl: NavController, public enseignementService: EnseignementService,public loadingCtrl: LoadingController, animationService: AnimationService) {
    this.animator = animationService.builder();
    this.stor=storage;
    this.stor.get('admin').then((val) => {
      if(val==1)
      this.menuCtrl.enable(true, 'myMenu');
      else
      this.menuCtrl.enable(false, 'myMenu');

    });

    this.isToggled = false;
  }

  ionViewDidEnter() {
    this.stor.get('admin').then((val) => {
      if(val==1)
      this.menuCtrl.enable(true, 'myMenu');
      else
      this.menuCtrl.enable(false, 'myMenu');

    });
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.getallEnseignements();
    loader.dismiss();

    this.enseignement=null;
  }

  doRefresh(refresher) {
    this.dorefresh=refresher;
    setTimeout(() => {
      this.enseignementService.getEnseignements().then(data=>{
        this.enseignements = data;
        this.enseignement=null;
      });
      refresher.complete();
    }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.enseignementService.getEnseignements().then(data=>{
        this.enseignements = data;
        this.enseignement=null;
      });
      this.dorefresh.complete();
    }, 1000);
  }

  /******  get All Enseignements today *******/
  getEnseignementsToday()
  {
    this.enseignements=[];
    this.enseignement=null;
    this.enseignementService.getEnseignementsToday().then(data=>{
      this.enseignements= data;
    });
  }

  /******  get All Enseignements *******/
  getallEnseignements()
  {
    this.enseignements=[];
    this.enseignement=null;
    this.enseignementService.getEnseignements().then(data=>{
      this.enseignements= data;
    });
  }

  animateElem() {
    this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
  }

  showdetail(valenseignement){
    this.enseignements=null;
    this.enseignement=valenseignement;


  }


  sendmail(val,nomens)
  {

      let alert = this.atrCtrl.create({
        title: 'Email send !',
        subTitle: 'Enseignant '+nomens,
        buttons: [
          {
          text: 'OK',
          handler: data => {
            this.enseignementService.sendMailEnseignements(val).then(data=>{

            });
                  this.getallEnseignements();
          }
        }
        ]
      });

      alert.present();
  }




  /******  ADD Enseignements *******/
  addEnseignements() {
    this.nav.push(AddEnseignementsPage);
  }





  Logout()
  {
    this.storage.set('Logout', true);
    this.navCtrl.setRoot(LoginPage);
  }


}
