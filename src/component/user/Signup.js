import React, {useState} from 'react'
import axios from 'axios';
import { apiRegister } from "../config/endpoint";

import {
    Container,
    Typography,
    TextField,
    CssBaseline,
    Button,
    Avatar
    
 } from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';

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

export default function Signup() {

    const classes = useStyles();
    const history = useHistory();
    const { handleSubmit, control } = useForm();
    const [isRegisterError, setIsRegisterError] = useState(false)
    const [isFormError, setIsFormError] = useState(false)

    //  login func

    const sumbitRegister = data => {
        
        // console.log("username :" , data.username)
        // console.log("email :" , data.email)
        // console.log("password :" , data.password1)
        // console.log("confirm password :" , data.password2)

        if(data.password1 !== data.password2){

            // console.log("password didn't match")
            setIsFormError(true)

        } else {

            console.log('Ready')

            axios.post(apiRegister,{

                username : data.username,
                email   : data.email,
                password: data.password1,
    
            })
            
            .then((res) => {
                console.log(res)
                history.push("/auth/signin")
            
    
            })
    
            .catch(error => {
                console.log(error)
                setIsRegisterError(true)
            })
        }
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
                    REGISTER
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(sumbitRegister)}>

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
                    name='email'
                    as={
                    <TextField
                        id="email"
                        variant="outlined"
                        label="email"
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
                    name='password1'
                    as={
                    <TextField
                        id="password1"
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

                <Controller
                    name='password2'
                    as={
                    <TextField
                        id="password2"
                        variant="outlined"
                        label="confirm password"
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

                    {isFormError && (
                        <Typography color='error'>
                            password didn't match
                        </Typography>
                    )}

                    {isRegisterError && (
                        <Typography color='error'>
                            can't create an account
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        
                    >
                        Register
                    </Button>

                </form>
            </div>
           </Container>
        </div>
    )
}
