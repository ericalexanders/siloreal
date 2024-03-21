import { Router } from "express";

import { createReview, updateReview, deleteReview } from "@controllers/reviews.controllers";

const router = Router();

router.post("/", createReview);
router.put("/:id", updateReview);
router.post("/:id", deleteReview);

const isProtected = true;
export { router, isProtected };