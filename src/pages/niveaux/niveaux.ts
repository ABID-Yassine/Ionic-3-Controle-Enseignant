import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NiveauxService } from './../../services/niveaux.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Niveaux} from "../../entity/Niveaux";


@Component({
  selector: 'page-niveaux',
  templateUrl: 'niveaux.html'
})
export class NiveauxPage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
  niveauxs;
      dorefresh:any;
  searchQuery: string = '';


      constructor (public atrCtrl: AlertController,public navCtrl: NavController, public niveauxService: NiveauxService,public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 1000
        });
        loader.present();
        this.getallniveaux();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.niveauxService.getNiveauxs().then(data=>{
            this.niveauxs = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.niveauxService.getNiveauxs().then(data=>{
        this.niveauxs = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }

      getallniveaux()
      {
            this.niveauxs=[];
            this.niveauxService.getNiveauxs().then(data=>{
              this.niveauxs= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      DeleteNiveaux(idniveaux)
      {
          for(let i = 0; i < this.niveauxs.length; i++)
          if(this.niveauxs[i].id == idniveaux){  this.niveauxs.splice(i, 1);  }

          this.niveauxService.removeNiveaux(idniveaux).then(data=>{
            this.niveauxs=[];
            this.getallniveaux();
          });
      }

      EditNiveaux(niveaux) {
        let alert = this.atrCtrl.create({
          title: 'Add niveaux',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:niveaux.id
            },
            {
              name: 'nom',
              placeholder: 'niveaux',
              type: 'text',
              value:niveaux.nom
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
                if (  data.id!=null  && data.nom!=null  ) {


                  let niveauxs=new Niveaux();
                  console.log("data"+data);

                  niveauxs.id=data.id;
                  niveauxs.nom= data.nom;
                  console.log(niveauxs);


                  this.niveauxService.editNiveauxs(niveauxs).then(data=>{

                    console.log(this.niveauxs);
                  });

                  this.doRefresh(this.dorefresh);
                  // this.matieres.push(matiere);

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


    AddNiveaux() {
        let alert = this.atrCtrl.create({
          title: 'Add niveaux',
          inputs: [
            {
              name: 'nom',
              placeholder: 'niveaux',
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


                  let niveaux=new Niveaux();
                  niveaux.nom=data.nom;

                 // console.log(matiere);

                  this.niveauxService.setNiveauxs(niveaux).then(data=>{

                    console.log(this.niveauxs);
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



  searchniveauxs(ev: any) {
    this.getallniveaux();

    let val = ev.target.value;

    if (val && val.trim() != '') {


      this.niveauxService.getNiveauxs().then(data=>{
        this.niveauxs = data;
        this.niveauxs =this.niveauxs.filter((data) => {
          return (data.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });



    }
  }

}

