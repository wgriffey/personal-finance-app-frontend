import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import {Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import TransactionDashboard from './components/TransactionDashboard';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='App'>
        <NavBar/>
        <Routes>
            <Route path = '/'  element = {<TransactionDashboard/>}/>
            <Route path = '/login'  element = {<Login/>}/>
        </Routes>
   
    </div>
)
}

export default App;
