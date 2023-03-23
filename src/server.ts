import "express-async-errors";
import { AppError } from "./errors/error";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal error serve - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running. 🚀"));
