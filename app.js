// para habilitar a voz responsiva quando exibir texto na tela basta descomentar a linha 16
// o número máximo do jogo pode ser alterado na linha 5

let listaDeNumerosSorteados = [];
let numeroMaximoDoJogo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

document.getElementById('chutar').removeAttribute('disabled');
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag); // document.querySelector eu indico a tag que será abordada
    campo.innerHTML = texto; // innerHTML diz que o conteúdo daquela tag (o que está dentro, inner) será alterado
    
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto' );
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximoDoJogo}:`);
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        let palavraTentativa =  tentativas > 1 ? 'tentativas' : 'tentativa';
        
        exibirTextoNaTela('h1', 'Parabéns!!!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled'); // para habilitar o botão que começa desabilitado no HTML
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é MENOR que o chute (${chute})`);
        }else{
            exibirTextoNaTela('p', `O número secreto é MAIOR que o chute (${chute})`);
        }
        tentativas++;
    }
    limparCampo();
}

function gerarNumeroAleatorio(){
     let numeroEscolhido = parseInt(Math.random() * numeroMaximoDoJogo + 1);
     let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

     if(quantidadeDeElementosNaLista == numeroMaximoDoJogo){
        listaDeNumerosSorteados = [];
     }

     if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); // recursão para gerar outro número caso ele já tenha sido sorteado anteriormente
     } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido; // se o número não tiver sido sorteado antes, retorna o número para ser o número secreto
     }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    //alterando os botões que devem estar habilitado e desabilitado
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}