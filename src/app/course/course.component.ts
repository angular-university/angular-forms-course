import { Component, computed, effect, inject, input, resource, signal } from '@angular/core';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],

})
export class CourseComponent {
  course = input.required<Course>();

  private coursesService = inject(CoursesService);

  pageIndex = signal(0);
  readonly pageSize = 3;
  sortDirection = signal<'asc' | 'desc'>('asc');

  rawSearch = signal('');
  private searchFilter = signal('');

  constructor() {
    effect((onCleanup) => {
      const val = this.rawSearch();
      const id = setTimeout(() => {
        this.searchFilter.set(val);
        this.pageIndex.set(0);
      }, 150);
      onCleanup(() => clearTimeout(id));
    });
  }

  private lessonsResource = resource<Lesson[], { courseId: number; filter: string; sortOrder: string; pageIndex: number; pageSize: number }>({
    params: () => ({
      courseId: this.course().id,
      filter: this.searchFilter(),
      sortOrder: this.sortDirection(),
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize
    }),
    loader: ({ params: p }) =>
      this.coursesService.findLessons(p.courseId, p.filter, p.sortOrder, p.pageIndex, p.pageSize)
  });

  lessons = computed(() => this.lessonsResource.value() ?? []);
  loading = computed(() => this.lessonsResource.isLoading());

  onSearch(e: Event) {
    this.rawSearch.set((e.target as HTMLInputElement).value);
  }

  toggleSort() {
    this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    this.pageIndex.set(0);
  }

  nextPage() { this.pageIndex.update(p => p + 1); }
  prevPage() { if (this.pageIndex() > 0) this.pageIndex.update(p => p - 1); }
}
