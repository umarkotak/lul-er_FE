import React, { useState,useEffect } from 'react';
import { getRooms, joinRoom } from '../config/Endpoint';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Container,
    Typography,
    Paper,
    Divider,
    Button,
    Box

 } from '@material-ui/core';
 import axios from 'axios';
 import Cookies from 'universal-cookie';
 import { useHistory } from 'react-router-dom'
import { ErrorOutline } from '@material-ui/icons';


 const useStyles = makeStyles((theme) => ({
    card: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(3),
        width: theme.spacing(32),
        height: theme.spacing(32),
      },
    },
  }));

export default function Lobby() {
    const [rooms, setRooms] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const classes = useStyles();
    const history = useHistory();

    const firstFetch = () => {
        axios.get(getRooms, {
            headers: {
                'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
            }
        }).then(res => {
            console.log('fetched!', res.data.data);
            setRooms(res.data.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            return err;
        })
    }

    const handleJoinRoom = (roomId) => {
        console.log(`Bearer ${cookies.get("USER_TOKEN")}`);
        axios.post(joinRoom+roomId+'/join', {
            headers: {
                'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
            }
        })
        .then(res => {
            history.push('/game');
        })
        .catch(err => {
            console.log(err);
            return err;
        });
        //history.push('/game');
    }

    const lobbyTitle = (<div>
        <Container>
               <Grid container style={{ marginTop : 100 }} justify='center'>
                    <Typography variant="h4" component="h4" color='textPrimary'>
                        Lobby
                    </Typography>
               </Grid>
           </Container></div>);

    const roomList = (<div>
        <Container>
        <Grid>
            <div >
                {loading ? (
                    console.log("gak ada data")
                ) : (
                    <div className={classes.card}>
                    {rooms.map((room, i) => {
                            return (
                            <Paper key={i} elevation={5}>
                            <Container>
                            <Typography noWrap>
                                <h4>{room.room_title}</h4>
                            </Typography>
                            <Divider style={{ marginTop: 0 }}></Divider>
                            <br></br>
                            <Typography noWrap><b>Room Master:</b> {room.room_master_username}</Typography>
                            <Typography><b>Mode:</b> {room.mode}</Typography>
                            <Typography><b>Player:</b> {room.current_player_count} / {room.max_player_count}</Typography>
                            <Box textAlign='center' style={{ marginTop : 35 }}>
                                <Button variant="contained" color="primary" onClick={() => handleJoinRoom(room.id)}>Join</Button>
                            </Box>
                            </Container>
                            </Paper>
                            )
                    })}
                    </div>) }
            </div>
        </Grid>
    </Container>
    </div>)

    useEffect(() => {
        firstFetch();
    }, [refresh])

    //setTimeout(function(){ setRefresh(refresh+1) }, 2000);

    return (
        <div>
           {lobbyTitle}
           
            {roomList}
                
        </div>
    )
}
