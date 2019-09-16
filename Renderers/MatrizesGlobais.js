const Store = require('electron-store');
const store = new Store();
const utils = require('../utils');
const math = require('mathjs');

calcular()
processarMRG('bodyMRG');
// processarMRG01('bodyMRG01');

function calcular() {
    let estruturaObj = store.get('estrutura')
    estruturaObj = utils.Comprimento(estruturaObj)
    estruturaObj = utils.Mapeamento(estruturaObj)
    estruturaObj = utils.PontoAuxiliar(estruturaObj)
    estruturaObj = utils.CossenosDiretores(estruturaObj)
    estruturaObj = utils.MRG(estruturaObj)
    estruturaObj = utils.MRG01(estruturaObj)
    estruturaObj = utils.ResultadosGlobais(estruturaObj)
    estruturaObj = utils.ResultadosLocais(estruturaObj)
    store.set('estrutura', estruturaObj) 
}

function processarMRG(idTabela) {

    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=0; i<6*nPontos ; i++) {

        var doc = document.getElementById(idTabela).insertRow(i);

        for(let j=0; j<6*nPontos ; j++) {
        
            var kij = doc.insertCell(j);
            kij.innerHTML = math.round(estruturaObj.global.matrizDeRigidezGlobal[i][j],0);

        }
    }
}

function processarMRG01(idTabela) {

    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=0; i<6*nPontos ; i++) {

        var doc = document.getElementById(idTabela).insertRow(i);

        for(let j=0; j<6*nPontos ; j++) {
        
            var kij = doc.insertCell(j);
            kij.innerHTML = math.round(estruturaObj.global.matrizDeRigidezGlobal01[i][j],0);

        }
    }
}

