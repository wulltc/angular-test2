import { SessionStorageService } from 'ngx-webstorage';
import  Swal  from 'sweetalert2';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-myspace',
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.css']
})
export class MyspaceComponent implements OnInit {

  fetchedDemandsData:any;
  dataSource:any;
  customerInfos:any;

  exchangeSource:any;
  xbetSource:any;

  settings:any;

  customer = {
    name:"",
    email:""
  }

  constructor(
    private auth0:AuthService,
    private route:Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private storage: SessionStorageService
  )
  {

  }

  _initDemands()
  {
    this.settings = this.exchangeSetting;
    this.dataSource = this.exchangeSource;
    this.auth0._getMyself()
      .subscribe(
        (userInfos)=>{
          this.customerInfos = userInfos;
          this.customer = {
            name: this.customerInfos.name,
            email: this.customerInfos.email
          };

          this._getDemands();
          this._getXbetDemands();

          // Init datas
          setTimeout(() => {
            document.getElementById('exchangeBtn').click();
          }, 1000);

        },
        ()=>{
          Swal.fire({
            icon:'error',
            title:'Authentifiez vous'
          }).then( response =>{
            if(response.isConfirmed || response.isDismissed)
            {
              this.storage.clear('access_token');
              this.route.navigateByUrl('/')
            }
          })
        }
      );
  }

  ngOnInit(): void
  {
    this._initDemands();
  }

  _getDemands()
  {
    this.spinner.show();
    this.userService._getMyTransaction(this.customerInfos._id)
    .subscribe(
      (fetchedDemands)=>{
        this.fetchedDemandsData = fetchedDemands;

        this.exchangeSource = this.fetchedDemandsData;

        this.exchangeSource.forEach(element =>
          {
            element.customerId = element.customerId.name;
          });

          this.exchangeSource.reverse();

          this.spinner.hide();
      },
      (error)=>{
        console.log(error)
      }
    );
  }

  _getXbetDemands()
  {
    this.spinner.show();
    this.userService._getMyTransactionXbet(this.customerInfos._id)
    .subscribe(
      (fetchedDemands)=>{
        this.fetchedDemandsData = fetchedDemands;

        this.xbetSource = this.fetchedDemandsData;

        this.xbetSource.forEach(element =>
          {
            element.customerId = element.customerId.name;
          });

          this.xbetSource.reverse();

          this.spinner.hide();
      },
      (error)=>{
        console.log(error)
      }
    );
  }


  exchangeSetting = {
    actions:
    {
      columnTitle: 'Opérations',
      add:false,
      edit:false,
      delete:false
    },

    pager:
    {
      display:true,
      perPage:10
    },

    attr: {
      class: 'table myI table-responsive'
    },

    columns: {
      serverDate:
      {
        title:'Date'
      },
      fromCrypto: {
        title: 'Cryptomonnaie d\'origine',
        width: '200px'
      },
      toCrypto: {
        title: 'Cryptomonnaie demandée'
      },
      exchangeRate: {
        title: 'Taux de change'
      },
      paymentMethod:
      {
        title:'Moyen de paiement'
      },
      status:
      {
        type:'html',
        title:'Statut',
        valuePrepareFunction:(status)=>{
          if(status == 0)
            return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color:#ffbb33;height:auto;width:auto;text-align: center !important;"><strong style="color:black"> En cours </strong> </div>')
          else
          return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color:#00C851;height:auto;width:auto;text-align: center !important;"><strong style="color:black"> Validé </strong> </div>')
        }
      }
    }
  };

  xbetSetting = {
    actions:
    {
      columnTitle: 'Opérations',
      add:false,
      edit:false,
      delete:false
    },

    pager:
    {
      display:true,
      perPage:10
    },

    attr: {
      class: 'table myI table-responsive'
    },

    columns: {
      createdAt:
      {
        title:'Date'
      },
      operationType: {
        title: 'Type d\'opération',
        width: '200px'
      },
      operationTelephone: {
        title: 'Téléphone utilisé'
      },
      amount: {
        title: 'Prix'
      },
      status:
      {
        type:'html',
        title:'Statut',
        valuePrepareFunction:(status)=>{
          if(status == 0)
            return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color:#ffbb33;height:auto;width:auto;text-align: center !important;"><strong style="color:black"> En cours </strong> </div>')
          else
          return this.sanitizer.bypassSecurityTrustHtml('<div style="background-color:#00C851;height:auto;width:auto;text-align: center !important;"><strong style="color:black"> Validé </strong> </div>')
        }
      }
    }
  };

  _switchDatas(option)
  {
    if(option == 0)
    {
      this._getDemands();
      this.settings = this.exchangeSetting;
      this.dataSource = this.exchangeSource;
    }
    else
    {
      this._getXbetDemands();
      this.settings = this.xbetSetting;
      this.dataSource = this.xbetSource;
    }
  }
}
