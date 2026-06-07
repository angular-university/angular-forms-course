import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {createPromoRangeValidator} from '../../validators/date-range.validator';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { MatFormField, MatInput, MatLabel, MatError, MatSuffix } from '@angular/material/input';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';


@Component({
    selector: 'create-course-step-2',
    templateUrl: 'create-course-step-2.component.html',
    styleUrls: ['create-course-step-2.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, MatRadioGroup, MatRadioButton, FileUploadComponent, MatFormField, MatInput, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatError, MatDatepickerToggle, MatSuffix, MatDateRangePicker]
})
export class CreateCourseStep2Component implements OnInit {

    form = this.fb.group({
        courseType: ['premium', Validators.required],
        price: [null, [
            Validators.required,
            Validators.min(1),
            Validators.max(9999),
            Validators.pattern("[0-9]+")
        ]],
        thumbnail: [null],
        promoStartAt: [null],
        promoEndAt: [null]
    }, {
        validators: [createPromoRangeValidator()]
    });

    constructor(private fb: FormBuilder) {

    }

  ngOnInit() {

        this.form.valueChanges
            .subscribe(val => {

                const priceControl = this.form.controls["price"];

                if (val.courseType == 'free' && priceControl.enabled) {
                    priceControl.disable({emitEvent: false});
                }
                else if (val.courseType == 'premium' && priceControl.disabled) {
                    priceControl.enable({emitEvent:false});
                }

            });



  }

}
