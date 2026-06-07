import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { LessonsDataSource } from '../services/lessons.datasource';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AsyncPipe]
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  dataSource: LessonsDataSource;

  @ViewChild('input', { static: true }) input: ElementRef;

  pageIndex = 0;
  pageSize = 3;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new LessonsDataSource(this.coursesService);
    this.dataSource.loadLessons(this.course.id, '', this.sortDirection, 0, this.pageSize);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged(), tap(() => {
        this.pageIndex = 0;
        this.loadLessonsPage();
      }))
      .subscribe();
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.pageIndex = 0;
    this.loadLessonsPage();
  }

  nextPage() { this.pageIndex++; this.loadLessonsPage(); }
  prevPage() { if (this.pageIndex > 0) { this.pageIndex--; this.loadLessonsPage(); } }

  loadLessonsPage() {
    this.dataSource.loadLessons(
      this.course.id,
      this.input.nativeElement.value,
      this.sortDirection,
      this.pageIndex,
      this.pageSize
    );
  }
}
