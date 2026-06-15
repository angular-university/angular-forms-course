import { AddressData, ADDRESS_DEFAULT } from '../address-form/address.model';

export type ProfileData = {
  email: string;
  avatarUrl: string | null;
  address: AddressData;
};

export const PROFILE_DEFAULT: ProfileData = {
  email: '',
  avatarUrl: null,
  address: { ...ADDRESS_DEFAULT }
};
