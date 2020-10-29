import {CoursesService} from '../services/courses.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {map} from 'rxjs/operators';


export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return courses.findAllCourses()
      .pipe(
        map(courses => {

          const course = courses.find(course => course.description.toLowerCase() == control.value.toLowerCase());

          return course ? {titleExists:true} : null;
        })
      )
  };
}
