import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Salle } from "../entity/Salle";

import {HttpClient, HttpHeaders} from '@angular/common/http';


import {UrlbaseService} from './urlbase.service';

const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");
@Injectable()
export class SallesService {

  _apiUrl:any;

  constructor(private http: HttpClient,private url:UrlbaseService) {
    this._apiUrl = this.url.getapiUrl()+"/api/salle";
  }

  public getSalles() {
    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public  getSalle(val:number): Observable<Salle> {
    return this.http.get<Salle>(this._apiUrl+"/"+val);
  }

  public setSalle(mat:Salle) {
    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public editSalle(mat:Salle) {
    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  removeSalle(idmat) {
    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idmat,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }





}
