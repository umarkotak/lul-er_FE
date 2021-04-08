import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { createGameRoom } from '../config/Endpoint';

import {
    Grid,
    Container,
    Typography,
    Button,
    TextField,
    CssBaseline,
    Avatar

 } from '@material-ui/core'

import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function GameRoomsNew() {

    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

    const [game_room_title, set_game_room_title] = React.useState('');
    const [game_room_mode, set_game_room_mode] = React.useState('classic');


    const classes = useStyles();
    const cookies = new Cookies();
    const history = useHistory();

    const checkUser = () => {

        return cookies.get("USER_TOKEN");
    }

    const handleHome = () => {
        if (checkUser() === undefined){
            history.push("auth/signin")
        } else {
            history.push("/")
        }
    }

    const handleCreate = () => {
      console.log(game_room_title)
      console.log(game_room_mode)

      axios.post(createGameRoom, {

        room_title: game_room_title,
        mode   : game_room_mode
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        },
        params: {},
      })

      .then((res) => {
          console.log(res)
          history.push("/lobby")
      })

      .catch(error => {
          console.log(error)
      })
    }

    const homeTitle = (
        <div>
        <Grid container spacing={3} m={2} justify="center" style={{ marginTop : 150 }}>
            <Typography variant="h4" component="h4" color="textPrimary">
                Create Game Room
            </Typography>
        </Grid>
        </div>
    )


    return (
        <div>
           <Container>
                {homeTitle}

                <Grid direction="column" container style={{ marginTop : 50 }} justify="center" spacing={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick ={() => handleHome()}
                    >
                        Home
                    </Button>

                    <FormControl className={classes.formControl}>

                      <TextField required id="standard-required" label="Required" value={game_room_title} onChange={e => set_game_room_title(e.target.value)} />
                    </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                Game Mode
                            </InputLabel>
                            <NativeSelect
                                value={game_room_mode}
                                onChange={e => set_game_room_mode(e.target.value)}
                            >
                                <option key="classic" value="classic">Classic</option>
                                <option key="epic" value="epic">Epic</option>
                            </NativeSelect>
                            <FormHelperText>Game mode will define how the game will be played</FormHelperText>
                        </FormControl>



                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick ={() => handleCreate()}
                    >
                        Create
                    </Button>
               </Grid>

           </Container>
        </div>
    )
}
