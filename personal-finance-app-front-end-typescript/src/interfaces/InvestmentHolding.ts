export interface InvestmentHolding{
    account_id: string
    security_id: string
    price: number
    price_as_of: Date;
    cost_basis: number;
    quantity: number;
}