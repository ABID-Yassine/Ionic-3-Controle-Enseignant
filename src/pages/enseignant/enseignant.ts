import {Component, ViewChild} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { EnseignantService } from './../../services/enseignant.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Enseignant} from "../../entity/Enseignant";
import { LoginPage } from '../login/login';
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-enseignant',
  templateUrl: 'enseignant.html'
})
export class EnseignantPage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
  enseignants;
      dorefresh:any;
  searchQuery: string = '';


      constructor (public storage: Storage,public menuCtrl: MenuController,public atrCtrl: AlertController,public navCtrl: NavController, public enseignantService: EnseignantService,public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();

         this.menuCtrl.enable(true, 'myMenu');
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.getallenseignant();
        loader.dismiss();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.enseignantService.getEnseignants().then(data=>{
            this.enseignants = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.enseignantService.getEnseignants().then(data=>{
        this.enseignants = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


      getallenseignant()
      {
            this.enseignants=[];
            this.enseignantService.getEnseignants().then(data=>{
              this.enseignants= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      DeleteEnseignant(idenseignant)
      {
          for(let i = 0; i < this.enseignants.length; i++)
          if(this.enseignants[i].id == idenseignant){  this.enseignants.splice(i, 1);  }

          this.enseignantService.removeEnseignant(idenseignant).then(data=>{
            this.enseignants=[];
            this.getallenseignant();
          });
      }

      EditEnseignant(enseignant) {
        let alert = this.atrCtrl.create({
          title: 'Edit enseignant',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:enseignant.id
            },
            {
              name: 'nom',
              placeholder: 'nom enseignant',
              type: 'text',
              value:enseignant.nom
            },
            {
              name: 'numero',
              placeholder: 'numero enseignant',
              type: 'text',
              value:enseignant.numero
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
                if (  data.id!=null  && data.nom!=null  && data.numero!=null  ) {


                  let enseignant=new Enseignant();
                  console.log("data"+data);

                  enseignant.id=data.id;
                  enseignant.nom= data.nom;
                  enseignant.numero= data.numero;
                  console.log(enseignant);


                  this.enseignantService.editEnseignants(enseignant).then(data=>{

                    console.log(this.enseignants);
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


    AddEnseignant() {
        let alert = this.atrCtrl.create({
          title: 'Add enseignant',
          inputs: [
            {
              name: 'nom',
              placeholder: 'nom enseignant',
              type: 'text'
            },
            {
              name: 'numero',
              placeholder: 'numero enseignant',
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
                if (  data.nom!=null  ) {


                  let enseignant=new Enseignant();
                  enseignant.nom=data.nom;
                  enseignant.numero=data.numero;


                  this.enseignantService.setEnseignants(enseignant).then(data=>{

                    console.log(this.enseignants);
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



  searchenseignant(ev: any) {
    this.getallenseignant();

    let val = ev.target.value;

    if (val && val.trim() != '') {


      this.enseignantService.getEnseignants().then(data=>{
        this.enseignants = data;
        this.enseignants =this.enseignants.filter((data) => {
          return (data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });



    }
  }


  Logout()
  {
    this.storage.set('Logout', true);
    this.navCtrl.setRoot(LoginPage);
  }



}

