import { LoginPage } from './../login/login';

import {Component, ViewChild} from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { MatiereService } from './../../services/matiere.service';


import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Matiere} from "../../entity/Matiere";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-matiere',
  templateUrl: 'matiere.html'
})
export class MatierePage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
      matieres;
      dorefresh:any;
      searchQuery: string = '';


      constructor (public storage: Storage,public menuCtrl: MenuController,public atrCtrl: AlertController,public navCtrl: NavController, public matiereService: MatiereService,public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();
        this.menuCtrl.enable(true, 'myMenu');
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.getallmatiere();
        loader.dismiss();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.matiereService.getMatieres().then(data=>{
            this.matieres = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.matiereService.getMatieres().then(data=>{
        this.matieres = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


     /******  get All Matiere *******/
      getallmatiere()
      {
            this.matieres=[];
            this.matiereService.getMatieres().then(data=>{
              this.matieres= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      /******  Delete Matiere *******/
      DeleteMatiere(idmat)
      {
          for(let i = 0; i < this.matieres.length; i++)
          if(this.matieres[i].id == idmat){  this.matieres.splice(i, 1);  }

          this.matiereService.removeMatiere(idmat).then(data=>{
            this.matieres=[];
            this.getallmatiere();
          });
      }

      /******  Edit Matiere *******/
      EditMatiere(mat) {
        let alert = this.atrCtrl.create({
          title: 'Edit Matiere',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:mat.id
            },  {
              name: 'abv',
              placeholder: 'Abréviation',
              type: 'text',
              value:mat.abv
            },
            {
              name: 'nom_salle',
              placeholder: 'name salle',
              type: 'text',
              value:mat.nom_salle
            },
            {
              name: 'nom_matiere',
              placeholder: 'Name Matiere',
              type: 'text',
              value:mat.nom_matiere
            }
          ],
          // subTitle: 'You do not have enough amount in your wallet, Please add more Money!',
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
                if (  data.id!=null && data.abv!=null && data.nom_salle!=null && data.nom_matiere!=null ) {
                  let matiere=new Matiere();

                  matiere.id=data.id;
                  matiere.abv=data.abv;
                  matiere.nom_salle= data.nom_salle;
                  matiere.nom_matiere=data.nom_matiere;

                  this.matiereService.editMatieres(matiere).then(data=>{

                  });

                  this.doRefresh(this.dorefresh);

                } else {
                  // invalid login
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
      }



  /******  ADD Matiere *******/
    AddMatiere() {
        let alert = this.atrCtrl.create({
          title: 'Add Matiere',
          inputs: [
            {
              name: 'abv',
              placeholder: 'Abréviation',
              type: 'text'
            },
            {
              name: 'nom_salle',
              placeholder: 'name salle',
              type: 'text'
            },
            {
              name: 'nom_matiere',
              placeholder: 'Name Matiere',
              type: 'text'
            }
          ],
          // subTitle: 'You do not have enough amount in your wallet, Please add more Money!',
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
                if (  data.abv!=null && data.nom_salle!=null && data.nom_matiere!=null ) {


                  let matiere=new Matiere();
                  matiere.abv=data.abv;
                  matiere.nom_salle= data.nom_salle;
                  matiere.nom_matiere=data.nom_matiere;
                 // console.log(matiere);

                  this.matiereService.setMatieres(matiere).then(data=>{

                    console.log(this.matieres);
                  });

                  this.doRefresh(this.dorefresh);

                } else {
                  // invalid login
                  return false;
                }
              }
            }
          ]
        });
        alert.present();

      }



  searchmatiere(ev: any) {
    this.getallmatiere();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.matiereService.getMatieres().then(data=>{
        this.matieres = data;
        this.matieres =this.matieres.filter((data) => {
          return (data.nom_matiere.toLowerCase().indexOf(val.toLowerCase()) > -1);
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

