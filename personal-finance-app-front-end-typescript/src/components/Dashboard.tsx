import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import { LinkProps } from '../interfaces/LinkProps';
import APIService from '../APIService';
import { Account } from '../interfaces/Account';
import { Transaction } from '../interfaces/Transaction';

function Dashboard() {
    const [linkToken, setLinkToken] = useState(null);
    const [userToken, setUserToken, removeUserToken] = useCookies<string>(['myToken']);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
    const navigate = useNavigate();

    const onLogOut = () => {
        removeUserToken('myToken')
    };

    const generateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/create_link_token/', {
        method: 'POST',
        headers:{
            'Authorization': `Token ${userToken['myToken']}`
        }});
        const data = await response.json();
        setLinkToken(data.link_token);
    };

    useEffect(() => {
      generateToken();
      getAccountDataFromDB();
      getTransactionDataFromDB();
    }, []);

    const getAccountDataFromDB = () => {
        APIService.GetAccountDataFromDB(userToken['myToken'])
        .then(res => setUserAccounts(res))
        .catch(err => console.log(err));
    }

    const getTransactionDataFromDB = () => {
        APIService.GetTransactionDataFromDB(userToken['myToken'])
        .then(res => setUserTransactions(res))
        .catch(err => console.log(err))

    }

    useEffect(() => {
        if(!userToken['myToken']){
            navigate('/login')
        }
        else{
            getAccountDataFromDB();
            getTransactionDataFromDB();
        }
    }, [userToken]);


    return(
        <>
            <div className='row'>
                <div className='col mt-2'>
                    {linkToken != null ? <Link linkToken={linkToken} userToken={userToken['myToken']} /> : <></>}
                </div>
                <div className='col mt-2'>
                    <button onClick={() => onLogOut()} className='btn btn-outline-danger float-lg-end'>Log Out</button>
                </div>
            </div>
            <div className='text-lg-center'>
                {userAccounts.length !== 0 ? userAccounts.map((account: Account) => {
                    return(
                        <div className='mt-4' key={account.account_id}>
                            <h2>{account.name}</h2>
                            <p>Current Balance ${account.current_balance?.toFixed(2)}</p>
                            <p>Available Balance: ${account.available_balance?.toFixed(2)}</p>
                        </div>
                    )
                    
                }) : null}
            </div>
            <div className='mt-2'>
                <h1 className='mb-3'>Transactions</h1>
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>Account</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Company Name</th>
                            <th scope='col'>Payment Channel</th>
                            <th scope="col">Category</th>
                            <th scope='col'>Sub-Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTransactions.length !== 0  ? userTransactions.map((tran: Transaction) => {
                            let transaction_account: Account|undefined = userAccounts.find(acc => acc.id === tran.account_id)
                            console.log('Transaction Accounts: ' + transaction_account)
                            return(
                                <>
                                    <tr>
                                        <td>{transaction_account?.name}</td>
                                        <td>{tran.date?.toString()}</td>
                                        <td>${tran.amount?.toFixed(2)}</td>
                                        <td>{tran.name}</td>
                                        <td>{tran.payment_channel}</td>
                                        <td>{tran.primary_category}</td>
                                        <td>{tran.detailed_category}</td>
                                    </tr> 
                                </>
                            )
                        }): null}
                    </tbody>
                </table>

            </div>
            <div className='text-lg-center'>
                {userAccounts.length === 0 ? <button onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB();}} className='btn btn-outline-success mt-4'>Get Account Data</button> : <button onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB()}} className='btn btn-outline-success mt-4'>Refresh Account Data</button>}
            </div>

        </>
    )
};

const Link: React.FC<LinkProps> = (props: LinkProps) => {
    const getAccountDataFromPlaid = () => {
        APIService.GetAccountDataFromPlaid(props.userToken!)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    const getTransactionDataFromPlaid = () => {
        APIService.GetTransactionDataFromPlaid(props.userToken!)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    const onSuccess = React.useCallback(async (public_token: any, metadata: any) => {
        // send public_token to server
        const response = await fetch('http://127.0.0.1:8000/api/set_access_token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.userToken!}`

        },
        body: JSON.stringify({ public_token }),
        });

        getAccountDataFromPlaid();
        getTransactionDataFromPlaid();
    }, []);
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken!,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
    return (
        <button className='btn btn-outline-success' onClick={() => open()} disabled={!ready}>
          Link Accounts
        </button>
    );
};

    

export default Dashboard