import React from 'react';
import { LinkProps } from '../interfaces/LinkProps';
import { usePlaidLink } from 'react-plaid-link';
import APIService from '../APIService';
import Button from '@mui/material/Button';



function PlaidLinkButton(props: LinkProps) {
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

        await getAccountDataFromPlaid();
        await getTransactionDataFromPlaid();
    }, []);
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken!,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);
    return (
        <Button variant="outlined" color="error" onClick={() => open()} disabled={!ready}>
          Link Accounts
        </Button>
    );
};

export default PlaidLinkButton;