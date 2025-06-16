import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { createResponse, createResponseInterface } from "./utils/helpers";

import productsRouter from "./routes/products.route";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/products", productsRouter);

// api path doesn't exists
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createResponse(404, "Api path doesn't exists"));
});

// error handler
app.use((error: createResponseInterface, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let message: string = error?.message || "Error undefined";
  let statusCode: number = error?.status || 500;

  res.status(statusCode).send({ message: message });
});

export default app;
