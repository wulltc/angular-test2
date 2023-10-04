import Swal from 'sweetalert2';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './../services/auth.service';
import { ExchangesServiceService } from './../services/exchanges-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  allCrypto:any = [];
  fromCrypto = {
    name:"",
    exchangeRate:0,
    isToBuy:'',
    exchangeTab:[]
  };
  toCrypto = {
    name:"",  
    exchangeRate:0,
    isToBuy:'',
    code:''
  };

  userEntry:Number = 0;
  userReceive:Number = 0;
  customerInfos:any;
  tokenInfos:any;
  walletAdress:String;

  isToCalculate = false;
  exchangeRate:any;
  paymentMethod:any;
  payementMethodInfos:String;
  demandCode = false;
  transfertCode = "";

  isWithCash = false;


  constructor(
    private activatedRoute:ActivatedRoute,
    public exchangeService:ExchangesServiceService,
    private route:Router,
    private auth0:AuthService,
    private storage:SessionStorageService
  )
  {

    this.exchangeService._getCryptos()
    .subscribe(
      (datas)=>{
        this.allCrypto = datas ;

        this._searchCryptoByCode(this.activatedRoute.snapshot.params.from,'from');
        this._searchCryptoByCode(this.activatedRoute.snapshot.params.to,'to')    ;

        if(this.fromCrypto.name !="CASH" && this.toCrypto.name != "CASH")
        {
          this.isToCalculate = true;

          this.fromCrypto.exchangeTab.forEach( element =>
          {
              if(element.destinationCode == this.toCrypto.code)
               {
                  console.log(element)
                  this.exchangeRate  = element.newExchangeRate ;
               }  
          });

        }

        if(this.fromCrypto.name =="CASH" || this.toCrypto.name == "CASH")
            this.isWithCash = true;

         if(!this.fromCrypto || !this.toCrypto || !this.fromCrypto.isToBuy)
            this.route.navigateByUrl('/not-found');
      }
    );

    // this.exchangeService._getHere()
    // .then( () =>{

    //     // this.exchangeService._searchCryptoByCode(this.activatedRoute.snapshot.params.from,'from');
    //     // this.exchangeService._searchCryptoByCode(this.activatedRoute.snapshot.params.to,'to')  ;


    //     // console.log(this.exchangeService.fromCrypto);
    //     // console.log(this.exchangeService.toCrypto);
    //     // if(!this.exchangeService.fromCrypto || !this.exchangeService.toCrypto)
    //     //   this.route.navigateByUrl('/not-found');
    // } )

    this._getMyInfos();

    this.storage.observe('access_token')
    .subscribe(
      ()=>{
        this._getMyInfos()
      }
    );



    this.generateString(5);

  }

  _searchCryptoByCode(code,sens)
  {
    this.allCrypto.forEach( crypto => {

        if(crypto.code == code)
        {
          if(sens == 'from')
          {
            this.fromCrypto = crypto
          }
          else
          {
            this.toCrypto = crypto
          }
        }
    })
  }

  ngOnInit(): void
  {

  }

  async _getMyInfos()
  {
    if(this.storage.retrieve('access_token'))
        this.auth0._getMyself()
        .subscribe(
          (userInfos)=>{
            this.customerInfos = userInfos;
          },
          (error)=>{
            console.log('error')
          }
        );
  }

  _calculateChange(event)
  {
    let userEntry    = event.target.value         ;
    this.userReceive = userEntry - userEntry*this.exchangeRate      ;
  }

  async _exchangeCrypto()
  {
      if(this.auth0._loggedIn())
      {
        await this._getMyInfos()
        .then( () =>
        {
            // Once user infos retrieved then post the operation
              let data = {
                customerId: this.customerInfos._id,
                customerWalledAdress: this.walletAdress,
                fromCrypto: this.fromCrypto.name,
                toCrypto: this.toCrypto.name,
                amountToExchange: this.userEntry,
                amountExchanged: this.userReceive,
                exchangeRate: this.exchangeRate,
                clientDate: new Date(),
                paymentMethod:this.paymentMethod,
                paymentCode:this.transfertCode
            }
            if(this.isWithCash)
            {
              if(data.amountToExchange != 0 && data.customerWalledAdress !=undefined && this.paymentMethod != undefined && this.paymentMethod != "0")
                this.exchangeService._postExchange(data,this.customerInfos.isActive)
                .subscribe(
                  ()=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Transaction en cours de traitement',
                      confirmButtonColor:'#ff4444',
                    })
                  },
                  (error)=>{
                    if(error.status == 403)
                      Swal.fire({
                        icon: 'error',
                        title: 'Votre compte n\'est pas activé. Un administrateur va vous contacter si nécéssaire.',
                        confirmButtonColor:'#ff4444',
                      })
                    else
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops quelque chose s\'est mal passé veuillez reéssayer',
                        confirmButtonColor:'#ff4444',
                      })
                  }
              );
              else
                Swal.fire({
                  icon:'error',
                  title:'Veuillez entrer toutes les informations'
                })
            }
            else
            {
              if(data.amountToExchange != 0 && data.customerWalledAdress !=undefined)
                this.exchangeService._postExchange(data,this.customerInfos.isActive)
                .subscribe(
                  ()=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Transaction en cours de traitement',
                      confirmButtonColor:'#ff4444',
                    })
                  },
                  (error)=>{
                    if(error.status == 403)
                      Swal.fire({
                        icon: 'error',
                        title: 'Votre compte n\'est pas activé. Un administrateur va vous contacter si nécéssaire.',
                        confirmButtonColor:'#ff4444',
                      })
                    else
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops quelque chose s\'est mal passé veuillez reéssayer',
                        confirmButtonColor:'#ff4444',
                      })
                  }
              );
              else
                Swal.fire({
                  icon:'error',
                  title:'Veuillez entrer toutes les informations'
                })
            } 
        } )
        .catch( () =>
        {
            // User token expired !
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Quelque chose s\'est mal passé veuillez reéssayer.',
              confirmButtonColor:'#ff4444',
            })
        }  );
      }
      else
      {
        // User not authenticate
       this._login();
      }
  }

  _NoproceedToExchange()
  {

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

  characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  captchaBot:String;
  captchaBotVerify:String;
  generateString(length)
  {
    let result = '';
    const charactersLength = this.characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.captchaBot = result;
  }

  _verifyCaptcha(event)
  {
    let goBtn = <HTMLButtonElement>document.getElementById('goBtn')
    let value = event.target.value;
    if(value+"" == this.captchaBot)
    {
      goBtn.disabled = false
    }
    else
    {
      goBtn.disabled = true
    }
  }


  _selectPayment(event)
  {
    this.paymentMethod = event.target.value;
    this._showPaymentMethodInfos(this.paymentMethod);
  }

  _showPaymentMethodInfos(method)
  {
    if(method == "WESTERN UNION")
    {
      this.demandCode = true;
      this.payementMethodInfos = "<div><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(method == "RIA")
    {
      this.demandCode = true;
      this.payementMethodInfos = "<div class='receiverClass'><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(method == "WARI")
    {
      this.demandCode = true;
      this.payementMethodInfos = "<div class='receiverClass'><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(method == "MONEYGRAM")
    {
      this.demandCode = true;
      this.payementMethodInfos = "<div class='receiverClass'><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(method == "FLOOZ")
    {
      this.payementMethodInfos = "<div class='receiverClass'><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(method == "TMONEY")
    {
      this.payementMethodInfos = "<div class='receiverClass'><p>Nom: AYITE <p><p>Prenons : Kokouda basile</p><p> Numéro : 99021007</p></div>"
    }

    if(this.toCrypto.name == "CASH")
      this.demandCode = false ;
  }
}
