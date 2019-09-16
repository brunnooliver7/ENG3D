const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');
const math = require('mathjs');

calcular()
lista('bodyElementos')
initCarregada(1150,450)
structureCarregada()
animateCarregada()

document.getElementById('MRL').style.display = 'none'
document.getElementById('MR').style.display = 'none'
document.getElementById('pAUX').style.display = 'none'
document.getElementById('MC').style.display = 'none'
document.getElementById('MD').style.display = 'none'

document.querySelector('#visualizar').addEventListener('click', (event) => {
    
    event.preventDefault();

    var N = document.getElementById('elemento').value

    limparTabela('bodyMRL')
    processarMRL('bodyMRL', N)
    document.getElementById('MRL').style.display = 'block'

    limparTabela('bodyMR')
    processarMR('bodyMR', N)
    document.getElementById('MR').style.display = 'block'

    limparTabela('bodypAUX')
    processarpAUX('bodypAUX', N)
    document.getElementById('pAUX').style.display = 'block'

    limparTabela('bodyMC')
    processarMC('bodyMC',N)
    document.getElementById('MC').style.display = 'block'

    limparTabela('bodyMD')
    processarMD('bodyMD',N)
    document.getElementById('MD').style.display = 'block'

});

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

function lista(idTabela){
    
    let estruturaObj = store.get('estrutura');
    let nElementos = estruturaObj.elementos.length
    
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

function processarMRL(idTabela,N) {

    let estruturaObj = store.get('estrutura');

    for(let i=0; i<12 ; i++) {

        var doc = document.getElementById(idTabela).insertRow(i);

        for(let j=0; j<12 ; j++) {
        
            var kij = doc.insertCell(j);
            kij.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeRigidezLocal[i][j],0);

        }
    }
}

function processarMR(idTabela,N) {

    let estruturaObj = store.get('estrutura');

    for(let i=0; i<12 ; i++) {

        var doc = document.getElementById(idTabela).insertRow(i);

        for(let j=0; j<12 ; j++) {
        
            var kij = doc.insertCell(j);
            kij.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeRotacao[i][j],3);

        }
    }
}

function processarpAUX(idTabela,N) {

    let estruturaObj = store.get('estrutura');
    
    var doc = document.getElementById(idTabela).insertRow(0);
    var x = doc.insertCell(0)
    x.innerHTML = 'x'
    var a = doc.insertCell(1)
    a.innerHTML = estruturaObj.elementos[N-1].pAux.a

    var doc = document.getElementById(idTabela).insertRow(1);
    var y = doc.insertCell(0)
    y.innerHTML = 'y'
    var b = doc.insertCell(1)
    b.innerHTML = estruturaObj.elementos[N-1].pAux.b

    var doc = document.getElementById(idTabela).insertRow(2);
    var z = doc.insertCell(0)
    z.innerHTML = 'z'
    var c = doc.insertCell(1)
    c.innerHTML = estruturaObj.elementos[N-1].pAux.c

}

function processarMC(idTabela,N) {

    let estruturaObj = store.get('estrutura');
    pA = estruturaObj.elementos[N-1].conectividades.pontoA-1
    pB = estruturaObj.elementos[N-1].conectividades.pontoB-1

    // Ponto A
    var doc = document.getElementById(idTabela).insertRow(0);
    var textfxA = doc.insertCell(0)
    textfxA.innerHTML = 'F<sub>xA</sub>'
    var fxA = doc.insertCell(1)
    fxA.innerHTML = math.round(estruturaObj.global.cargas[6*pA])
    
    doc = document.getElementById(idTabela).insertRow(1);
    var textfyA = doc.insertCell(0)
    textfyA.innerHTML = 'F<sub>yA</sub>'
    var fyA = doc.insertCell(1)
    fyA.innerHTML = math.round(estruturaObj.global.cargas[6*pA+1])

    doc = document.getElementById(idTabela).insertRow(2);
    var textfzA = doc.insertCell(0)
    textfzA.innerHTML = 'F<sub>zA</sub>'
    var fzA = doc.insertCell(1)
    fzA.innerHTML = math.round(estruturaObj.global.cargas[6*pA+2])

    doc = document.getElementById(idTabela).insertRow(3);
    var textmxA = doc.insertCell(0)
    textmxA.innerHTML = 'M<sub>xA</sub>'
    var mxA = doc.insertCell(1)
    mxA.innerHTML = math.round(estruturaObj.global.cargas[6*pA+3])

    doc = document.getElementById(idTabela).insertRow(4);
    var textmyA = doc.insertCell(0)
    textmyA.innerHTML = 'M<sub>yA</sub>'
    var myA = doc.insertCell(1)
    myA.innerHTML = math.round(estruturaObj.global.cargas[6*pA+4])

    doc = document.getElementById(idTabela).insertRow(5);
    var textmzA = doc.insertCell(0)
    textmzA.innerHTML = 'M<sub>zA</sub>'
    var mzA = doc.insertCell(1)
    mzA.innerHTML = math.round(estruturaObj.global.cargas[6*pA+5])

    // Ponto B
    doc = document.getElementById(idTabela).insertRow(6);
    var textfxB = doc.insertCell(0)
    textfxB.innerHTML = 'F<sub>xB</sub>'
    var fx2 = doc.insertCell(1)
    fx2.innerHTML = math.round(estruturaObj.global.cargas[6*pB])

    doc = document.getElementById(idTabela).insertRow(7);
    var textfyB = doc.insertCell(0)
    textfyB.innerHTML = 'F<sub>yB</sub>'
    var fy2 = doc.insertCell(1)
    fy2.innerHTML = math.round(estruturaObj.global.cargas[6*pB+1])

    doc = document.getElementById(idTabela).insertRow(8);
    var textfzB = doc.insertCell(0)
    textfzB.innerHTML = 'F<sub>zB</sub>'
    var fz2 = doc.insertCell(1)
    fz2.innerHTML = math.round(estruturaObj.global.cargas[6*pB+2])

    doc = document.getElementById(idTabela).insertRow(9);
    var textmxB = doc.insertCell(0)
    textmxB.innerHTML = 'M<sub>xB</sub>'
    var mx2 = doc.insertCell(1)
    mx2.innerHTML = math.round(estruturaObj.global.cargas[6*pB+3])

    doc = document.getElementById(idTabela).insertRow(10);
    var textmyB = doc.insertCell(0)
    textmyB.innerHTML = 'M<sub>yB</sub>'
    var my2 = doc.insertCell(1)
    my2.innerHTML = math.round(estruturaObj.global.cargas[6*pB+4])

    doc = document.getElementById(idTabela).insertRow(11);
    var textmzB = doc.insertCell(0)
    textmzB.innerHTML = 'M<sub>zB</sub>'
    var mz2 = doc.insertCell(1)
    mz2.innerHTML = math.round(estruturaObj.global.cargas[6*pB+5])

}

