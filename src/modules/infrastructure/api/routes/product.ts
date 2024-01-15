import express, { Request, Response } from "express";
import { AddProductUseCase } from "../../../store-catalog/usecase/"

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase();
});
