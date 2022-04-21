import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  apiurl = 'http://localhost:3002/event';
  userAPIurl = 'http://localhost:3002/user';
  loginAPIurl = 'http://localhost:3002/login';
  emailVerifyrl = 'http://localhost:3002/activate';

  // Events
  // get data (view-events)
  getData(user_id:any):Observable<any>{
    return this._http.get(`${this.apiurl}/${user_id}`);
  }

  getBeforeEvents(user_id:any):Observable<any>{
    return this._http.get(`${this.apiurl}/before/${user_id}`);
  }

  getOngoingEvents(user_id:any):Observable<any>{
    return this._http.get(`${this.apiurl}/ongoing/${user_id}`);
  }

  getAfterEvents(user_id:any):Observable<any>{
    return this._http.get(`${this.apiurl}/after/${user_id}`);
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

  //User Data
  getUserData():Observable<any>{
    return this._http.get(`${this.userAPIurl}`);
  }
  getSingleUserData(id:any):Observable<any>{
    return this._http.get(`${this.userAPIurl}/${id}`);
  }
  addUserData(user:any):Observable<any>{
    return this._http.post(`${this.userAPIurl}`,user);
  }
  updateUserData(id:any,user:any):Observable<any>{
    return this._http.put(`${this.userAPIurl}/${id}`,user);
  }
  deleteUserData(id:any):Observable<any>{
    return this._http.delete(`${this.userAPIurl}/${id}`);
  }

  //Login
  loginUser(credentials:any):Observable<any>{
    return this._http.post(`${this.loginAPIurl}`,credentials);
  }

  loggedIn(){
    return !!localStorage.getItem('Bearer');
  }

  emailVerification(token:any):Observable<any>{
    console.log(token);
    return this._http.get(`${this.emailVerifyrl}/${token}`);
  }

}
