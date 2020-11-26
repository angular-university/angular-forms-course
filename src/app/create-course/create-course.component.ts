import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';




@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateCourseComponent implements OnInit {


  constructor() {

  }


  ngOnInit() {



  }


  submit(step1, step2,step3) {

    console.log("Step 1 form value", step1);

    console.log("Step 2 form value", step2);

    console.log("Step 3 form value", step3);

  }

}
