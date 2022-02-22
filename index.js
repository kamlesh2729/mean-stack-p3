//load the express module
let express = require("express");

//create the reference of express module
let app = express();
app.use(express.static(__dirname+"/design"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
//load the socket.io module
let http = require("http").Server(app);
let io = require("socket.io")(http);

http.listen(9090,()=>console.log("port number 9090"));

//connect the socket.io
// io.on("connection",(socket)=>{
//     console.log("connected..");
// //event called which help to receive the data from client applocation
//      socket.on("message",(mesg)=>{
//         socket.broadcast.emit("message", mesg);
//      })
// })

//load the mongodb module
let mongoDb = require("mongodb").MongoClient;
//connect the mongodb
mongoDb.connect("mongodb://127.0.0.1:27017/chatting",(err,client)=>{
     if(err){
         console.log("Notconnected database" +err);
     }
         console.log("Connected to database"); 
    //connect the socket.io
 io.on("connection",(socket)=>{
    console.log("connected..");
    let db = client.db("chatting");
    let chat = db.collection("Messages");
    //event called which help to receive the data from client applocation
    // socket.on("message",(mesg)=>{
    //     socket.broadcast.emit("message", mesg);
    //  });
    socket.on("message", function(mesg){
        let message = mesg;
   
        //check for name and message
        if(message == ""){
            //send error sttus
               user =  prompt("please enter your message:"); 
        }else{
            chat.insertOne({mesg: message},function(){
             client.emit("message", mesg);
            });
            socket.broadcast.emit("message", mesg);
        }
        
     });
 });   
});

 