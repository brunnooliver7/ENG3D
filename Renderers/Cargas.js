const electron = require('electron');
const { ipcRenderer } = electron;
const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');

limparTabela('tabela');
processar('tabela');

initCarregada(785,715)
structureCarregada()
animateCarregada()

document.querySelector('#EnterCargas').addEventListener('click', (event) => {
    
    event.preventDefault();
    let n = document.querySelector('#ponto').value
    
    let fx = 0
    if (document.querySelector('#fx').value === '') {
        fx = 0
    } else {
        fx = document.querySelector('#fx').value
    }

    let fy = 0
    if (document.querySelector('#fy').value === '') {
        fy = 0
    } else {
        fy = document.querySelector('#fy').value
    }

    let fz = 0
    if (document.querySelector('#fz').value === '') {
        fz = 0
    } else {
        fz = document.querySelector('#fz').value
    }

    let mx = 0
    if (document.querySelector('#mx').value === '') {
        mx = 0
    } else {
        mx = document.querySelector('#mx').value
    }

    let my = 0
    if (document.querySelector('#my').value === '') {
        my = 0
    } else {
        my = document.querySelector('#my').value
    }

    let mz = 0
    if (document.querySelector('#mz').value === '') {
        mz = 0
    } else {
        mz = document.querySelector('#mz').value
    }

    // Teste: trazer a parte do main.js para cá 
    let estruturaObj = store.get('estrutura')
    estruturaObj = utils.addCargas(estruturaObj, n, fx, fy, fz, mx, my, mz)
    store.set('estrutura', estruturaObj)

    limparTabela('tabela');
    processar('tabela');

    document.querySelector('#ponto').value='';
    document.querySelector('#fx').value='';
    document.querySelector('#fy').value='';
    document.querySelector('#fz').value='';
    document.querySelector('#mx').value='';
    document.querySelector('#my').value='';
    document.querySelector('#mz').value='';

    document.querySelector('#ponto').focus();

    var node = document.getElementById("desenhoCarregada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    initCarregada(785,720)
    structureCarregada()

});

function processar(idTabela) {

    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=nPontos-1; i>-1 ; i--) {
        var doc = document.getElementById(idTabela).insertRow(0);
        var n = doc.insertCell(0);
        n.innerHTML = i+1
        var fx = doc.insertCell(1);
        fx.innerHTML = estruturaObj.pontos[i].cargas.fx/1000;
        var fy = doc.insertCell(2);
        fy.innerHTML = estruturaObj.pontos[i].cargas.fy/1000;
        var fz = doc.insertCell(3);
        fz.innerHTML = estruturaObj.pontos[i].cargas.fz/1000;
        var mx = doc.insertCell(4);
        mx.innerHTML = estruturaObj.pontos[i].cargas.mx/1000;
        var my = doc.insertCell(5);
        my.innerHTML = estruturaObj.pontos[i].cargas.my/1000;
        var mz = doc.insertCell(6);
        mz.innerHTML = estruturaObj.pontos[i].cargas.mz/1000;
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
