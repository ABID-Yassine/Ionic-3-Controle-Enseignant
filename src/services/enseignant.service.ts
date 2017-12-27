import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Enseignant } from "../entity/Enseignant";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class EnseignantService {


  private _apiUrl = "http://localhost:8080/api/enseignant";

  constructor(private http: HttpClient) {
  }

  public getEnseignants() {

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getEnseignant(val:number): Observable<Enseignant> {
    return this.http.get<Enseignant>(this._apiUrl+"/"+val);
  }

  public setEnseignants(enseignant:Enseignant) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,enseignant ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editEnseignants(enseignant:Enseignant) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,enseignant ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeEnseignant(idenseignant) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idenseignant,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }





}
