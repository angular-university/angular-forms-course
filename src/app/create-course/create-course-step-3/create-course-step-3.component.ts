import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, ReactiveFormsModule]
})
export class CreateCourseStep3Component {
  form = this.fb.group({ lessons: this.fb.array([]) });

  constructor(private fb: FormBuilder) {}

  get lessons() { return this.form.controls['lessons'] as FormArray; }

  addLesson() {
    this.lessons.push(this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    }));
  }

  deleteLesson(i: number) { this.lessons.removeAt(i); }
}
