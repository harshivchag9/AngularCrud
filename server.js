// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json'); // <== Will be created later
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000; // <== You can change the port

// server.use(middlewares);
// server.use(router);

// server.listen(port);


const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/AngularCrud'));
app.listen(process.env.PORT || 8080);

//PATH LOCATION STARTEGY

app.get('/*', function (req, res) {
const fullPath = path.join(__dirname + '/dist/AngularCrud/index.html');
console.log(" Fetching from.." + fullPath);
res.sendFile(fullPath);
})

console.log('Server started running..');
