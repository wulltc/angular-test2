import  Swal  from 'sweetalert2';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route:Router,
    private auth0:AuthService
  )
  {}

  canActivate():boolean
  {
    if(this.auth0._loggedIn())
    {
      return true;
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez vous authentifier !',
        confirmButtonColor:'#ff4444'
      }).then(response => {
          if(response.isDismissed || response.isConfirmed)
              this.route.navigateByUrl('/')
      })
      return false;
    }
  }

}
