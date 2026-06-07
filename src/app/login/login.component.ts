import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { PasswordStrengthDirective } from '../directives/password-strength.directive';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardTitle, MatCardContent, FormsModule, MatFormField, MatInput, MatError, PasswordStrengthDirective, MatButton, JsonPipe, OnlyOneErrorPipe]
})
export class LoginComponent implements OnInit {

  val = {
    email: "hello@gmail.com",
    password: "123456"
  };

  constructor() {


  }

  ngOnInit() {

  }

    login(loginForm: NgForm, submit) {

        console.log(loginForm.value, loginForm.valid, submit);

        console.log("val", this.val);

    }

}
