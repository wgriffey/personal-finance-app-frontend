import { User } from '../interfaces/User'


export default class APIService{
    static async LogInUser(body: User){
        const res = await fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        return res.json()
    }

    static async SignUpUser(body: User){
        const res = await fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        return res.json()        
    }

    static async GetAccountDataFromPlaid(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_accounts_from_plaid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }

    static async GetAccountDataFromDB(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_accounts_from_db`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }

    static async GetTransactionDataFromPlaid(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_transactions_from_plaid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }

    static async GetTransactionDataFromDB(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_transactions_from_db`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }

    static async GetInvestmentDataFromPlaid(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_investments_from_plaid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }

    static async GetInvestmentDataFromDB(token: any){
        const res = await fetch(`http://127.0.0.1:8000/api/get_investments_from_db`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return res.json()
    }
}