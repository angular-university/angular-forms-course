import { Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddressFormComponent }],
  imports: [FormsModule, ReactiveFormsModule]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  @Input() legend: string;

  onTouched = () => {};
  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  registerOnChange(onChange: any) { this.onChangeSub = this.form.valueChanges.subscribe(onChange); }
  ngOnDestroy() { this.onChangeSub.unsubscribe(); }
  writeValue(value: any) { if (value) { this.form.setValue(value); } }
  registerOnTouched(onTouched: any) { this.onTouched = onTouched; }
  setDisabledState(disabled: boolean) { disabled ? this.form.disable() : this.form.enable(); }
}
