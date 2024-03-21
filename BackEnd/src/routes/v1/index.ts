import { Router } from "express";
import { readdirSync } from "fs";

import authMiddleware from "@middlewares/auth";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index" && cleanName !== "swagger") {
    import(`./${cleanName}`).then((moduleRouter) => {
      if (moduleRouter.isProtected) {
        console.log(`Loading protected route... /v1/${cleanName}`);
        router.use(`/${cleanName}`, authMiddleware, moduleRouter.router);
      } else {
        console.log(`Loading public route... /v1/${cleanName}`);
        router.use(`/${cleanName}`, moduleRouter.router);
      }
    });
  }
});

export { router };
