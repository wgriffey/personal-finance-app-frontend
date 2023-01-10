import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import APIService from '../APIService';
import { Account } from '../interfaces/Account';
import { Transaction } from '../interfaces/Transaction';
import { GoogleChartOptions } from 'react-google-charts';
import GoogleCharts from './GoogleChart';
import PlaidLinkButton from './PlaidLinkButton';

function TransactionDashboard() {
    const [linkToken, setLinkToken] = useState(null);
    const [userToken, setUserToken, removeUserToken] = useCookies<string>(['myToken']);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
    const [transactionChartData, setTransactionChartData] = useState<[[string|number, string|number]]>([['','']]);
    const [showTransactionChart, setShowTransactionChart] = useState<boolean>(false);
    const navigate = useNavigate();

    const transactionCategoryChartOptions: GoogleChartOptions = {
        width: 550,
        height: 350,
        chartArea:{left:0, top:10, width:'100%', height:'85%'},
        backgroundColor: '#282c34', 
        legend: {textStyle:{color: 'white', fontSize: 16}, alignment: 'center', position: 'right'}
    }

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
    }, []);

    const getAccountDataFromDB = () => {
        APIService.GetAccountDataFromDB(userToken['myToken'])
        .then(res => setUserAccounts(res))
        .catch(err => console.log(err));
    }

    const getTransactionDataFromDB = () => {
        APIService.GetTransactionDataFromDB(userToken['myToken'])
        .then(res => {
            setUserTransactions(res);
        })
        .catch(err => console.log(err))
    }

    const buildTransactionChartData = () => {
        let categoryDataMap: Map<string, number> = new Map(); 
        let categoryData: [[string|number ,string|number]] = [['Primary Category', ' # of Transactions']]               
        userTransactions.forEach((tran: Transaction) => {
            if (tran.primary_category && !categoryDataMap.has(tran.primary_category)){
                categoryDataMap.set(tran.primary_category, userTransactions.filter(filterTran => filterTran.primary_category === tran.primary_category).length);
            }
        })

        categoryDataMap.forEach((value: number, key: string) => {
            categoryData.push([key, value]) ;       
        });
        console.log(categoryData)
        setTransactionChartData(categoryData);

    }

    useEffect(() => {
        if(showTransactionChart){
            buildTransactionChartData();
        }
        else{
            setTransactionChartData([['','']]);
        }
    }, [showTransactionChart])

    useEffect(() => {
        if(!userToken['myToken']){
            navigate('/login')
        }
        else{
            getAccountDataFromDB();
            getTransactionDataFromDB();
        }
    }, [userToken]);

    useEffect(() => {
        if (userTransactions.length !== 0){
            setShowTransactionChart(true);
        }
    }, [userTransactions])


    return(
        <>
            <div className='row'>
                <div className='col mt-2'>
                    {linkToken != null ? <PlaidLinkButton linkToken={linkToken} userToken={userToken['myToken']} /> : <></>}
                </div>
                <div className='col mt-2 text-lg-center'>
                    {userAccounts.length === 0 ? <button onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB();}} className='btn btn-outline-info'>Get Account and Transaction Data</button> : <button onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB()}} className='btn btn-outline-info'>Refresh Account and Transaction Data</button>}
                </div>
                <div className='col mt-2'>
                    <button onClick={() => onLogOut()} className='btn btn-outline-danger float-lg-end'>Log Out</button>
                </div>
            </div>
            {/* <div className='text-lg-center'>
                {userAccounts.length !== 0 ? userAccounts.map((account: Account) => {
                    return(
                        <div className='mt-4' key={account.account_id}>
                            <h2>{account.name}</h2>
                            <p>Current Balance ${account.current_balance?.toFixed(2)}</p>
                            <p>Available Balance: ${account.available_balance?.toFixed(2)}</p>
                        </div>
                    )
                    
                }) : null}
            </div> */}
            <div className='mt-2'>
                <h1>Transactions</h1>
                <GoogleCharts chartType='PieChart' data={transactionChartData} options={transactionCategoryChartOptions} />
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
                                    <tr key={tran.id}>
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

        </>
    )
};

export default TransactionDashboard