export class Profile {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  jobTitle?: string;
  phoneNumber?: string;

  constructor() {}

  static create(
    firstName: string,
    lastName: string,
    id?: string,
    avatarUrl?: string,
    jobTitle?: string,
    phoneNumber?: string,
  ): Profile {
    const profile = new Profile();
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.avatarUrl = avatarUrl;
    profile.jobTitle = jobTitle;
    profile.phoneNumber = phoneNumber;
    return profile;
  }
}
