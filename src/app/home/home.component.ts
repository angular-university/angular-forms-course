import { Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Course } from '../model/course';
import { RouterLink } from '@angular/router';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, CoursesCardListComponent]
})
export class HomeComponent {
  activeTab = signal<'beginner' | 'advanced'>('beginner');

  private coursesResource = httpResource<Course[]>(
    () => '/api/courses',
    { parse: (res: any) => res.payload as Course[], defaultValue: [] as Course[] }
  );

  beginnerCourses = computed(() =>
    this.coursesResource.value().filter(c => c.category === 'BEGINNER')
  );

  advancedCourses = computed(() =>
    this.coursesResource.value().filter(c => c.category === 'ADVANCED')
  );
}
