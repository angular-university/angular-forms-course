import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { debounce, form, FormField, minLength, maxLength, required } from '@angular/forms/signals';
import { CoursesService } from '../../services/courses.service';
import { FieldErrorPipe } from '../../pipes/field-error.pipe';
import { courseTitleExists } from '../../validators/course-title.validator';
import { requiredTrue } from '../../validators/required-true.validator';
import { CourseCategory, STEP1_DEFAULT, Step1Data } from './step1.model';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
  imports: [FormField, FieldErrorPipe],
})
export class CreateCourseStep1Component {
  private courses = inject(CoursesService);

  courseCategories = toSignal(from(this.courses.findCourseCategories()), {
    initialValue: [] as CourseCategory[],
  });

  step1Model = signal<Step1Data>(
    (() => {
      const draft = localStorage.getItem('STEP_1');
      if (!draft) return { ...STEP1_DEFAULT };
      const parsed = JSON.parse(draft);
      return { ...parsed, releasedAt: new Date(parsed.releasedAt) };
    })()
  );

  step1Form = form(this.step1Model, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required.' });
    minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
    maxLength(schemaPath.title, 60, { message: 'Title must be at most 60 characters.' });
    debounce(schemaPath.title, 'blur');
    courseTitleExists(schemaPath.title);

    required(schemaPath.releasedAt, { message: 'Release date is required.' });
    required(schemaPath.category, { message: 'Category is required.' });

    requiredTrue(schemaPath.downloadsAllowed, { message: 'You must allow downloads.' });

    required(schemaPath.longDescription, { message: 'Description is required.' });
    minLength(schemaPath.longDescription, 3, { message: 'Description must be at least 3 characters.' });
  });

  constructor() {
    effect(() => {
      if (this.step1Form().valid()) {
        localStorage.setItem('STEP_1', JSON.stringify(this.step1Model()));
      }
    });
  }
}
