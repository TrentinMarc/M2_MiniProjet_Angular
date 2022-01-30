import { Component, OnInit } from '@angular/core';
import {User} from "../user/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: User;
  error: any;
  mdpMinLength: number = 6;

  registerForm: FormGroup = this.fb.group({
    email: [undefined, [Validators.email, Validators.required]],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    mdp: ['', [Validators.required, Validators.minLength(this.mdpMinLength)]],
    confirmMdp: ['', Validators.required]
  }, {validators: this.MustMatch('mdp', 'confirmMdp')})

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.user = new User(null, this.email?.value, this.nom?.value, this.prenom?.value, this.mdp?.value);
      this.userService.addUser(this.user)
        .subscribe(
          response => {
            this.toastr.success(`${this.user.nom} ${this.user.prenom} a bien été enregistré`, 'Bienvenu', {
              progressBar: true,
              positionClass: 'toast-top-center'
            });
            this.userService.loginUser(this.user)
              .subscribe(
                response => {
                  console.log(response)
                  this.toastr.success(`Bienvenu ${this.user.nom} ${this.user.prenom}`, response.message, {
                    progressBar: true,
                    positionClass: 'toast-top-center'
                  });
                  localStorage.setItem('currentUser', response.token);
                  this.router.navigate(['/home'])
                },
                err => {
                  this.toastr.error(err.error.errorMessage, 'Erreur...', {
                    progressBar: true,
                    positionClass: 'toast-top-center'
                  });
                });
          },
          err => {
            console.log(err.error.errorMessage)
            this.toastr.error(err.error.errorMessage, 'Erreur...', {
              progressBar: true,
              positionClass: 'toast-top-center'
            });
          });
    }
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  get email() { return this.registerForm.get('email')}
  get nom() { return this.registerForm.get('nom')}
  get prenom() { return this.registerForm.get('prenom')}
  get mdp() { return this.registerForm.get('mdp')}
  get confirmMdp() { return this.registerForm.get('confirmMdp')}
}
