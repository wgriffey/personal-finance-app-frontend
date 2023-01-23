import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import APIService from '../APIService';
import { Account } from '../interfaces/Account';
import { Transaction } from '../interfaces/Transaction';
import { GoogleChartOptions } from 'react-google-charts';
import GoogleCharts from './GoogleChart';
import PlaidLinkButton from './PlaidLinkButton';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TransactionTableColumn } from '../interfaces/TransactionTableColumn';
import { TransactionTableRow } from '../interfaces/TransactionTableRow';

function TransactionDashboard() {
    const [linkToken, setLinkToken] = useState(null);
    const [userToken] = useCookies<string>(['myToken']);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
    const [transactionChartData, setTransactionChartData] = useState<[[string|number, string|number]]>([['','']]);
    const [showTransactionChart, setShowTransactionChart] = useState<boolean>(false);
    const [transactionRowData, setTransactionRowData] = useState<TransactionTableRow[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();

    const transactionCategoryChartOptions: GoogleChartOptions = {
        width: 500,
        height: 350,
        chartArea:{top:15, right: 60, width:'100%', height:'85%'},
        backgroundColor: '#282c34', 
        legend: {textStyle:{color: 'white', fontSize: 16}, alignment: 'center', position: 'right'}
    }

    const transactionTableColumns: readonly TransactionTableColumn[] = [
        {id: 'account', label: 'Account', minWidth: 1, align: 'center'},
        {id: 'date', label: 'Date', minWidth: 15, align: 'center', format: (value: Date) => value.toString()},
        {id: 'amount', label: 'Amount', minWidth: 20, align: 'center', format: (value: number) => value.toFixed(2)},
        {id: 'company_name', label: 'Company Name', minWidth: 20, align: 'center'},
        {id: 'payment_channel', label: 'Payment Channel', minWidth: 2, align: 'center'},
        {id: 'category', label: 'Category', minWidth: 2, align: 'center'},
        {id: 'sub_category', label: 'Sub-Category', minWidth: 2, align: 'center'}
    ]

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

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

    const buildTransactionRowData = () => {
        let transactionRowDataToPush: TransactionTableRow[] = [];
        userTransactions.forEach((tran: Transaction) => {
            let transactionAccount: Account|undefined = userAccounts.find(acc => acc.id === tran.account_id);
            let transactionRow: TransactionTableRow = {
                tran_id: tran.id,
                account: transactionAccount?.name,
                date: tran.date?.toString(),
                amount: tran.amount,
                company_name: tran.name,
                payment_channel: tran.payment_channel,
                category: tran.primary_category,
                sub_category: tran.detailed_category,
            };
            transactionRowDataToPush.push(transactionRow);
        });

        setTransactionRowData(transactionRowDataToPush);
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
            buildTransactionRowData();
        }
    }, [userTransactions])


    return(
        <>
            <Grid container rowSpacing={2}>
                <Grid xs={12}>
                    <h1>Transactions Dashboard</h1>
                </Grid>
                <Grid xs={5}>
                    {linkToken != null ? <PlaidLinkButton linkToken={linkToken} userToken={userToken['myToken']} /> : <></>}
                </Grid>
                <Grid xs={6}>
                    {userAccounts.length === 0 ? <Button variant='outlined' style={{color: '#C3E4ED', borderColor: '#C3E4ED'}} onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB();}}>Get Account and Transaction Data</Button> : <Button variant='outlined' style={{color: '#C3E4ED', borderColor: '#C3E4ED'}} onClick={() => {getAccountDataFromDB(); getTransactionDataFromDB()}}>Refresh Account and Transaction Data</Button>}
                </Grid>
                
            </Grid>
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
            <Grid container rowSpacing={2} sx={{mt: 2}}>
                <GoogleCharts chartType='PieChart' data={transactionChartData} options={transactionCategoryChartOptions} />
            </Grid>
            <TableContainer sx={{maxHeight: 327}}>
                <Table stickyHeader aria-label='Transactions Table'>
                    <TableHead>
                        <TableRow>
                            {transactionTableColumns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, color: '#282c34', backgroundColor: '#C3E4ED', fontSize: 18}}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionRowData.length !== 0  ? transactionRowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TransactionTableRow) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.tran_id}>
                                    {transactionTableColumns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} style={{backgroundColor: '#F2F2F2', color: '#282c34'}}>
                                        {column.format && typeof value === 'number'
                                            ? '$' + column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                        }): null}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={transactionRowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{backgroundColor: '#F2F2F2', color: '#282c34'}}
            />
        </>
    )
};

export default TransactionDashboard