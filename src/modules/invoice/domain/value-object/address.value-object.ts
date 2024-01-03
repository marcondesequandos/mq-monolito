import ValueObject from "../../../@shared/domain/value-object/value-object.interface";

export default class Address implements ValueObject {
  _street: string = "";
  _number: string;
  _complement: string;
  _city: string = "";
  _state: string = "";
  _zipCode: string = "";

  constructor(street: string, number: string, zipCode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipCode = zipCode;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }
  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number.length === 0) {
      throw new Error("Number is required");
    }
    if (this._zipCode.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._complement}, ${this._city}, ${this._state}, ${this._zipCode} `;
  }
}
