import express, { Request, Response } from "express";
import { AddClientFacadeInputDto } from "../../../client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../../client-adm/factory/facade.factory";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const clientDto: AddClientFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    const output = await facade.addClient(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
