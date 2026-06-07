import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FileUploadComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: FileUploadComponent }
  ],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFileType: string;

  fileName = '';
  fileUploadError = false;
  fileUploadSuccess = false;
  uploadProgress: number;

  onChange = (fileName: string) => {};
  onTouched = () => {};
  onValidatorChange = () => {};
  disabled = false;

  constructor(private http: HttpClient) {}

  onClick(fileUpload: HTMLInputElement) { this.onTouched(); fileUpload.click(); }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.fileUploadError = false;

      this.http.post('/api/thumbnail-upload', formData, { reportProgress: true, observe: 'events' })
        .pipe(
          catchError(error => { this.fileUploadError = true; return of(error); }),
          finalize(() => { this.uploadProgress = null; })
        )
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          } else if (event.type === HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  writeValue(value: any) { this.fileName = value; }
  registerOnChange(onChange: any) { this.onChange = onChange; }
  registerOnTouched(onTouched: any) { this.onTouched = onTouched; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
  registerOnValidatorChange(fn: () => void) { this.onValidatorChange = fn; }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) return null;
    const errors: any = { requiredFileType: this.requiredFileType };
    if (this.fileUploadError) errors.uploadFailed = true;
    return errors;
  }
}
