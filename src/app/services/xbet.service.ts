import { environment } from './../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XbetService {

  constructor(
    private http: HttpClient,
    private storage:SessionStorageService
  ) { }


  _launchXbetOperation(data)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + this.storage.retrieve('access_token')
    });

    return this.http.post(`${environment.apiUrl}/api/xbets`,data, { headers })
  }

  _getCoupons()
  {
    return this.http.get(`${environment.apiUrl}/api/coupons`)
  } 
}
