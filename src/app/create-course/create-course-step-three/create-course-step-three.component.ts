import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'create-course-step-three',
  templateUrl: 'create-course-step-three.component.html',
  styleUrls: ['create-course-step-three.component.scss']
})
export class CreateCourseStepThreeComponent {

  form: FormGroup = this.fb.group({});


  constructor(private fb: FormBuilder) {

  }

}
