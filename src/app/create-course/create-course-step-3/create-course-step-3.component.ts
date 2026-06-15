import { Component, signal } from '@angular/core';
import { applyEach, form, FormField, required } from '@angular/forms/signals';
import { Lesson, Step3Data } from './step3.model';

@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss'],
  imports: [FormField],
})
export class CreateCourseStep3Component {
  step3Model = signal<Step3Data>({ lessons: [] });

  step3Form = form(this.step3Model, (schemaPath) => {
    applyEach(schemaPath.lessons, (lessonPath) => {
      required(lessonPath.title, { message: 'Lesson title is required.' });
      required(lessonPath.level, { message: 'Lesson level is required.' });
    });
  });

  addLesson() {
    this.step3Model.update((m) => ({
      ...m,
      lessons: [...m.lessons, { title: '', level: 'beginner' } satisfies Lesson],
    }));
  }

  deleteLesson(i: number) {
    this.step3Model.update((m) => ({
      ...m,
      lessons: m.lessons.filter((_, idx) => idx !== i),
    }));
  }
}
