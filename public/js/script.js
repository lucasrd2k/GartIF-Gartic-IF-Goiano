document.addEventListener('DOMContentLoaded', () => {

    const socket = io.connect()

    const pincel = {
        ativo: false,
        movendo: false,
        posAnterior: { x: 0, y: 0 },
        pos: null
    }

    const canvas = document.querySelector('#tela')
    canvas.width = 800
    canvas.height = 550

    const context = canvas.getContext('2d')
    context.lineWidth = 3
    context.strokeStyle = 'teal'

    const desenharLinha = (linha) => {
        if (linha) {
            context.beginPath()
            context.moveTo(linha.pos.x - 200, linha.pos.y - 56)
            context.lineTo(linha.posAnterior.x - 200, linha.posAnterior.y - 56)
            context.stroke() //Desenha a linha
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    canvas.onmousedown = () => { pincel.ativo = true }
    canvas.onmouseup = () => { pincel.ativo = false }
    canvas.onmousemove = event => {
        pincel.posAnterior.x = event.clientX
        pincel.posAnterior.y = event.clientY
        pincel.movendo = true
    }

    socket.on('desenhar', linha => {
        desenharLinha(linha)
    })

    socket.on('mostrar', p => {
        frase.innerHTML = (`Desenhe: ${p}`)



    })

    const ciclo = () => {
        if (pincel.ativo && pincel.movendo && pincel.pos) {
            socket.emit('desenhar', { posAnterior: pincel.posAnterior, pos: pincel.pos })
                // desenharLinha({posAnterior: pincel.posAnterior, pos: pincel.pos})
            pincel.movendo = false
        }
        pincel.pos = { x: pincel.posAnterior.x, y: pincel.posAnterior.y }

        setTimeout(ciclo, 10)
    }

    ciclo()

    //FUNÇÃO PRA LIMPAR COM ESPAÇO - reconhece o espaço e submete um socket "Clear"
    document.body.addEventListener('keyup', e => {
        if (e.keyCode === 32) {
            socket.emit('clear')
        }
    })
    document.body.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            var texto = document.querySelector("#texto").value;
            console.log(texto)
            document.querySelector("#texto").value = "";
            document.getElementById("cont").innerHTML("<div class='row text-left'><div class='col'>" + texto + "</div></div>");
        }
    })
})