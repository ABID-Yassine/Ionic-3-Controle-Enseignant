import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Matiere } from "../entity/Matiere";

import {HttpClient, HttpHeaders} from '@angular/common/http';



const headers = new HttpHeaders().set("Content-Type", "application/json")
  .set( 'Accept','application/json' ).set("X-CustomHeader", "custom header value");

@Injectable()
export class MatiereService {


  private _apiUrl = "http://localhost:8080/api/matiere";

  constructor(private http: HttpClient) {
  }

  public getMatieres() {
    // return this.http.get<Matiere[]>(this._apiUrl) ;

    return new Promise(resolve => {
      this.http.get(this._apiUrl ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });


  }

  public  getMatiere(val:number): Observable<Matiere> {
    return this.http.get<Matiere>(this._apiUrl+"/"+val);
  }

  public setMatieres(mat:Matiere) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });

  }


  public editMatieres(mat:Matiere) {


    return new Promise(resolve => {
      this.http.post(this._apiUrl,mat ,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });



  }



  removeMatiere(idmat) {


    return new Promise(resolve => {
      this.http.delete(this._apiUrl+'/'+idmat,{headers}).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });

    // return this.http.delete(this._apiUrl+"/"+idmat,{headers}).subscribe(
    //       res => {
    //         // console.log(res);
    //       },
    //       err => {
    //         console.log("Error occured");
    //         //  console.log(JSON.stringify(mat));
    //       }
    //     );
  }





}
