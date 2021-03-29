import React from 'react';
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
    ListItemText  

 } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


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

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        // className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['dataA', 'dataB', 'dataC', 'dataD'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['subData1', 'subData2', 'subData3'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['dataA', 'dataB', 'dataC', 'dataD'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['subData1', 'subData2', 'subData3'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Container>
            <Grid style={{ marginTop : 100 }} justify='center'>
              
            {/* <Grid
                width="100"
                height="100"
                rows="10"
                cols="10"
                style={{ marginTop : 100 }}
                
            > */}
            <div className={classes.box}>

                {Array(64).fill().map((v, i) =>
                
                    <Paper elevation={3}>
                        <LockOutlinedIcon />
                        <EmojiEmotionsIcon />
                        <LockOutlinedIcon />
                        <EmojiEmotionsIcon />
                    </Paper>
                
                )}
                
            </div>
            </Grid>
        </Container>
      </main>
    </div>
  );
}