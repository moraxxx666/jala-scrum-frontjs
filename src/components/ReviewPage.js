import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import M from "materialize-css";
import socket from "../Socket/Socket";
class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      RoomID: ""
    };
  }
  async componentDidMount() {
    let RoomID = this.props.match.params.RoomID;
    await this.setState({ RoomID });
    socket.ReviewRoom(this.state.RoomID);
    socket.RoomReviewed(room => {
      this.setState({ room });
    });
    socket.NoRoom(msg => {
      M.toast({ html: msg });
      this.props.history.push("/Room-Review");
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h5 className="center-align">Room Information</h5>
            </div>
            <div className="col s12">
              <h6 className="center-align">Room ID : {this.state.room?._id}</h6>
            </div>
            <div className="col s12">
              <h6 className="center-align">
                Status : {this.state.room?.active ? "Active" : "Closed"}
              </h6>
            </div>
            <div className="col s12">
              <h6 className="center-align">Story: {this.state.room?.story}</h6>
            </div>
            <div className="col s12">
              <h6 className="center-align">Description: </h6>
              <pre>{this.state.room?.description}</pre>
            </div>
            <div className="col s12">
            <div className="row ">
                <div className="col s12">
                    <h1 className="center-align">Votes</h1>
                </div>
              {this.state.room?.votes?.map((vote, index) => {
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
    );
  }
}
export default withRouter(ReviewPage);
