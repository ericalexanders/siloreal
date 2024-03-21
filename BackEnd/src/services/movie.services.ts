import { Movie } from "@prisma/client";

import { db } from "@utils/dbClient";

export const getMovies = (): Promise<Movie []> => {
  return db.movie.findMany({
    include: {
      reviews: true
    }
  })
}

export const getMovieById = (id: number) => {
  return db.movie.findUnique({
    where: { id },
    include: {
      reviews: true
    }
  })
}