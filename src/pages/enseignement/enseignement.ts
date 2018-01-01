import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { EnseignementService } from './../../services/enseignement.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Enseignement} from "../../entity/enseignement";
import {Matiere} from "../../entity/Matiere";
import {AddEnseignementsPage} from "../add-enseignements/add-enseignements";
import {MatierePage} from "../matiere/matiere";


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


  constructor (private nav: NavController, public atrCtrl: AlertController,public navCtrl: NavController, public enseignementService: EnseignementService,public loadingCtrl: LoadingController, animationService: AnimationService) {
    this.animator = animationService.builder();
    this.isToggled = false;
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    this.getallEnseignements();

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




  /******  ADD Matiere *******/
  addEnseignements() {
    this.nav.push(AddEnseignementsPage);
  }



}
