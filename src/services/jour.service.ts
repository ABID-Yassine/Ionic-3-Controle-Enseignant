import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Jour } from "../entity/Jour";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class JourService {


  private _apiUrl = "http://localhost:8080/api/jour";

  constructor(private http: HttpClient) {
  }

  public getJours() {

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getJour(val:number): Observable<Jour> {
    return this.http.get<Jour>(this._apiUrl+"/"+val);
  }

  public setJours(jour:Jour) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,jour ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editjours(jour:Jour) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,jour ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeJour(idjour) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idjour,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }





}
