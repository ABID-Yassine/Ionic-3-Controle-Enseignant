import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { SeanceService } from './../../services/seance.service';


import { LoadingController,AlertController,MenuController   } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import {Seance} from "../../entity/Seance";
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-seance',
  templateUrl: 'seance.html'
})
export class SeancePage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
  seances;
      dorefresh:any;
  searchQuery: string = '';


      constructor (public menuCtrl: MenuController,public atrCtrl: AlertController,public navCtrl: NavController, public seanceService: SeanceService,public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();
        this.menuCtrl.enable(true, 'myMenu');
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.getallseance();

        loader.dismiss();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.seanceService.getSeances().then(data=>{
            this.seances = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.seanceService.getSeances().then(data=>{
        this.seances = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


      getallseance()
      {
            this.seances=[];
            this.seanceService.getSeances().then(data=>{
              this.seances= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      DeleteSeance(idseance)
      {
          for(let i = 0; i < this.seances.length; i++)
          if(this.seances[i].id == idseance){  this.seances.splice(i, 1);  }

          this.seanceService.removeSeance(idseance).then(data=>{
            this.seances=[];
            this.getallseance();
          });
      }

      EditSeance(seance) {
        let alert = this.atrCtrl.create({
          title: 'Edit Seance',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:seance.id
            },  {
              name: 'nom',
              placeholder: 'nom de seance',
              type: 'text',
              value:seance.nom
            },
            {
              name: 'duree',
              placeholder: 'durée de seance',
              type: 'text',
              value:seance.duree
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Editer',
              handler: data => {
                if (  data.id!=null && data.nom!=null && data.duree!=null  ) {


                  let seance=new Seance();
                  console.log("data"+data);

                  seance.id=data.id;
                  seance.nom=data.nom;
                  seance.duree= data.duree;
                  console.log(seance);


                  this.seanceService.editSeances(seance).then(data=>{

                    console.log(this.seances);
                  });

                  this.doRefresh(this.dorefresh);

                } else {
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
      }



    AddSeance() {
        let alert = this.atrCtrl.create({
          title: 'Add Seance',
          inputs: [
            {
              name: 'nom',
              placeholder: 'nom',
              type: 'text'
            },
            {
              name: 'duree',
              placeholder: 'durée seance',
              type: 'text'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Add',
              handler: data => {
                if (  data.nom!=null && data.duree!=null  ) {


                  let seance=new Seance();
                  seance.nom=data.nom;
                  seance.duree= data.duree;

                  this.seanceService.setSeances(seance).then(data=>{

                  });

                  this.doRefresh(this.dorefresh);

                } else {
                  return false;
                }
              }
            }
          ]
        });
        alert.present();

      }



  searchseance(ev: any) {
    this.getallseance();

    let val = ev.target.value;

    if (val && val.trim() != '') {


      this.seanceService.getSeances().then(data=>{
        this.seances = data;
        this.seances =this.seances.filter((data) => {
          return (data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });



    }
  }
  Logout()
  {
    this.navCtrl.setRoot(LoginPage);
  }
}

