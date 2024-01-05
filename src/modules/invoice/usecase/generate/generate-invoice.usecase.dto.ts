import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/entity/InvoiceItems";

export interface GenerateInvoiceUseCaseInputDto {
  id?: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: Id;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: Id;
    name: string;
    price: number;
  }[];
  total: number;
}
