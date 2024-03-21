export class User {
  id?: number | null;             
  name: string;
  email: string;
  password: string;
  // reviews         Review[]
  roleId?: number;
  // refresh_tokens  refresh_tokens[]
  createdAt?: Date;
  updatedAt?: Date;

  constructor(name: string, email: string, password: string, roleId: number) {
    this.name = name
    this.email = email
    this.password = password
    this.roleId = roleId
  }
  
}