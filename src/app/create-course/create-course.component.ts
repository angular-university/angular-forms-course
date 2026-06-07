import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { CreateCourseStep1Component } from './create-course-step-1/create-course-step-1.component';
import { MatButton } from '@angular/material/button';
import { CreateCourseStep2Component } from './create-course-step-2/create-course-step-2.component';
import { CreateCourseStep3Component } from './create-course-step-3/create-course-step-3.component';




@Component({
    selector: 'create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
        }
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatStepper, MatStep, MatStepLabel, CreateCourseStep1Component, MatButton, MatStepperNext, CreateCourseStep2Component, MatStepperPrevious, CreateCourseStep3Component]
})
export class CreateCourseComponent implements OnInit {


  ngOnInit() {

  }


    submit(step1, step2, step3) {

      console.log(step1, step2, step3);

    }

}
