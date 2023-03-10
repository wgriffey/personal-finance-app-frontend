import { Account } from '../interfaces/Account';
import { AccountDashboardProps } from '../interfaces/AccountDashboardProps';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Typography } from '@mui/material';
import { tokens } from '../theme';
import { useTheme } from '@mui/material/styles';


function AccountsDashboard(accounts: AccountDashboardProps) {
    const theme: any = useTheme();
    const colors: any = tokens(theme.palette.mode);

    return (
        <>
        <Typography variant='h2' sx={{justifyContent: 'center', display: 'flex', mt:2}}>Accounts</Typography>
        <Grid container justifyContent='center'
        >
            {accounts.accounts.length !== 0 ? accounts.accounts.map((account: Account) => {
                if (account.account_type === 'depository' || account.account_type === 'credit'){
                    return(
                        <Card sx={{ backgroundColor: colors.grey[400], m: 2, minWidth: '20%', display: 'flex', justifyContent: 'center'}}>
                            <CardContent>
                                <Typography variant="h3">{account.name}</Typography>
                                <Typography variant='h5' sx={{mb: 2}}>Current Balance ${account.current_balance?.toFixed(2)}</Typography>
                                <Typography variant='h5'>Available Balance: ${account.available_balance?.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    )
                }
            }) : null}
        </Grid>
        </>
    )
}

export default AccountsDashboard