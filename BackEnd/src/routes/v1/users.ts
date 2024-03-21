import { Router } from "express";
import {
  getUsers,
  postUser,
  patchUser,
  deleteUser
} from "@controllers/user.controllers";

const router = Router();

// const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await schema.validate({
//       body: req.body,
//       query: req.query,
//       params: req.params,
//     });
//     return next();
//   } catch (err: any) {
//     return res.status(500).json({ type: err.name, message: err.message });
//   }
// };

router.get("/:id?", getUsers);
router.post("/", postUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);

const isProtected = true;
export { router, isProtected };
