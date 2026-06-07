import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from './courses.service';

export const courseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  return inject(CoursesService).findCourseById(route.params['id']);
};
