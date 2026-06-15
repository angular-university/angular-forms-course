import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot) => {
  const http = inject(HttpClient);
  return http.get<Course>(`/api/courses/${route.params['id']}`);
};
