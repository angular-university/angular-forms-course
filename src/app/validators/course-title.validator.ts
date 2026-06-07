import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return from(courses.findAllCourses()).pipe(
      map(allCourses => {
        const found = allCourses.find(
          c => c.description.toLowerCase() === control.value.toLowerCase()
        );
        return found ? { titleExists: true } : null;
      })
    );
  };
}
