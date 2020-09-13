/* eslint-disable camelcase */
class Deal {
  id: number;

  org_name: string;

  title: string;

  value: number;

  currency: string;

  status: string;

  constructor(
    id: number,
    org_name: string,
    title: string,
    value: number,
    currency: string,
    status: string,
  ) {
    this.id = id;
    this.org_name = org_name;
    this.title = title;
    this.value = value;
    this.currency = currency;
    this.status = status;
  }
}

export default Deal;
