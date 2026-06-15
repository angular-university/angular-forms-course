import { Component, inject, input, model, output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent implements FormValueControl<string | null> {
  private http = inject(HttpClient);

  readonly requiredFileType = input<string>('');

  // FormValueControl contract
  readonly value = model<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly touch = output<void>();

  fileName = '';
  fileUploadError = false;
  fileUploadSuccess = false;
  uploadProgress: number | null = null;

  onClick(fileUpload: HTMLInputElement) {
    this.touch.emit();
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.fileUploadError = false;
      this.fileUploadSuccess = false;
      this.value.set(null);

      this.http
        .post('/api/thumbnail-upload', formData, { reportProgress: true, observe: 'events' })
        .pipe(
          catchError((error) => { this.fileUploadError = true; return of(error); }),
          finalize(() => { this.uploadProgress = null; })
        )
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          } else if (event.type === HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.value.set(this.fileName);
          }
        });
    }
  }
}
