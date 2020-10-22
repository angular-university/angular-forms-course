import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator} from '../validators/password-strength.validator';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  step1Form: FormGroup;

  currentStep = 1;

  constructor(private fb: FormBuilder) {
    this.step1Form = fb.group({
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
    });
  }

  ngOnInit() {

  }

  reset() {
    this.step1Form.reset();
  }

  continueToStep2() {
    console.log("Step 1 form values", this.step1Form.value);
  }

}
