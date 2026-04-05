export class PriceList {
  id: string;
  name: string;
  tenantId: string;
  isDefault: boolean;
  validFrom: Date | null;
  validTo: Date | null;

  constructor() {}

  static create(
    name: string,
    tenantId: string,
    isDefault: boolean,
    validFrom?: Date | null,
    validTo?: Date | null,
  ): PriceList {
    const priceList = new PriceList();
    priceList.name = name;
    priceList.tenantId = tenantId;
    priceList.isDefault = isDefault;
    priceList.validFrom = validFrom ?? null;
    priceList.validTo = validTo ?? null;
    return priceList;
  }
}
