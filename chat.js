const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/',express.static(__dirname))
app.use('/style',express.static(__dirname+'/style'))
app.get('/',(req,res)=> res.sendFile(__dirname+'/index.html'))

io.on('connection', (socket) => {
    socket.username = 'anonymous';
    socket.on('change username', (name) => socket.username = name)
    socket.on('message', (msg) => io.emit('message',
    { 'user': socket.username, 'message': msg }))
    socket.on('join', (username) => {
      if (username != null) {
        socket.username = username
      }
      socket.broadcast.emit('message',
      { 'user': 'Server', 'message': socket.username + ' has joined!'})
    })
  })


http.listen(5555,()=>
console.log('listening on port !')
)