import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressFormComponent)
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

  @Input()
  legend:string;

  form: FormGroup;

  onTouched: Function = noop;

  onChangeSubs: Subscription[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      addressLine1: ["", Validators.required],
      addressLine2: ["", Validators.required],
      zipCode: ["", Validators.required],
      city: ["", Validators.required]
    });
  }

  ngOnDestroy() {
    for (let sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, {emitEvent: false});
    }
  }

}
