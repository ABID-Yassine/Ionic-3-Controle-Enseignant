import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { EnseignementService } from './../../services/enseignement.service';
import { EnseignantService } from './../../services/enseignant.service';
import { SallesService } from './../../services/salles.service';
import { SeanceService } from './../../services/seance.service';
import { MatiereService } from './../../services/matiere.service';
import { JourService } from './../../services/jour.service';
import { DepService } from './../../services/dep.service';
import {Enseignant} from "../../entity/Enseignant";
import {Salle} from "../../entity/Salle";
import {Seance} from "../../entity/Seance";
import {Matiere} from "../../entity/Matiere";
import {Jour} from "../../entity/Jour";
import {Dep} from "../../entity/Dep";
import {Enseignement} from "../../entity/enseignement";
import {NiveauxService} from "../../services/niveaux.service";

@IonicPage()
@Component({
  selector: 'page-add-enseignements',
  templateUrl: 'add-enseignements.html',
})
export class AddEnseignementsPage {

  enseignants:any;
  salles:any;
  seances:any;
  jours:any;
  deps:any;
  matieres:any;
  niveaux:any;

  valenseignants:any;
  valnom:any;
  valsalle:any;
  valseance:any;
  valjour:any;
  valdep:any;
  valmat:any;
  valniv:any;

  constructor( public enseignantService: EnseignantService,
               public sallesService: SallesService,
               public seanceService: SeanceService,
               public jourService: JourService,
               public depService: DepService,
               public matService: MatiereService,
               public nivService: NiveauxService,
               public navCtrl: NavController,
               public enseignementService: EnseignementService,

               public navParams: NavParams) {
    this.getallenseignant();
    this.getallsalle();
    this.getallseance();
    this.getalljour();
    this.getalldep();
    this.getallmatiere();
    this.getallniveaux();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEnseignementsPage');
  }


  getallenseignant()
  {
    this.enseignants=[];
    this.enseignantService.getEnseignants().then(data=>{
      this.enseignants= data;
    });
  }


  getallniveaux()
  {
    this.niveaux=[];
    this.nivService.getNiveauxs().then(data=>{
      this.niveaux= data;
    });
  }


  getallsalle()
  {
    this.salles=[];
    this.sallesService.getSalles().then(data=>{
      this.salles= data;
    });
  }

  getallseance()
  {
    this.seances=[];
    this.seanceService.getSeances().then(data=>{
      this.seances= data;
    });
  }


  getalljour()
  {
    this.jours=[];
    this.jourService.getJours().then(data=>{
      this.jours= data;
    });
  }


  getalldep()
  {
    this.deps=[];
    this.depService.getDeps().then(data=>{
      this.deps= data;
    });
  }


  getallmatiere()
  {
    this.matieres=[];
    this.matService.getMatieres().then(data=>{
      this.matieres= data;
    });
  }


  addEnseignement()
  {
    // alert(this.valnom)
    // alert(this.valsalle.id)
    // alert(this.valenseignants.id)
    // alert(this.valseance.id)
    // alert(this.valjour.id)
    // alert(this.valdep.id)
    // alert(this.valmat.id)


    let enseignement=new Enseignement();
    enseignement.matiere=this.valmat.id;
    enseignement.enseignant=this.valenseignants.id;
    enseignement.salle=this.valsalle.id;
    enseignement.seance=this.valseance.id;
    enseignement.jours=this.valjour.id;
    enseignement.departement=this.valdep.id;
    enseignement.niveaux=this.valniv.id;
    enseignement.nom=this.valnom;

    console.log(enseignement);

    this.enseignementService.setEnseignements(enseignement).then(data=>{

      console.log(enseignement);
    });



  }



}
