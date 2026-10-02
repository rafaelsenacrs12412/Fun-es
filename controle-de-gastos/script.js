function formatarReais(valor) { 
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
};

function calcularMedia(total, quantidade){
    return total / quantidade
}

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaHistorico = document.querySelector('.historico');
const telaRestante = document.querySelector('.restante');

const ORCAMENTO = 50;

let total = 0;
let quantidade = 0;
let maiorValor = 0;
let maiorGasto = '';
let historico = '';


formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '' || valor <=0) {
        erro.textContent = 'Informe um valor válido.';
    } else {
        erro.textContent = '';

        quantidade = quantidade + 1;

        total = total + valor;

        if (valor > maiorValor) {
            maiorValor = valor;
            maiorGasto = descricao;
        }

        if (historico === '') {
            historico = descricao + formatarReais(valor)
        } else {
            historico = historico + '\n' + descricao + formatarReais(valor)
        }

        const restante = ORCAMENTO - total;

        telaTotal.textContent =  formatarReais(total) 
        telaQuantidade.textContent = quantidade;
        telaMedia.textContent = calcularMedia(total, quantidade)
        telaMaior.textContent = maiorGasto + " " + formatarReais(maiorValor)
        telaHistorico.textContent = historico;

        if (restante >= 0) {
            telaRestante.textContent = formatarReais(restante) + " disponíveis";
        } else {
            telaRestante.textContent = 'Passou ' + formatarReais(Math.abs(restante)) + ' do orçamento';
        }

        telaTotal.classList.toggle('estourado', total > ORCAMENTO);
        telaRestante.classList.toggle('estourado', total > ORCAMENTO);

        campoDescricao.value = '';
        campoValor.value = '';
    }
});
