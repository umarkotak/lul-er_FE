import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
    Grid,
    Container,
    Paper,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Typography

 } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ContactsOutlined } from '@material-ui/icons';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: drawerWidth,
    // marginLeft: drawerWidth,
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.3),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));



export default function Board() {

  const classes = useStyles();
  const cookies = new Cookies();
  const [board, setBoard] = useState([])

  const playerMenuL = (

    <div>
      <Drawer
        // className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Typography noWrap style={{ marginTop : 20, marginLeft : 20 }}>
              Player Item
          </Typography>
          <List>
            {['item', 'item', 'item', 'item'].map((text, index) => (
              <ListItem button key={text} onClick={() => handleUseItemPlayer()} >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

        </div>
      </Drawer>
    </div>
  )


  const playerMenuR = (

    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <Toolbar />
          <Container justify='center'>
            <Typography noWrap style={{ marginTop : 20 }}>
                PLAYER TURN :
            </Typography>
            <Button variant="contained"
                    color="secondary"
                    style={{ marginTop : 20 }}
                    onClick={() => handleRollDice()}
                    >
              Generate Move
            </Button>
            <Typography noWrap style={{ marginTop : 20 }}>
                HISTORY MOVE
            </Typography>
          </Container>
      </Drawer>
    </div>
  )


  const gameBoard = (
    <div>
      <main className={classes.content}>
        <Container>
            <Grid style={{ marginTop : 100 }} justify='center'>
            <div className={classes.box}>

                {/* {Array(100).fill().map((v, i) =>

                    <Paper elevation={3}>

                        <EmojiEmotionsIcon />
                        <LockOutlinedIcon />
                        <EmojiEmotionsIcon />
                    </Paper>

                )} */}
              <div className="board" style={{ marginLeft : 225 }}>
                {board.map((v, i) =>
                      <div className="tile" key={i} >


                        {/* <LockOutlinedIcon /> */}
                        <h6>{v.index}</h6>
                      </div>
                  )}
              </div>

            </div>
            </Grid>
        </Container>
      </main>
    </div>
  )


  // function

  const handleRollDice = () => {

    console.log("roll")
  }

  const handleUseItemPlayer = () => {

    console.log('item')
  }

  const FetchData = () => {

    console.log(`Bearer ${cookies.get("USER_TOKEN")}`);
    axios.get("http://luler-tangga-be.herokuapp.com/game_rooms/GAMEROOM-1617377255", {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        // history.push('/game');
        console.log(res.data.data.game_board.game_fields)
        setBoard(res.data.data.game_board.game_fields)
    })
    .catch(err => {
        console.log(err);
        return err;
    });

  }


  useEffect(() => {

    FetchData()

  }, [])
  return (
    <div className={classes.root}>
      <CssBaseline />
      {playerMenuL}
      {playerMenuR}
      {gameBoard}
    </div>
  );
}