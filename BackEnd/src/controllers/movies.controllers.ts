import { Request, Response, NextFunction } from "express";

import * as MovieProvider from "@services/movie.services"

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const movies = id 
      ? await MovieProvider.getMovieById(+id) 
      : await MovieProvider.getMovies()
    res.send(movies)
  } catch (error) {
    next(error)
  }
}