export interface InvestmentTableRow{
    security_id?: string;
    ticker?: string;
    name: string|undefined;
    price: number;
    quantity: number;
    cost_basis: number;
    gain_loss: number;
    gain_loss_percentage: number;
}