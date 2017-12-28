import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Dep } from "../entity/Dep";

import {HttpClient, HttpHeaders} from '@angular/common/http';


import {UrlbaseService} from './urlbase.service';

const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class DepService {


  _apiUrl:any;

  constructor(private http: HttpClient,private url:UrlbaseService) {
    this._apiUrl = this.url.getapiUrl()+"/api/dep";
  }

  public getDeps() {

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getDep(val:number): Observable<Dep> {
    return this.http.get<Dep>(this._apiUrl+"/"+val);
  }

  public setDeps(dep:Dep) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,dep ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editDeps(dep:Dep) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,dep ,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeDep(iddep) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+iddep,{headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });


  }





}
