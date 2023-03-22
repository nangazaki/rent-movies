import { Router } from "express";
import { CreateMovieController } from './../modules/movies/useCases/createMovie/CreateMovieController';
import { CreateMovieRentController } from './../modules/movie_rent/useCases/createMovieRent/CreateMovieRentController';

const createMovieController = new CreateMovieController();
const createMovieRentController = new CreateMovieRentController();

const movieRoutes = Router();

movieRoutes.post("/", createMovieController.handle);
movieRoutes.post("/rent", createMovieRentController.handle)

export { movieRoutes };
