import React from 'react';
import { LinkProps } from '../interfaces/LinkProps';
import { usePlaidLink } from 'react-plaid-link';
import APIService from '../services/APIService';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';

function PlaidLinkButton(props: LinkProps) {
    const theme: any = useTheme();
    const colors: any = tokens(theme.palette.mode);
    
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

    const getInvestmentDataFromPlaid = () => {
        APIService.GetInvestmentDataFromPlaid(props.userToken!)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const onSuccess = React.useCallback(async (public_token: any, metadata: any) => {
        // send public_token to server
        await fetch('http://127.0.0.1:8000/api/set_access_token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.userToken!}`

        },
        body: JSON.stringify({ public_token }),
        });

        getAccountDataFromPlaid();
        getTransactionDataFromPlaid();
        getInvestmentDataFromPlaid();
    }, []);
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken!,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
    return (
        <Button variant="outlined" sx={{color: colors.redAccent[600], borderColor: colors.redAccent[600], '&:hover':{background: colors.redAccent[700], color: colors.primary[400]}}} onClick={() => open()} disabled={!ready}>
          Link Accounts
        </Button>
    );
};

export default PlaidLinkButton;