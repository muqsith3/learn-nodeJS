// core module
const fs = require('fs');
const http = require('http');
const url = require('url');
// 3rd party module
const slugify = require('slugify');
// own module
const replaceTemplate = require('./modules/replaceTemplate');
// import url from "node:url";

/////////////////////////////////
// FILES

// blocking synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `this is what we know about the avocado: ${textIn}. \ncreate on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written!");

// non-blocking asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR!");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written.");
//       });
//     });
//   });
// });

/////////////////////////////////
// SERVER
// karena hanya dieksekusi sekali dan berada di top level code, maka tidak apa-apa
// menggunakan synchronous.
// yang harus asynchronous adalah code yang selalu di request berkali-kali.

// variabel
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// membuat server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); //untuk URL product dengan query
  // console.log(url.parse(req.url, true));

  // overview page
  if (pathname === '/' || pathname == '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // looping card
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(' ');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // api page
  } else if (pathname === '/api') {
    // membaca file data
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // not found page
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});
// menjalankan server
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to request on port 8000');
});
