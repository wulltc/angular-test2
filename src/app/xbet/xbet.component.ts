import { AuthService } from './../services/auth.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { XbetService } from '../services/xbet.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-xbet',
  templateUrl: './xbet.component.html',
  styleUrls: ['./xbet.component.css']
})
export class XbetComponent implements OnInit {

  tokenInfos:any;

  isWithdrawal = false;
  isDeposit    = true;

  // Deposit input variables

  idXbetDeposit:any;
  depositAmount:Number = 0;
  sendingNumber:any;

  // Withdrawal input variables
  idXbetWithdrawal:any;
  withdrawalCode:any;
  withdrawalAmount:Number = 0;
  withdrawalTelephone:any;


  customerInfos:any;


  activeCoupons:any = [];

  constructor(
    private xbet: XbetService,
    private storage: SessionStorageService,
    private auth0: AuthService,
    private spinner: NgxSpinnerService
  ) {

    if(this.storage.retrieve('access_token'))
        this.auth0._getMyself()
        .subscribe(
          (data)=>{
            this.customerInfos = data ;
          }
        );

      this.storage.observe('access_token')
      .subscribe(
        ()=>{
          this.auth0._getMyself()
          .subscribe(
            (data)=>{
              this.customerInfos = data ;
            }
          );
        }
      );

   }

  ngOnInit(): void {
  }

  _switchOption(option)
  {
    if(option == 0)
    {
      this.isDeposit    = true  ;
      this.isWithdrawal = false ;
    }
    else
    {
      this.isDeposit    = false ;
      this.isWithdrawal = true  ;
    }
  }

  _launchWithdrawal()
  {
    if(!this.storage.retrieve('access_token'))
    {
      this._login();
    }
    else
    {
      let data = {
        customerId: this.customerInfos._id,
        operationType: 'RETRAIT',
        withdrawalCode: this.withdrawalCode,
        operationTelephone: this.withdrawalTelephone,
        amount: this.withdrawalAmount,
        xbetID: this.idXbetWithdrawal,
        createdAt: new Date(),
      };

      if(this.customerInfos.isActive)
      {
        if(data.amount != 0 && data.withdrawalCode !=undefined && data.operationTelephone !=undefined && data.xbetID !=undefined)
              this.xbet._launchXbetOperation(data)
              .subscribe(
                ()=>{
                    Swal.fire({
                        icon:'success',
                        title:'Demande de retrait effectuée avec success. Suivez l\'état de votre demande dans vos transactions',
                        confirmButtonColor:'#ff4444',
                    });
                },
                (error)=>{
                  console.log(error)
                  Swal.fire({
                    icon:'error',
                    title:'Oops quelque chose s\'est mal passé. Veuillez reéssayer',
                    confirmButtonColor:'#ff4444',
                })
                }
              );
        else
              Swal.fire({
                icon:'error',
                title:'Veuillez entrer des informations correctes'
              })
      }
      else
      {
        Swal.fire({
          icon:'error',
          title:'Votre compte n\'est pas encore activé. Un administrateur vous contactera si necéssaire?',
          confirmButtonColor:'#ff4444',
      });
      }


    }
  }

  _launchDeposit()
  {
    if(!this.storage.retrieve('access_token'))
    {
      this._login();
    }
    else
    {
      let data = {
        customerId: this.customerInfos._id,
        operationType: 'DEPOT',
        operationTelephone: this.sendingNumber,
        amount: this.depositAmount,
        xbetID: this.idXbetDeposit,
        createdAt: new Date(),
      };

      if(this.customerInfos.isActive)
      {
        if(data.amount != 0 && data.operationTelephone !=undefined && data.xbetID !=undefined)
                this.xbet._launchXbetOperation(data)
                .subscribe(
                  ()=>{
                      Swal.fire({
                          icon:'success',
                          title:'Demande de retrait effectuée avec success. Suivez l\'état de votre demande dans vos transactions',
                          confirmButtonColor:'#ff4444',
                      });
                  },
                  (error)=>{
                    console.log(error)
                    Swal.fire({
                      icon:'error',
                      title:'Oops quelque chose s\'est mal passé. Veuillez reéssayer',
                      confirmButtonColor:'#ff4444',
                  })
                  }
                );
        else
                Swal.fire({
                  icon:'error',
                  title:'Veuillez entrer des informations correctes'
                })
      }
      else
      {
        Swal.fire({
          icon:'error',
          title:'Votre compte n\'est pas encore activé. Un administrateur vous contactera si necéssaire',
          confirmButtonColor:'#ff4444',
      });
      }
    }
  }


