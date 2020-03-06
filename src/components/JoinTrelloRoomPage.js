import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import M from "materialize-css"
class JoinTrelloRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: null,
      name: null
    };
    this.Handler = this.Handler.bind(this);
    this.JoinRoom = this.JoinRoom.bind(this);
  }
  Handler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  JoinRoom(e) {
    e.preventDefault();
    if (this.state.roomID && this.state.name) {
      localStorage.setItem("name", this.state.name);
      this.props.history.push(`/Vote-Trello/${this.state.roomID}`);
    } else {
      M.toast({ html: "All fields are required" });
      localStorage.clear();
    }
  }
  render() {
    return (
      <main className="center">
        <div className="row">
          <div className="col s12">
            <h4 className="center-align">JOIN TRELLO ROOM</h4>
          </div>
          <div className="col s12">
            <form className="row">
              <div className="input-field col s12">
                <input
                  id="roomID"
                  type="text"
                  name="roomID"
                  className="white-text"
                  onChange={this.Handler}
                />
                <label htmlFor="roomID">ROOM ID </label>
              </div>
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="white-text"
                  onChange={this.Handler}
                />
                <label htmlFor="name">NAME</label>
              </div>
              <button className="btn blue" onClick={this.JoinRoom}>
                Join Room
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
export default withRouter(JoinTrelloRoomPage);
