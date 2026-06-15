import { Component, input, model } from '@angular/core';
import { FieldTree, form, FormField, FormValueControl, required } from '@angular/forms/signals';
import { FieldErrorPipe } from '../pipes/field-error.pipe';
import { ADDRESS_DEFAULT, AddressData } from './address.model';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [FormField, FieldErrorPipe],
})
export class AddressFormComponent implements FormValueControl<AddressData> {
  readonly legend = input<string>('Address');

  readonly value = model<AddressData>({ ...ADDRESS_DEFAULT });

  readonly addressForm: FieldTree<AddressData> = form(this.value, (path) => {
    required(path.addressLine1, { message: 'Address line 1 is required.' });
    required(path.addressLine2, { message: 'Address line 2 is required.' });
    required(path.zipCode, { message: 'Zip code is required.' });
    required(path.city, { message: 'City is required.' });
  });
}
