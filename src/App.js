import React from 'react';
import "materialize-css/dist/css/materialize.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NavBar from "./components/NavBar"
import IndexPage from "./components/IndexPage"
import CreateRoomPage from "./components/CreateRoomPage"
import RoomManteinerPage from "./components/RoomManteinerPage"
import JoinRoomPage from "./components/JoinRoomPage";
import RoomVoterPage from "./components/RoomVoterPage"
// TRELLO PAGES
import CreateRoomTrelloPage from "./components/CreateRoomTrelloPage"
import TrelloBoardPage from "./components/TrelloBoardPage"
import TrelloRoomPage from "./components/TrelloRoomPage"
import JoinTrelloRoomPage from "./components/JoinTrelloRoomPage"
import TrelloRoomVoterPage from "./components/TrelloRoomVoterPage"
function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" exact>
          <NavBar />
          <IndexPage />
        </Route>
        <Route path="/Create-Room" exact>
          <NavBar />
          <CreateRoomPage />
        </Route>
        <Route path="/Join-Room" exact>
          <NavBar />
          <JoinRoomPage />
        </Route>
        <Route path="/Room/:RoomID" exact>
          <NavBar />
          <RoomManteinerPage />
        </Route>
        <Route path="/Vote/:RoomID" exact>
          <NavBar />
          <RoomVoterPage />
        </Route>
        <Route path="/Create-Room-Trello" exact>
          <NavBar />
          <CreateRoomTrelloPage />
        </Route>
        <Route path="/Trello-Board/:IDBoard" exact>
          <NavBar />
          <TrelloBoardPage />
        </Route>
        <Route path="/Trello-Room/:IDRoom" exact>
          <NavBar />
          <TrelloRoomPage />
        </Route>
        <Route path="/Join-Room-Trello" exact>
          <NavBar />
          <JoinTrelloRoomPage />
        </Route>
        <Route path="/Vote-Trello/:IDRoom" exact>
          <NavBar />
          <TrelloRoomVoterPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
