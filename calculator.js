'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const ops = document.querySelectorAll('[id*=op]');

let novoNumero = true;
let op;
let numeroAnterior;



const opPendente = () => op != undefined;

const calcular = () => {
    if(opPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${op}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero){
        display. textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        display.textContent += texto;
    }    
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionarOp = (evento) => {
    if(!novoNumero){
        calcular();

        novoNumero = true;
        op = evento.target.textContent;
        numeroAnterior = parseFloat(parseFloat(display.textContent.replace(',','.')));
        console.log (op)
        
    }
}
ops.forEach (op => op.addEventListener('click', selecionarOp));

const ativarIgual = () => {
    calcular();
    op = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);


const limparCalculo = () => {
    limparDisplay ();
    op = undefined;
    numeroAnterior = undefined;
    novoNumero = true;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backSpace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);


const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    'c' : 'limparDisplay',
    'Espace' : 'limparCalculo',
    'Backspace' : 'backSpace',
    '/' : 'opDividir',
    '*' : 'opmultiplicacao',
    '-' : 'opsubtracao',
    '+' : 'opsoma',
    '±' : 'inverter',
    ',' : 'decimal',
    '=' : 'igual',
    'Enter' : 'igual'
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
}
document.addEventListener('keydown', mapearTeclado);