'use strict'

const app = require('express')()
const http = require('http').Server(app)
// initialize a new instance of socket.io by passing the http (the HTTP server) object
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/:path', (req, res) => {
  res.sendFile(__dirname + '/' + req.params.path)
})

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
 //  socket.on('disconnect', () => {
 //   console.log('user disconnected')
 // })
})
const port = process.env.PORT || 3000
http.listen(port, () => {
  console.log('listening on *:', port)
})
