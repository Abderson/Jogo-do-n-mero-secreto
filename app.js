let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
const maxTentativas = 5;

// Atualizar o texto e barra de progresso
function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Atualizar barra de progresso
function atualizarBarraProgresso() {
    const progressBar = document.querySelector(".progress-bar__fill");
    const progresso = ((maxTentativas - tentativas) / maxTentativas) * 100;
    progressBar.style.width = `${progresso}%`;
    if (tentativas === maxTentativas) {
        progressBar.style.backgroundColor = "#f44336"; // Vermelho ao terminar as tentativas
    }
}

// Gerar número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10 + 1);
}

// Verificar chute
function verificarChute() {
    const input = document.querySelector("input");
    const chute = parseInt(input.value);
    tentativas++;

    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Parabéns, você acertou!");
        exibirTextoNaTela("p", "O número secreto foi descoberto!");
        document.body.className = "acertou";
        desativarJogo();
    } else if (tentativas >= maxTentativas) {
        exibirTextoNaTela("h1", "Fim de jogo!");
        exibirTextoNaTela("p", `Você perdeu! O número secreto era ${numeroSecreto}.`);
        document.body.className = "errou";
        desativarJogo();
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("p", "O número secreto é menor!");
        document.body.className = "errou";
    } else {
        exibirTextoNaTela("p", "O número secreto é maior!");
        document.body.className = "errou";
    }

    atualizarBarraProgresso();
    input.value = ""; // Limpar o campo de entrada
}

// Reiniciar jogo
function reiniciar() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Digite um número entre 1 e 10");
    document.querySelector("input").value = "";
    document.body.className = "padrao";
    atualizarBarraProgresso();
    ativarJogo();
}

// Desativar e ativar jogo
function desativarJogo() {
    document.querySelector("input").disabled = true;
    document.querySelector("button[onclick='verificarChute()']").disabled = true;
    document.querySelector("button[onclick='reiniciar()']").disabled = false;
}

function ativarJogo() {
    document.querySelector("input").disabled = false;
    document.querySelector("button[onclick='verificarChute()']").disabled = false;
    document.querySelector("button[onclick='reiniciar()']").disabled = true;
}

// Inicializar barra de progresso ao carregar
document.addEventListener("DOMContentLoaded", () => {
    atualizarBarraProgresso();
    ativarJogo();
});
