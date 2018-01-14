import {Component, ViewChild} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { DepService } from './../../services/dep.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Dep} from "../../entity/Dep";
import { LoginPage } from '../login/login';
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-dep',
  templateUrl: 'dep.html'
})
export class DepPage {

      @ViewChild('myElementitem') myitem;

      private animator: AnimationBuilder;
      deps;
      dorefresh:any;
  searchQuery: string = '';


      constructor (public storage: Storage,public menuCtrl: MenuController,public atrCtrl: AlertController
                   ,public navCtrl: NavController, public depService: DepService,
                   public loadingCtrl: LoadingController, animationService: AnimationService) {
        this.animator = animationService.builder();

        this.menuCtrl.enable(true, 'myMenu');
       }

      ionViewDidEnter() {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.getalldep();
        loader.dismiss();
      }

  doRefresh(refresher) {
        this.dorefresh=refresher;
        setTimeout(() => {
          this.depService.getDeps().then(data=>{
            this.deps = data;
          });
          refresher.complete();
        }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.depService.getDeps().then(data=>{
        this.deps = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


      getalldep()
      {
            this.deps=[];
            this.depService.getDeps().then(data=>{
              this.deps= data;
            });
      }

      animateElem() {
        this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
      }


      DeleteDep(iddep)
      {
          for(let i = 0; i < this.deps.length; i++)
          if(this.deps[i].id == iddep){  this.deps.splice(i, 1);  }

          this.depService.removeDep(iddep).then(data=>{
            this.deps=[];
            this.getalldep();
          });
      }

      EditDep(dep) {
        let alert = this.atrCtrl.create({
          title: 'Edit Departement',
          inputs: [
            {
              name: 'id',
              placeholder: 'id',
              type: 'hidden',
              value:dep.id
            },
            {
              name: 'nom',
              placeholder: 'departement',
              type: 'text',
              value:dep.nom
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


                  let dep=new Dep();
                  console.log("data"+data);

                  dep.id=data.id;
                  dep.nom= data.nom;
                  console.log(dep);


                  this.depService.editDeps(dep).then(data=>{

                    console.log(this.deps);
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



    AddDep() {
        let alert = this.atrCtrl.create({
          title: 'Add Departement',
          inputs: [
            {
              name: 'nom',
              placeholder: 'département',
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
                if (  data.nom!=null  ) {


                  let dep=new Dep();
                  dep.nom=data.nom;


                  this.depService.setDeps(dep).then(data=>{

                    console.log(this.deps);
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



  searchdep(ev: any) {
    this.getalldep();

    let val = ev.target.value;

    if (val && val.trim() != '') {


      this.depService.getDeps().then(data=>{
        this.deps = data;
        this.deps =this.deps.filter((data) => {
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

