import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

    @Input()
    requiredFileType:string;

    fileName = '';

    fileUploadError = false;

    uploadProgress:number;

    constructor(private http: HttpClient) {

    }

    onFileSelected(event) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            this.fileUploadError = false;

            this.http.post("/api/thumbnail-upload", formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                catchError(error => {
                    this.fileUploadError = true;
                    return of(error);
                }),
                finalize(() => {
                    this.uploadProgress = null;
                })
            )
            .subscribe(event => {
                if (event.type == HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                }
            });



        }

    }

}












