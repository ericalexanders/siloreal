import { Router } from "express";

import { getMovies } from "@controllers/movies.controllers";

const router = Router();

router.get("/:id?", getMovies);

const isProtected = true;
export { router, isProtected };