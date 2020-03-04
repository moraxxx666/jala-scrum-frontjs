import React, { Component } from 'react'
import M from "materialize-css"
import { withRouter } from "react-router-dom";
import socket , { CreateRoom } from "../Socket/Socket"
class CreateRoomPage extends Component {

    constructor(props) {
        super(props)
        this.state = {

            story: "",
            description: "",
            private: false,
            password: ''

        }
        this.HandlerPrivate = this.HandlerPrivate.bind(this)
        this.CreateRoom = this.CreateRoom.bind(this)
        this.Handler = this.Handler.bind(this)
    }
    componentDidMount() {
        socket.on('Room Created',(room)=>{
            localStorage.setItem("data",room._id)
            this.props.history.push(`/Room/${room._id}`)
        })

    }

    HandlerPrivate(e) {
        this.setState({
            private: !this.state.private,
            password: ""
        })
    }
    Handler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    CreateRoom(e) {
        e.preventDefault()
        if (this.state.private === true) {
            if (this.state.password) {
                let obj = {
                    story: this.state.story,
                    description: this.state.description,
                    private: this.state.private,
                    password: this.state.password
                }
                CreateRoom(obj)
                
            } else {
                M.toast({ html: "Password is required" })
            }
        } else {
            let obj = {
                story: this.state.story,
                description: this.state.description,
                private: this.state.private,
                password: this.state.password
            }
            CreateRoom(obj)

        }

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
                                <input id="description" type="text" name="description" className="white-text" onChange={this.Handler} />
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
                                    <input id="password" type="password" name="password" className="white-text" onChange={this.Handler} />
                                    <label htmlFor="password">Password</label>
                                </div> : null
                            }
                            <button className="btn blue" onClick={this.CreateRoom}>Create Room</button>



                        </form>
                    </div>


                </div>
            </main>
        )
    }
}
export default withRouter(CreateRoomPage)