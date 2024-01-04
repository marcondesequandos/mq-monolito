import Invoice from "../domain/entity/invoice";

export default interface InvoiceGateway {
  generate(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}
