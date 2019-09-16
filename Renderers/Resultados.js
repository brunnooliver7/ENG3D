const Store = require('electron-store');
const store = new Store()
const utils = require('../utils');
const math = require('mathjs');

calcular();
limparTabela('corpo');
processar('corpo');
selecionarTudo()

// Cada desenho é processado
initCarregada(845,760)
structureCarregada()
animateCarregada()
initDeformada(1000,760)
structureDeformada(1)
// animateDeformada() // não precisa, senão, a estrutura gira mais rápido
initDiagramaLocal(1000,760)
structureDiagramaLocal(1)
initDiagramaGlobal(1000,760)
structureDiagramaGlobal(1)
// animateDiagrama() // não precisa, senão, a estrutura gira mais rápido

lista('bodyElementos')
processarMC('bodyMC',1)

// Inicialmente e mostrada a estrutura deformada, e os outros desenhos estão ocultos
document.getElementById('canvasCarregada').style.display = 'none'
document.getElementById('canvasDeformada').style.display = 'none'
document.getElementById('canvasDiagramaLocal').style.display = 'none'
document.getElementById('canvasDiagramaGlobal').style.display = 'none'
document.getElementById('listaElementos').style.display = 'none'
document.getElementById('MC').style.display = 'none'

document.querySelector('#Selecionar').addEventListener('click', (event) => {

    function marcarTudo() {
        document.querySelector('#tx').checked = true
        document.querySelector('#ty').checked = true
        document.querySelector('#tz').checked = true
        document.querySelector('#rx').checked = true
        document.querySelector('#ry').checked = true
        document.querySelector('#rz').checked = true
        document.querySelector('#fx').checked = true
        document.querySelector('#fy').checked = true
        document.querySelector('#fz').checked = true
        document.querySelector('#mx').checked = true
        document.querySelector('#my').checked = true
        document.querySelector('#mz').checked = true
    }

    function desmarcarTudo() {
        document.querySelector('#tx').checked = false
        document.querySelector('#ty').checked = false
        document.querySelector('#tz').checked = false
        document.querySelector('#rx').checked = false
        document.querySelector('#ry').checked = false
        document.querySelector('#rz').checked = false
        document.querySelector('#fx').checked = false
        document.querySelector('#fy').checked = false
        document.querySelector('#fz').checked = false
        document.querySelector('#mx').checked = false
        document.querySelector('#my').checked = false
        document.querySelector('#mz').checked = false
    }

    if (document.querySelector('#tx').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#ty').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#tz').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#rx').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#ry').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#rz').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#fx').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#fy').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#fz').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#mx').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#my').checked === false) {
        marcarTudo()
    } else if (document.querySelector('#mz').checked === false) {
        marcarTudo()
    } else {
        desmarcarTudo()
    }

});
document.querySelector('#Visualizar').addEventListener('click', (event) => {
    
    event.preventDefault();
    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;
    limparTabela('corpo')
    limparCabecalho('cabecalho')

    let mzBox = document.querySelector('#mz').checked
    let myBox = document.querySelector('#my').checked
    let mxBox = document.querySelector('#mx').checked
    let fzBox = document.querySelector('#fz').checked
    let fyBox = document.querySelector('#fy').checked
    let fxBox = document.querySelector('#fx').checked
    let rzBox = document.querySelector('#rz').checked
    let ryBox = document.querySelector('#ry').checked
    let rxBox = document.querySelector('#rx').checked
    let tzBox = document.querySelector('#tz').checked
    let tyBox = document.querySelector('#ty').checked
    let txBox = document.querySelector('#tx').checked

    var doc = document.getElementById('cabecalho').insertRow(0);
    doc.insertCell(0).innerHTML = 'Ponto'

    if (mzBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'M<sub>z</sub> (mm)'    
    }
    if (myBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'M<sub>y</sub> (mm)'    
    }
    if (mxBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'M<sub>x</sub> (mm)'    
    }
    if (fzBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'F<sub>z</sub> (mm)'    
    }
    if (fyBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'F<sub>y</sub> (mm)'    
    }
    if (fxBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = 'F<sub>x</sub> (mm)'    
    }
    if (rzBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#966<sub>z</sub> (mm)'    
    }
    if (ryBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#966<sub>y</sub> (mm)'    
    }
    if (rxBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#966<sub>x</sub> (mm)'    
    }
    if (tzBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#948<sub>z</sub> (mm)'    
    }
    if (tyBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#948<sub>y</sub> (mm)'    
    }
    if (txBox === true) {
        var mzCabecalho = doc.insertCell(1);
        mzCabecalho.innerHTML = '&#948<sub>x</sub> (mm)'    
    }
    
    for(let i=nPontos-1; i>-1 ; i--) {
        
        doc = document.getElementById('corpo').insertRow(0);
        var n = doc.insertCell(0);
        n.innerHTML = i+1
        
        if (mzBox === true) {
            var mz = doc.insertCell(1);
            mz.innerHTML = math.round(estruturaObj.global.cargas[6*i+5]/1000,3); // conversão para kNm    
        }
        if (myBox === true) {
            var my = doc.insertCell(1);
            my.innerHTML = math.round(estruturaObj.global.cargas[6*i+4]/1000,3); // conversão para kNm
        } 
        if (mxBox === true) {
            var mx = doc.insertCell(1);
            mx.innerHTML = math.round(estruturaObj.global.cargas[6*i+3]/1000,3); // conversão para kNm
        }
        if (fzBox === true) {
            var fz = doc.insertCell(1);
            fz.innerHTML = math.round(estruturaObj.global.cargas[6*i+2]/1000,3); // conversão para kN
        } 
        if (fyBox === true) {
            var fy = doc.insertCell(1);
        fy.innerHTML = math.round(estruturaObj.global.cargas[6*i+1]/1000,3); // conversão para kN
        } 
        if (fxBox === true) {
            var fx = doc.insertCell(1);
            fx.innerHTML = math.round(estruturaObj.global.cargas[6*i]/1000,3); // conversão para kN
        } 
        if (rzBox === true) {
            var rz = doc.insertCell(1);
            rz.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+5],3); // rad
        } 
        if (ryBox === true) {
            var ry = doc.insertCell(1);
            ry.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+4],3); // rad
        }
        if (rxBox === true) {
            var rx = doc.insertCell(1);
            rx.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+3],3); // rad
        } 
        if (tzBox === true) {
            var tz = doc.insertCell(1);
            tz.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+2]*1000,3); // conversão para mm
        }
        if (tyBox === true) {
            var ty = doc.insertCell(1);
            ty.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+1]*1000,3); // conversão para mm
        } 
        if (txBox === true) {
            var tx = doc.insertCell(1);
            tx.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i]*1000,3); // conversão para mm
        }

    }

});
document.querySelector('#EstruturaCarregada').addEventListener('click', (event) => {
 
    document.getElementById('canvasCarregada').style.display = 'block'
    document.getElementById('canvasDeformada').style.display = 'none'
    document.getElementById('canvasDiagramaLocal').style.display = 'none'
    document.getElementById('canvasDiagramaGlobal').style.display = 'none'
        document.getElementById('listaElementos').style.display = 'block'  
    document.getElementById('MC').style.display = 'none' 

    var node = document.getElementById("desenhoCarregada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    initCarregada(845,595)
    structureCarregada()

});
document.querySelector('#EstruturaDeformada').addEventListener('click', (event) => {
   
    document.getElementById('canvasCarregada').style.display = 'none'  
    document.getElementById('canvasDeformada').style.display = 'block'
    document.getElementById('canvasDiagramaLocal').style.display = 'none'
    document.getElementById('canvasDiagramaGlobal').style.display = 'none'
    document.getElementById('listaElementos').style.display = 'none'
    document.getElementById('MC').style.display = 'none'

    var node = document.getElementById("desenhoDeformada");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    var escala = document.querySelector('#escala').value
    initDeformada(1170,595)
    structureDeformada(escala)

});
document.querySelector('#DiagramaLocal').addEventListener('click', (event) => {
   
    document.getElementById('canvasCarregada').style.display = 'none'   
    document.getElementById('canvasDeformada').style.display = 'none'
    document.getElementById('canvasDiagramaLocal').style.display = 'block'
    document.getElementById('canvasDiagramaGlobal').style.display = 'none'
    document.getElementById('listaElementos').style.display = 'none'
    document.getElementById('MC').style.display = 'block'

    var node = document.getElementById("desenhoDiagramaLocal");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    var elemento = document.querySelector('#elemento').value
    var fxDiagrama = document.querySelector('#fxDiagrama').checked
    var fyDiagrama = document.querySelector('#fyDiagrama').checked
    var fzDiagrama = document.querySelector('#fzDiagrama').checked
    var mxDiagrama = document.querySelector('#mxDiagrama').checked
    var myDiagrama = document.querySelector('#myDiagrama').checked
    var mzDiagrama = document.querySelector('#mzDiagrama').checked

    initDiagramaLocal(985,595)
    structureDiagramaLocal(elemento,fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama)

    limparTabela('bodyMC')
    processarMC('bodyMC',elemento)

});
document.querySelector('#DiagramaGlobal').addEventListener('click', (event) => {
   
    document.getElementById('canvasCarregada').style.display = 'none'   
    document.getElementById('canvasDeformada').style.display = 'none'
    document.getElementById('canvasDiagramaLocal').style.display = 'none'
    document.getElementById('canvasDiagramaGlobal').style.display = 'block'
    document.getElementById('listaElementos').style.display = 'none'
    document.getElementById('MC').style.display = 'block'

    var node = document.getElementById("desenhoDiagramaGlobal");
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    var elemento = document.querySelector('#elemento').value
    var fxDiagrama = document.querySelector('#fxDiagrama').checked
    var fyDiagrama = document.querySelector('#fyDiagrama').checked
    var fzDiagrama = document.querySelector('#fzDiagrama').checked
    var mxDiagrama = document.querySelector('#mxDiagrama').checked
    var myDiagrama = document.querySelector('#myDiagrama').checked
    var mzDiagrama = document.querySelector('#mzDiagrama').checked

    initDiagramaGlobal(985,595)
    structureDiagramaGlobal(elemento,fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama)

    limparTabela('bodyMC')
    processarMC('bodyMC',elemento)

})

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
function processar(idTabela) {

    let estruturaObj = store.get('estrutura');
    var nPontos = estruturaObj.pontos.length;

    for(let i=nPontos-1; i>-1 ; i--) {
        
        var doc = document.getElementById(idTabela).insertRow(0);
        var n = doc.insertCell(0);
        n.innerHTML = i+1
        
        var tx = doc.insertCell(1);
        tx.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i]*1000,3); // conversão para mm
        var ty = doc.insertCell(2);
        ty.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+1]*1000,3); // conversão para mm
        var tz = doc.insertCell(3);
        tz.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+2]*1000,3); // conversão para mm
        var rx = doc.insertCell(4);
        rx.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+3],3); // rad
        var ry = doc.insertCell(5);
        ry.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+4],3); // rad
        var rz = doc.insertCell(6);
        rz.innerHTML = math.round(estruturaObj.global.deslocamentos[6*i+5],3); // rad

        var fx = doc.insertCell(7);
        fx.innerHTML = math.round(estruturaObj.global.cargas[6*i]/1000,3); // conversão para kN
        var fy = doc.insertCell(8);
        fy.innerHTML = math.round(estruturaObj.global.cargas[6*i+1]/1000,3); // conversão para kN
        var fz = doc.insertCell(9);
        fz.innerHTML = math.round(estruturaObj.global.cargas[6*i+2]/1000,3); // conversão para kN
        var mx = doc.insertCell(10);
        mx.innerHTML = math.round(estruturaObj.global.cargas[6*i+3]/1000,3); // conversão para kNm
        var my = doc.insertCell(11);
        my.innerHTML = math.round(estruturaObj.global.cargas[6*i+4]/1000,3); // conversão para kNm
        var mz = doc.insertCell(12);
        mz.innerHTML = math.round(estruturaObj.global.cargas[6*i+5]/1000,3); // conversão para kNm

    }
    
}
function limparTabela(idTabela) {
    var tabela = document.getElementById(idTabela);
    var linhas = tabela.getElementsByTagName('tr');
    nLinhas = linhas.length;
    for (let i=0; i<nLinhas; i++) {
        document.getElementById(idTabela).deleteRow(idTabela);
    }
}
function limparCabecalho(idCabecalho) {
    var tabela = document.getElementById(idCabecalho);
    var linhas = tabela.getElementsByTagName('tr');
    nLinhas = linhas.length;
    document.getElementById('cabecalho').deleteRow(idCabecalho);
}
function selecionarTudo() {
    document.querySelector('#mz').checked = true
    document.querySelector('#my').checked = true
    document.querySelector('#mx').checked = true
    document.querySelector('#fz').checked = true
    document.querySelector('#fy').checked = true
    document.querySelector('#fx').checked = true
    document.querySelector('#rz').checked = true
    document.querySelector('#ry').checked = true
    document.querySelector('#rx').checked = true
    document.querySelector('#tz').checked = true
    document.querySelector('#ty').checked = true
    document.querySelector('#tx').checked = true    
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
function processarMC(idTabela,N) {

    let estruturaObj = store.get('estrutura');

    // Ponto A
    var doc = document.getElementById(idTabela).insertRow(0);
    var textfxA = doc.insertCell(0)
    textfxA.innerHTML = 'F<sub>xA</sub>'
    var fxA = doc.insertCell(1)
    fxA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[0],1000),3)
    
    doc = document.getElementById(idTabela).insertRow(1);
    var textfyA = doc.insertCell(0)
    textfyA.innerHTML = 'F<sub>yA</sub>'
    var fyA = doc.insertCell(1)
    fyA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[1],1000),3)

    doc = document.getElementById(idTabela).insertRow(2);
    var textfzA = doc.insertCell(0)
    textfzA.innerHTML = 'F<sub>zA</sub>'
    var fzA = doc.insertCell(1)
    fzA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[2],1000),3)

    doc = document.getElementById(idTabela).insertRow(3);
    var textmxA = doc.insertCell(0)
    textmxA.innerHTML = 'M<sub>xA</sub>'
    var mxA = doc.insertCell(1)
    mxA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[3],1000),3)

    doc = document.getElementById(idTabela).insertRow(4);
    var textmyA = doc.insertCell(0)
    textmyA.innerHTML = 'M<sub>yA</sub>'
    var myA = doc.insertCell(1)
    myA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[4],1000),3)

    doc = document.getElementById(idTabela).insertRow(5);
    var textmzA = doc.insertCell(0)
    textmzA.innerHTML = 'M<sub>zA</sub>'
    var mzA = doc.insertCell(1)
    mzA.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[5],1000),3)

    // Ponto B
    doc = document.getElementById(idTabela).insertRow(6);
    var textfxB = doc.insertCell(0)
    textfxB.innerHTML = 'F<sub>xB</sub>'
    var fx2 = doc.insertCell(1)
    fx2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[6],1000),3)

    doc = document.getElementById(idTabela).insertRow(7);
    var textfyB = doc.insertCell(0)
    textfyB.innerHTML = 'F<sub>yB</sub>'
    var fy2 = doc.insertCell(1)
    fy2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[7],1000),3)

    doc = document.getElementById(idTabela).insertRow(8);
    var textfzB = doc.insertCell(0)
    textfzB.innerHTML = 'F<sub>zB</sub>'
    var fz2 = doc.insertCell(1)
    fz2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[8],1000),3)

    doc = document.getElementById(idTabela).insertRow(9);
    var textmxB = doc.insertCell(0)
    textmxB.innerHTML = 'M<sub>xB</sub>'
    var mx2 = doc.insertCell(1)
    mx2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[9],1000),3)

    doc = document.getElementById(idTabela).insertRow(10);
    var textmyB = doc.insertCell(0)
    textmyB.innerHTML = 'M<sub>yB</sub>'
    var my2 = doc.insertCell(1)
    my2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[10],1000),3)

    doc = document.getElementById(idTabela).insertRow(11);
    var textmzB = doc.insertCell(0)
    textmzB.innerHTML = 'M<sub>zB</sub>'
    var mz2 = doc.insertCell(1)
    mz2.innerHTML = math.round(math.divide(estruturaObj.elementos[N-1].matrizDeCargas[11],1000),3)

}