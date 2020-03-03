import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class IndexPage extends Component {
    render() {
        return (
            <main className="center">
                <div className="row">
                    <div className="col s12 blue darken-3" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Create-Room"><h1>CREATE A NEW ROOM</h1> </Link>
                    </div>
                    <div className="col s12 blue darken-3" style={{ border: "1px solid white" }}>
                        <Link className="center-align white-text" to="/Join-Room"><h1>JOIN A ROOM</h1> </Link>
                    </div>
                </div>
            </main>
        )
    }
}
