import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { JsonPipe } from '@angular/common';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe, OnlyOneErrorPipe]
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
    password: ['', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]]
  });

  constructor(private fb: NonNullableFormBuilder) {}

  get email() { return this.form.controls['email']; }
  get password() { return this.form.controls['password']; }

  login() {}

  reset() { this.form.reset(); }
}
