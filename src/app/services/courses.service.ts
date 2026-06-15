import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private http = inject(HttpClient);

  findCourseById(courseId: number): Promise<Course> {
    return lastValueFrom(this.http.get<Course>(`/api/courses/${courseId}`));
  }

  findCourseCategories(): Promise<any[]> {
    return lastValueFrom(this.http.get<any>('/api/course-categories').pipe(
      map(res => res['categories'])
    ));
  }

  findAllCourses(): Promise<Course[]> {
    return lastValueFrom(this.http.get<any>('/api/courses').pipe(
      map(res => res['payload'] as Course[])
    ));
  }

  findLessons(
    courseId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3
  ): Promise<Lesson[]> {
    return lastValueFrom(this.http.get<any>('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(map(res => res['payload'] as Lesson[])));
  }
}
