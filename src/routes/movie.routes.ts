import { GetMoviesByReleaseDateController } from "./../modules/movies/useCases/getMovieByReleaseDate/GetMoviesByReleaseDateController";
import { Router } from "express";
import { CreateMovieController } from "./../modules/movies/useCases/createMovie/CreateMovieController";
import { CreateMovieRentController } from "./../modules/movie_rent/useCases/createMovieRent/CreateMovieRentController";

const createMovieController = new CreateMovieController();
const createMovieRentController = new CreateMovieRentController();
const getMoviesByReleaseControlller = new GetMoviesByReleaseDateController();

const movieRoutes = Router();

movieRoutes.post("/", createMovieController.handle);
movieRoutes.post("/rent", createMovieRentController.handle);

movieRoutes.get("/release", getMoviesByReleaseControlller.handle);

export { movieRoutes };
