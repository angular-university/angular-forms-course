export type CourseCategory = {
  code: string;
  description: string;
};

export type Step1Data = {
  title: string;
  releasedAt: Date;
  category: string;
  downloadsAllowed: boolean;
  longDescription: string;
};

export const STEP1_DEFAULT: Step1Data = {
  title: '',
  releasedAt: new Date(),
  category: 'BEGINNER',
  downloadsAllowed: false,
  longDescription: '',
};
