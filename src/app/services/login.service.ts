import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenInfos:any;
  constructor(
    private auth0: AuthService,
    private storage: SessionStorageService
  ) {

  }

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

  _signOut()
  {
    this.auth0._signOut();
  }

}
