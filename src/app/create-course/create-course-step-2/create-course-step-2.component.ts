import { Component, signal } from '@angular/core';
import { disabled, form, FormField, max, min, required } from '@angular/forms/signals';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { FieldErrorPipe } from '../../pipes/field-error.pipe';
import { STEP2_DEFAULT, Step2Data } from './step2.model';
import { promoPeriod } from '../../validators/promo-period.validator';

@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss'],
  imports: [FormField, FileUploadComponent, FieldErrorPipe],
})
export class CreateCourseStep2Component {
  step2Model = signal<Step2Data>({...STEP2_DEFAULT});

  step2Form = form(this.step2Model, (schemaPath) => {
    required(schemaPath.courseType, { message: 'Course type is required.' });

    required(schemaPath.price, { message: 'Price is required.' });
    min(schemaPath.price, 1, { message: 'Price must be at least 1.' });
    max(schemaPath.price, 9999, { message: 'Price must be at most 9999.' });
    disabled(schemaPath.price, { when: (ctx) => ctx.valueOf(schemaPath.courseType) === 'free' });

    promoPeriod(schemaPath, { message: 'Start date must be before end date.' });
  });
}
