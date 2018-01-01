import { Injectable } from '@angular/core';
@Injectable()
export class UrlbaseService {


  //private _apiUrl = "http://localhost:8080";
  private _apiUrl = "http://localhost:8080";

  constructor() {
  }

  public  getapiUrl():string {
    return this._apiUrl;
  }

}
