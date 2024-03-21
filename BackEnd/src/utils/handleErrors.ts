import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { CompanyExistError } from './errorTemplates'


const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError) => {

  switch(error.code) {
    case 'P2002':
      const message = `A company with this information already exists`
      return new CompanyExistError(message)
    default:
      return { code: error.code, message: 'There are some problems with the database' }
  }
}

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
  ) => {

  // if (res.headersSent) {
  //   return next(error);
  // }
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(error)
    // res
    // .status(error.status)
    // .send({ status: error.code, message: error.message});  
  }
  
  const status = error.status || 500;

  res
    .status(status)
    .send({ status: status, message: error.message});
}
