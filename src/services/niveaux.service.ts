import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Niveaux } from "../entity/Niveaux";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class NiveauxService {


  private _apiUrl = "http://localhost:8080/api/niveaux";

  constructor(private http: HttpClient) {
  }

  public getNiveauxs() {

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getNiveaux(val:number): Observable<Niveaux> {
    return this.http.get<Niveaux>(this._apiUrl+"/"+val);
  }

  public setNiveauxs(niveaux:Niveaux) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,niveaux ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editNiveauxs(niveaux:Niveaux) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,niveaux ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeNiveaux(idniveaux) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idniveaux,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }





}
