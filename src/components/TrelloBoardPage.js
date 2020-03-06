import React, { Component } from "react";
import { withRouter,Link } from "react-router-dom";
import socket from "../Socket/Socket";
class TrelloBoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  async componentDidMount() {
    let IDBoard = this.props.match.params.IDBoard;
    socket.GetListFromBoard(IDBoard);
    socket.ReturnList(list => {
      this.setState({
        list
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
          {this.state.list.map((list, index) => {
            return (
              <div
                className="col s12 blue darken-3"
                style={{ border: "1px solid white" }}
                key={index}
              >
                <Link
                  className="center-align white-text"
                  to={`/Trello-Room/${list.id}`}
                >
                  <h4>{list.name}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
}
export default withRouter(TrelloBoardPage);
