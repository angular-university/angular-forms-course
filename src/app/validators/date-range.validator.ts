import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';


export function createPromoRangeValidator(): ValidatorFn {

  return (form: FormGroup): ValidationErrors | null => {

    const startDate:Date = form.get("promoPeriodStartAt").value;

    const endDate:Date = form.get("promoPeriodEndAt").value;

    const isRangeValid = (endDate?.getTime() - startDate?.getTime() > 0);

    return isRangeValid ? null : {promoPeriod:true};

  }
}


