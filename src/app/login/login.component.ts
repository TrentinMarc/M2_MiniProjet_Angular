import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormGroupDirective, NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {User} from "../user/user.model";
import {ErrorStateMatcher} from "@angular/material/core";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form: any;
  user!: User;
  error: any;

  loginForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    mdp: [null, Validators.required],
  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  isValid(controlName: string){
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.user = new User(this.loginForm.value.email, '', '', this.loginForm.value.mdp);
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
    }
  }

  get email() { return this.loginForm.get('email')}
  get mdp() { return this.loginForm.get('mdp')}
}
