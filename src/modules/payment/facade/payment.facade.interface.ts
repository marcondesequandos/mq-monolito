export interface PaymentFacadeInputDto {
  amount: number;
  orderId: string;
}

export interface PaymentFacadeOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
