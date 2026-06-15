import { AddressData, ADDRESS_DEFAULT } from '../address-form/address.model';

export type ProfileData = {
  firstName: string;
  lastName: string;
  address: AddressData;
};

export const PROFILE_DEFAULT: ProfileData = {
  firstName: '',
  lastName: '',
  address: { ...ADDRESS_DEFAULT }
};
