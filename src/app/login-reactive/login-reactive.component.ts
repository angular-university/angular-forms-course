import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator} from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

   email = new FormControl('',
       {
           validators: [Validators.required, Validators.email],
           updateOn: 'blur'
       });

   password = new FormControl('',
       {
           validators: [
               Validators.required,
               Validators.minLength(8),
               createPasswordStrengthValidator()
           ]
       });

   form = new FormGroup({
       email: this.email,
       password: this.password
   });

  constructor() {


  }

  ngOnInit() {

  }

}
