import React, { Component } from "react";
import socket from "../Socket/Socket";
import { withRouter } from "react-router-dom";
import M from "materialize-css";
class TrelloRoomVoterPage extends Component {
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
      name: ""
    };
    this.Vote = this.Vote.bind(this);
  }
  async componentDidMount() {
    let name = localStorage.getItem("name");
    if (name) {
      let id = this.props.match.params.IDRoom;
      this.setState({
        name: name
      });
      socket.JoinRoomTrello(id);
      socket.JoinedRoom(room => {
        this.setState({
          room
        });
      });
      socket.StorieChanged(room => {
        this.setState({ room });
      });
      socket.DuplicatedVote(msg => {
        M.toast({ html: msg });
      });
      socket.NewVote(room => {
        this.setState({ room });
      });
      socket.VotesReseted(room => {
        this.setState({ room });
      });
      socket.NoRoom((msg)=>{
        M.toast({html:msg})
        this.props.history.push('/Join-Room-Trello')
      })
    } else {
      M.toast({ html: "Name is not define" });
      this.props.history.push("/Join-Room-Trello");
    }
  }
  async componentWillUnmount() {
    socket.UserDisconnected(this.state.room.IDList);
    localStorage.clear();
  }
  async Vote(val) {
    if (this.state.room.currentStorie !== null) {
      let name = this.state.name;
      let IDList = this.state.room.IDList;
      let IDcard = this.state.room.currentStorie?.id;
      socket.TrelloVote(IDList, IDcard, name, val);
    } else {
      M.toast({ html: "There is not a Story selected yet" });
    }
  }

  render() {
    let vote = this.state.room.votes.filter(
      vote =>
        vote.IDStorie === this.state.room.currentStorie.id &&
        vote.name === this.state.name
    );

    return (
      <div>
        <div className="row container">
          <div className="col s12">
            <h5 className="center-align">
              Current Story : {this.state.room?.currentStorie?.name}
            </h5>
            <h5 className="center-align">Description:</h5>
            <pre style={{ fontFamily: "Arial" }}>
              {this.state.room?.currentStorie?.description}
            </pre>
          </div>
          <div className="col s12">
            <div className="row cardContainer">
              {this.state.room?.cards.map((card, index) => {
                return (
                  <div
                    className="cardVote col m2 s6"
                    key={index}
                    onClick={() => this.Vote(card.val)}
                  >
                    <h1 className=" center-align vote">{card.display}</h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col s12">
            <h5 className="center-align">
              Your vote {this.state.name} is: {vote[0]?.vote}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(TrelloRoomVoterPage);
