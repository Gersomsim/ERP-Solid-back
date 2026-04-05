export class Customer {
  id: string;
  name: string;
  taxId: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  tenantId: string;
  creditLimit: number;

  constructor() {}

  static create(
    name: string,
    taxId: string,
    tenantId: string,
    creditLimit: number,
    email?: string | null,
    phone?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zip?: string | null,
    country?: string | null,
  ): Customer {
    const customer = new Customer();
    customer.name = name;
    customer.taxId = taxId;
    customer.tenantId = tenantId;
    customer.creditLimit = creditLimit;
    customer.email = email ?? null;
    customer.phone = phone ?? null;
    customer.address = address ?? null;
    customer.city = city ?? null;
    customer.state = state ?? null;
    customer.zip = zip ?? null;
    customer.country = country ?? null;
    return customer;
  }
}
