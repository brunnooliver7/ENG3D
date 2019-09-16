const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');

limparTabela('tabela');
processar('tabela');

initCarregada(920,715)
structureCarregada()
animateCarregada()

document.querySelector('#EnterCoordenadas').addEventListener('click', (event) => {
    event.preventDefault();
    let n = document.querySelector('#ponto-n-coordenadas').value
    let x = document.querySelector('#coordenada-x').value
    let y = document.querySelector('#coordenada-y').value
    let z = document.querySelector('#coordenada-z').value
    
    let estruturaObj = store.get('estrutura')
    estruturaObj = utils.addPonto(estruturaObj, n)
    estruturaObj = utils.addCoordenadas(estruturaObj, n, x, y, z)
    store.set('estrutura', estruturaObj)
    
    limparTabela('tabela');
    processar('tabela');

    document.querySelector('#ponto-n-coordenadas').value='';
    document.querySelector('#coordenada-x').value='';
    document.querySelector('#coordenada-y').value='';
    document.querySelector('#coordenada-z').value='';

    document.querySelector('#ponto-n-coordenadas').focus();

    var node = document.getElementById("desenhoCarregada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    initCarregada(920,715)
    structureCarregada()
    
});

function processar(idTabela) {

    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=nPontos-1; i>-1 ; i--) {
        var doc = document.getElementById(idTabela).insertRow(0);
        var n = doc.insertCell(0);
        n.innerHTML = i+1;
        var x = doc.insertCell(1);
        x.innerHTML = estruturaObj.pontos[i].coordenadas.x;
        var y = doc.insertCell(2);
        y.innerHTML = estruturaObj.pontos[i].coordenadas.y;
        var z = doc.insertCell(3);
        z.innerHTML = estruturaObj.pontos[i].coordenadas.z;
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
