import io from "socket.io-client";
import M from "materialize-css";

class Socket {
  constructor() {
    this.socket = io("http://localhost:4000");
  }
  CreateRoom(obj, name) {
    this.socket.emit("CreateRoom", obj, name);
  }
  ReceibeMessage() {
    this.socket.on("Message", message => {
      M.toast({ html: message });
    });
  }
  RoomCreated(callback) {
    this.socket.on("RoomCreated", room => {
      callback(room);
    });
  }
  ConnectIntoaRoom(id) {
    this.socket.emit("ConnectIntoRoom", id);
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
    console.log(id);
    this.socket.emit("ResetRoom", id);
  }
  ResetedRoom(callback) {
    this.socket.on("ResetedRoom", (msg, room) => {
      callback(msg, room);
    });
  }
  Vote(vote, id, name) {
    this.socket.emit("Vote", vote, id, name);
  }
  Voted(callback) {
    this.socket.on("Voted", msg => {
      callback(msg);
    });
  }
  RefreshVotes(callback) {
    this.socket.on("RefreshVotes", room => {
      callback(room);
    });
  }
  // Trello events
  GetBoards() {
    this.socket.emit("GetBoards");
  }
  ReturnBoards(callback) {
    this.socket.on("ReturnBoards", boards => {
      callback(boards);
    });
  }
  GetListFromBoard(IDBoard) {
    this.socket.emit("GetListFromBoard", IDBoard);
  }
  ReturnList(callback) {
    this.socket.on("ReturnList", list => {
      callback(list);
    });
  }
  JoinRoomTrello(IDList) {
    this.socket.emit("JoinRoomTrello", IDList);
  }
  JoinedRoom(callback) {
    this.socket.on("JoinedRoom", room => {
      callback(room);
    });
  }
  UserConnected(callback) {
    this.socket.on("UserConnected", users => {
      callback(users);
    });
  }
  UserDisconnected(IDList) {
    this.socket.emit("UserDisconnected", IDList);
  }
  Disconnected(callback) {
    this.socket.on("UD", num => {
      callback(num);
    });
  }
  ChangeStorie(storie, IDList) {
    this.socket.emit("ChangeStorie", storie, IDList);
  }
  StorieChanged(callback) {
    this.socket.on("StorieChanged", room => {
      callback(room);
    });
  }
  TrelloVote(IDList, IDcard, name, val) {
    this.socket.emit("NewVote", IDList, IDcard, name, val);
  }
  NewVote(callback) {
    this.socket.on("Voted", room => {
      callback(room);
    });
  }
  DuplicatedVote(callback) {
    this.socket.on("DuplicateVote", msg => {
      callback(msg);
    });
  }
  ResetVotes(IDList, IDcard) {
    this.socket.emit("ResetVotes", IDList, IDcard);
  }
  VotesReseted(callback) {
    this.socket.on("VotesReseted", room => {
      callback(room);
    });
  }
  NoRoom(callback) {
    this.socket.on("NoRoom", msg => {
      callback(msg);
    });
  }
  ReviewRoom(RoomID) {
    this.socket.emit("ReviewRoom", RoomID);
  }
  RoomReviewed(callback){
    this.socket.on("RoomReviewed",(room)=>{
      callback(room)
    })
  }
}

const socket = new Socket();
socket.ReceibeMessage();

export default socket;
