import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css';
import TransactionDashboard from './components/TransactionDashboard';
import Login from './components/Login';
import NavBar from './components/NavBar/NavBar';
import InvestmentsDashboard from './components/InvestmentsDashboard';
import { ColorModeContext, tokens, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
    const location = useLocation()
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    let appStyle: any = {
        backgroundColor: colors.primary[400],
        overflow: 'hidden',
        minHeight: '100vh'
    }
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme ={theme}>
                <CssBaseline/>
                <div style={appStyle}>
                    <main className='content'>
                        {location.pathname !== '/login' && <NavBar/>}
                        <Routes>
                            <Route path = '/login' element = {<Login/>}/>
                            <Route path = '/transactions' element = {<TransactionDashboard/>}/>
                            <Route path='/investments' element = {<InvestmentsDashboard/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App;
