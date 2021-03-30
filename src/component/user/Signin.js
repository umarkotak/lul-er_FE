import React, {useState} from 'react'
import axios from 'axios';
import { apiLogin } from "../config/Endpoint";

import {
    Container,
    Typography,
    TextField,
    CssBaseline,
    Button,
    Avatar
    
 } from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signin() {

    const classes = useStyles();
    const cookies = new Cookies()
    const history = useHistory();
    const { handleSubmit, control } = useForm();
    const [isLoginError, setIsLoginError] = useState(false)

    //  login func

    const sumbitLogin = data => {
        

        // console.log("username :" , data.username)
        // console.log("password :" , data.password)
        
        
            axios.post(apiLogin,{

                username : data.username,
                password: data.password,
    
            })
            
            .then((res) => {
                console.log(res)
                let date = new Date(2030, 12)
                cookies.set("USER_TOKEN", res.data.data.auth_token, { path: "/", expires: date })
                cookies.set("USER_NAME", res.data.data.username, { path: "/", expires: date })
                window.location.href='/'
                // history.push("/")
    
            })
    
            .catch(error => {
                console.log(error.response)
                setIsLoginError(true)
            })
    }
    
    return (
        <div>
           <Container maxWidth="xs" style={{ marginTop : 100 }}>
           <CssBaseline />
           <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h4" component="h5" color='textPrimary'>
                    LOGIN
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(sumbitLogin)}>

                <Controller
                    name='username'
                    as={
                    <TextField
                        id="username"
                        variant="outlined"
                        label="username"
                        margin="normal"
                        fullWidth
                        required/>
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Required'
                      }}
    
                    />

                    <Controller
                        name='password'
                        as={
                        <TextField
                            id="password"
                            variant="outlined"
                            label="password"
                            type="password"
                            margin="normal"
                            fullWidth
                            required/>
                        }

                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required'
                          }}
                    />

                    {isLoginError && (
                        <Typography color='error'>
                            Account not found
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        
                    >
                        Login
                    </Button>

                    <Link style={{ textDecoration: 'none'}} to="/auth/signup">
                        Don't have an account? Sign Up
                    </Link>
                </form>
            </div>
           </Container>
        </div>
    )
}