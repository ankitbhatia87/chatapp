const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname))
app.use(bodyParser.json())

const Message = mongoose.model('Message', {
  name: String,
  message: String
})


const dbUrl = 'mongodb+srv://ankitbhatia:test123@ankitbhatia.zv9hi.mongodb.net/chatapp?retryWrites=true&w=majority'

app.get('/messages', (req, res) => {
  Message.find({})
  .then(messages => {
    res.send(messages)
  })
  .catch(err => {
    res.send(err)
    res.sendStatus(500);
  })
})

app.get('/messages/:user', (req, res) => {
  const user = req.params.user
  Message.find({name: user})
  .then(messages => {
    res.send(messages)
  })
  .catch(err => {
    res.send(err)
    res.sendStatus(500);
  })
})

app.post('/messages', (req, res) => {
  const message = new Message(req.body);
  message.save()
  .then(() => {
    io.emit('message', req.body)
    res.sendStatus(200);
  });
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

mongoose.connect(dbUrl);

const server = http.listen(3000, () => {
  console.log(`Server is listening on port ${server.address().port}`)
});