const socket = io();

let currentRoom = "";

function joinRoom() {

    const room = document.getElementById("room").value;

    if(room === ""){
        alert("Enter room name");
        return;
    }

    currentRoom = room;

    socket.emit("join-room", room);

    alert("Joined Room: " + room);
}

function sendMessage() {

    const username =
        document.getElementById("username").value || "User";

    const message =
        document.getElementById("message").value;

    if(message === "") return;

    socket.emit("chat-message", {
        room: currentRoom,
        username: username,
        message: message
    });

    document.getElementById("message").value = "";
}

socket.on("receive-message", (data) => {

    const msg = document.createElement("div");

    msg.classList.add("message");

    msg.innerHTML =
        `<strong>${data.username}</strong><br>${data.message}`;

    document.getElementById("messages").appendChild(msg);

    document.getElementById("messages").scrollTop =
        document.getElementById("messages").scrollHeight;
});

document
.getElementById("message")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});