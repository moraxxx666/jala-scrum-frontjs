import React from 'react';
import "materialize-css/dist/css/materialize.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ScrumProvider from "./Context/ScrumContext"
import NavBar from "./components/NavBar"
import IndexPage from "./components/IndexPage"
import CreateRoomPage from "./components/CreateRoomPage"
import RoomManteinerPage from "./components/RoomManteinerPage"
import JoinRoomPage from "./components/JoinRoomPage";
import RoomVoterPage from "./components/RoomVoterPage"

function App() {
  return (
    <ScrumProvider>
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
            <JoinRoomPage/>
          </Route>
          <Route path="/Room/:RoomID" exact>
            <NavBar />
            <RoomManteinerPage />
          </Route>
          <Route path="/Vote/:RoomID" exact>
            <NavBar />
            <RoomVoterPage/>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </ScrumProvider>
  );
}

export default App;
