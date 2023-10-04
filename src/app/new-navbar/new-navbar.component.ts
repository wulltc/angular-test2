import { LoginService } from './../services/login.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import Swal from 'sweetalert2';
import { CountriesService } from '../services/countries.service';

declare var $: any;

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.css']
})
export class NewNavbarComponent implements OnInit {

  isConnected = false;
  tokenInfos:any;


  //
  fetchedTempInfos:any = [];
  myActualCountry:any;
  allCountries:any;


  constructor(
    private auth0:AuthService,
    private storage:SessionStorageService,
    private loginS: LoginService,
    private countries:CountriesService
  ) {


  // Check if token is here

    this.storage.observe('access_token')
    .subscribe(
      ()=>{
        this.isConnected = true;
      }
    );


    if(this.storage.retrieve('access_token'))
      this.isConnected = true;

    //--end Check if token is here

    // document.addEventListener('userOnline',function(e){
    //   this.isConnected = true;
    //   this.eventInfos = e;
    //   sessionStorage.setItem('access_token',this.eventInfos.detail.token)
    // })


    this.countries._getAllCountries()
    .subscribe(
      (allCountries)=>{
        this.allCountries = allCountries ;
      },
      (error)=>{
          console.log(error);
          
      }
    )

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
    let countrySelect = document.createElement('select');
    countrySelect.setAttribute('class','form-control');
    countrySelect.setAttribute('id','countrySelect');
    countrySelect.style.height = "42px !important";
    this.allCountries.forEach(element => {
        let optionCountry = document.createElement("option");
        optionCountry.value = element.name;
        optionCountry.innerHTML = element.name;
        countrySelect.appendChild(optionCountry);
    });

    let countrySelectDiv = document.createElement('div');
    countrySelectDiv.appendChild(countrySelect);

    setTimeout(() => {      
      Swal.fire({
        html:
          '<h1 style="color:white;font-weight:bold;">Inscrivez vous</h1>'+'<br>'+
          countrySelectDiv.innerHTML + '<br>'+
          '<input type="text" id="name" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Nom" autocomplete="nope">' +
          '<input type="text" id="pname" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Prenom(s)" autocomplete="nope">' +
          '<input type="text" id="tel" class="swal2-input" style="background-color: white !important;color: black;" placeholder="Telephone" autocomplete="nope">' +
          '<input type="text" id="login_new" class="swal2-input" style="background-color: white !important;color: black;" placeholder="e-mail" autocomplete="nope">' +
          '<input type="password" id="pass_new" style="background-color: white !important;color: black ;" class="swal2-input" placeholder="Nouveau mot de passe" autocomplete="nope">'+ '<br>'+'<br>',
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

            inputElement = <HTMLInputElement>document.getElementById("countrySelect")
            let country  = inputElement.value;
            let allSubscriptionCountryInfos;

            this.allCountries.forEach(element => {
              if(country == element.name)
                allSubscriptionCountryInfos = element;
          });
  
            let datas = {
              name:name+" "+pname,
              email:login,
              password:pass,
              telephone:[tel],
              country: country,
              subscriptioncountryCode:allSubscriptionCountryInfos.alpha3Code,
              subscriptionCountry:allSubscriptionCountryInfos.name,
              subscriptionCountryCallingCode:allSubscriptionCountryInfos.callingCodes[0],
              subscriptionCountryFlagUrl:allSubscriptionCountryInfos.flag
            }
            
            if(login!="" && pass!="" && name!="" && pname!="" && tel!="" && country!="")
              this.auth0._signUp(datas)
              .subscribe(
                ()=>{
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
            else
              Swal.fire({
                icon: 'error',
                title: 'Veuillez renseigner toutes les informations',
                confirmButtonColor:'#ff4444',
              })
        }
      }).then(response => {
  
      })
    }, 1500);
    
  }

  _signOut()
  {
    this.auth0._signOut();
  }

  //--end  Login & Sign up functions

  ngOnInit(): void 
  {
      //this._getCountryCallingCode()
      //this.getLocation();
  }

  _getCountryCallingCode()
  {
    fetch('http://api.ipgeolocationapi.com/geolocate')
    .then(res=>{
      console.log(res);
      
    })
      this.countries._getMyIp()
      .subscribe(
        (rxInfos)=>{
            console.log(rxInfos)
            this.myActualCountry = rxInfos;
            this._getAfricanCoutries();            
            this._getEuropeCoutries();            
        },
        (error)=>{
            console.log(error);            
        }
      )
  }

  _getAfricanCoutries()
  {
      this.countries._getAllCountriesFromContinent('africa')
      .subscribe(
        (countries)=>{
            this.fetchedTempInfos = countries;

            for (let index = 0; index < this.fetchedTempInfos.length; index++) 
            {            
                if( this.fetchedTempInfos[index].alpha2Code == this.myActualCountry.countryCode)
                {
                    this.myActualCountry =  this.fetchedTempInfos[index];
                    //console.log(this.myActualCountry);                      
                    break;
                }   
            }
        },
        (error)=>{
          console.log(error);            
      }
      )
  }

  _getEuropeCoutries()
  {
      this.countries._getAllCountriesFromContinent('europe')
      .subscribe(
        (countries)=>{
            this.fetchedTempInfos = countries;

            for (let index = 0; index < this.fetchedTempInfos.length; index++) 
            {            
                if( this.fetchedTempInfos[index].alpha2Code == this.myActualCountry.countryCode)
                {
                    this.myActualCountry =  this.fetchedTempInfos[index];     
                    //console.log(this.myActualCountry)              
                    break;
                }   
            }
        },
        (error)=>{
          console.log(error);            
      }
      )
  }

  _insertCountryCode()
  {
    let inputTel   = <HTMLInputElement>document.getElementById("tel");    
    inputTel.value = `+${this.myActualCountry.callingCodes[0]}`;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  // watch visitor's location
  watchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.showPosition, this.handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  
  handleError(error) {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorStr = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        errorStr = 'An unknown error occurred.';
        break;
      default:
        errorStr = 'An unknown error occurred.';
    }
    console.error('Error occurred: ' + errorStr);
  }
  
  showPosition(position) {
    console.log(`Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
  }
}
