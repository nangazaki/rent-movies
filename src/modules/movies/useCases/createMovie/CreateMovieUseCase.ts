import { Movie } from "@prisma/client";
import { AppError } from "../../../../errors/error";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "./../../dtos/createMovieDTO";

export class CreateMovieUseCase {
  async execute({
    title,
    duration,
    release_date,
  }: CreateMovieDTO): Promise<Movie> {
    // Verificar se o Filme ja existe
    const movieAlreadyExists = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    // Tratar erro
    if (movieAlreadyExists) {
      throw new AppError("Movie already exists!");
    }

    // Criar Movie
    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date,
      },
    });

    return movie;
  }
}
