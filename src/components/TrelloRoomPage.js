import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import socket from "../Socket/Socket";
import M from "materialize-css";
class TrelloRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDRoom: 0,
      currentStorie: {},
      room:{
        cards:[],
        stories:[]
      }
    };
    this.changeStorie = this.changeStorie.bind(this);
  }
  async componentDidMount() {
    let id = this.props.match.params.IDRoom;
    socket.JoinRoomTrello(id);
    await socket.JoinedRoom(async room => {
      
       await this.setState({ room,IDRoom:id })
       socket.NewUserTrello( this.state.currentStorie,id,this.state.room.cards)
       
      
    });
    
    
  }
  async changeStorie(storie) {
    await this.setState({ currentStorie: storie });
    await socket.RefreshStorie(this.state.currentStorie,this.state.IDRoom,this.state.room?.cards)
  }
  render() {
    return (
      <main className="margin">
        <div className="row">
          <div className="col s12 m4">
            <div className="stories-container row">
              {this.state.room?.stories.map((storie, index) => {
                return (
                  <div
                    className="col s12"
                    key={index}
                    onClick={() => this.changeStorie(storie)}
                  >
                    <div className="storie">
                      <h6 className="center-align">{storie.name}</h6>
                      <pre>{storie.description}</pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col s12 m8">
            <h5 className="center-align">Session Information</h5>
            <h5 className="center-align">Room ID: {this.state.room?.IDList}</h5>
            <h5 className="center-align">
              Current Storie: {this.state.currentStorie?.name}
            </h5>
          </div>
          <div className="col s12">
            <h5 className="center-align">Votes</h5>
          </div>
        </div>
      </main>
    );
  }
}
export default withRouter(TrelloRoomPage);
