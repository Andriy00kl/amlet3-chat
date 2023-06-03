const { allMessage } = require("../database");

const submit = document.getElementById("from");
const input = document.getElementById("input");
const message = document.getElementById("message")
const Nickname = document.getElementById("Nickname")
const socket = io();

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:666/")
xhr.responseType = 'json'
xhr.send()
xhr.onload = () => {
    
}

submit.addEventListener("submit", function(event){
    event.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value)
        input.value = '';
    }
});

socket.on('message', function(msg){
    const item = document.createElement('li');
    item.textContent = msg;
    message.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

function changeNick() {
    let Nickname = prompt('Chose nickname');
    if(Nickname) {
        socket.emit('set_nickname');
    }
}

changeNick();