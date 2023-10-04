import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpd:HttpClient,
    private storage:SessionStorageService,
    private route:Router
  ) { }

  _getMyself()
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + this.storage.retrieve('access_token')
    });
      return this.httpd.get(`${environment.apiUrl}/api/users/me`,{ headers })
  }

  async _login(login,pass)
  {
    return await this.httpd.post(`${environment.apiUrl}/auth/local`,{ email:login,password:pass }).toPromise();
  }

  _loggedIn():boolean
  {
    return this.storage.retrieve('access_token') ? true : false ;
  }

  _signOut()
  {
    this.storage.clear('access_token');
    location.reload();
  }

  _signUp(data)
  {
    return this.httpd.post(`${environment.apiUrl}/api/users`,data)
  }

}
