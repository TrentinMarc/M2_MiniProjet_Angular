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
import {User} from "../user/user.model";
import {ErrorStateMatcher} from "@angular/material/core";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form: any;
  user!: User;
  error: any;
  mdpMinLength: number = 6;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    mdp: ['', [Validators.required, Validators.minLength(this.mdpMinLength)]],
    confirmMdp: ['', Validators.required]
  }, { validators: this.MustMatch('mdp', 'confirmMdp')})

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.user = new User(this.email?.value, this.nom?.value, this.prenom?.value, this.prenom?.value);
      console.log(this.user)
    }
  }

  get email() { return this.loginForm.get('email')}
  get nom() { return this.loginForm.get('nom')}
  get prenom() { return this.loginForm.get('prenom')}
  get mdp() { return this.loginForm.get('mdp')}
  get confirmMdp() { return this.loginForm.get('confirmMdp')}

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
}
