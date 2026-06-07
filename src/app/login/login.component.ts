import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {createPasswordStrengthValidator} from '../validators/password-strength.validator';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardTitle, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, JsonPipe, OnlyOneErrorPipe]
})
export class LoginComponent implements OnInit {

   form = this.fb.group({
      email: ["", {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'}],
      password: ['', [Validators.required, Validators.minLength(8),
                        createPasswordStrengthValidator()]]
   });

  constructor(private fb: NonNullableFormBuilder) {


  }

  ngOnInit() {

  }

  get email() {
      return this.form.controls['email'];
  }

  get password() {
      return this.form.controls['password'];
  }

  login() {

  }

  reset() {
    this.form.reset();

    console.log(this.form.value);

  }
}












