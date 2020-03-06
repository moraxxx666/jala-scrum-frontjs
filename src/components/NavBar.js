import React, { Component } from 'react'
import { Link } from "react-router-dom";
import M from "materialize-css"
export default class NavBar extends Component {
    componentDidMount() {
        let dropdowns = document.querySelectorAll('.dropdown-trigger')
        var instances = M.Dropdown.init(dropdowns, { coverTrigger: false });
        M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    }
    render() {

        return (
            <header className="">
                <nav className="blue darken-2">
                    <div className="nav-wrapper container">
                        <Link to="/" className="brand-logo truncate">Scrum Poker</Link>
                        <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                        <ul className="right hide-on-med-and-down">

                            <li><Link className="dropdown-trigger" to="#!" id="dr" data-target="dropdown1">Local Room<i className="material-icons right">arrow_drop_down</i></Link></li>
                            <li><Link className="dropdown-trigger" to="#!" id="dr" data-target="dropdown3">Import Room<i className="material-icons right">arrow_drop_down</i></Link></li>

                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><Link className="dropdown-trigger" to="#!" id="dr" data-target="dropdown2">Local Room<i className="material-icons right">arrow_drop_down</i></Link></li>
                    <li><Link className="dropdown-trigger" to="#!" id="dr" data-target="dropdown4">Import Room<i className="material-icons right">arrow_drop_down</i></Link></li>
                </ul>

                <ul id="dropdown1" className="dropdown-content">
                    <li><Link to="/Create-Room">Create</Link></li>
                    <li><Link to="/Join-Room">Join</Link></li>

                </ul>
                <ul id="dropdown2" className="dropdown-content">
                    <li><Link to="/Create-Room">Create</Link></li>
                    <li><Link to="/Join-Room">Join</Link></li>

                </ul>
                <ul id="dropdown3" className="dropdown-content">
                    <li><Link to="/Create-Room-Trello">Create</Link></li>
                    <li><Link to="/Join-Room-Trello">Join</Link></li>

                </ul>
                <ul id="dropdown4" className="dropdown-content">
                    <li><Link to="/Create-Room-Trello">Create</Link></li>
                    <li><Link to="/Join-Room-Trello">Join</Link></li>

                </ul>
            </header>
        )
    }
}
