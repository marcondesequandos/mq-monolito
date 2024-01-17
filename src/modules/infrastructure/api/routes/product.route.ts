import express, { Request, Response } from "express";
import { AddProductInputDto } from "../../../product-adm/usecase/add-product/add-product.dto";
import ProductFacadeFactory from "../../../product-adm/factory/facade.factory";
export const productRegistrationRoute = express.Router();

productRegistrationRoute.post("/", async (req: Request, res: Response) => {
  const productAdmFacade = ProductFacadeFactory.create();

  try {
    const productAdmDto: AddProductInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await productAdmFacade.addProduct(productAdmDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
