import './App.css';
// Navbar
import Navbar from "./component/utils/Navbar";
// user
import Signin from "./component/user/Signin";
import Signup from "./component/user/Signup";
// Game
import Home from "./component/game/Home";
import Board from "./component/game/Board";
import Lobby from "./component/game/Lobby";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

export default function App() {
  return (
    
    <Router>
      <div>
        <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game" exact component={Board} />
            <Route path="/lobby" exact component={Lobby} />
            <Route path="/auth/signin" exact component={Signin} />
            <Route path="/auth/signup" exact component={Signup} />
          </Switch>
      </div>
    </Router>

  )
}
