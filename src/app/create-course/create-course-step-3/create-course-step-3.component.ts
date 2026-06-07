import {Component, ChangeDetectionStrategy} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';


@Component({
    selector: 'create-course-step-3',
    templateUrl: 'create-course-step-3.component.html',
    styleUrls: ['create-course-step-3.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatSelect, MatOption, MatIcon, MatMiniFabButton]
})
export class CreateCourseStep3Component {

    form = this.fb.group({
        lessons: this.fb.array([])
    });


    constructor(private fb:FormBuilder) {

    }

    get lessons() {
        return this.form.controls["lessons"] as FormArray;
    }

    addLesson() {

        const lessonForm = this.fb.group({
            title: ['', Validators.required],
            level: ['beginner', Validators.required]
        });

        this.lessons.push(lessonForm);
    }

    deleteLesson(lessonIndex: number) {
        this.lessons.removeAt(lessonIndex);
    }
}






