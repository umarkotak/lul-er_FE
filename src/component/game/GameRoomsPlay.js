import React, { useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {Link, useParams, useHistory} from "react-router-dom"
import {Grid,Container,Paper,Drawer,CssBaseline,Toolbar,List,Divider,ListItem,ListItemIcon,ListItemText,Button,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { ContactsOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

export default function GameRoomsPlay() {
  const classes = useStyles()
  let { game_room_id } = useParams()
  const cookies = new Cookies()
  const [players, set_players] = useState([])
  const [fields, set_fields] = useState([])

  function FetchGameRoomDetail() {
    axios.get(`http://luler-tangga-be.herokuapp.com/game_rooms/${game_room_id}`, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        console.log(res.data.data)
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
    })
    .catch(err => {
        console.log(err)
        return err
    })
  }

  useEffect(() => {FetchGameRoomDetail()}, [])

  function ExecuteGenerateMove() {
    axios.post(`http://luler-tangga-be.herokuapp.com/game_rooms/${game_room_id}/generate_move`, {}, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        console.log(res.data.data)
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
    })
    .catch(err => {
        console.log(err)
        return err
    })
  }

  function ExecuteMove() {
    axios.post(`http://luler-tangga-be.herokuapp.com/game_rooms/${game_room_id}/execute_move`, {}, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        console.log(res.data.data)
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
    })
    .catch(err => {
        console.log(err)
        return err
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>placeholder</Paper>
      </Grid>

      <Grid item xs={2}>
        <Paper className={classes.paper}>
          {players.map((player, idx) =>
            <div key={`${idx}-${player.username}`} style={{align: "left"}}>
              <b>{idx+1} - {player.username}</b>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td className="p-0" width="40%">Move Size</td>
                    <td className="p-0">{player.move_size}</td>
                  </tr>
                  <tr>
                    <td className="p-0"  width="40%">Position</td>
                    <td className="p-0">{player.position}</td>
                  </tr>
                  <tr>
                    <td className="p-0"  width="40%">Turn Index</td>
                    <td className="p-0">{player.turn_index}</td>
                  </tr>
                  <tr>
                    <td className="p-0"  width="40%">Turn Status</td>
                    <td className="p-0">{player.turn_status}</td>
                  </tr>
                  <tr>
                    <td className="p-0"  width="40%">Turn Sub Status</td>
                    <td className="p-0">{player.turn_sub_status}</td>
                  </tr>
                </thead>
              </table>
              <hr/>
            </div>
          )}
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <div className="row">
          {fields.map((field, field_idx) =>
            <div key={`FIELD-${field_idx}`} className="flex-nowrap overflow-auto col-1 p-0 border" style={{height: "85px"}}>
              {field_idx}
              <hr className="m-0" />
              {field.game_players.map((field_player, field_player_idx) =>
                <div key={`FIELD-PLAYER-${field_player_idx}`}>
                  <small>{field_player.username}</small>
                </div>
              )}
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.paper}>
          <button className="btn btn-primary btn-block" onClick={() => ExecuteGenerateMove()}>
            Generate Move
          </button>
          <button className="btn btn-primary btn-block" onClick={() => ExecuteMove()}>
            Execute Move
          </button>
        </Paper>
      </Grid>
    </Grid>
  )
}