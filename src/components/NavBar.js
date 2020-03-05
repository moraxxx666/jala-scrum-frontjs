import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class NavBar extends Component {
    render() {
        return (
            <header>
                <nav className="blue darken-4">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo truncate">SCRUM POKER</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
