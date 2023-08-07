const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super(); //for activation to get access to parent instance (eventEmitter)
  }
}

const myEmitter = new Sales(); //create new EventEmitter instance with events module

myEmitter.on('newSale', () => {
  console.log('thre was a new sale!');
});
myEmitter.on('newSale', () => {
  console.log('customer name: Fajar');
});

// listener use arguments
myEmitter.on('newSale', (stock) => {
  console.log(`thre are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9);

////////////////////////////////////////////////////////////////

const server = http.createServer();
// listen to default events that servers will emit
server.on('request', (req, res) => {
  console.log('request received ✅');
  res.end('request received');
});

server.on('request', (req, res) => {
  console.log('another request received 🤑');
});

server.on('close', () => {
  console.log('server closed');
});

// start server
server.listen(8000, '127.0.0.1', () => {
  console.log('waiting for request...');
});
