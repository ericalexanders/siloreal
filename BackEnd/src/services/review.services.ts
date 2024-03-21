import { Review } from "@prisma/client";

import { db } from "@utils/dbClient";

export const getReviews = (): Promise<Review []> => {
  return db.review.findMany()
}

export const createReview = (review: Review) => {
  return db.review.create({
    data: review
  })
}

export const updateReview = (id: number, review: Review): Promise<Review> => {
  return db.review.update({
   where: { id },
   data: review 
  })
}

export const deleteReview = (id: number): Promise<Review> => {
  return db.review.delete({ where: { id } })
}