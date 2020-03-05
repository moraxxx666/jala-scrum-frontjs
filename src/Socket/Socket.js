import io from "socket.io-client";
import M from "materialize-css";

class Socket {
  constructor() {
    this.socket = io("http://localhost:4000");
  }
  CreateRoom(obj, name) {
    this.socket.emit("Create Room", obj, name);
  }
  ReceibeMessage() {
    this.socket.on("Message", message => {
      M.toast({ html: message });
    });
  }
  RoomCreated(callback) {
    this.socket.on("Room Created", room => {
      callback(room);
    });
  }
  ConnectIntoaRoom(id) {
    this.socket.emit("Connect Into a Room", id);
  }
  RoomOK(callback) {
    this.socket.on("OK", room => callback(room));
  }
  RoomBAD(callback) {
    this.socket.on("BAD", message => callback(message));
  }
  UserJoinRoom(callback) {
    this.socket.on("UserJoinRoom", io => {
      callback(io);
    });
  }
  UserLeftRoom(id) {
    this.socket.emit("UserLeftRoom", id);
  }
  CloseRoom(id) {
    this.socket.emit("CloseRoom", id);
  }
  ClosedRoom(callback) {
    this.socket.on("ClosedRoom", msg => {
      callback(msg);
    });
  }
  ResetRoom(id) {
      console.log(id)
    this.socket.emit("ResetRoom", id);
  }
  ResetedRoom(callback){
      this.socket.on("ResetedRoom",(msg,room)=>{
          callback(msg,room)
      })
  }
  Vote(vote,id,name){
      
      this.socket.emit("Vote",vote,id,name)
  }
  Voted(callback){
    this.socket.on("Voted",(msg)=>{
        callback(msg)
    })
  }
  RefreshVotes(callback){
      this.socket.on("RefreshVotes",(room)=>{
          callback(room)
      })
  }
}

const socket = new Socket();
socket.ReceibeMessage();

export default socket;
