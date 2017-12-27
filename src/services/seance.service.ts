import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Seance } from "../entity/Seance";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class SeanceService {


  private _apiUrl = "http://localhost:8080/api/seance";

  constructor(private http: HttpClient) {
  }

  public getSeances() {

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getSeance(val:number): Observable<Seance> {
    return this.http.get<Seance>(this._apiUrl+"/"+val);
  }

  public setSeances(seance:Seance) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,seance ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editSeances(seance:Seance) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,seance ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeSeance(idseance) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idseance,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }





}
