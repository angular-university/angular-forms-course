import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
