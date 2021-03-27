import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


export default function Navbar() {

    const cookies = new Cookies()
    const classes = useStyles();
    const [isLogin, setIsLogin] = useState(false)


    
    function checkToken() {

        let userToken = cookies.get("USER_TOKEN");
        console.log(userToken)
        if(userToken !== undefined){

            setIsLogin(true)

        }else{

            setIsLogin(false)
        }
    }

    function handleLogout() {

        cookies.remove("USER_TOKEN" ,{ path: '/' })
        window.location.href='/'
        
    }

    useEffect(() => {

        checkToken();
    
      }, [])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    LUL - ER
                </Typography>
                <Button color="inherit" component={Link} to="/">
                        Home
                </Button>
                {isLogin ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                ):(
                    <Button color="inherit" component={Link} to="/auth/signin">
                    Login
                    </Button>
                )}
                </Toolbar>
            </AppBar>
        </div>
       
    )
}