import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class IndexPage extends Component {
    render() {
        return (
            <main className="center container">
                <div className="row">
                    <div className="col s12 m6 green darken-3" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Create-Room"><h3>CREATE A LOCAL ROOM</h3> </Link>
                    </div>
                    <div className="col s12 m6 blue darken-4" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Create-Room-Trello"><h3>CREATE A TRELLO ROOM</h3> </Link>
                    </div>
                    <div className="col s12 m6 green darken-3" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Join-Room"><h3>JOIN A LOCAL ROOM</h3> </Link>
                    </div>
                    <div className="col s12 m6 blue darken-4" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Join-Room-Trello"><h3>JOIN A TRELLO ROOM</h3> </Link>
                    </div>
                    
                </div>
            </main>
        )
    }
}
