import { Express } from "express-serve-static-core";

interface User {
  id: number;
  email: string;
  password?: string;
  name: string;
  iat: number;
  exp: number;
}  


declare module 'express-serve-static-core' {
  interface Request {
     user: User;
  }
}
