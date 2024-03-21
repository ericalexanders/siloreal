import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import { UserServices } from "@services/user.services";

const UserProvider = new UserServices();

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = id 
      ? await UserProvider.getUserById(+id) 
      : await UserProvider.getUsers()
    
    if (!user) throw new createHttpError.NotFound("User not found");
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const postUser = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserProvider.createUser(body);
    res.send(user);
  } catch (error) {
    console.log('ErrorCreated: ', error)
    next(error)
  }
};

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const modifiedUser = await UserProvider.updateUser(+id, body);
    res.send(modifiedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserProvider.deleteUser(+id);
    res.send({ status: "ok", deleted: deletedUser });
  } catch (error) {
    next(error);
  }
};
