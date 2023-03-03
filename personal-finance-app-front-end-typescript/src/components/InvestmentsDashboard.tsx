import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Account } from '../interfaces/Account';
import { InvestmentHolding } from '../interfaces/InvestmentHolding';
import { InvestmentSecurity } from '../interfaces/InvestmentSecurity';
import { InvestmentTableColumn } from '../interfaces/InvestmentTableColumn';
import APIService from '../services/APIService';
import { InvestmentTableRow } from '../interfaces/InvestmentTableRow';
import { Button, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PlaidLinkButton from './PlaidLinkButton';
import { tokens } from '../theme';


function InvestmentsDashboard() {
    const theme: any = useTheme();
    const colors: any = tokens(theme.palette.mode);
    const [linkToken, setLinkToken] = useState(null);
    const [userToken] = useCookies<string>(['myToken']);
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [userInvestmentHoldings, setUserInvestmentHoldings] = useState<InvestmentHolding[]>([]);
    const [userInvestmentSecurities, setUserInvestmentSecurities] = useState<InvestmentSecurity[]>([]);
    const [investmentRowData, setInvestmentRowData] = useState<InvestmentTableRow[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();


    const investmentTableColumns: readonly InvestmentTableColumn[] = [
        {id: 'name', label: 'Name', minWidth: 10, align: 'center'},
        {id: 'ticker', label: 'Ticker', minWidth: 10, align: 'center'},
        {id: 'price', label: 'Current Price', minWidth: 10, align: 'center', format: (value: number) => '$' + value.toFixed(2)},
        {id: 'quantity', label: 'Quantity', minWidth: 10, align: 'center', format: (value: number) => value.toFixed(3)},
        {id: 'cost_basis', label: 'Cost Per Share', minWidth: 10, align: 'center', format: (value: number) => '$' + value.toFixed(2)},
        {id: 'gain_loss', label: 'Gain/Loss $', minWidth: 10, align: 'center', format: (value: number) => '$' + value.toFixed(2)},
        {id: 'gain_loss_percentage', label: 'Gain/Loss %', minWidth: 10, align: 'center', format: (value: number) => (value * 100).toFixed(2) + '%'}
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

    const getInvestmentDataFromDB = () => {
        APIService.GetInvestmentDataFromDB(userToken['myToken'])
        .then(res => {
            setUserInvestmentHoldings(res[0]);
            setUserInvestmentSecurities(res[1])
        })
        .catch(err => console.log(err))
    }

    // On Init
    useEffect(() => {
        generateToken();
        getAccountDataFromDB();
        getInvestmentDataFromDB();
    }, []);

    // On User Token Change (Log Out)
    useEffect(() => {
        if(!userToken['myToken']){
            navigate('/login')
        }
    }, [userToken]);

    // On Investments Change
    useEffect(() => {
        const buildInvestmentRowData = () => {
            let investmentRowDataToPush: InvestmentTableRow[] = [];
            userInvestmentHoldings.forEach((holding: InvestmentHolding) => {
                let investmentSecurity: InvestmentSecurity|undefined = userInvestmentSecurities.find(sec => sec.security_id === holding.security_id)
                let investmentRow: InvestmentTableRow = {
                    ticker: investmentSecurity?.ticker,
                    name: investmentSecurity?.name,
                    price: holding.price,
                    quantity: holding.quantity,
                    cost_basis: holding.cost_basis,
                    gain_loss: (holding.price - holding.cost_basis) * holding.quantity,
                    gain_loss_percentage: ((holding.price - holding.cost_basis) * holding.quantity) / (holding.cost_basis * holding.quantity)
                };
                investmentRowDataToPush.push(investmentRow);
            });
    
            setInvestmentRowData(investmentRowDataToPush);
        }
        
        if (userInvestmentHoldings.length !== 0 && userInvestmentSecurities.length !== 0){
            buildInvestmentRowData();
        }
    }, [userInvestmentHoldings, userInvestmentSecurities])

    return (
        <>
            <Grid container rowSpacing={2}>
                <Grid xs={12}>
                    <h1>Investments DashBoard</h1>
                </Grid>
                <Grid xs={5}>
                    {linkToken != null ? <PlaidLinkButton linkToken={linkToken} userToken={userToken['myToken']} /> : <></>}
                </Grid>
                <Grid xs={6}>
                    {userAccounts.length === 0 ? <Button variant='outlined' sx={{color: colors.greenAccent[300], borderColor: colors.greenAccent[300], '&:hover':{background: colors.greenAccent[600], color: colors.primary[400]}}} onClick={() => {getAccountDataFromDB(); getInvestmentDataFromDB();}}>Get Investment Data</Button> : <Button variant='outlined' sx={{color: colors.greenAccent[300], borderColor: colors.greenAccent[300], '&:hover':{background: colors.greenAccent[600], color: colors.primary[400]}}} onClick={() => {getAccountDataFromDB(); getInvestmentDataFromDB()}}>Refresh Investment Data</Button>}
                </Grid>
            </Grid>

            <TableContainer sx={{maxHeight: 650, mt: 10}}>
                <Table stickyHeader aria-label='Transactions Table'>
                    <TableHead>
                        <TableRow>
                            {investmentTableColumns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, color: colors.primary[100], backgroundColor: colors.blueAccent[700], fontSize: 18}}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {investmentRowData.length !== 0  ? investmentRowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: InvestmentTableRow) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.security_id}>
                                    {investmentTableColumns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} style={{backgroundColor: colors.primary[400], color: colors.primary[100], fontSize: 14}}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
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
            count={investmentRowData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{backgroundColor: colors.blueAccent[700], color: colors.primary[100]}}
            />
        </>
    )
}

export default InvestmentsDashboard