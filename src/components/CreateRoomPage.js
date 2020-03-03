import React, { Component } from 'react'
import M from "materialize-css"
import IO from "socket.io-client"
export default class CreateRoomPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            story: "",
            description: "",
            private: false,
            password: '',
            server: null
        }
        this.HandlerPrivate = this.HandlerPrivate.bind(this)
        this.btn = this.btn.bind(this)
        this.Handler = this.Handler.bind(this)
    }
    componentDidMount() {
        this.state.server = IO('http://localhost:4000')
        this.state.server.on('saludo', (as) => {
            M.toast({html:as})
        })
    }
    HandlerPrivate(e) {
        this.setState({
            private: !this.state.private,
            password: ""
        })
    }
    Handler(e){
        this.setState({
           story : e.target.value
        })
    }
    btn(e) {
        e.preventDefault()
        this.state.server.emit("boton",this.state.story)
    }
    render() {
        return (
            <main className="center">

                <div className="row blue darken-3">
                    <div className="col s12">
                        <h4 className="center-align">NEW SCRUM POKER ROOM</h4>
                    </div>
                    <div className="col s12">
                        <form className="row">
                            <div className="input-field col s12">
                                <input id="story" type="text" name="story" className="white-text" onChange={this.Handler} />
                                <label htmlFor="story">Story (*)</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="description" type="text" name="description" className="white-text" onChange={this.handler} />
                                <label htmlFor="description">Description (*)</label>
                            </div>
                            <div className="col s12">
                                <h4>Configuration</h4>
                            </div>
                            <label className="input-field col s12">
                                <input type="checkbox" className="filled-in checkbox-blue-grey" onChange={this.HandlerPrivate} />
                                <span>Private?</span>
                            </label>
                            {
                                this.state.private === true ? <div className="input-field col s12">
                                    <input id="password" type="password" name="password" className="white-text" onChange={this.handler} />
                                    <label htmlFor="password">Password</label>
                                </div> : null
                            }
                            <button className="btn blue" onClick={this.btn}>apretame</button>



                        </form>
                    </div>


                </div>
            </main>
        )
    }
}
