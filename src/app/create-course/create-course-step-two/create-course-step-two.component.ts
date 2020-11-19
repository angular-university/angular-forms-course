import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPromoRangeValidator} from '../../validators/date-range.validator';


@Component({
  selector: 'create-course-step-two',
  templateUrl: 'create-course-step-two.component.html',
  styleUrls: ['create-course-step-two.component.scss']
})
export class CreateCourseStepTwoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      price: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.min(1), Validators.max(9999)]],
      courseType: ['premium', Validators.required],
      promoPeriodStartAt: [null],
      promoPeriodEndAt: [null]
    }, {
      validators: createPromoRangeValidator()
    });

  }

  ngOnInit() {

    this.form.valueChanges.subscribe(val => {

      const priceControl = this.form.controls['price'];

      if (val.courseType == 'free' && priceControl.enabled) {
        priceControl.disable({emitEvent: false});
      } else if (val.courseType == "premium" && priceControl.disabled) {
        priceControl.enable({emitEvent: false});
      }

    });

  }

}
