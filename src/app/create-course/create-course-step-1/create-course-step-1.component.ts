import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator} from '../../validators/password-strength.validator';
import {createPromoRangeValidator} from '../../validators/date-range.validator';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {courseTitleValidator} from '../../validators/course-title.validator';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form: FormGroup;

  courseCategories$: Observable<any>;


  constructor(private fb: FormBuilder, private courses: CoursesService) {
    this.form = fb.group({
      title: [
        '', {
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
          asyncValidators: [courseTitleValidator(this.courses)],
          updateOn: 'blur'
        }
      ],
      adminPassword: ['', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]],
      supportEmail: ['', [Validators.required, Validators.email]],
      category: ['BEGINNER', Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      releasedAt: [new Date(), Validators.required],
      longDescription: ['', [Validators.required, Validators.minLength(3)]],
      address: [null]
    });
  }

  ngOnInit() {

    this.courseCategories$ = this.courses.findCourseCategories();

    const draftValue = localStorage.getItem("STEP_1");

    if (draftValue) {
      this.form.setValue(JSON.parse(draftValue));
    }

    this.form.valueChanges
      .pipe(
        filter(val => this.form.valid)
      )
      .subscribe(
        val => {

          localStorage.setItem("STEP_1", JSON.stringify(val));

        }
      );

  }

}
