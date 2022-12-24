import React, { useEffect, useState } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [userToken, setUserToken] = useCookies(['myToken'])
    const navigate = useNavigate()

    useEffect(() => {
        if(userToken['myToken']){
            navigate('/')
        }
    }, [userToken])

    const onLogIn = () => {
        APIService.LogInUser({username, password})
        .then(res => setUserToken('myToken', res.token))
        .catch(error => console.log(error))
    }

    const onSignUp = () => {
        APIService.SignUpUser({username, password})
        .then(() => onLogIn())
        .catch(error => console.log(error))
    }

  return (
    <div className='App'>
        {isLogin ? <h1 className='pb-4 pt-4'>Log In</h1> : <h1 className='pb-4 pt-4'>Register</h1>}

        <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input type='text' className='form-control form-text' id='username' placeholder='Please Enter Username' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' className='form-control form-text' id='password' placeholder='Please Enter Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        {isLogin ? <button className='btn btn-primary' onClick={onLogIn}>Log In</button> : <button className='btn btn-primary' onClick={onSignUp}>SignUp</button>}
        

        <div className='mb-3'>
            <br/>
            {isLogin ? <h5>If you don't have an account, <button className='btn btn-outline-primary' onClick={() => setIsLogin(false)}>Sign Up</button></h5> : 
            <h5>If you have an account, <button className='btn btn-outline-primary' onClick={() => setIsLogin(true)}>Log In</button></h5>}
        </div>
    </div>
  )
}

export default Login