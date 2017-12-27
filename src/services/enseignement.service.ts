import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Enseignement } from "../entity/enseignement";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class EnseignementService {


  private _apiUrl = "http://localhost:8080/api/enseignement";

  constructor(private http: HttpClient) {
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

  // public  getEnseignement(val:number): Observable<Enseignement> {
  //   return this.http.get<Enseignement>(this._apiUrl+"/"+val);
  // }
  //
  // public setEnseignements(mat:Enseignement) {
  //   return new Promise(resolve => {
  //     this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
  //       resolve(data);
  //       console.log(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  //
  // }
  //
  //
  // public editEnseignements(mat:Enseignement) {
  //   return new Promise(resolve => {
  //     this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
  //       resolve(data);
  //       console.log(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }
  //
  //
  //
  // removeEnseignement(idmat) {
  //   return new Promise(resolve => {
  //     this.http.delete(this._apiUrl+'/'+idmat,{headers}).subscribe(data => {
  //       resolve(data);
  //       console.log(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  //
  // }





}
