import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { debounce, form, FormField, minLength, maxLength, required } from '@angular/forms/signals';
import { FieldErrorComponent } from '../../field-error/field-error.component';
import { courseTitleExists } from '../../validators/course-title.validator';
import { requiredTrue } from '../../validators/required-true.validator';
import { CourseCategory, STEP1_DEFAULT, Step1Data } from './step1.model';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
  imports: [FormField, FieldErrorComponent],
})
export class CreateCourseStep1Component {
  private categoriesResource = httpResource<CourseCategory[]>(
    () => '/api/course-categories',
    { parse: (res: any) => res.categories as CourseCategory[], defaultValue: [] as CourseCategory[] }
  );
  courseCategories = this.categoriesResource.value;

  step1Model = signal<Step1Data>({ ...STEP1_DEFAULT });

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

}
