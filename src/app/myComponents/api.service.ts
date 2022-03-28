import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  apiurl = 'http://localhost:3002/event';

  // get data (view-events)
  getData():Observable<any>{
    return this._http.get(`${this.apiurl}`);
  }

  //add data (add-events)
  addData(event:any):Observable<any>{
    //console.log(event,this.apiurl);
    return this._http.post(`${this.apiurl}`,event);
  }

  // delete data(view-events)
  deleteData(sno:any):Observable<any>{
    return this._http.delete(`${this.apiurl}/${sno}`);
  }



}
