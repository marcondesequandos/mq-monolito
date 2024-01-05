import { Sequelize } from "sequelize-typescript";
import Address from "./address.value-object";

export default class AddressDataType extends Sequelize..ABSTRACT {
  toSql(): typeof Address {
    return Address;
  }
}
