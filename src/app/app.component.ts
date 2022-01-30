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
    private authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private toastr: ToastrService
  ) {}

  login() {
    if (!this.authService.loggedIn) {
      console.log("Je n'étais pas connecté, je suis maintenant loggé");
      this.authService.logIn();
    } else {
      console.log("J'étais  connecté, je suis maintenant déloggé");
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  seDeconnecter(){
    localStorage.removeItem(this.token);
    this.toastr.success(`Au revoir !`, 'Déconnexion réussi', {
      progressBar: true,
      positionClass: 'toast-top-center'
    });
    this.router.navigate(['login'])
  }
}
