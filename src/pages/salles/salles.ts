import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController,MenuController } from 'ionic-angular';
import { SallesService } from './../../services/salles.service';


import { LoadingController } from 'ionic-angular';
import { AnimationService, AnimationBuilder } from 'css-animator';

import { AlertController } from 'ionic-angular';
import {Salle} from "../../entity/Salle";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-salles',
  templateUrl: 'salles.html',
})
export class SallesPage {


  @ViewChild('myElementitem') myitem;

  private animator: AnimationBuilder;
  listsalle;
  dorefresh:any;
  searchQuery: string = '';


  constructor (public menuCtrl: MenuController,public atrCtrl: AlertController,public navCtrl: NavController, public salleService: SallesService,public loadingCtrl: LoadingController, animationService: AnimationService) {
    this.animator = animationService.builder();
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidEnter() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.getallsalle();

    loader.dismiss();
  }

  doRefresh(refresher) {
    this.dorefresh=refresher;
    setTimeout(() => {
      this.salleService.getSalles().then(data=>{
        this.listsalle = data;
      });
      refresher.complete();
    }, 1000);
  }

  doRefreshlist() {
    setTimeout(() => {
      this.salleService.getSalles().then(data=>{
        this.listsalle = data;
      });
      this.dorefresh.complete();
    }, 1000);
  }


  /******  get All Matiere *******/
  getallsalle()
  {
    this.listsalle=[];
    this.salleService.getSalles().then(data=>{
      this.listsalle= data;console.log(data);


    });
  }

  animateElem() {
    this.animator.setType('bounceInLeft').show(this.myitem.nativeElement);
  }


  /******  Delete Matiere *******/
  DeleteSalle(idmat)
  {
    for(let i = 0; i < this.listsalle.length; i++)
      if(this.listsalle[i].id == idmat){  this.listsalle.splice(i, 1);  }

    this.salleService.removeSalle(idmat).then(data=>{
      this.listsalle=[];
      this.getallsalle();
    });
  }

  /******  Edit Matiere *******/
  EditSalle(mat) {
    let alert = this.atrCtrl.create({
      title: 'Edit Matiere',
      inputs: [
        {
          name: 'id',
          placeholder: 'id',
          type: 'hidden',
          value:mat.id
        },  {
          name: 'nom',
          placeholder: 'Nom',
          type: 'text',
          value:mat.nom
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
            if (  data.id!=null && data.nom!=null ) {


              let salle=new Salle();

              salle.id=data.id;
              salle.nom=data.nom;


              this.salleService.editSalle(salle).then(data=>{

                console.log(this.listsalle);
              });

              this.doRefresh(this.dorefresh);
              // this.listsalle.push(matiere);

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
  AddSalle() {
    let alert = this.atrCtrl.create({
      title: 'Add Matiere',
      inputs: [
        {
          name: 'nom',
          placeholder: 'Nom',
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
            if (  data.nom!=null ) {


              let salle=new Salle();
              salle.nom= data.nom;

              this.salleService.setSalle(salle).then(data=>{

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



  searchSalle(ev: any) {
    // Reset items back to all of the items
    this.getallsalle();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {


      this.salleService.getSalles().then(data=>{
        this.listsalle = data;
        this.listsalle =this.listsalle.filter((data) => {
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
