export interface Transaction{
    id: string;
    transaction_id: string;
    amount: number;
    date: Date;
    name: string;
    payment_channel: string;
    primary_category: string;
    detailed_category: string;
    account_id: string;
}