import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'create-course-step-three',
  templateUrl: 'create-course-step-three.component.html',
  styleUrls: ['create-course-step-three.component.scss']
})
export class CreateCourseStepThreeComponent {

  form: FormGroup = this.fb.group({
    lessons: this.fb.array([])
  });


  constructor(private fb: FormBuilder) {

  }

  get lessons() {
    return this.form.controls['lessons'] as FormArray;
  }


  addLesson() {

    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    });

    this.lessons.push(lessonForm);
  }

}
