import React, { useEffect, useState } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [isLoginError, setIsLoginError] = useState(false)
    const [userToken, setUserToken] = useCookies(['myToken'])
    const navigate = useNavigate()

    useEffect(() => {
        if(userToken['myToken'] && userToken['myToken'] !== undefined ){
            navigate('/transactions')
        }
    }, [userToken])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const onLogIn = () => {
        APIService.LogInUser({username, password})
        .then(res => {
            if(!res.token){
                setIsLoginError(true)
            }
            else{
                setUserToken('myToken', res.token)
            }
        })
        .catch(error => console.log(error))
    }

    const onSignUp = () => {
        APIService.SignUpUser({username, email, password})
        .then(() => onLogIn())
        .catch(error => console.log(error))
    }

  return (
    <div className='App'>
        <Grid container rowSpacing={2}
            justifyContent="center"
            flexDirection='row'
            alignItems='center'
            sx={{textAlign: 'center', mt: 25, ml: 25, border: 1, borderRadius: '25px', borderWidth: '3px', width: '75%'}}>
                <Grid xs={12}>
                    {isLogin ? <h1>Log In</h1> : <h1>Register</h1>}
                    <FormControl sx={{mt: 1, width: '75ch'}} variant='outlined'>
                        <InputLabel sx={{color: 'white'}} htmlFor='username' error = {isLoginError}>Username</InputLabel>
                        <OutlinedInput
                        id='username'
                        label='Username'
                        sx={{fieldset: {borderColor: 'white'}, color: 'white'}}
                        onChange={(e) => setUsername(e.target.value)}
                        error = {isLoginError}
                        />
                    </FormControl>
                </Grid>

                {!isLogin ? 
                    <Grid xs={12}>
                        <FormControl sx={{mt: 1, width: '75ch'}} variant='outlined'>
                            <InputLabel sx={{color: 'white'}} htmlFor='email' error = {isLoginError}>E-mail</InputLabel>
                            <OutlinedInput type='email' id='email' sx={{fieldset: {borderColor: 'white', }, color: 'white'}} label='E-mail' onChange={(e) => setEmail(e.target.value)} error = {isLoginError}/>
                        </FormControl>
                    </Grid> 
                : null}

                <Grid xs={12}>
                    <FormControl sx={{mt: 1, width: '75ch'}} variant='outlined'>
                        <InputLabel sx={{color: 'white'}} htmlFor='password' error = {isLoginError}>Password</InputLabel>
                        <OutlinedInput
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        sx={{fieldset: {borderColor: 'white'}, color: 'white'}}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                aria-label='Toggle Password Visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                                sx={{color: 'white'}}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                
                                </IconButton>
                            </InputAdornment>
                        }
                        label='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        error = {isLoginError}
                        />
                    </FormControl>
                </Grid>
                
                {isLoginError ? <Alert severity="error" sx={{ mt: 1, width: '400px', textAlign: 'center'}}>You have entered an invalid username{isLogin ? ' or password' : ' email, or password'}!</Alert> : null}

                <Grid xs={12}>
                    {isLogin ? <Button variant="outlined" color="primary" sx={{mt: 1, textAlign: 'center'}} onClick={onLogIn}>Log In</Button> : <Button variant="outlined" color="primary" sx={{mt: 1}} onClick={onSignUp}>Sign Up</Button>}
                </Grid>   

                <br/>
                {isLogin ? <h3>If you don't have an account, <Button variant="outlined" color="primary" onClick={() => {setIsLogin(false); setIsLoginError(false);}}>Sign Up</Button></h3> : 
                <h5>If you have an account, <Button variant="outlined" color="primary" onClick={() => {setIsLogin(true); setIsLoginError(false);}}>Log In</Button></h5>}
        </Grid>

        <>

        </>
    </div>
  )
}

export default Login