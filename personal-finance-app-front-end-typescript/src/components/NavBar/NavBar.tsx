import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [userToken, setUserToken, removeUserToken] = useCookies<string>(['myToken']);
    const navigate = useNavigate();

    const onLogOut = () => {
        removeUserToken('myToken')
    };

    useEffect(() => {
        if(!userToken['myToken']){
            navigate('/login')
        }
    }, [userToken]);
    

    const drawerWidth = 240;


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                G&E Personal Finance
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText>
                        <Link to='/transactions'>Transactions</Link>
                    </ListItemText>
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText>
                        <Link to='/investments'>Investments</Link>
                    </ListItemText>
                </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText>
                        <Link to='/login' onClick={() => onLogOut()}>Log Out</Link>
                    </ListItemText>
                </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', mb: '40px' }}>
            <CssBaseline />
            <AppBar component="nav" style={{backgroundColor: '#F2F2F2', color: '#282c34'}}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    G&E Personal Finance
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button onClick={() => navigate('/transactions')} sx={{ color: '#282c34' }}>Transactions</Button>
                    <Button onClick={() => navigate('/investments')} sx={{ color: '#282c34' }}>Investments</Button>
                    <Button onClick={() => onLogOut()} sx={{ color: '#282c34' }}>Log Out</Button>
                </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                >
                {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}