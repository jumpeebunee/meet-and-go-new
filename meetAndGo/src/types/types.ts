export type ILogin = {
  email: string;
  password: string;
}

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
  archive: IEvent[],
  activeMeets: string[],
}

export type IActive = {
  id: string;
  image: string;
}

export type IEvent = {
  activeUsers: IActive[];
  address: string;
  contribution: string;
  coords: number[];
  date: string;
  id: string;
  leader: string;
  location: string;
  placemark: number;
  title: string;
  totalUsers: number;
}