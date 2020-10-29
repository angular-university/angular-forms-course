import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: "create-course-step-two",
  templateUrl: "create-course-step-two.component.html",
  styleUrls: ["create-course-step-two.component.scss"]
})
export class CreateCourseStepTwoComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {



  }


}
