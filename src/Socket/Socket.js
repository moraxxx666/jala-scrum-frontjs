import io from "socket.io-client";
import M from "materialize-css"


let socket = io("http://localhost:4000")


// Sending Events 
export function CreateRoom(obj)
{
    socket.emit("Create Room",obj)
}


//Recibing Events

// Show a Message to display
socket.on('Message', (message) => {
    M.toast({ html: message })
})
socket.on('close',()=>{
    localStorage.clear()
})

export default  socket 






