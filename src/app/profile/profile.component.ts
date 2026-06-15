import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, readonly, required } from '@angular/forms/signals';
import { AddressFormComponent } from '../address-form/address-form.component';
import { HasUnsavedChanges } from '../guards/unsaved-changes.guard';
import { PROFILE_DEFAULT, ProfileData } from './profile.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FormField, FormRoot, AddressFormComponent]
})
export class ProfileComponent implements HasUnsavedChanges {

  profileModel = signal<ProfileData>({ ...PROFILE_DEFAULT });

  profileForm = form(
    this.profileModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required.' });
      email(schemaPath.email, { message: 'Enter a valid email address.' });
      readonly(schemaPath.email);
    },
    {
      submission: {
        action: async (f) => {
          console.log('Profile saved:', this.profileModel());
          f().reset();
        }
      }
    }
  );

  hasUnsavedChanges() {
    return this.profileForm().dirty();
  }
}
