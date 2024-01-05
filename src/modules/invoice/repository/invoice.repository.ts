import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/entity/InvoiceItems";
import Invoice from "../domain/entity/invoice";
import Address from "../domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item: InvoiceItems) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: invoice.createdAt,
      },
      {
        include: [InvoiceItemModel],
      }
    );
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [InvoiceItemModel],
    });

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    console.log("InvoiceFrom InvoiceRepository=>", invoice);

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode
      ),
      items: invoice.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
          createdAt: new Date(),
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
