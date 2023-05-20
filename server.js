const { Server } = require("socket.io");
const http = require('http');
const fs = require('fs');
const path = require('path');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const indexJsFile = fs.readFileSync(pathToScript);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const indexCssFile = fs.readFileSync(pathToStyle);

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        res.writeHead(200, {"Content-type" : "text/html"});
        res.end(indexHtmlFile);
    }
    else if(req.url === "/style.css"){
        res.writeHead(200, {"Content-type" : "text/css"});
        res.end(indexCssFile);
    }
    else if(req.url === "/script.js"){
        res.writeHead(200, {"Content-type" : "text/js"});
        res.end(indexJsFile);
    }
    else{
        res.writeHead(404);
        res.end();
    }
});
const io = new Server(server);
io.on('connection', (socket) => {
    let userNickname = 'user'
    console.log('a user connection. id -' + socket.id);

    socket.on('set_nickname', (Nickname) => {
        userNickname = Nickname;
    });
    socket.on('new_message', (message) => {
        io.emit('message', message);
    });
})
server.listen(666);