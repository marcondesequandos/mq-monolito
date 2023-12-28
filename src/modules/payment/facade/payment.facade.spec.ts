import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should process payment", async () => {
    const productFacade = PaymentFacadeFactory.create();
    const input = {
      orderId: "order-1",
      amount: 100,
    };
    const output = await productFacade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe("approved");
  });
});
