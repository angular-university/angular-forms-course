import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { HttpEventType, httpResource } from '@angular/common/http';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent implements FormValueControl<string | null> {
  readonly requiredFileType = input<string>('');

  // FormValueControl contract
  readonly value = model<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly touch = output<void>();

  fileName = signal('');
  private uploadPayload = signal<FormData | null>(null);

  private uploadResource = httpResource(
    () => {
      const payload = this.uploadPayload();
      if (!payload) return undefined;
      return { url: '/api/thumbnail-upload', method: 'POST', body: payload, reportProgress: true };
    }
  );

  uploadProgress = computed(() => {
    const p = this.uploadResource.progress();
    if (p?.type !== HttpEventType.UploadProgress || !p.total) return null;
    return Math.round(100 * p.loaded / p.total);
  });
  fileUploadSuccess = computed(() => this.uploadResource.hasValue());
  fileUploadError = computed(() => this.uploadResource.error() !== undefined);

  constructor() {
    effect(() => {
      if (this.uploadResource.hasValue()) {
        this.value.set(this.fileName());
      }
    });
  }

  onClick(fileUpload: HTMLInputElement) {
    this.touch.emit();
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileName.set(file.name);
      this.value.set(null);
      const formData = new FormData();
      formData.append('thumbnail', file);
      this.uploadPayload.set(formData);
    }
  }
}
