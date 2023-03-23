import { prisma } from "../../../../prisma/client";
import { AppError } from "./../../../../errors/error";
import { CreateMovieRentDTO } from "./../../dtos/createMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    // Verify if the movie exists
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      throw new AppError("Movie does not exists!");
    }

    // Verify if the movie did rent for another person
    const movieAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      },
    });

    if (movieAlreadyRented) {
      throw new AppError("Movie already rented!");
    }

    // Verify if the user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User does not exists!");
    }

    // Create a movie rental
    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      },
    });
  }
}
