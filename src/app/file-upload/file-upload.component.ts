import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent
    },
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

  @Input()
  requiredFileType:string;

  fileName:string = '';

  uploadProgress:number;

  fileUploadError = false;
  validFileUploaded = false;

  disabled = false;

  onTouched = () => {};

  onChange = (val) => {};

  onValidationChange = () => {};

  constructor(private http: HttpClient) {

  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
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
      catchError(error => {
        this.fileUploadError = true;
        return of(error);
      }),
      finalize(() => {
        this.uploadProgress = null;
      })
    )
    .subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((100 * event.loaded) / event.total);
      }
      else if (event.type == HttpEventType.Response) {
        console.log('file uploaded');
        this.validFileUploaded = true;
        this.onChange(file.name);
        this.onValidationChange();
      }

    });

  }

  registerOnChange(onChange: any) {
   this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(obj: any) {
    // not applicable to a file upload control
  }

  registerOnValidatorChange(fn: () => void) {
    this.onValidationChange = fn;
  }

  validate(control: AbstractControl) {

    if (this.validFileUploaded) {
      return null;
    }

    let errors : any = {
      requiredFileType: this.requiredFileType
    };


    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }
}
