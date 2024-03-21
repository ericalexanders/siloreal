import { User } from "../entities/User";
import { UserInterface } from "../interfaces/user.interface";

import { db } from "@utils/dbClient";
import dotenv from "dotenv";
dotenv.config();

export class UserRepository implements UserInterface {
  async findAll(): Promise<User[]> {
    const users = await db.user.findMany()
    return users
  }

  async findById(id: number): Promise<User | null> {
    const user = await db.user.findFirst({
      where: { id: id },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: true,
          },
        }
      }
    });
    return user;
  }

  async findByEmailWithPermissions(email: string): Promise<any | null> {
    const user = await db.userPermissionsView.findUnique({
      where: { email }
    })
    return user
  }

  async create(user: any, roleName?: string): Promise<User> {
    const basicRole = await db.role.findUnique({
      where: { name: roleName || 'basic' }
    })

    user.roleId = basicRole?.id
    const createdUser = await db.user.create({ data: user });
    return createdUser
  }

  async update(id: number, user: any): Promise<User> {
    const modifiedUser = db.user.update({
      where: { id: id },
      data: user,
    });
    return modifiedUser;
  }

  async delete(id: number): Promise<void | User> {
    const deletedUser = await db.user.delete({
      where: { id: id },
    });
    return deletedUser;
  }
}