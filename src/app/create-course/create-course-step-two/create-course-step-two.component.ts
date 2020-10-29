import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPromoRangeValidator} from '../../validators/date-range.validator';



@Component({
  selector: "create-course-step-two",
  templateUrl: "create-course-step-two.component.html",
  styleUrls: ["create-course-step-two.component.scss"]
})
export class CreateCourseStepTwoComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      price: [null, [Validators.required, Validators.pattern("[0-9]+"), Validators.min(1), Validators.max(9999)]],
      courseType: ["premium", Validators.required],
      promoPeriodStartAt: [null],
      promoPeriodEndAt: [null]
    }, {
      validators: createPromoRangeValidator()
    });


  }


}
