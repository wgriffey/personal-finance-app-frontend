export interface TransactionTableColumn{
    id: 'account' | 'date' | 'amount' | 'company_name' | 'payment_channel' | 'category' | 'sub_category';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;
    format?: (value: any) => string
}