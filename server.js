const { Server } = require("socket.io");
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const pathToScript = path.join(__dirname, 'static', 'script.js');
const indexJsFile = fs.readFileSync(pathToScript);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const indexCssFile = fs.readFileSync(pathToStyle);

const server = http.createServer((req, res) => {
    const indexHtmlFile = fs.readFileSync(pathToIndex);
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
    else if(req.url === "/all" && req.method === "GET"){
        res.writeHead(200, {"Content-type" : "text/js"});
        try{
            
        }catch{
            res.end();
        }
        
    }
    else{
        res.writeHead(404);
        res.end();
    }
});
const io = new Server(server);
io.on('connection', async (socket) => {
    let userNickname = 'user'
    console.log('a user connection. id -' + socket.id);

    socket.on('set_nickname', async (Nickname) => {
        await db.addMessage(message, 1);
        userNickname = Nickname;
    });
    socket.on('new_message', (message) => {
        io.emit('message', message);
    });
    let message = await db.getMessage();
})

server.listen(666);