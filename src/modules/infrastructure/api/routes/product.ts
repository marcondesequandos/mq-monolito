import express, { Request, Response } from "express";
import AddProductRegistrationUseCase from "../../../product-adm/usecase/add-product/add-product.usecase";
import ProductRegistrationRepository from "../../../product-adm/repository/product.repository";
import { AddProductInputDto } from "../../../product-adm/usecase/add-product/add-product.dto";
export const productRegistrationRoute = express.Router();

productRegistrationRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new AddProductRegistrationUseCase(
    new ProductRegistrationRepository()
  );

  try {
    const productRegistrationDto: AddProductInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await usecase.execute(productRegistrationDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});