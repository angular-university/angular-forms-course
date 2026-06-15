import { Component, computed, effect, input, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  course = input.required<Course>();

  pageIndex = signal(0);
  readonly pageSize = 3;
  sortDirection = signal<'asc' | 'desc'>('asc');

  rawSearch = signal('');
  private searchFilter = signal('');

  constructor() {
    // Debounce: wait 150ms after the last keystroke before updating searchFilter,
    // so lessonsResource doesn't fire a new HTTP request on every character typed.
    effect((onCleanup) => {
      const val = this.rawSearch();
      const id = setTimeout(() => {
        this.searchFilter.set(val);
        this.pageIndex.set(0);
      }, 150);
      onCleanup(() => clearTimeout(id));
    });
  }

  private lessonsResource = httpResource<Lesson[]>(
    () => ({
      url: '/api/lessons',
      params: {
        courseId: this.course().id,
        filter: this.searchFilter(),
        sortOrder: this.sortDirection(),
        pageNumber: this.pageIndex(),
        pageSize: this.pageSize
      }
    }),
    { parse: (res: any) => res.payload as Lesson[], defaultValue: [] as Lesson[] }
  );

  lessons = computed(() => this.lessonsResource.value());
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
