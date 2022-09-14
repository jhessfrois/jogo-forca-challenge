let containerButtons = document.querySelector('.controls');
let containerTabuleiro = document.querySelector('.tabuleiro');
let containerAddNewWord = document.querySelector('.field-add-palavra');
let palavras = ['banana', 'melancia', 'navio', 'jake', 'montanha', 'nuvem', 'internet', 'desafio', 'oracle', 'celular', 'finn', 'adventure time'];
let palavraEscolhida;
let tentativas = 6;
let acertos = 0;
let letrasCertas = [];
let letrasErradas = [];

// Função responsável por dar início ao jogo.
function startGame() {
    clearScreen();
    containerButtons.style.display = 'none';
    containerTabuleiro.style.display = 'flex';
    palavraEscolhida = chooseWord(palavras);
    drawForca(tentativas);
}

// Função que sorteia e escolhe a palavra.
function chooseWord(arr) {
    let index = parseInt(Math.random() * arr.length)
    let palavra = arr[index].toUpperCase();

    hiddenLetters(palavra);
    console.log(palavra, index, arr)
    return palavra;
}


// Função que desenha os tracinhos. Ex: 'CAJU' -> '_ _ _ _'
function hiddenLetters(word) {
    let containerPalavra = document.querySelector('.palavra');
    containerPalavra.innerHTML = '';
    
    for(var i = 0; i < word.length; i++) {
        containerPalavra.innerHTML += `<span></span>`
    }
}


// Função que verifica se a letra digitada está contida ou não na palavra sorteada.
function kick(word) {
    let input = document.getElementById('input');
    let letra = input.value.toUpperCase()
    let containerLetraCerta = document.querySelectorAll('.palavra span');
    let containerLetraErrada = document.querySelector('.letras-erradas');

    // Condição que verifica se há erros de digitação no campo do input.
    // (Input vazio ou com mais de uma letra digitada ou com um número digitado).
    if(letra.length != 1 || letra == '' || Number(letra)) {
        alert('Digite uma letra!');
        return
    }

    if(letrasCertas.includes(letra)) { // Verifica se há repetição de letras.
        return
    }

    // Condição que verifica se a letra digitada contém na palavra sorteada.
    // Se caso contém, a letra é mostrada na tela para o usuário já na posição correta.
    for(var i = 0; i < word.length; i++) {
        if(letra === word[i]) {
            containerLetraCerta[i].innerHTML = `${letra}`;
            acertos += 1;
            letrasCertas.push(letra);
        }
    }

    // Condição que verifica se a letra digitada não contém na palavra sorteada.
    if(!word.includes(letra)) {
        if(letrasErradas.includes(letra)) { // Verifica a repetição de letras.
            return
        }
        tentativas -= 1;
        drawForca(tentativas);
        letrasErradas.push(letra);
        containerLetraErrada.innerHTML += `<span>${letra}</span>`;
    }

    console.log(tentativas, letrasErradas, letrasCertas);
    input.value = "";

    if(acertos == word.length) {
        console.log('Você venceu!')
        victory();
    } else if(tentativas == 0) {
        console.log('Você perdeu!')
        defeat(word);
    }
}

let btnChutar = document.getElementById('btn-chutar');
btnChutar.addEventListener('click', () => kick(palavraEscolhida));


// Função responsável por desenhar a forca.
function drawForca(err) {
    var screen = document.querySelector('#canvas');
    var pincel = screen.getContext('2d');

    if(err == 6) {
        // Forca
        pincel.fillStyle = '#000';
        pincel.fillRect(20, 400, 294, 4);
        pincel.fillRect(80, 400, 4, -350);
        pincel.fillRect(80, 50, 150, 4);
        pincel.fillRect(230, 50, 4, 50);

    } else if(err == 5) {
        // Cabeça
        pincel.beginPath();
        pincel.arc(230, 120, 30, 0, 2*Math.PI);
        pincel.fill();

    } else if(err == 4) {
        // Corpo
        pincel.fillRect(230, 150, 4, 100);

    } else if(err == 3) {
        // Braço esquerdo
        pincel.beginPath();
        pincel.strokeStyle = '#000';
        pincel.moveTo(231, 170);
        pincel.lineTo(200, 210);
        pincel.lineWidth = 4;
        pincel.stroke();

    } else if(err == 2) {
        // Braço direito
        pincel.beginPath();
        pincel.strokeStyle = '#000';
        pincel.moveTo(233, 170);
        pincel.lineTo(260, 210);
        pincel.lineWidth = 4;
        pincel.stroke();

    } else if(err == 1) {
        // Perna esquerda
        pincel.beginPath();
        pincel.strokeStyle = '#000';
        pincel.moveTo(231, 250);
        pincel.lineTo(200, 310);
        pincel.lineWidth = 4;
        pincel.stroke();

    } else if(err == 0) {
        // Perna direita
        pincel.beginPath();
        pincel.strokeStyle = '#000';
        pincel.moveTo(233, 250);
        pincel.lineTo(260, 310);
        pincel.lineWidth = 4;
        pincel.stroke();
    }
}


// Função desisitir
function surrender() {
    window.location.reload();
}


// Funcção responsável por limpar a tela.
function clearScreen() {
    // limpando o desenho da forca
    var screen = document.querySelector('#canvas');
    var pincel = screen.getContext('2d');

    pincel.clearRect(0,0,300,450);

    // limpando o array que contém as letras erradas
    letrasErradas.splice(0, letrasErradas.length);

    // limpando o array que contém as letras certas
    letrasCertas.splice(0, letrasCertas.length);

    tentativas = 6;
    acertos = 0;

    let containerLetraErrada = document.querySelector('.letras-erradas');
    containerLetraErrada.innerHTML = "";

    containerAddNewWord.style.display = 'none';

    // fechando o modal
    let modal = document.querySelector('.modal');
    let modalVictory = document.querySelector('.modal-victory');
    let modalDefeat = document.querySelector('.modal-defeat');

    modal.style.display = 'none';
    modalVictory.style.display = 'none';
    modalDefeat.style.display = 'none';
}


// Função que verifica se houve vitória.
function victory() {
    let modal = document.querySelector('.modal');
    let modalVictory = document.querySelector('.modal-victory');

    modal.style.display = 'flex';
    modalVictory.style.display = 'flex';
}


// Função que verifica se houve derrota.
function defeat(word) {
    let modal = document.querySelector('.modal');
    let modalDefeat = document.querySelector('.modal-defeat');

    let palavraCerta = document.querySelectorAll('.modal-defeat h2');
    palavraCerta[0].innerHTML = `Palavra correta: "${word}"`;

    modal.style.display = 'flex';
    modalDefeat.style.display = 'flex';
}


function addNewWord() {
    containerButtons.style.display = 'none';
    containerAddNewWord.style.display = 'flex';
}


function saveNewWord() {
    let textarea = document.getElementById('palavra');
    palavras.push(textarea.value);

    if(textarea.value == '' || Number(textarea.value)) {
        alert('Digite uma palavra!')
        return
    }

    textarea.value = '';
    startGame();
}


function cancel() {
    containerAddNewWord.style.display = 'none';
    containerButtons.style.display = 'flex';
}