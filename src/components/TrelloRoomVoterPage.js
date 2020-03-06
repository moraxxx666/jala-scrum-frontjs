import React, { Component } from "react";
import socket from "../Socket/Socket";
import { withRouter } from "react-router-dom";
class TrelloRoomVoterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cards:[]
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.IDRoom;
    socket.VoterJoinRoomTrello(id);
    await socket.RefreshedStorie(async (storie,cards) => {
      await this.setState({
        currentStorie: storie,
        cards
      });
    });
  }
  render() {
    return (
      <div>
        <div className="row container">
          <div className="col s12">
            <h5 className="center-align">
              Current Story : {this.state.currentStorie?.name}
            </h5>
            <h5 className="center-align">
              Description: {this.state.currentStorie?.description}
            </h5>
            <pre style={{ fontFamily: "Arial" }}></pre>
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
export default withRouter(TrelloRoomVoterPage);
