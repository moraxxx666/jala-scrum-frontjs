import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import socket from "../Socket/Socket";
import M from "materialize-css";
class RoomVoterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      selectedVote: null
    };
    this.SelectCard = this.SelectCard.bind(this);
  }
  async SelectCard(e) {
    await this.setState({
      selectedVote: parseInt(e)
    });
    await socket.Vote(
      {
        name: this.state.name,
        vote: this.state.selectedVote
      },
      this.state._id
    );
  }
  componentWillUnmount() {
    let id = this.props.match.params.RoomID;
    socket.UserLeftRoom(id);
  }
  componentDidMount() {
    let id = this.props.match.params.RoomID;
    let name = localStorage.getItem("name");
    if (name) {
      this.setState({
        name: name
      });
    } else {
      M.toast({ html: "Name is not define" });
      this.props.history.push("/Join-Room");
    }
    socket.ConnectIntoaRoom(id);
    socket.RoomOK(room => {
      if (room.active) {
        this.setState(room);
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
    socket.ResetedRoom(msg => {
      M.toast({ html: msg });
      this.setState({
        selectedVote: null
      });
    });
    socket.Voted((msg)=>{
        M.toast({html:msg})
    })
  }
  render() {
    return (
      <div>
        <div className="row container">
          <div className="col s12">
            <h5 className="center-align">
              Created By : {this.state.createdBy}
            </h5>
            <h5 className="center-align">Story : {this.state.story}</h5>
            <h5 className="center-align">
              Description: {this.state.description}
            </h5>
          </div>
          <div className="col s12">
            <div className="row cardContainer">
              {this.state.cards.map((card, index) => {
                return (
                  <div
                    className="cardVote col m2 s6"
                    key={index}
                    onClick={() => this.SelectCard(card.val)}
                  >
                    <h1 className=" center-align vote">{card.display}</h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col s12">
            <h5 className="center-align">
              Your vote {this.state.name} is: {this.state.selectedVote}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(RoomVoterPage);
