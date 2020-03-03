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
          <CreateRoomPage/>
        </Route>
        <Route path="/Join-Room" exact>
          <NavBar />
          <h2>hola 2 </h2>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
