import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { FieldErrorPipe } from '../pipes/field-error.pipe';
import { LOGIN_FORM_DEFAULT, LoginData } from './login.model';
import { passwordStrength } from '../validators/password-strength-signal.validator';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormField, FormRoot, FieldErrorPipe]
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
      passwordStrength(schemaPath.password);
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
