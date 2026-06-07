import { Component, ChangeDetectionStrategy, inject, input, OnInit, output } from '@angular/core';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule]
})
export class CourseDialogComponent implements OnInit {
  course = input.required<Course>();
  saved = output<any>();
  closed = output<void>();

  private fb = inject(FormBuilder);
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      description:     [this.course().description,     Validators.required],
      category:        [this.course().category,        Validators.required],
      releasedAt:      [new Date(),                    Validators.required],
      longDescription: [this.course().longDescription, Validators.required]
    });
  }

  save()  { this.saved.emit(this.form.value); }
  close() { this.closed.emit(); }
}
