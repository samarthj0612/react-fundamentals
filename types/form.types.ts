export enum Gender {
  FEMALE = "female",
  MALE = "male",
  OTHER = "other",
}

export interface SignupForm {
  fname: string;
  lname: string;
  dob: string;
  gender: Gender;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
