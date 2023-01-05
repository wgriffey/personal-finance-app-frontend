import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import {Routes, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>

        <Routes>
            <Route path = '/'  element = {<Dashboard/>}/>
            <Route path = '/login'  element = {<Login/>}/>
        </Routes>
   
    </div>
)
}

export default App;
