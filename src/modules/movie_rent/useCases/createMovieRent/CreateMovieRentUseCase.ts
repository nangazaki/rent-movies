import { AppError } from "./../../../../errors/error";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "./../../dtos/createMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ userId, movieId }: CreateMovieRentDTO): Promise<void> {
    // Verificar se o filme existe
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      throw new AppError("Movie does not exists!");
    }

    // Verificar se o filme nao esta alugado para outra pessoa
    const movieAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      },
    });

    if (movieAlreadyRented) {
      throw new AppError("Movie already rented!");
    }

    // Verificar se o usario existe
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User does not exists!");
    }

    // Criar a locacao
    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      },
    });
  }
}
