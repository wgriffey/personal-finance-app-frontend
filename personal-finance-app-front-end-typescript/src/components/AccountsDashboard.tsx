import React, { useEffect, useState } from 'react';
import { Account } from '../interfaces/Account';
import { AccountDashboardProps } from '../interfaces/AccountDashboardProps';
import Grid from '@mui/material/Unstable_Grid2';


function AccountsDashboard(accounts: AccountDashboardProps) {

    return (
        <Grid container rowSpacing={2}>
            {accounts.accounts.length !== 0 ? accounts.accounts.map((account: Account) => {
                if (account.account_type === 'depository' || account.account_type === 'credit'){
                    return(
                        <Grid xs={3} key={account.account_id}>
                            <h2>{account.name}</h2>
                            <p>Current Balance ${account.current_balance?.toFixed(2)}</p>
                            <p>Available Balance: ${account.available_balance?.toFixed(2)}</p>
                        </Grid>
                    )
                }
            }) : null}
        </Grid>
    )
}

export default AccountsDashboard