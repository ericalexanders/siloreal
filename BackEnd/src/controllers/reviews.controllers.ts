import { Request, Response, NextFunction } from "express";

import * as ReviewProvider from "@services/review.services"

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await ReviewProvider.createReview(req.body)
    res.send(reviews)
  } catch (error) {
    next(error)
  }
}

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await ReviewProvider.updateReview(+req.params?.id, req.body)
    res.send(reviews)
  } catch (error) {
    next(error)
  }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await ReviewProvider.deleteReview(+req.params?.id)
    res.send({ deleted: reviews})
  } catch (error) {
    next(error)
  }
}