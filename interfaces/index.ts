// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type UserGuilds = {
  [id: string]: Guild;
};

export type Guild = {
  icon: string;
  name: string;
};

export interface User {
  uid: string;
  displayName: string;
  lastLoginAt: string;
  createdAt: string;
  photoURL: string;
}
