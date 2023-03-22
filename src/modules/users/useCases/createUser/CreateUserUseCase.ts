import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "./../../../../errors/error";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    // Verificar se o usuario ja existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // erro
    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    // Se nao existe criar um novo usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}
