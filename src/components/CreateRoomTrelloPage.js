import React, { Component } from "react";
import socket from "../Socket/Socket";
import { withRouter, Link } from "react-router-dom";
class CreateRoomTrelloPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }
  componentDidMount() {
    socket.GetBoards();
    socket.ReturnBoards(boards => {
      this.setState({
        boards
      });
    });
  }
  render() {
    return (
      <main className="center container">
        <div className="row">
          <div className="col s12">
            <h3 className="center-align">Choose a Board from Trello</h3>
          </div>
          {this.state.boards.map((board, index) => {
            return (
              <div
                className="col s12 blue darken-3"
                style={{ border: "1px solid white" }}
                key={index}
              >
                <Link className="center-align white-text" to={`/Trello-Board/${board.IDBoard}`}>
                  <h4>{board.name}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}
export default withRouter(CreateRoomTrelloPage);
