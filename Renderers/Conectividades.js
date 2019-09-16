const electron = require('electron');
const { ipcRenderer } = electron;
const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');

limparTabela('tabela');
processar('tabela');

initCarregada(920,715)
structureCarregada()
animateCarregada()

document.querySelector('#EnterConectividades').addEventListener('click', (event) => {
   
    event.preventDefault();
    let m = document.querySelector('#elemento').value
    let pontoA = document.querySelector('#ponto-a').value
    let pontoB = document.querySelector('#ponto-b').value

    // Teste: trazer a parte do main.js para cá 
    let estruturaObj = store.get('estrutura')
    estruturaObj = utils.addElemento(estruturaObj, m)
    estruturaObj = utils.addConectividades(estruturaObj, m, pontoA, pontoB)
    store.set('estrutura', estruturaObj)

    limparTabela('tabela');
    processar('tabela');

    document.querySelector('#elemento').value='';
    document.querySelector('#ponto-a').value='';
    document.querySelector('#ponto-b').value='';

    document.querySelector('#elemento').focus();

    var node = document.getElementById("desenhoCarregada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    initCarregada(920,715)
    structureCarregada()

});

function processar(idTabela)
{
    let estruturaObj = store.get('estrutura');
    var nElementos = estruturaObj.elementos.length;

    for(let i=nElementos-1; i>-1 ; i--) {
        var doc = document.getElementById(idTabela).insertRow(0);
        var m = doc.insertCell(0);
        m.innerHTML = i+1
        var pA = doc.insertCell(1);
        pA.innerHTML = estruturaObj.elementos[i].conectividades.pontoA;
        var pB = doc.insertCell(2);
        pB.innerHTML = estruturaObj.elementos[i].conectividades.pontoB;

    }

}

function limparTabela(idTabela){
    var tabela = document.getElementById(idTabela);
    var linhas = tabela.getElementsByTagName('tr');
    nLinhas = linhas.length;
    for (let i=0; i<nLinhas; i++) {
        document.getElementById('tabela').deleteRow(idTabela);
    }
}
