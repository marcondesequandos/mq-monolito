import express, { Request, Response } from "express";
import { FindInvoiceInputDto } from "../../../invoice/facade/invoice-facade.interface";
import InvoiceFacadeFactory from "../../../invoice/factory/facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const facade = InvoiceFacadeFactory.create();
    const invoiceDto: FindInvoiceInputDto = {
      id: req.params.id,
    };

    const output = await facade.findInvoice(invoiceDto);
    res.send(output);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err);
    }
  }
});
