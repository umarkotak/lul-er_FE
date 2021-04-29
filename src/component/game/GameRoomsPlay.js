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

var lulerTanggaHost = "http://luler-tangga-be.herokuapp.com"
// var lulerTanggaHost = "http://localhost:3000"
var soundUrlYourTurn = `${window.location.origin}/sounds/sound-your-turn.mp3`
var soundUrlItemUse = `${window.location.origin}/sounds/sound-item-use.mp3`
var soundUrlVictory = `${window.location.origin}/sounds/sound-victory.mp3`
var soundUrlClick = `${window.location.origin}/sounds/sound-click.mp3`

export default function GameRoomsPlay() {
  const classes = useStyles()
  let { game_room_id } = useParams()
  const cookies = new Cookies()
  const [players, set_players] = useState([])
  const [fields, set_fields] = useState([])
  const [my_player, set_my_player] = useState({})
  const [active_player, set_active_player] = useState({})
  const [generate_move_loading, set_generate_move_loading] = useState("false")
  const [selected_field_info, set_selected_field_info] = useState({})
  const [audioYourTurn] = useState(new Audio(soundUrlYourTurn))
  const [audioItemUse] = useState(new Audio(soundUrlItemUse))
  const [audioVictory] = useState(new Audio(soundUrlVictory))
  const [audioClick] = useState(new Audio(soundUrlClick))
  const [time_ellapsed, set_time_ellapsed] = useState(0)

  useEffect(() => {
    FetchGameRoomDetail()
    sendPing()
  }, [])

  function sendPing() {
    setTimeout(() => {
      set_time_ellapsed(Date.now())
      sendPing()
    }, 2000)
  }

  useEffect(() => {
    if (active_player.username === cookies.get("USER_NAME")) {
      audioYourTurn.play()
    }
  }, [time_ellapsed])

  function FetchGameRoomDetail() {
    if (generate_move_loading === "true") {
      setTimeout(() => {
        FetchGameRoomDetail()
      }, 1500)
      return
    }

    axios.get(`${lulerTanggaHost}/game_rooms/${game_room_id}`, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        console.log(res.data.data)
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
        set_my_player(res.data.data.my_player)
        set_active_player(res.data.data.active_player)

        setTimeout(() => {
          FetchGameRoomDetail()
        }, 1500)
    })
    .catch(err => {
        return err
    })
  }


  function ExecuteGenerateMove() {
    audioClick.play()
    set_generate_move_loading("true")
    axios.post(`${lulerTanggaHost}/game_rooms/${game_room_id}/generate_move`, {}, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
        set_my_player(res.data.data.my_player)
        set_active_player(res.data.data.active_player)

        set_generate_move_loading("false")
    })
    .catch(err => {
        set_generate_move_loading("false")
        return err
    })
  }

  function ExecuteMove() {
    audioClick.play()
    axios.post(`${lulerTanggaHost}/game_rooms/${game_room_id}/execute_move`, {}, {
        headers: {
            'Authorization': `Bearer ${cookies.get("USER_TOKEN")}`
        }
    })
    .then(res => {
        set_players(res.data.data.game_players)
        set_fields(res.data.data.game_board.game_fields)
        set_my_player(res.data.data.my_player)
    })
    .catch(err => {
        return err
    })
  }

  function generateFieldBorder(field_type) {
    if (field_type === "event") {
      return "border-primary"
    }
  }

  function GetFieldInfo(field_idx) {
    audioClick.play()
    set_selected_field_info(fields[field_idx])
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
            <div key={`FIELD-${field_idx}`} className={`flex-nowrap overflow-auto col-1 p-0 border ${generateFieldBorder(field.field_type)}`} style={{height: "90px"}}>
              {/* {field_idx + 1} */}
              <button className="btn btn-sm btn-outline-secondary px-1 py-0" onClick={() => GetFieldInfo(field_idx)}>{field_idx + 1}</button>
              <hr className="m-0" />
              {field.game_players.map((field_player, field_player_idx) =>
                <div key={`FIELD-PLAYER-${field_player_idx}`}>
                  <div style={{color: "blue"}}>
                    <small className="border rounded" style={{backgroundColor: "pink"}}><b>{field_player.username}</b></small>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.paper}>
          <h3>Action</h3>
          <button className="btn btn-primary btn-block" onClick={() => ExecuteGenerateMove()}>
            Generate Move
          </button>
          <GenerateMoveIndicator />
          <button className="btn btn-primary btn-block" onClick={() => ExecuteMove()}>
            Execute Move
          </button>

          <hr/>
          <h3>Item</h3>

          <hr/>
          <h3>Info</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <td className="p-0" width="40%">Field Type</td>
                <td className="p-0">{selected_field_info.field_type}</td>
              </tr>
              <tr>
                <td className="p-0"  width="40%">Effect Type</td>
                <td className="p-0">{selected_field_info.effect && selected_field_info.effect.effect_type}</td>
              </tr>
              <tr>
                <td className="p-0"  width="40%">Value 1</td>
                <td className="p-0">{selected_field_info.effect && selected_field_info.effect.effect_value}</td>
              </tr>
              <tr>
                <td className="p-0"  width="40%">Value 2</td>
                <td className="p-0">{selected_field_info.effect && selected_field_info.effect.effect_value_s}</td>
              </tr>
            </thead>
          </table>
          <hr/>
        </Paper>
      </Grid>
    </Grid>
  )

  function GenerateMoveIndicator() {
    if (generate_move_loading == "false") {
      return(
        <div>
          <h1 style={{textAlign: "center"}}>
            {my_player.move_size}
          </h1>
        </div>
      )
    }
    return(
      <div className="d-flex justify-content-center my-3">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}
