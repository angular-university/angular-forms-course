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

  private uploadResource = httpResource<{ url: string }>(
    () => {
      const payload = this.uploadPayload();
      if (!payload) return undefined;
      return { url: '/api/upload', method: 'POST', body: payload, reportProgress: true };
    }
  );

  uploadProgress = computed(() => {
    const p = this.uploadResource.progress();
    if (p?.type !== HttpEventType.UploadProgress || !p.total) return null;
    return Math.round(100 * p.loaded / p.total);
  });
  fileUploadError = computed(() => this.uploadResource.error() !== undefined);

  constructor() {
    effect(() => {
      const result = this.uploadResource.value();
      if (result?.url) {
        this.value.set(result.url);
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
