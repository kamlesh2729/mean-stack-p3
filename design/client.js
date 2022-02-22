let socket = io();
let name;
let textarea = document.querySelector("#textarea1");
let messageArea = document.querySelector(".message-area");

do{
   name =  prompt("please enter your name:");
}while(!name);

textarea.addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let mesg = {
        user: name,
        message: message.trim()
    }
    //append
appendMessage(mesg, "outgoing",)
textarea.value = "";
scrollToBottom();

//send to server
socket.emit("message", mesg);
}

function appendMessage(mesg, type){
    let mainDiv = document.createElement("div");
    let className = type
    mainDiv.classList.add(className, "message");

    let markup =`
    <h4>${mesg.user}</h4>
    <p>${mesg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//receive message
socket.on("message",(mesg)=>{
    appendMessage(mesg, "incoming");
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}