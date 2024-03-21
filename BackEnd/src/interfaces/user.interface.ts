import { User } from "../entities/User"

export interface UserInterface {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByEmailWithPermissions(email: string): Promise<any | null> 
  create(user: User, roleName?: string| null): Promise<User>
  update(id: number, user: User): Promise<User>
  delete(id: number): Promise<void | User>
}