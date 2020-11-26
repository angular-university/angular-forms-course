import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  @Input()
  requiredFileType:string;

  fileName:string = '';

  uploadProgress:number;

  validFileUploaded = false;

  constructor(private http: HttpClient) {

  }


  onFileSelected(event) {

    const file: File = event.target.files[0];

    this.fileName = file.name;

    const formData = new FormData();

    formData.append('thumbnail', file);

    this.http.post("/api/thumbnail-upload", formData, {
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      finalize(() => {
        this.uploadProgress = null;
        this.validFileUploaded = true;
      })
    )
    .subscribe(event => {

      if ( event.type === HttpEventType.UploadProgress ) {
        this.uploadProgress  = Math.round((100 * event.loaded) / event.total);
      }

    });

  }



}
