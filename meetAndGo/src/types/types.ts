export type IRegister = {
  email: string;
  password: string;
  fullname: string;
}

export type IUser = {
  email: string,
  interests: string[],
  phone: string,
  town: string,
  uid: string,
  username: string,
  reputation: number,
  totalMeets: number,
  currentCreated: number
  createdMeets: number,
  image: string,
  activeMeets: string[],
}