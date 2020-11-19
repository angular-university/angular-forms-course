import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator} from '../../validators/password-strength.validator';
import {createPromoRangeValidator} from '../../validators/date-range.validator';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {courseTitleValidator} from '../../validators/course-title.validator';

@Component({
  selector: 'create-course-step-one',
  templateUrl: './create-course-step-one.component.html',
  styleUrls: ['./create-course-step-one.component.scss']
})
export class CreateCourseStepOneComponent implements OnInit {

  form: FormGroup;

  courseCategories$: Observable<any>;


  constructor(private fb: FormBuilder, private courses: CoursesService) {
    this.form = fb.group({
      title: [
        "", {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
          asyncValidators: [courseTitleValidator(this.courses)],
          updateOn: "blur"
        }
      ],
      adminPassword: ["", [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      supportEmail: ["", [Validators.required, Validators.email]],
      category: ["BEGINNER", Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      releasedAt: [new Date(), Validators.required],
      longDescription: ["",[Validators.required, Validators.minLength(3)]],
      addressOne: [null],
      addressTwo: [null]
    });
  }

  ngOnInit() {

    this.courseCategories$ = this.courses.findCourseCategories();

  }

}
