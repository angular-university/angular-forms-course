import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { Course } from '../model/course';
import { RouterLink } from '@angular/router';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CourseDialogComponent]
})
export class CoursesCardListComponent {
  courses = input<Course[]>([]);
  selectedCourse = signal<Course | null>(null);

  editCourse(course: Course) {
    this.selectedCourse.set(course);
  }
}
