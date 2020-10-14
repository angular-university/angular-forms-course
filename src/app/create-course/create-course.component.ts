import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = fb.group({
      title: ["", Validators.required],
      category: ["BEGINNER", Validators.required],
      releasedAt: [new Date(), Validators.required],
      longDescription: ["",Validators.required]
    });

  }

  ngOnInit() {



  }

}
