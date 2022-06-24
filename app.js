const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + '/public'))

const io = socketIo.listen(server);

let historico = []

io.on('connection', socket => { //.on é uma função que fica verificando se ocorreu algo no servidor

    console.log(`Novo Conectado SocketId: ${socket.id}`) //Detecta novos usuários conectados

    historico.forEach(linha => socket.emit('desenhar', linha)) //Desenha

    socket.on('clear', () => { //Função pra limpar (zera o vetor e depois reescreve com ele zerado)
        historico = new Array()
        io.emit('desenhar')
    })
    socket.on('desenhar', linha => { //Função pra desenhar (adiciona a linha no vetor e depois desenha as linhas)
        historico.push(linha)
        io.emit('desenhar', linha)
    })
})

server.listen(3000, () => console.log(`Servidor rodando em: http://localhost:3000`))