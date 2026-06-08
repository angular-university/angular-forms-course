import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { email, form, FormField, FormRoot, minLength, required, validate } from '@angular/forms/signals';
import {LOGIN_FORM_DEFAULT, LoginData} from './login.model';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormField, FormRoot, JsonPipe]
})
export class LoginComponent {
  loginModel = signal<LoginData>({ ...LOGIN_FORM_DEFAULT });

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required.' });
      email(schemaPath.email, { message: 'Enter a valid email address.' });

      required(schemaPath.password, { message: 'Password is required.' });
      minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters.' });
      validate(schemaPath.password, ({ value }) => {
        const password = value();
        if (!password) return null;
        const valid = /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
        return valid ? null : { kind: 'passwordStrength', message: 'Must contain lower, upper and numeric characters.' };
      });
    },
    {
      submission: {
        action: async () => {
          console.log('Logging in with:', this.loginModel());
        }
      }
    }
  );

  reset() {
    this.loginModel.set({ ...LOGIN_FORM_DEFAULT });
  }
}
