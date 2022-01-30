import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  token: string = 'currentUser';
  isLoggedIn(){
    const token = localStorage.getItem(this.token);
    if(token){
      if(helper.isTokenExpired(token)){
        return false;
      }else{
        return true;
      }
    }
    return false;
  }
  getHeader(): { headers: HttpHeaders }{
    const token = localStorage.getItem(this.token);
    let header;
    if(!token) {
      header = {
        headers: new HttpHeaders()
          .set('Authorization', '')
      }
    }else{
      header = {
        headers: new HttpHeaders()
          .set('Authorization', token)
      }
    }

    return header;
  }
  logIn() {
    // typiquement, on devrait prendre en paramètres
    // login et password, vérifier qu'ils sont valides
    // en utilisant un web service en ligne (soit via une BD)
    // soit via oAuth, etc.

    // Nous pour le moment, on simule...
    this.loggedIn = true;
  }

  logOut() {
    // appelée typiquement par le bouton de deconnexion
    localStorage.removeItem(this.token);
    this.toastr.success(`Au revoir !`, 'Déconnexion réussi', {
      progressBar: true,
      positionClass: 'toast-top-center'
    });
    this.router.navigate(['login'])
    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }

  constructor(private toastr: ToastrService, private router: Router) { }
}
