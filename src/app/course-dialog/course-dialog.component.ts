import { Component, input, linkedSignal, output } from '@angular/core';
import { Course } from '../model/course';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

interface CourseFormData {
  description: string;
  category: string;
  releasedAt: Date;
  longDescription: string;
}

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  imports: [FormField, FormRoot]
})
export class CourseDialogComponent {
  course = input.required<Course>();
  saved = output<CourseFormData>();
  closed = output();

  courseModel = linkedSignal<CourseFormData>(() => ({
    description: this.course().description,
    category: this.course().category,
    releasedAt: new Date(),
    longDescription: this.course().longDescription,
  }));

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
