import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Application de gestion des assignments';
  token: string = 'currentUser'

  constructor(
    private authService: AuthService
  ) {}

  isLogged(){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    return false;
  }
  seDeconnecter(){
    this.authService.logOut()
  }
}
