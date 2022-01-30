import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{


  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn()){
      this.toastr.warning('Vous ne pouvez pas rejoindre cette page', `Accès refusé`, {
        progressBar: true,
        positionClass: 'toast-top-center'
      });
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }


}
