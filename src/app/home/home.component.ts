import { Component, computed, inject, resource, signal } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { RouterLink } from '@angular/router';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, CoursesCardListComponent]
})
export class HomeComponent {
  private coursesService = inject(CoursesService);

  activeTab = signal<'beginner' | 'advanced'>('beginner');

  private coursesResource = resource({
    loader: () => this.coursesService.findAllCourses()
  });

  beginnerCourses = computed(() =>
    (this.coursesResource.value() ?? []).filter((c: Course) => c.category === 'BEGINNER')
  );

  advancedCourses = computed(() =>
    (this.coursesResource.value() ?? []).filter((c: Course) => c.category === 'ADVANCED')
  );
}