function processarMD(idTabela,N) {

    let estruturaObj = store.get('estrutura');

    // Ponto A
    var doc = document.getElementById(idTabela).insertRow(0);
    var textTXA = doc.insertCell(0)
    textTXA.innerHTML = '&#948<sub>xA</sub>'
    var TXA = doc.insertCell(1)
    TXA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[0],3)

    doc = document.getElementById(idTabela).insertRow(1);
    var textTYA = doc.insertCell(0)
    textTYA.innerHTML = '&#948<sub>yA</sub>'
    var TYA = doc.insertCell(1)
    TYA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[1],3)

    doc = document.getElementById(idTabela).insertRow(2);
    var textTZA = doc.insertCell(0)
    textTZA.innerHTML = '&#948<sub>zA</sub>'
    var TZA = doc.insertCell(1)
    TZA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[2],3)

    doc = document.getElementById(idTabela).insertRow(3);
    var textRXA = doc.insertCell(0)
    textRXA.innerHTML = '&#966<sub>xA</sub>'
    var RXA = doc.insertCell(1)
    RXA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[3],3)

    doc = document.getElementById(idTabela).insertRow(4);
    var textRYA = doc.insertCell(0)
    textRYA.innerHTML = '&#966<sub>yA</sub>'
    var RYA = doc.insertCell(1)
    RYA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[4],3)

    doc = document.getElementById(idTabela).insertRow(5);
    var textRZA = doc.insertCell(0)
    textRZA.innerHTML = '&#966<sub>zA</sub>'
    var RZA = doc.insertCell(1)
    RZA.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[5],3)

    // Ponto B
    doc = document.getElementById(idTabela).insertRow(6);
    var textTXB = doc.insertCell(0)
    textTXB.innerHTML = '&#948<sub>xB</sub>'
    var TXB = doc.insertCell(1)
    TXB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[6],3)

    doc = document.getElementById(idTabela).insertRow(7);
    var textTYB = doc.insertCell(0)
    textTYB.innerHTML = '&#948<sub>yB</sub>'
    var TYB = doc.insertCell(1)
    TYB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[7],3)

    doc = document.getElementById(idTabela).insertRow(8);
    var textTZB = doc.insertCell(0)
    textTZB.innerHTML = '&#948<sub>zB</sub>'
    var TZB = doc.insertCell(1)
    TZB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[8],3)

    doc = document.getElementById(idTabela).insertRow(9);
    var textRXB = doc.insertCell(0)
    textRXB.innerHTML = '&#966<sub>xA</sub>'
    var RXB = doc.insertCell(1)
    RXB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[9],3)

    doc = document.getElementById(idTabela).insertRow(10);
    var textRYB = doc.insertCell(0)
    textRYB.innerHTML = '&#966<sub>yB</sub>'
    var RYB = doc.insertCell(1)
    RYB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[10,3])

    doc = document.getElementById(idTabela).insertRow(11);
    var textRZB = doc.insertCell(0)
    textRZB.innerHTML = '&#966<sub>zB</sub>'
    var RZB = doc.insertCell(1)
    RZB.innerHTML = math.round(estruturaObj.elementos[N-1].matrizDeDeslocamentos[11,3])

}

function limparTabela(idTabela){
    var tabela = document.getElementById(idTabela);
    var linhas = tabela.getElementsByTagName('tr');
    nLinhas = linhas.length;
    for (let i=0; i<nLinhas; i++) {
        document.getElementById(idTabela).deleteRow(idTabela);
    }
}
