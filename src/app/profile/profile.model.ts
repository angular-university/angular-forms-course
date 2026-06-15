import { AddressData, ADDRESS_DEFAULT } from '../address-form/address.model';

export type ProfileData = {
  email: string;
  address: AddressData;
};

export const PROFILE_DEFAULT: ProfileData = {
  email: '',
  address: { ...ADDRESS_DEFAULT }
};
