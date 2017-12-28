import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Register } from "../entity/Register";

import {HttpClient, HttpHeaders} from '@angular/common/http';


import {UrlbaseService} from './urlbase.service';

const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");
@Injectable()
export class RegistersService {

  _apiUrl:any;

  constructor(private http: HttpClient,private url:UrlbaseService) {
    this._apiUrl = this.url.getapiUrl()+"/api/register";
  }

  public Auth(email) {
    return new Promise(resolve => {
      this.http.get(this._apiUrl+"/"+email ,{headers}).subscribe(data => {
         resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }



  public getRegisters() {
    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public  getRegister(val:number): Observable<Register> {
    return this.http.get<Register>(this._apiUrl+"/"+val);
  }

  public setRegister(mat:Register) {
    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public editRegister(mat:Register) {
    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  removeRegister(idmat) {
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
