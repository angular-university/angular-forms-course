import {AbstractControl, ValidatorFn} from '@angular/forms';


export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    console.log("Checking password strength: " + value);

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasLowerCase && hasUpperCase && hasNumeric;

    console.log("passwordValid: ", passwordValid);

    return !passwordValid ? {passwordStrength: true} : null;
  };

}


