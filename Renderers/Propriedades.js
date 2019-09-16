const electron = require('electron');
const { ipcRenderer } = electron;
const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');

limparTabela('tabela');
processar('tabela');

document.querySelector('#EnterPropriedades').addEventListener('click', (event) => {
    
    event.preventDefault();
    
    let modElast = 0
    if (document.querySelector('#modElast').value === '') {
        modElast = 0
    } else {
        modElast = document.querySelector('#modElast').value
    }

    let area = 0
    if (document.querySelector('#area').value === '') {
        area = 0
    } else {
        area = document.querySelector('#area').value
    }

    let poisson = 0
    if (document.querySelector('#poisson').value === '') {
        poisson = 0
    } else {
        poisson = document.querySelector('#poisson').value
    }

    let momInX = 0
    if (document.querySelector('#momInX').value === '') {
        momInX = 0
    } else {
        momInX = document.querySelector('#momInX').value
    }

    let momInY = 0
    if (document.querySelector('#momInY').value === '') {
        momInY = 0
    } else {
        momInY = document.querySelector('#momInY').value
    }

    // Atenção! Iz = Iy
    let momInZ = 0
    if (document.querySelector('#momInY').value === '') {
        momInZ = 0
    } else {
        momInZ = document.querySelector('#momInY').value
    }

    let estruturaObj = store.get('estrutura')
    estruturaObj = utils.addPropriedades(estruturaObj, modElast, area, poisson, momInX, momInY, momInZ)
    store.set('estrutura', estruturaObj)

    limparTabela('tabela');
    processar('tabela');

});

function processar(idTabela) {

    let estruturaObj = store.get('estrutura');

    var doc = document.getElementById(idTabela).insertRow(0);
    var modElast = doc.insertCell(0);
    modElast.innerHTML = estruturaObj.propriedades.modElast/1000000;
    var area = doc.insertCell(1);
    area.innerHTML = estruturaObj.propriedades.area*10000;
    var poisson = doc.insertCell(2);
    poisson.innerHTML = estruturaObj.propriedades.poisson;
    var momInX = doc.insertCell(3);
    momInX.innerHTML = estruturaObj.propriedades.momInX*100000000;
    var momInY = doc.insertCell(4);
    momInY.innerHTML = estruturaObj.propriedades.momInY*100000000;
    var momInZ = doc.insertCell(5);
    momInZ.innerHTML = estruturaObj.propriedades.momInZ*100000000;
    
}

function limparTabela(idTabela){
    var tabela = document.getElementById(idTabela);
    var linhas = tabela.getElementsByTagName('tr');
    nLinhas = linhas.length;
    for (let i=0; i<nLinhas; i++) {
        document.getElementById('tabela').deleteRow(idTabela);
    }
}
