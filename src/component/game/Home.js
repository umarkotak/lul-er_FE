import React from 'react'

import {
    Grid,
    Container,
    Typography,
    Button

 } from '@material-ui/core'

import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'

export default function Home() {

    const cookies = new Cookies();
    const history = useHistory();

    const checkUser = () => {

        return cookies.get("USER_TOKEN");
    }

    const handleLobby = () => {
        if (checkUser() === undefined){
            history.push("auth/signin")
        } else {
            history.push("/lobby")
        }
    }

    function handleCreateGameRoom() {
        if (checkUser() === undefined){
            history.push("auth/signin")
        } else {
            history.push("/game_rooms/new")
        }
    }

    const homeTitle = (
        <div>
        <Grid container spacing={3} m={2} justify="center" style={{ marginTop : 150 }}>
            <Typography variant="h4" component="h4" color="textPrimary">
                Home
            </Typography>
        </Grid>
        </div>
    )


    return (
        <div>
           <Container>
                {homeTitle}
                <Grid container style={{ marginTop : 50 }} justify="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick ={() => handleCreateGameRoom()}
                        style={{ margin : "0px 10px" }}
                    >
                        Create Game Rooms
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick ={() => handleLobby()}
                        style={{ margin : "0px 10px" }}
                    >
                        Lobby
                    </Button>
               </Grid>
           </Container>
        </div>
    )
}
