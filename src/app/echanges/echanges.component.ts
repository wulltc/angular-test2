import { environment } from './../../environments/environment';
import { ExchangesServiceService } from './../services/exchanges-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-echanges',
  templateUrl: './echanges.component.html',
  styleUrls: ['./echanges.component.css']
})
export class EchangesComponent implements OnInit {

  usedCryptos:any = [];

  existFirstChoosen  = false;
  firstCryptoChoosen = {
    name:"",
    imgPath:"",
    code:""
  };

  existSecondChoosen  = false;
  secondCryptoChoosen = {
    name:"",
    imgPath:"",
    code:""
  };

  isToBuyTab:any = [];
  isToSellTab:any = [];

  constructor(
    private exchange:ExchangesServiceService,
    private route:Router,
    private spinner: NgxSpinnerService
    )
    {
      this.spinner.show();
      this.exchange._getCryptos()
      .subscribe(
        (datas)=>{
          this.spinner.hide();
          this.usedCryptos = datas ;

          this.usedCryptos.forEach(element =>
            {
                element.filePathImg =  `${environment.fileUrl}/getTarifications/${element.imgPath}`
                if(element.isToBuy)
                  this.isToBuyTab.push(element)

                if(element.isToSell)
                  this.isToSellTab.push(element)
            });
        }
      );
    }

  ngOnInit(): void
  {

  }

  _chooseCrypto(option,cryptoOptions)
  {
      if(option == 1)
      {
        this.existFirstChoosen = true ;

        if(cryptoOptions.code !=  this.secondCryptoChoosen.code)
        {
          this.firstCryptoChoosen.imgPath  = `${environment.fileUrl}/getTarifications/`+cryptoOptions.imgPath   ;
          this.firstCryptoChoosen.name = cryptoOptions.name  ;
          this.firstCryptoChoosen.code = cryptoOptions.code  ;
        }
      }

      if(option == 2)
      {

        if(cryptoOptions.code !=  this.firstCryptoChoosen.code)
        {
          this.existSecondChoosen = true
          this.secondCryptoChoosen.imgPath  = `${environment.fileUrl}/getTarifications/`+cryptoOptions.imgPath  ;
          this.secondCryptoChoosen.name = cryptoOptions.name ;
          this.secondCryptoChoosen.code = cryptoOptions.code ;
        }
      }
  }

  continue()
  {
    if(this.existFirstChoosen == true && this.existSecondChoosen == true)
      this.route.navigateByUrl("/proceed/"+this.firstCryptoChoosen.code+"/"+this.secondCryptoChoosen.code);
  }

}
