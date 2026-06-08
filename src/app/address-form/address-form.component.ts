import { Component, input, model } from '@angular/core';
import { FieldTree, form, FormField, FormValueControl, required, schema } from '@angular/forms/signals';
import { FieldErrorPipe } from '../pipes/field-error.pipe';
import { ADDRESS_DEFAULT, AddressData } from './address.model';

const addressSchema = schema<AddressData>((path) => {
  required(path.addressLine1, { message: 'Address line 1 is required.' });
  required(path.addressLine2, { message: 'Address line 2 is required.' });
  required(path.zipCode, { message: 'Zip code is required.' });
  required(path.city, { message: 'City is required.' });
});

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [FormField, FieldErrorPipe],
})
export class AddressFormComponent implements FormValueControl<AddressData> {
  readonly legend = input<string>('Address');

  // Required by FormValueControl — the parent's [formField] keeps this in sync
  readonly value = model<AddressData>({ ...ADDRESS_DEFAULT });

  // Internal form: decomposes the value signal into typed sub-fields with validation
  readonly addressForm: FieldTree<AddressData> = form(this.value, addressSchema);
}
