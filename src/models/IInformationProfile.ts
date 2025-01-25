import { BaseModel } from "./base";

export interface IInformationProfile {
  email: string;
  username: string;
  bio: string;
  fullName: string;
  address: string;
  phone: string;
  dob: string;
  nickname: string;
  hobbies: string;
  createdTime: string;
  updatedTime: string;
  avatar: string;
  linkGithub: string;
  linkFacebook: string;
  linkInstagram: string;
  linkTwitter: string;
}
export type IInformationProfileResponse = BaseModel<IInformationProfile>;
