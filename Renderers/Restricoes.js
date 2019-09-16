const electron = require('electron');
const { ipcRenderer } = electron;
const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');

limparTabela('tabela');
processar('tabela');
colorir();

initCarregada(855,715)
structureCarregada()
animateCarregada()

document.querySelector('#EnterRestricoes').addEventListener('click', (event) => {
    event.preventDefault();
    let n = document.querySelector('#ponto').value
    let tx = document.querySelector('#tx').checked
    let ty = document.querySelector('#ty').checked
    let tz = document.querySelector('#tz').checked
    let rx = document.querySelector('#rx').checked
    let ry = document.querySelector('#ry').checked
    let rz = document.querySelector('#rz').checked

    // Teste: trazer a parte do main.js para cá 
    let estruturaObj = store.get('estrutura')
    // estruturaObj = utils.addPonto(estruturaObj, n)
    estruturaObj = utils.addRestricoes(estruturaObj, n, tx, ty, tz, rx, ry, rz)
    store.set('estrutura', estruturaObj)

    limparTabela('tabela');
    processar('tabela');
    colorir();

    document.querySelector('#ponto').value='';
    document.querySelector('#ponto').focus();

    var node = document.getElementById("desenhoCarregada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    initCarregada(855,715)
    structureCarregada()

});

function processar(idTabela)
{
    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=nPontos-1 ; i>-1 ; i--) {

        var doc = document.getElementById(idTabela).insertRow(0);
        var n = doc.insertCell(0);
        n.innerHTML = i+1

        var tx = doc.insertCell(1);            
        if (estruturaObj.pontos[i].restricoes.tx === true) {
            tx.innerHTML = 'Fixo';
        } else {
            tx.innerHTML = 'Livre';
        } 

        var ty = doc.insertCell(2);
        if (estruturaObj.pontos[i].restricoes.ty === true) {
            ty.innerHTML = 'Fixo';
        } else {
            ty.innerHTML = 'Livre';
        } 

        var tz = doc.insertCell(3);
        if (estruturaObj.pontos[i].restricoes.tz === true) {
            tz.innerHTML = 'Fixo';
        } else {
            tz.innerHTML = 'Livre';
        }

        var rx = doc.insertCell(4);
        if (estruturaObj.pontos[i].restricoes.rx === true) {
            rx.innerHTML = 'Fixo';
        } else {
            rx.innerHTML = 'Livre';
        } 

        var ry = doc.insertCell(5);
        if (estruturaObj.pontos[i].restricoes.ry === true) {
            ry.innerHTML = 'Fixo';
        } else {
            ry.innerHTML = 'Livre';
        } 

        var rz = doc.insertCell(6);
        if (estruturaObj.pontos[i].restricoes.rz === true) {
            rz.innerHTML = 'Fixo';
        } else {
            rz.innerHTML = 'Livre';
        } 

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

function colorir() {
    var linhas = document.getElementById('tabela').getElementsByTagName('tr');
    for (let i=0 ; i<linhas.length ; i++) {
        
        var cells = linhas[i].getElementsByTagName('td')

        for (let j=1 ; j<7 ; j++) {
            if (cells[j].innerHTML === 'Livre') {
                cells[j].style.backgroundColor = '#00cc00';
            } else {
                cells[j].style.backgroundColor = '#ff0000';
            }
        }

    }
}
