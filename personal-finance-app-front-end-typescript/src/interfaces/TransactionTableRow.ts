export interface TransactionTableRow{
    tran_id: string;
    account: string|undefined;
    date: string;
    amount: number|undefined;
    company_name: string;
    payment_channel: string;
    category: string;
    sub_category: string;
}