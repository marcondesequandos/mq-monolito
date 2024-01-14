export interface AddProductRegistrationInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}
export interface AddProductRegistrationOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
