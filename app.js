const express=require('express');
const app=express();
const path=require('path');
app.use(express.static(__dirname))
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'index.html'))
})

let server=require('http').Server(app);
let io=require('socket.io')(server);
io.on('connection',function(socket){
  let username;
  socket.emit("message",{user:"系统",content:"请输入昵称"})
  socket.on('message',function(msg){
    if(username){
      io.emit("message",{user:username,content:msg.content})
    }else{
      username=msg.content;
      io.emit("message",{user:"系统",content:"欢迎"+username+"加入聊天室"})
    }
  })
})
server.listen(3000,function(){
  console.log("listening on 3000");
})