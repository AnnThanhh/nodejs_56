export class CreateEmailDto {
  id: number;
  userId: number;
  foodId: number;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  Users: Users;
  Foods: Foods;
}

export class Users {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  age: any;
  totpSecret: string;
  googleId: any;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  password: string;
  lastActiveAt: any;
  roleId: any;
}

export class Foods {
  id: number;
  name: string;
  description: string;
  deletedBy: number;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
}
