export interface InvestmentTableColumn{
    id: 'ticker' | 'name' | 'price' | 'quantity' | 'cost_basis' | 'gain_loss' | 'gain_loss_percentage';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;
    format?: (value: any) => string
}