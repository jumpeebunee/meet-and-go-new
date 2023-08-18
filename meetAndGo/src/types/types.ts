export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  fullname: string;
}

export interface IUser {
  email: string;
  interests: string[];
  phone: string;
  town: string;
  uid: string;
  username: string;
  reputation: number;
  totalMeets: number;
  currentCreated: number;
  createdMeets: number;
  image: string;
  archive: IEvent[];
  activeMeets: string[];
  role: string;
  isBanned: boolean;
}

export interface IActive {
  id: string;
  image: string;
  reputation: number;
}

export interface IEvent {
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
