const math = require('mathjs');
const Store = require('electron-store');

module.exports = {

	criarEstruturaObj: function() {
		var estruturaObj = {
			"nome": "nome",
			"data": "data",
			"pontos": [],
			"elementos" : [],
			"propriedades": {
				"modElast": 0,
				"area": 0,
				"poisson": 0,
				"momInX": 0,
				"momInY": 0,
				"momInZ": 0
			},
			"global": {
				"mapeamento": [],
				"matrizDeRigidezGlobal": [],
				"matrizDeRigidezGlobal01" : [],
				"deslocamentos": [],
				"cargas": []
      }
    }
    return estruturaObj
  },

	addPonto: function(estruturaObj, n) {
		estruturaObj.pontos[n-1] = {
			coordenadas: {
				"x":0,
				"y":0,
				"z":0
			},
			restricoes: {
				"tx": false,
				"ty": false,
				"tz": false,
				"rx": false,
				"ry": false,
				"rz": false
			},
			cargas: {
				"fx": 0,
				"fy": 0,
				"fz": 0,
				"mx": 0,
				"my": 0,
				"mz": 0
			}
		}
		return estruturaObj
	},

	addElemento: function(estruturaObj, m) {
		estruturaObj.elementos[m-1] = {
			conectividades: {
				"pontoA": 0,
				"pontoB": 0
			},
			comprimento: 0,
			pAux: {
				"a": 0,
				"b": 0,
				"c": 0,
				"LaPx": 0,
				"LaPy": 0,
				"LaPz": 0,
				"LaP": 0
			},
			cossenosDiretores: {
				"alpha": 0,
				"beta": 0,
				"theta": 0
			},
			matrizDeRigidezLocal: [],
      matrizDeRotacao: [],
      matrizDeCargas: [],
      matrizDeDeslocamentos: []
		}
		return estruturaObj
	},

	addCoordenadas: function(estruturaObj, n, x, y, z) {
		estruturaObj.pontos[n-1].coordenadas.x = x
		estruturaObj.pontos[n-1].coordenadas.y = y
		estruturaObj.pontos[n-1].coordenadas.z = z
		return estruturaObj
  },

	addRestricoes: function(estruturaObj, n, tx, ty, tz, rx, ry, rz) {
		estruturaObj.pontos[n-1].restricoes.tx =  tx
		estruturaObj.pontos[n-1].restricoes.ty =  ty
		estruturaObj.pontos[n-1].restricoes.tz =  tz
		estruturaObj.pontos[n-1].restricoes.rx =  rx
		estruturaObj.pontos[n-1].restricoes.ry =  ry
		estruturaObj.pontos[n-1].restricoes.rz =  rz
		return estruturaObj
	},

	addCargas: function(estruturaObj, n, fx, fy, fz, mx, my, mz) {
		estruturaObj.pontos[n-1].cargas.fx = fx*1000 // conversão de kN para N
		estruturaObj.pontos[n-1].cargas.fy = fy*1000 // conversão de kN para N 
		estruturaObj.pontos[n-1].cargas.fz = fz*1000 // conversão de kN para N 
		estruturaObj.pontos[n-1].cargas.mx = mx*1000 // conversão de kNm para Nm
		estruturaObj.pontos[n-1].cargas.my = my*1000 // conversão de kNm para Nm
		estruturaObj.pontos[n-1].cargas.mz = mz*1000 // conversão de kNm para Nm
		return estruturaObj
	},

	addConectividades: function(estruturaObj, m, pontoA, pontoB) {
		estruturaObj.elementos[m-1].conectividades.pontoA = pontoA
		estruturaObj.elementos[m-1].conectividades.pontoB = pontoB
		return estruturaObj
	},

	addPropriedades: function(estruturaObj, modElast, area, poisson, momInX, momInY, momInZ) {
		estruturaObj.propriedades.modElast = modElast*1000000 // conversão de MPa para Pa
		estruturaObj.propriedades.area = area/10000 // conversão de cm² para m²
		estruturaObj.propriedades.poisson = poisson
		estruturaObj.propriedades.momInX = momInX/100000000 // conversão de cm4 para m4
		estruturaObj.propriedades.momInY = momInY/100000000 // conversão de cm4 para m4
		estruturaObj.propriedades.momInZ = momInZ/100000000 // conversão de cm4 para m4
		return estruturaObj
	},

	Comprimento: function (estruturaObj) {

    const nElementos = estruturaObj.elementos.length

    // O comprimento de cada barra é calculado com uma raiz quadrada da soma dos
    // quadrados da medida da projeção da barra nos eixos x, y e z, que é uma
    // aplicação do Teorema de Pitágoras

    // Cria variáveis para alocar os valores dos comprimentos de cada barra
    var pA = 0
    var pB = 0
    var Lx = 0
    var Ly = 0
    var Lz = 0
    let LBarra = []

    // Faz um loop percorrendo os elementos, aloca os valores lidos nas
    // variáveis, calcula o comprimento de cada barra, alocando esse valor no
    // array LBarra e aloca o valor do comprimento no objeto estruturaObj
    for(let i=0; i<nElementos ; i++) {
      pA = estruturaObj.elementos[i].conectividades.pontoA
      pB = estruturaObj.elementos[i].conectividades.pontoB
      Lx = estruturaObj.pontos[pA-1].coordenadas.x - estruturaObj.pontos[pB-1].coordenadas.x
      Ly = estruturaObj.pontos[pA-1].coordenadas.y - estruturaObj.pontos[pB-1].coordenadas.y
      Lz = estruturaObj.pontos[pA-1].coordenadas.z - estruturaObj.pontos[pB-1].coordenadas.z
      LBarra[i] = math.sqrt(Lx*Lx+Ly*Ly+Lz*Lz)
      estruturaObj.elementos[i].comprimento = LBarra[i]
    }

    return estruturaObj

  },

  Mapeamento: function (estruturaObj) {

    const nElementos = estruturaObj.elementos.length

    for(let i=0 ; i<nElementos ; i++) {
      for(let j=0; j<12 ; j++) {

        pA = estruturaObj.elementos[i].conectividades.pontoA
        pB = estruturaObj.elementos[i].conectividades.pontoB

        estruturaObj.global.mapeamento[i] = []

        estruturaObj.global.mapeamento[i][0] = 0+(pA-1)*6
        estruturaObj.global.mapeamento[i][1] = 1+(pA-1)*6
        estruturaObj.global.mapeamento[i][2] = 2+(pA-1)*6
        estruturaObj.global.mapeamento[i][3] = 3+(pA-1)*6
        estruturaObj.global.mapeamento[i][4] = 4+(pA-1)*6
        estruturaObj.global.mapeamento[i][5] = 5+(pA-1)*6

        estruturaObj.global.mapeamento[i][6] = 0+(pB-1)*6
        estruturaObj.global.mapeamento[i][7] = 1+(pB-1)*6
        estruturaObj.global.mapeamento[i][8] = 2+(pB-1)*6
        estruturaObj.global.mapeamento[i][9] = 3+(pB-1)*6
        estruturaObj.global.mapeamento[i][10] = 4+(pB-1)*6
        estruturaObj.global.mapeamento[i][11] = 5+(pB-1)*6

      }
    }

    return estruturaObj

  },

  PontoAuxiliar: function (estruturaObj) {

    const nElementos = estruturaObj.elementos.length

    // Coordenadas de um ponto auxiliar para ser utilizado nos cálculos
    
    for(i=0 ; i<nElementos ; i++) {

      pA = estruturaObj.elementos[i].conectividades.pontoA
      pAX = estruturaObj.pontos[pA-1].coordenadas.x
      pAY = estruturaObj.pontos[pA-1].coordenadas.y
      pAZ = estruturaObj.pontos[pA-1].coordenadas.z

      pB = estruturaObj.elementos[i].conectividades.pontoB
      pBX = estruturaObj.pontos[pB-1].coordenadas.x
      pBY = estruturaObj.pontos[pB-1].coordenadas.y
      pBZ = estruturaObj.pontos[pB-1].coordenadas.z

      if(pAX === pBX && pAZ === pBZ) {
        a = math.sum(pAX,-1)
        b = math.divide(math.sum(pAY,pBY),2)
        c = pAZ
      } else {
        a = math.divide(math.sum(pAX,pBX),2)
        b = math.sum(math.divide(math.sum(pAY,pBY),2),1)
        c = math.divide(math.sum(pAZ,pBZ),2)
      }

      estruturaObj.elementos[i].pAux.a = a
      estruturaObj.elementos[i].pAux.b = b
      estruturaObj.elementos[i].pAux.c = c

    }

    // Cria um array para alocar os valores das distancias entre o ponto
    // auxiliar e o ponto a de cada barra
    let LaPx = 0
    let LaPy = 0
    let LaPz = 0
    let LaP = 0

    // Faz um loop para o cálculo da distancia entre o ponto 1 e o ponto P de
    // cada barra e aloca os valores no estruturaObj
    for(let i=0; i<nElementos ; i++){

      pA = estruturaObj.elementos[i].conectividades.pontoA
      pAX = estruturaObj.pontos[pA-1].coordenadas.x
      pAY = estruturaObj.pontos[pA-1].coordenadas.y
      pAZ = estruturaObj.pontos[pA-1].coordenadas.z

      LaPx = (a-pAX)
      LaPy = (b-pAY)
      LaPz = (c-pAZ)
      LaP = math.sqrt(LaPx*LaPx + LaPy*LaPy + LaPz*LaPz)

      estruturaObj.elementos[i].pAux.LaPx = LaPx
      estruturaObj.elementos[i].pAux.LaPy = LaPy
      estruturaObj.elementos[i].pAux.LaPz = LaPz
      estruturaObj.elementos[i].pAux.LaP = LaP

    }

    return estruturaObj

  },

  CossenosDiretores: function (estruturaObj) {

    const nElementos = estruturaObj.elementos.length

    // Cria o vetor para alocar os valores de cossenos diretores do ângulo
    // projetado no eixo x
    let alpha = []
    // Calcula o valor do cosseno diretor em x de cada barra e aloca no vetor
    // alpha
    for (let i=0 ; i<nElementos ; i++) {
      // Obtem-se o tamanho da projeção da barra no eixo x através da diferença
      // dos valores da coordenada x dos dois pontos da barra e divide-se pelo
      // seu comprimento
      pA = estruturaObj.elementos[i].conectividades.pontoA
      pX = estruturaObj.pontos[pA-1].coordenadas.x
      pL = estruturaObj.elementos[i].pAux.LaP
      a = estruturaObj.elementos[i].pAux.a
      alpha[i] = (a-pX)/pL
      estruturaObj.elementos[i].cossenosDiretores.alpha = alpha[i]
    }
    
    // Cria o vetor para alocar os valores de cossenos diretores do ângulo
    // projetado no eixo y
    let beta = []
    // Calcula o valor do cosseno diretor em y de cada barra e aloca no vetor
    // beta
    for (let i=0 ; i<nElementos ; i++) {
      // Obtem-se o tamanho da projeção da barra no eixo y através da diferença
      // dos valores da coordenada y dos dois pontos da barra e divide-se pelo
      // seu comprimento
      pA = estruturaObj.elementos[i].conectividades.pontoA
      pY = estruturaObj.pontos[pA-1].coordenadas.y
      pL = estruturaObj.elementos[i].pAux.LaP
      b = estruturaObj.elementos[i].pAux.b
      beta[i] = (b-pY)/pL
      estruturaObj.elementos[i].cossenosDiretores.beta = beta[i]
    }

    // Cria o vetor para alocar os valores de cossenos diretores do ângulo
    // projetado no eixo y
    let theta = []
    // Calcula o valor do cosseno diretor em y de cada barra e aloca no vetor
    // beta
    for (let i=0 ; i<nElementos ; i++) {
      // Obtem-se o tamanho da projeção da barra no eixo y através da diferença
      // dos valores da coordenada y dos dois pontos da barra e divide-se pelo
      // seu comprimento
      pA = estruturaObj.elementos[i].conectividades.pontoA
      pZ = estruturaObj.pontos[pA-1].coordenadas.z
      pL = estruturaObj.elementos[i].pAux.LaP
      c = estruturaObj.elementos[i].pAux.c
      theta[i] = (c-pZ)/pL
      estruturaObj.elementos[i].cossenosDiretores.theta = theta[i]
    }

    return estruturaObj

  },

  MRG: function (estruturaObj) {

    // Imports que não variam conforme o elemento

    const nPontos = estruturaObj.pontos.length
    const nElementos = estruturaObj.elementos.length
    var MRG = math.resize([],[6*nPontos,6*nPontos],0)
    var el = estruturaObj.global.mapeamento
    var EA = math.multiply(
      estruturaObj.propriedades.modElast,
      estruturaObj.propriedades.area)
    var GIx = math.sum(1,estruturaObj.propriedades.poisson)
    var GIx = math.multiply(2,GIx)
    var GIx = math.divide(estruturaObj.propriedades.modElast,GIx)
    var GIx = math.multiply(GIx,estruturaObj.propriedades.momInX)
    var EIy = math.multiply(
      estruturaObj.propriedades.modElast,
      estruturaObj.propriedades.momInY)
    var EIz = math.multiply(
      estruturaObj.propriedades.modElast,
      estruturaObj.propriedades.momInZ)

    for(let i=0; i<nElementos ; i++){
      for(let j=0; j<12 ; j++){
        for(let k=0; k<12 ; k++){

          // Imports que variam conforme o elemento

          var L = estruturaObj.elementos[i].comprimento
          var alpha = estruturaObj.elementos[i].cossenosDiretores.alpha
          var beta = estruturaObj.elementos[i].cossenosDiretores.beta
          var theta = estruturaObj.elementos[i].cossenosDiretores.theta

          // Matriz de rigidez local

          var K1 = [EA/L,0,0,0,0,0,-EA/L,0,0,0,0,0]
          var K2 = [0,12*EIz/L**3,0,0,0,6*EIz/L**2,0,
            -12*EIz/L**3,0,0,0,6*EIz/L**2]
          var K3 = [0,0,12*EIy/L**3,0,-6*EIy/L**2,0,0,0,
            -12*EIy/L**3,0,-6*EIy/L**2,0]
          var K4 = [0,0,0,GIx/L,0,0,0,0,0,-GIx/L,0,0]
          var K5 = [0,0,-6*EIy/L**2,0,4*EIy/L,0,0,0,
            6*EIy/L**2,0,2*EIy/L,0]
          var K6 = [0,6*EIz/L**2,0,0,0,4*EIz/L,0,
            -6*EIz/L**2,0,0,0,2*EIz/L]
          var K7 = [-EA/L,0,0,0,0,0,EA/L,0,0,0,0,0]
          var K8 = [0,-12*EIz/L**3,0,0,0,-6*EIz/L**2,0,
            12*EIz/L**3,0,0,0,-6*EIz/L**2]
          var K9 = [0,0,-12*EIy/L**3,0,6*EIy/L**2,0,0,0,
            12*EIy/L**3,0,6*EIy/L**2,0]
          var K10 = [0,0,0,-GIx/L,0,0,0,0,0,GIx/L,0,0]
          var K11 = [0,0,-6*EIy/L**2,0,2*EIy/L,0,0,0,
            6*EIy/L**2,0,4*EIy/L,0]
          var K12 = [0,6*EIz/L**2,0,0,0,2*EIz/L,0,
            -6*EIz/L**2,0,0,0,4*EIz/L]
          //

          var K = [K1,K2,K3,K4,K5,K6,K7,K8,K9,K10,K11,K12]
          estruturaObj.elementos[i].matrizDeRigidezLocal = K

          // Matriz de rotação

          let PA = estruturaObj.elementos[i].conectividades.pontoA
          let PB = estruturaObj.elementos[i].conectividades.pontoB

          let PAX = estruturaObj.pontos[PA-1].coordenadas.x
          let PAY = estruturaObj.pontos[PA-1].coordenadas.y
          let PAZ = estruturaObj.pontos[PA-1].coordenadas.z
          let PBX = estruturaObj.pontos[PB-1].coordenadas.x
          let PBY = estruturaObj.pontos[PB-1].coordenadas.y
          let PBZ = estruturaObj.pontos[PB-1].coordenadas.z

          let lb11 = (PBX-PAX)/L
          let lb12 = (PBY-PAY)/L
          let lb13 = (PBZ-PAZ)/L

          let c = math.sqrt((lb12*theta-lb13*beta)**2 +
            (lb13*alpha-lb11*theta)**2 +
            (lb11*beta-lb12*alpha)**2)
          //

          let lb31 = (lb12*theta-lb13*beta)/c
          let lb32 = (lb13*alpha-lb11*theta)/c
          let lb33 = (lb11*beta-lb12*alpha)/c

          let lb21 = lb13*lb32-lb12*lb33
          let lb22 = lb11*lb33-lb13*lb31
          let lb23 = lb12*lb31-lb11*lb32

          let R1 = [lb11,lb12,lb13]
          let R2 = [lb21,lb22,lb23]
          let R3 = [lb31,lb32,lb33]
          let R = [R1,R2,R3]
          let mzr = [[0,0,0],[0,0,0],[0,0,0]]

          let rot1 = math.concat(R,mzr,mzr,mzr)
          let rot2 = math.concat(mzr,R,mzr,mzr)
          let rot3 = math.concat(mzr,mzr,R,mzr)
          let rot4 = math.concat(mzr,mzr,mzr,R)
          let rot = math.concat(rot1,rot2,rot3,rot4,0)
          estruturaObj.elementos[i].matrizDeRotacao = rot

          K = math.multiply(math.transpose(rot),K)
          K = math.multiply(K,rot)

          MRG[el[i][j]][el[i][k]] = MRG[el[i][j]][el[i][k]] + K[j][k]

          estruturaObj.global.matrizDeRigidezGlobal = MRG

        }
      }
    }
    return estruturaObj
  },

  MRG01: function (estruturaObj) {
    const nPontos = estruturaObj.pontos.length
    var MRG01 = math.resize([],[6*nPontos,6*nPontos],0)

    // Igualar MRG01 a MRG
    for (let i=0 ; i<6*nPontos ;i++) {
      for (let j=0 ; j<6*nPontos ;j++) {
        MRG01[i][j] = estruturaObj.global.matrizDeRigidezGlobal[i][j]
      }
    }

    // O vetor u0 tem dimensão igual à quantidade de deslocamentos nulos
    // (apoios) e os seus valores correspondem aos índices dos deslocamentos de
    // acordo com a numeração do sistema global
    var u0 =[]
    for (let i=0 ; i<nPontos ; i++) {

      if(estruturaObj.pontos[i].restricoes.tx == true) {
        u0.push(6*i)
      } else {}
      if(estruturaObj.pontos[i].restricoes.ty == true) {
        u0.push(6*i+1)
      } else {}
      if(estruturaObj.pontos[i].restricoes.tz == true) {
        u0.push(6*i+2)
      } else {}
      if(estruturaObj.pontos[i].restricoes.rx == true) {
        u0.push(6*i+3)
      } else {}
      if(estruturaObj.pontos[i].restricoes.ry == true) {
        u0.push(6*i+4)
      } else {}
      if(estruturaObj.pontos[i].restricoes.rz == true) {
        u0.push(6*i+5)
      } else {}

    }

    //Igualar a 1 os termos (k,k), onde k é o índice do deslocamento no sistema
    // de coordenadas global que é igual a 0 (apoio), e zerar o restante dos
    // termos da linha e da coluna
    for (let i=0 ; i<u0.length ; i++) {
      for (let j=0 ; j<6*nPontos ; j++) {
        MRG01[u0[i]][j] = 0
        MRG01[j][u0[i]] = 0
      }
      MRG01[u0[i]][u0[i]] = 1
    }

    estruturaObj.global.matrizDeRigidezGlobal01 = MRG01

    return estruturaObj
  },

  ResultadosGlobais: function (estruturaObj) {

    const nPontos = estruturaObj.pontos.length
    const MRG = estruturaObj.global.matrizDeRigidezGlobal
    const MRG01 = estruturaObj.global.matrizDeRigidezGlobal01

    var Cargas = []
    for(i=0 ; i<nPontos ; i++) {
      Cargas[6*i] = estruturaObj.pontos[i].cargas.fx 
      Cargas[6*i+1] = estruturaObj.pontos[i].cargas.fy 
      Cargas[6*i+2] = estruturaObj.pontos[i].cargas.fz 
      Cargas[6*i+3] = estruturaObj.pontos[i].cargas.mx
      Cargas[6*i+4] = estruturaObj.pontos[i].cargas.my
      Cargas[6*i+5] = estruturaObj.pontos[i].cargas.mz
    }

    var Deslocamentos = []
    Deslocamentos = math.multiply(math.inv(MRG01),Cargas)
    estruturaObj.global.deslocamentos = Deslocamentos 

    Cargas = math.multiply(MRG,Deslocamentos)
    estruturaObj.global.cargas = Cargas

    return estruturaObj
  },

  ResultadosLocais: function (estruturaObj) {

    estruturaObj = MD(estruturaObj)
    estruturaObj = MC(estruturaObj)

    function MD(estruturaObj) {

      const nElementos = estruturaObj.elementos.length  

      var Deslocamentos = []
      var rot = []

      for (i=0 ; i<nElementos ; i++) {

        var pA = estruturaObj.elementos[i].conectividades.pontoA
        var pB = estruturaObj.elementos[i].conectividades.pontoB

        Deslocamentos[0] = estruturaObj.global.deslocamentos[6*(pA-1)]
        Deslocamentos[1] = estruturaObj.global.deslocamentos[6*(pA-1)+1]
        Deslocamentos[2] = estruturaObj.global.deslocamentos[6*(pA-1)+2]
        Deslocamentos[3] = estruturaObj.global.deslocamentos[6*(pA-1)+3]
        Deslocamentos[4] = estruturaObj.global.deslocamentos[6*(pA-1)+4]
        Deslocamentos[5] = estruturaObj.global.deslocamentos[6*(pA-1)+5]

        Deslocamentos[6] = estruturaObj.global.deslocamentos[6*(pB-1)]
        Deslocamentos[7] = estruturaObj.global.deslocamentos[6*(pB-1)+1]
        Deslocamentos[8] = estruturaObj.global.deslocamentos[6*(pB-1)+2]
        Deslocamentos[9] = estruturaObj.global.deslocamentos[6*(pB-1)+3]
        Deslocamentos[10] = estruturaObj.global.deslocamentos[6*(pB-1)+4]
        Deslocamentos[11] = estruturaObj.global.deslocamentos[6*(pB-1)+5]

        rot = estruturaObj.elementos[i].matrizDeRotacao
        estruturaObj.elementos[i].matrizDeDeslocamentos = math.multiply(Deslocamentos,math.transpose(rot))

      }

      return estruturaObj

    }

    function MC(estruturaObj) {

      const nElementos = estruturaObj.elementos.length  

      for (i=0 ; i<nElementos ; i++) {

        var Cargas = []
        var MRL = estruturaObj.elementos[i].matrizDeRigidezLocal
        var Deslocamentos = estruturaObj.elementos[i].matrizDeDeslocamentos
        Cargas = math.multiply(math.transpose(MRL),Deslocamentos)
        estruturaObj.elementos[i].matrizDeCargas = Cargas

      }

      return estruturaObj

    }

    return estruturaObj

  }

}
