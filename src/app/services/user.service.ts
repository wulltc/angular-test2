import { SessionStorageService } from 'ngx-webstorage';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpd: HttpClient,
    private storage:SessionStorageService
  ) {

   }

   _getMyTransaction(customerId)
   {
     let headers = new HttpHeaders({
       'content-type': 'application/json',
       authorization: 'Bearer ' + this.storage.retrieve('access_token')
     })

     return this.httpd.get(`${environment.apiUrl}/api/exchanges/user/${customerId}`, { headers });
   }

   _getMyTransactionXbet(customerId)
   {
     let headers = new HttpHeaders({
       'content-type': 'application/json',
       authorization: 'Bearer ' + this.storage.retrieve('access_token')
     })

     return this.httpd.get(`${environment.apiUrl}/api/xbets/user/${customerId}`, { headers });
   }
}