   //  Login & Sign up functions
   async _login()
   {
     Swal.fire({
       html:
         '<h1 style="color:white;font-weight:bold;">Connectez vous</h1>'+
         '<input id="login" class="swal2-input" style="background-color: white !important;color: black;" placeholder="e-mail">' +
         '<input type="password" id="pass" style="background-color: white !important;color: black ;" class="swal2-input" placeholder="Mot de passe">'+ '<br>'+'<br>',
       confirmButtonText:'CONNEXION',
       confirmButtonColor:'#ff4444',
       background:'#2E2E2E',
       focusConfirm: false,
       showDenyButton:true,
       denyButtonColor:'#3E4551',
       showLoaderOnConfirm: true,
       denyButtonText:'INSCRIVEZ VOUS',
       preConfirm: () => {
           let inputElement = <HTMLInputElement>document.getElementById("login");
           let login = inputElement.value;
           inputElement = <HTMLInputElement>document.getElementById("pass")
           let pass  = inputElement.value;
           this.auth0._login(login,pass)
           .then(
             (data)=>{

               // let event = new CustomEvent("userOnline",{ detail:token });
               // document.dispatchEvent(event);
               this.tokenInfos = data;
               this.storage.store('access_token', this.tokenInfos.token);
               Swal.fire({
                 icon: 'success',
                 title: 'Connexion Réussie',
                 confirmButtonColor:'#ff4444',
                 iconColor:'#ff4444'
               }).then(response =>{
                 if(response.isConfirmed || response.isDismissed)
                   if(screen.width < 768)
                     location.reload();
               })
             },
             (error)=>{
               console.log(error);
               Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Echec d\'authentification. Veuillez reéssayer',
                 confirmButtonColor:'#ff4444',
               })

             }
           )
       }
     }).then(response => {
       if(response.isDenied)
         this._signUp();
     })
   }

   _signUp()
   {
     Swal.fire({
       html:
         '<h1 style="color:white;font-weight:bold;">Inscrivez vous</h1>'+
         '<input id="name" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Nom">' +
         '<input id="pname" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Prenom(s)">' +
         '<input id="tel" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Telephone">' +
         '<input id="login_new" class="swal2-input" style="background-color: white !important;color: black;" placeholder="e-mail">' +
         '<input type="password" id="pass_new" style="background-color: white !important;color: black ;" class="swal2-input" placeholder="Nouveau mot de passe">'+ '<br>'+'<br>',
       confirmButtonText:'INSCRIPTION',
       confirmButtonColor:'#ff4444',
       background:'#2E2E2E',
       focusConfirm: false,
       showDenyButton:true,
       denyButtonColor:'#3E4551',
       showLoaderOnConfirm: true,
       denyButtonText:'ANNULER',
       preConfirm: () => {
           let inputElement = <HTMLInputElement>document.getElementById("login_new");
           let login = inputElement.value;
           inputElement = <HTMLInputElement>document.getElementById("pass_new")
           let pass  = inputElement.value;

           inputElement = <HTMLInputElement>document.getElementById("name")
           let name  = inputElement.value;

           inputElement = <HTMLInputElement>document.getElementById("pname")
           let pname  = inputElement.value;

           inputElement = <HTMLInputElement>document.getElementById("tel")
           let tel  = inputElement.value;

           let datas = {
             name:name+" "+pname,
             email:login,
             password:pass,
             telephone:[tel]
           }
           this.auth0._signUp(datas)
           .subscribe(
             (data)=>{
               Swal.fire({
                 icon: 'success',
                 title: 'Demande d\'inscription Réussie',
                 confirmButtonColor:'#ff4444',
                 iconColor:'#ff4444'
               })
             },
             (error)=>{
               if(error.status == 422)
               {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'L\'adresse mail saisie existe déjà',
                    confirmButtonColor:'#ff4444',
                  })
               }
               else
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Quelque chose s\'est mal passé. Veuillez reéssayer',
                  confirmButtonColor:'#ff4444',
                })

             }
           )
       }
     }).then(response => {

     })
   }

   _seeCoupons()
   {
     this.spinner.show();
     this.xbet._getCoupons()
     .subscribe(
       (activeCoupons) => {

          let couponsTab = []
          this.activeCoupons = activeCoupons;
          this.activeCoupons.forEach(element => {
              couponsTab.push(element.code)
          });
          Swal.fire({
            icon:'info',
            title:'Coupons actifs',
            html: couponsTab.join()
          })
       },
       (error)=>{
          console.log(error);          
       }
     )
   }
}
