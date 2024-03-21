import bcrypt from "bcrypt"
import createHttpError from "http-errors"

import { User } from "../entities/User"
import { UserInterface } from "../interfaces/user.interface"
import { UserRepository } from "src/repositories/user.repository"

interface UserLogin {
  email: string;
  password: string;
}

export class UserServices {
  private userRepository: UserInterface

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id)
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async createUser(user: User, roleName?: string | null): Promise<User> {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    const createdUser = await this.userRepository.create(user, roleName)
    const finalUser = Object.assign(createdUser);
    delete finalUser.password;
    return finalUser;
  }

  async updateUser(id: number, user: User): Promise<User> {
    return this.userRepository.update(id, user)
  }

  async deleteUser(id: number): Promise<User | void> {
    return this.userRepository.delete(id)
  }

  async loginUser(userData: UserLogin): Promise<User> {
    const { email, password } = userData
    const user = await this.userRepository.findByEmail(email)
    
    if (!user) throw createHttpError.NotFound("User not registered");
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
    throw createHttpError.Unauthorized("Email address or password incorrect");

    const loginUser = await this.userRepository.findByEmailWithPermissions(email)

    return loginUser;
  }
}