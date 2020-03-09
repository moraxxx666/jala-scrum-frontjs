import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import socket from "../Socket/Socket";
import M from "materialize-css";
class RoomManteinerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: null,
      votes: [],
      active: true,
      story: "",
      description: "",
      usersConnected: 0,
      cards: [],
      createdBy: ""
    };
    this.FinishRoom = this.FinishRoom.bind(this);
    this.Resetroom = this.Resetroom.bind(this);
  }


  componentDidMount() {
    let id = this.props.match.params.RoomID;
    socket.ConnectIntoaRoom(id);
    socket.RoomOK(async room => {
      if (room.active) {
        await this.setState(room);
      } else {
        M.toast({ html: "Room is closed" });
        this.props.history.push("/Join-Room");
      }
    });
    socket.RoomBAD(message => {
      M.toast({ html: message });
      this.props.history.push(`/Join-Room`);
    });
    socket.UserJoinRoom(io => {
      this.setState({
        usersConnected: parseInt(io)
      });
    });
    socket.ClosedRoom(msg => {
      M.toast({ html: msg });
      this.props.history.push("/");
    });
    socket.ResetedRoom((msg, room) => {
      M.toast({ html: msg });
      this.setState(room);
    });
    socket.RefreshVotes(room => {
      this.setState(room);
    });
  }
  FinishRoom() {
    socket.CloseRoom(this.state._id);
  }
  Resetroom() {
    socket.ResetRoom(this.state._id);
  }
  render() {
    return (
      <div>
        <div className="row cont">
          <div className="col s12 m4 medio">
            <div className="row">
              <div className="col s12">
                <h6 className="center-align">ROOM ID: {this.state._id} </h6>
                <h6 className="center-align">STORY : {this.state.story} </h6>
                <h6 className="center-align">
                  Users Connected to the Room : {this.state.usersConnected}
                </h6>
                <h6 className="center-align"> DESCRIPTION : </h6>
                <pre style={{ fontFamily: "Arial" }}>
                  {this.state.description}
                </pre>
              </div>
              <div className="col s12 m6">
                <button className="btn red " onClick={this.FinishRoom}>
                  Finish Sessión
                </button>
              </div>
              <div className="col s12 m6">
                <button className="btn green " onClick={this.Resetroom}>
                  Restart Sessión
                </button>
              </div>
            </div>
          </div>
          <div className="col s12 m8 derecha">
            <h2 className="center-align">VOTES</h2>
            <div className="row ">
              {this.state.votes.map((vote, index) => {
                return (
                  <div className="cardVote col m2 s6" key={index}>
                    <h1 className=" center-align vote">{vote.vote}</h1>
                    <h6 className="center-align">{vote.name}</h6>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(RoomManteinerPage);
