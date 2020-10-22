import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator} from '../../validators/password-strength.validator';
import {createPromoRangeValidator} from '../../validators/date-range.validator';

@Component({
  selector: 'create-course-step-one',
  templateUrl: './create-course-step-one.component.html',
  styleUrls: ['./create-course-step-one.component.scss']
})
export class CreateCourseStepOneComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      adminPassword: ["", [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      supportEmail: ["", [Validators.required, Validators.email]],
      price: [null, [Validators.required, Validators.pattern("[0-9]+")]],
      category: ["BEGINNER", Validators.required],
      courseType: ["free", Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      promoPeriodStartAt: [null],
      promoPeriodEndAt: [null],
      releasedAt: [new Date(), Validators.required],
      longDescription: ["",[Validators.required, Validators.minLength(3)]]
    }, {
      validators: createPromoRangeValidator()
    });
  }

  ngOnInit() {

  }

  reset() {
    this.form.reset();
  }

  continueToStep2() {
    console.log("Step 1 form values", this.form.value);
  }

}
