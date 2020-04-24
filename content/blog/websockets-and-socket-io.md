---
path: socketio
date: 2020-04-19T09:09:43.483Z
title: WebSockets and Socket IO
description: Basics Of Websockets and Socket IO
---
## Websockets:

- Websockets is the underlying native protocal, that when required upgrades to use the websockets piggy backing with the http server.
- Native Websockets can be used but a lot of code

#### Sample Implementation

 - Client.html
```html
<script>
  let ws = new WebSocket('ws://localhost:5000');
  console.log(ws);
  ws.onmessage = (event) => {
    console.log(event); 
  } 
  ws.onopen =(event) => {
    ws.send('Connected from the client..!')
  }
</script>
```

- Server.js
```js
const http = require('http');
const ws = require('ws');

const server = http.createServer((req, res) => {
  res.end('Connected to Http Server..!!');
});

const wss = new ws.Server({server});

wss.on('headers', (headers, req) => {
  console.log(headers)
  console.log('Upgrading to Websockets..!');
})

wss.on('connection', (socket, req) => {
  socket.send('Connected to webSockets..!')
  socket.on('message', (msg) => console.log(msg));
})

server.listen(5000, () => console.log('Listening in port 5000'));
```

## Socket IO

- Socketio is a library that enables bidirectional, realtime and eventbased communication between server and client

- Socketio consist of inbuilt 
    - Reconnecting mechanism without stalling the client
    - Disconnect detection
    - Binary transmission for blob support
    - Multiplexing(Multiple rooms)

#### Sample Implementation:

- Client.html
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>

<script>
  const socket = io("http://localhost:5000");

  console.log(socket);

  socket.on('connect', data => {
    socket.on('welcome', msg => console.log(msg));
    socket.emit('message', {data: "This is the message"}) 
  })
</script>
```

- Server.js
```js
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  res.end('Connected to http..!');
})

const io = socketio(server);

io.on('connection', (socket, req) => {
  socket.emit('welcome','Connected to webSockets..!')
  socket.on('message', msg => console.log(msg));
})

server.listen(5000, () => console.log('Listening to 5000'));

```

### Events

  - Socketio used events for the communication between client and the server
  ```js
  socket.on('anyName',()=>{}) 
  socket.emit('anyName', ()=>{})
  ```
  - Can use any name other than the below given defaults

    - Server

      ``` 
      connect
      connection
      error
      disconnect
      disconnecting
      ```
    - Client
      ```
      connect
      disconnect
      error
      ping
      pong
      connect_error
      connect_timeout
      reconnect
      reconnecting
      reconnect_failed
      reconnect_error
      reconnect_attempt
      ```
### Namespaces and Rooms

  - A Namespace is a group of rooms
  - Default namespace is always '/'
  - These namespaces can be represented by diff paths
  - Client doesnt know about room it only cares the namespaces, Server manages the rooms accordingly..

    - Client
      ```js
      const _rootSocket = io('http:localhost:5000')
      const _adminSocket = io('http:localhost:5000/admin')
      const _generalSocket = io('http:localhost:5000/general')
      ```
    - Server
      ``` js
      const _adminNmsp = io.of('/admin').on('connect', ()=>{});
      _adminNmsp.emit('anyName',()=>{});
      ```
#### Rooms

  - Rooms are group of namespaces inside a Namespace
  
  ```js
  socket.join(room)
  socket.leave(room)
  socket.to(room)
  socket.of('/admin')
        .to(roomName)
        .to(multipleRooms)
        .emit('any', ()=>{})
  ```
### Project
   __*A project based on Socket io and Chat based will be released soon..!!*__
