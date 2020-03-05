import React, { Component } from 'react'
import M from "materialize-css"
import { withRouter } from "react-router-dom";
import socket from "../Socket/Socket"
class CreateRoomPage extends Component {

    constructor(props) {
        super(props)
        this.state = {

            story: "",
            description: "",
            name: ''

        }
        this.Handler = this.Handler.bind(this)
        this.CreateRoom = this.CreateRoom.bind(this)

    }
    componentDidMount() {
        socket.RoomCreated(room => this.props.history.push(`/Room/${room._id}`))

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
                localStorage.setItem("name", this.state.name)
                socket.CreateRoom(obj, this.state.name)

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
            localStorage.setItem("name", this.state.name)
            socket.CreateRoom(obj, this.state.name)

        }

    }
    render() {
        return (
            <main className="center container">

                <div className="row ">
                    <div className="col s12">
                        <h4 className="center-align">NEW SCRUM POKER ROOM</h4>
                    </div>
                    <div className="col s12">
                        <form className="row">
                            <div className="input-field col s12">
                                <input id="name" type="text" name="name" className="white-text" onChange={this.Handler} />
                                <label htmlFor="name">Name Manteiner</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="story" type="text" name="story" className="white-text" onChange={this.Handler} />
                                <label htmlFor="story">Story (*)</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea id="description" name="description" class="materialize-textarea white-text" onChange={this.Handler}></textarea>
                                <label htmlFor="description">Description (*)</label>
                            </div>
                            <div className="col s12">

                                <button className="btn blue" onClick={this.CreateRoom}>Create Room</button>

                            </div>

                        </form>
                    </div>


                </div>
            </main>
        )
    }
}
export default withRouter(CreateRoomPage)