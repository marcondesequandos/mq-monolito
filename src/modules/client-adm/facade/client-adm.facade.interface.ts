export interface AddClientFacadeInputDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutPutDto {
  id: string;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDto): Promise<void>;
  findClient(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutPutDto>;
}
