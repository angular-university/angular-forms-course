import { Component, input, output, signal } from '@angular/core';
import { Course } from '../model/course';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { TouchedErrorPipe } from '../pipes/touched-error.pipe';

type CourseFormData = {
  description: string;
  category: string;
  releasedAt: Date;
  longDescription: string;
};

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  imports: [FormField, FormRoot, TouchedErrorPipe]
})
export class CourseDialogComponent {
  course = input.required<Course>();
  saved = output<CourseFormData>();
  closed = output();

  courseModel = signal({
    description: this.course().description,
    category: this.course().category,
    releasedAt: new Date(),
    longDescription: this.course().longDescription,
  } as CourseFormData);

  courseForm = form(
    this.courseModel,
    (schemaPath) => {
      required(schemaPath.description, { message: 'Description is required.' });
      required(schemaPath.category, { message: 'Category is required.' });
      required(schemaPath.releasedAt, { message: 'Release date is required.' });
      required(schemaPath.longDescription, { message: 'Long description is required.' });
    },
    {
      submission: {
        action: async () => {
          this.saved.emit(this.courseModel());
        }
      }
    }
  );

  close() { this.closed.emit(); }
}
