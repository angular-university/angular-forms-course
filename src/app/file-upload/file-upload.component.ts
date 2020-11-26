import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  @Input()
  requiredFileType:string;

  fileName:string = '';

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
    .subscribe(console.log);

  }



}
