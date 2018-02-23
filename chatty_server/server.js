// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws')
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
  
const wss = new SocketServer({ server });

// Broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  console.log('Client connected');
 
  const userCount = {
    type: 'countUpdate',
    count: wss.clients.size
  };

  wss.broadcast(JSON.stringify(userCount));

  ws.on('message', function incoming(message) {

    let incomingMessage = JSON.parse(message);
    
    // broadcasts if user sends message
    if (incomingMessage.type === 'postMessage') {
      incomingMessage.id = uuidv4();
      incomingMessage.type = 'incomingMessage'
    }

    wss.broadcast(JSON.stringify(incomingMessage));
    
    // broadcasts if user has changed their name
    if (incomingMessage.type === 'newUser') {
          let userChange = {
          type: 'incomingNotification',
          text: `We gotta start making changes: '${incomingMessage.old}' is now '${incomingMessage.new}'`,
          id: uuidv4()
        };
        wss.broadcast(JSON.stringify(userChange));
      }  
  });

  ws.on('close', () => {
    console.log('Client disconnected');   

    const userCount = {
      type: 'countUpdate',
      count: wss.clients.size
    };
    wss.broadcast(JSON.stringify(userCount));
  });
});
