import {Routes, Route} from 'react-router-dom'
import './App.css';
import TransactionDashboard from './components/TransactionDashboard';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import InvestmentsDashboard from './components/InvestmentsDashboard';

function App() {
  return (
    <div className='App'>
        <NavBar/>
        <Routes>
            <Route path = '/login' element = {<Login/>}/>
            <Route path = '/transactions' element = {<TransactionDashboard/>}/>
            <Route path='/investments' element = {<InvestmentsDashboard/>}/>
        </Routes>
   
    </div>
)
}

export default App;
