import {AbstractControl, FormGroup, ValidatorFn, ValidationErrors} from '@angular/forms';


export function createPromoRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const form = control as FormGroup;

        const start:Date = form.get("promoStartAt")?.value;

        const end:Date = form.get("promoEndAt")?.value;

        if (start && end) {
            const isRangeValid = (end.getTime() - start.getTime() > 0);

            return isRangeValid ? null : {promoPeriod:true};
        }

        return null;
    }
}
