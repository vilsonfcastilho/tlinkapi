import Deal from '../models/Deal';

class DealsRepository {
  private deals: Deal[];

  constructor() {
    this.deals = [];
  }

  public createDeal(
    id: number,
    name: string,
    title: string,
    value: number,
    currency: string,
    status: string,
  ): Deal {
    const deal = new Deal(id, name, title, value, currency, status);

    this.deals.push(deal);

    return deal;
  }
}

export default DealsRepository;
