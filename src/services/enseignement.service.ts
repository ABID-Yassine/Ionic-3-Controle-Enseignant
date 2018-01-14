import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Enseignement } from "../entity/enseignement";

import {HttpClient, HttpHeaders} from '@angular/common/http';



import {UrlbaseService} from './urlbase.service';
import {Matiere} from "../entity/Matiere";


const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class EnseignementService {



  _apiUrl:any;
  constructor(private http: HttpClient,private url:UrlbaseService) {
    this._apiUrl = this.url.getapiUrl()+"/api/enseignement";
  }
  public getEnseignements() {
    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public getEnseignementsToday() {
    return new Promise(resolve => {
      this.http.get(this._apiUrl+'/datetoday' ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }


  public sendMailEnseignements(id) {
    return new Promise(resolve => {
      this.http.get(this._apiUrl+"/mail/"+id ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public setEnseignements(ens:Enseignement) {
    return new Promise(resolve => {
      this.http.post(this._apiUrl,ens ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });

  }








}
