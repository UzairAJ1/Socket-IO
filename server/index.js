const io = require("socket.io")(3100,{cors:{
    origin:['http://localhost:3000']
  }});
  
  io.on("connection", (socket) => {
    console.log("New user connected with id:", socket.id);
  
    // When a user connects, join them to a room
    socket.join("chatRoom");
  
    socket.on("message", (message) => {
      // Broadcast the message to everyone in the room
      io.to("chatRoom").emit("message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected with id:", socket.id);
    });
  });