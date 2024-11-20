export class UserEntity {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  // createdAt: number; // timestamp of creation
  createdAt: Date; // timestamp of creation
  // updatedAt: number; // timestamp of last update
  updatedAt: Date; // timestamp of last update
}
