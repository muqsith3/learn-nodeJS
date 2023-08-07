const fs = require('fs');
const server = require('http').createServer(); //membuat server  with less code

// request events
server.on('request', (req, res) => {
  // solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err); //check if there was an error
  //   res.end(data);
  //   // problem is node actually should load the entire file into memory.
  //   // after that ready, it can that send the data. only recommended for small locally for just our self.
  // });

  // solution 2. the idea is we don't need to read file into variable.
  // instead of reading data into variable and store that variable in memory.
  // we will just create a readable stream, then as we receive chunk of data we send it to the client as a response which is the readable stream.
  //   const readable = fs.createReadStream('test-file.txt'); //create a stream from data which can then consume piece by piece.
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   // handle event when all data is read. stream finished reading file.
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.statusMessage = 'not found';
  //     res.end('file not found');
  //   });

  // solution 3. the secret is to use pipe operator.
  // pipe operator is available on all readable streams. and it allows us to pipe output of readable streams read into the input of the readable stream.
  // it will fix back pressure because it will automatically handle the speed of the data coming in and the speed of the data going out.
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening.....');
});
