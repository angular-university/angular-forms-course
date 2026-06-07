import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CreateCourseStep1Component } from './create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './create-course-step-2/create-course-step-2.component';
import { CreateCourseStep3Component } from './create-course-step-3/create-course-step-3.component';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CreateCourseStep1Component, CreateCourseStep2Component, CreateCourseStep3Component]
})
export class CreateCourseComponent {
  currentStep = 0;

  submit(step1: any, step2: any, step3: any) {
    console.log(step1, step2, step3);
  }
}
