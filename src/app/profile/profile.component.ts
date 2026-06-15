import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AddressFormComponent } from '../address-form/address-form.component';
import { TouchedErrorPipe } from '../pipes/touched-error.pipe';
import { PROFILE_DEFAULT, ProfileData } from './profile.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FormField, FormRoot, AddressFormComponent, TouchedErrorPipe]
})
export class ProfileComponent {
  profileModel = signal<ProfileData>({ ...PROFILE_DEFAULT });

  profileForm = form(
    this.profileModel,
    (schemaPath) => {
      required(schemaPath.firstName, { message: 'First name is required.' });
      required(schemaPath.lastName, { message: 'Last name is required.' });
    },
    {
      submission: {
        action: async () => {
          console.log('Profile saved:', this.profileModel());
        }
      }
    }
  );
}
