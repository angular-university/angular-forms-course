import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../model/course';
import { RouterLink } from '@angular/router';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink, CourseDialogComponent]
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];
  selectedCourse: Course | null = null;

  ngOnInit() {}

  editCourse(course: Course) {
    this.selectedCourse = course;
  }
}
