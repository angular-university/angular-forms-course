import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AsyncPipe, RouterLink, CoursesCardListComponent]
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  activeTab: 'beginner' | 'advanced' = 'beginner';

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    const courses$ = this.coursesService.findAllCourses();
    this.beginnerCourses$ = courses$.pipe(map(c => c.filter(c => c.category === 'BEGINNER')));
    this.advancedCourses$ = courses$.pipe(map(c => c.filter(c => c.category === 'ADVANCED')));
  }
}
