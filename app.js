const { randomInt } = require('crypto')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.static(__dirname + '/public'))

const io = socketIo.listen(server);

let historico = []
let chat = []
let wordlist = []
let users = []
let user = []
let pontuacao = []

io.on('connection', socket => { //.on é uma função que fica verificando se ocorreu algo no servidor

    console.log(`Novo Conectado SocketId: ${socket.id}`) //Detecta novos usuários conectados

    historico.forEach(linha => socket.emit('desenhar', linha)) //Desenha
    users.push(socket.id)
    pontuacao.push(0)



    socket.on('clear', () => { //Função pra limpar (zera o vetor e depois reescreve com ele zerado)

            historico = new Array()
            io.emit('desenhar')
            random = Math.floor(Math.random() * users.length)
            user.push(users[random])
            console.log("Usuário desenhista: " + user[user.length - 1])
            usuario = user[user.length - 1]
            wordlist.push("computador", "mouse", "televisao", "notebook")
            palavra = wordlist[Math.random() * wordlist.length]
            palavra = "Nada, não é sua vez"
            if (socket.id == usuario) {
                palavra = "O que quiser"
            }
            io.emit('mostrar', palavra)


        }) //Função que limpa o desenho e define o novo desenhista ao final de cada rodada
    socket.on('desenhar', linha => { //Função pra desenhar (adiciona a linha no vetor e depois desenha as linhas)
        historico.push(linha)
        if (socket.id == user[user.length - 1]) {
            io.emit('desenhar', linha)
        }
    })
})

server.listen(3000, () => console.log(`Servidor rodando em: http://localhost:3000`))