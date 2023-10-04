import { SessionStorageService } from 'ngx-webstorage';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangesServiceService {

  fromCrypto = {
    name:"",
  };
  toCrypto = {
    name:"",
  };
  exchangeRate:Number;

  allCrypto:any =[];

  // allCrypto=[
  //   {
  //     name:"Bitcoin",
  //     img:"assets/img/btc.png",
  //     code:"BTC"
  //   },
  //   {
  //     name: "Perfect Money",
  //     img:"assets/img/pm.png",
  //     code:"PM"
  //   },
  //   {
  //     name: "Payeer",
  //     img:"assets/img/payeer.png",
  //     code:"PYE"
  //   },
  //   {
  //     name: "Etherum",
  //     img:"assets/img/eth.png",
  //     code:"ETH"
  //   },
  //   {
  //     name: "Tron",
  //     img:"assets/img/tron.png",
  //     code:"TRO"
  //   },
  //   {
  //     name: "Dogecoin",
  //     img:"assets/img/doge.png",
  //     code:"DOG"
  //   },
  //   {
  //     name: "Litecoin",
  //     img:"assets/img/lite.png",
  //     code:"LIT"
  //   },
  //   {
  //     name: "Freecoin",
  //     img:"assets/img/free.png",
  //     code:"FREE"
  //   },
  // ];

  constructor(
    private httpd:HttpClient,
    private storage:SessionStorageService
  )
  {
    this.httpd.get(`${environment.apiUrl}/api/tarifications/`)
    .subscribe(
      (datas)=>{
        this.allCrypto = datas ;
      }
    );
   }

   async _getHere()
   {
    this.httpd.get(`${environment.apiUrl}/api/tarifications/`)
    .subscribe(
      (datas)=>{
        this.allCrypto = datas ;
        return datas
      }
    );
   }

  _getCryptos()
  {
    return this.httpd.get(`${environment.apiUrl}/api/tarifications/`)
  }

   _searchCryptoByCode(code,sens)
  {
    this.exchangeRate = 0;
    this.allCrypto.forEach( crypto => {

        if(crypto.code == code)
        {
          if(sens == 'from')
          {
            this.fromCrypto = crypto
            console.log(crypto)
          }
          else
          {
            this.toCrypto = crypto
            console.log(crypto)
          }
        }
    })
  }

  _postExchange(data,userStatus)
  {
    let stat=""
    if(userStatus == false)
      stat = 'no'
    else
      stat = 'yes'

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + this.storage.retrieve('access_token'),
      status: stat+'',
    });
    return this.httpd.post(`${environment.apiUrl}/api/exchanges`,data, { headers })
  }
}
