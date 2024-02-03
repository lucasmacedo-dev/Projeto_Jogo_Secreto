let listaDeNumerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio()
let numTentativas = 1


//Inicio da função de exibir mensagem na tela como base e chamada da função de fala

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.3})
    
}

// Usando a função base de colocar o número na tela substituindo os parâmetros da função (TAG, e inserindo a mensagem através do inner.html)
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto')
    exibirTextoNaTela('p', 'Insira um numero entre 1 e 10')
}

// Chamando a funcão de texto criada acima
exibirMensagemInicial()

// Abaixo temos a função que verifica o chute|| E também acrescenta a  função de contagem de tentativas de acordo com o numero de vezes que o usuário inseriu no input até acertar

function verificarChute(){
    let chute = document.querySelector('input').value
     if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Você acertou!')
        let palavraTentativa = numTentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você acertou o numero secreto com ${numTentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled')

     } else {
        if (chute < numeroSecreto){
            exibirTextoNaTela('p' , 'O numero secreto é maior')
        } else exibirTextoNaTela('p', 'O número secreto é menor')
     }

     numTentativas ++
     limparCampo()
}

// Aqui criamos a função de gerar o numero aleatorio usando o metodo Math.random, ao mesmo tempo que usamos o resultado dessa função para incluir o numero na lista de sorteados
//a fim de verificar se os mesmos não são escolhidos várias vezes

function gerarNumeroAleatorio() {
let numeroEscolhido = parseInt(Math.random()* 10 + 1)

let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length
if (quantidadeDeElementosNaLista == 10){
    listaDeNumerosSorteados = []
}

if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio()
} else {
      listaDeNumerosSorteados.push(numeroEscolhido)
      console.log(listaDeNumerosSorteados)
      return numeroEscolhido
}
}

//Função de limpar o campo do input onde o usuario insere o número que ele acredita ser o escolhido

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = ''
}

// Função que ativa o botão Reiniciar o Jogo que reinicia o numero escolhido chamando novamente a função de gerar o número aleatório e a função de limpar o input do usuário

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    numTentativas = 1
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

