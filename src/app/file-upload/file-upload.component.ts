import { Component, inject, input, model, output, signal } from '@angular/core';
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

  fileName = signal('');
  fileUploadError = signal(false);
  fileUploadSuccess = signal(false);
  uploadProgress = signal<number | null>(null);

  onClick(fileUpload: HTMLInputElement) {
    this.touch.emit();
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileName.set(file.name);
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.fileUploadError.set(false);
      this.fileUploadSuccess.set(false);
      this.value.set(null);

      this.http
        .post('/api/thumbnail-upload', formData, { reportProgress: true, observe: 'events' })
        .pipe(
          catchError((error) => { this.fileUploadError.set(true); return of(error); }),
          finalize(() => { this.uploadProgress.set(null); })
        )
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress.set(Math.round(100 * (event.loaded / event.total)));
          } else if (event.type === HttpEventType.Response) {
            this.fileUploadSuccess.set(true);
            this.value.set(this.fileName());
          }
        });
    }
  }
}
