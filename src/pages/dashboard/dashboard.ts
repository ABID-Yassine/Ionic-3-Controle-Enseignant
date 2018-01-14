import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';


import { MatiereService } from './../../services/matiere.service';
import { EnseignantService } from './../../services/enseignant.service';
import { SallesService } from './../../services/salles.service';
import { DepService } from './../../services/dep.service';
import { Storage } from '@ionic/storage';

import { AnimationService, AnimationBuilder } from 'css-animator';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  matieres:any;
  enseignants:any;
  salles:any;
  deps:any;
  userconnect:any;

  private animator: AnimationBuilder;

  constructor(public storage: Storage,public depservice:DepService,public sallesService:SallesService,public enseignantService:EnseignantService,public matiereService: MatiereService,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams, animationService: AnimationService) {

    this.menuCtrl.enable(true, 'myMenu');


    this.matiereService.getMatieres().then(data=>{
      this.matieres= data;
    });

    this.enseignantService.getEnseignants().then(data=>{
      this.enseignants = data;
    });

    this.sallesService.getSalles().then(data=>{
      this.salles = data;
    });

    this.depservice.getDeps().then(data=>{
      this.deps = data;
    });



    this.storage.get('connect').then((val) => {

      this.userconnect=val;

    });




  }

  ionViewDidLoad() {
  }


  Logout()
  {
    this.navCtrl.setRoot(LoginPage);
  }

}
