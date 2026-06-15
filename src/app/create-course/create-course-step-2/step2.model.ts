export type Step2Data = {
  courseType: string;
  price: number | null;
  thumbnail: string | null;
  promoStartAt: Date | null;
  promoEndAt: Date | null;
};

export const STEP2_DEFAULT: Step2Data = {
  courseType: 'premium',
  price: null,
  thumbnail: null,
  promoStartAt: null,
  promoEndAt: null,
};
