import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import M from "materialize-css";
class RoomReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RoomID: ""
    };
    this.Handler = this.Handler.bind(this);
    this.ReviewRoom = this.ReviewRoom.bind(this);
  }
  Handler(e) {
    this.setState({
      RoomID: e.target.value
    });
  }
  ReviewRoom(e) {
    e.preventDefault();
    if (this.state.RoomID) {
      this.props.history.push(`/Review/${this.state.RoomID}`);
    } else {
      M.toast({ html: "ID Room is required" });
    }
  }
  render() {
    return (
      <main className="center">
        <div className="row">
          <div className="col s12">
            <h4 className="center-align">Review Room</h4>
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

              <button className="btn blue" onClick={this.ReviewRoom}>
                Join Room
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
export default withRouter(RoomReviewPage);
