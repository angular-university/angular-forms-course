import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {courseTitleValidator} from '../../validators/course-title.validator';

interface CourseCategory {
    code:string;
    description:string;
}

@Component({
    selector: 'create-course-step-1',
    templateUrl: './create-course-step-1.component.html',
    styleUrls: ['./create-course-step-1.component.scss'],
    standalone: false
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
      title: ['', {
          validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(60)
          ],
          asyncValidators: [courseTitleValidator(this.courses)],
          updateOn: 'blur'
      }],
      releasedAt: [new Date(), Validators.required],
      category: ['BEGINNER', Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      longDescription: ['', [Validators.required, Validators.minLength(3)]]
      //address: [null, Validators.required]
  });

  courseCategories$ : Observable<CourseCategory[]>;


  constructor(private fb: FormBuilder, private courses:CoursesService) {

  }

  ngOnInit() {

      this.courseCategories$ = this.courses.findCourseCategories();

      const draft = localStorage.getItem("STEP_1");

      if (draft) {
          this.form.setValue(JSON.parse(draft));
      }

      this.form.valueChanges
          .pipe(
              filter(() => this.form.valid)
          )
          .subscribe( val => localStorage.setItem("STEP_1", JSON.stringify(val)));


  }

  get courseTitle() {
      return this.form.controls['title'];
  }

}
