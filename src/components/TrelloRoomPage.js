import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import socket from "../Socket/Socket";
import M from "materialize-css";
class TrelloRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        stories: [],
        cards: [],
        votes: [],
        currentStorie: null,
        IDList: ""
      },
      UsersConnected: 0
    };
    this.ChangeCurrentStorie = this.ChangeCurrentStorie.bind(this);
    this.ResetVotes = this.ResetVotes.bind(this);
  }
  async componentDidMount() {
    let id = this.props.match.params.IDRoom;
    socket.JoinRoomTrello(id);
    await socket.JoinedRoom(async room => {
      await this.setState({ room });
    });
    await socket.StorieChanged(async room => {
      await this.setState({ room });
    });
    socket.UserConnected(users => {
      this.setState({ UsersConnected: users });
    });
    socket.Disconnected(users => {
      this.setState({ UsersConnected: users });
    });
    socket.NewVote(room => {
      this.setState({ room });
    });
    socket.VotesReseted(room => {
      this.setState({ room });
    });
    socket.NoRoom(msg => {
      M.toast({ html: msg });
      this.props.history.push("/Join-Room-Trello");
    });
  }
  ChangeCurrentStorie(storie, IDList) {
    socket.ChangeStorie(storie, IDList);
  }
  ResetVotes() {
    socket.ResetVotes(
      this.state.room.IDList,
      this.state.room.currentStorie?.id
    );
  }

  render() {
    let CurrentVotes = this.state.room.votes.filter(
      vote => vote.IDStorie === this.state.room.currentStorie?.id
    );

    return (
      <main className="margin">
        <div className="row">
          <div className="col m4 s12 row">
            <div className="col s12">
              <h5 className="center-align">Stories</h5>
            </div>
            <div className="col s12">
              <div className="stories-container">
                {this.state.room?.stories.map((storie, index) => {
                  return (
                    <div
                      className="storie "
                      key={index}
                      onClick={() =>
                        this.ChangeCurrentStorie(storie, this.state.room.IDList)
                      }
                    >
                      <h6 className="center-align">{storie.name}</h6>
                      <div className="description">
                        <pre>{storie.description}</pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col m8 s12 ">
            <div className="row">
              <div className="col s12">
                <h5 className="center-align">Information</h5>
              </div>
              <div className="col s12">
                <button className="btn red" onClick={this.ResetVotes}>
                  Restart Votes for this Story
                </button>
              </div>
              <div className="col s12">
                <p>ID Room : {this.state.room.IDList}</p>
                <p>Current Storie: {this.state.room.currentStorie?.name}</p>
                <p>Description: {this.state.room.currentStorie?.description}</p>
                <p>Users Connected : {this.state.UsersConnected}</p>
              </div>
            </div>
          </div>
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h5 className="center-align">Votes</h5>
              </div>
              <div className="col s12">
                <div className="row ">
                  {CurrentVotes.map((vote, index) => {
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
        </div>
      </main>
    );
  }
}
export default withRouter(TrelloRoomPage);
