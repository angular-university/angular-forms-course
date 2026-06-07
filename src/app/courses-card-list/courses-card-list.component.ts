import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";
import { MatCard, MatCardHeader, MatCardTitle, MatCardImage, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardImage, MatCardContent, MatCardActions, MatButton, RouterLink]
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {

    }

    editCourse({description, longDescription, category}:Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            description, longDescription, category
        };

        const dialogRef = this.dialog.open(CourseDialogComponent,
            dialogConfig);


        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
        );

    }

}









