var renderer, scene, camera, controls;

function initDiagramaGlobal(width,height) {
    // Render
    renderer = new THREE.WebGLRenderer({antialias: true}); // cria a renderização
    renderer.setSize( width, height ); // tamanho da tela do desenho
    renderer.setClearColor(0x1F5A94); // cor do fundo do canvas
    renderer.domElement.id = 'desenhoDiagramaGlobal' // id do desenho
    container = document.getElementById( 'canvasDiagramaGlobal' ); // identifica a div com id='canvas' no html
    document.body.appendChild( container ); 
    container.appendChild( renderer.domElement );
    
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera( 25, width/height, 1, 500 );
    camera.position.set( 5, 5, 5 );
    camera.lookAt( 0, 0, 0 );

    // Controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.update();
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;
    controls.target = new THREE.Vector3(0,0,0);
}    
function structureDiagramaGlobal(elemento,fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama) {

    elemento = elemento-1

    // Imports
    const Store = require('electron-store');
    const store = new Store()
    const math = require('mathjs');

    let estruturaObj = store.get('estrutura')
    let nPontos = estruturaObj.pontos.length
    let nElementos = estruturaObj.elementos.length

    prm = prm() // Parameter

    Axes();
    Elements()
    Points()
    // Loads()
    Diagrams(fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama)

    function prm() {
        var prm = 1;
        for(let i=0 ; i<nElementos ; i++) {
            L = estruturaObj.elementos[i].comprimento
            if (prm<L) {
                prm = L
            }
        }
        return prm
    }
    function Axes() {

        // Parameters
        var coneRadius = prm/50
        var coneHeight = prm/15
        var lineLength = prm/3
        var fontSize = prm/10
        var fontHeight = prm/200

        // Cone
        var geometryCone = new THREE.ConeGeometry( coneRadius, coneHeight, 30 );
        var materialConeX = new THREE.MeshBasicMaterial( {color: '#ffff00' } );
        var materialConeY = new THREE.MeshBasicMaterial( {color: '#00ff00' } );
        var materialConeZ = new THREE.MeshBasicMaterial( {color: '#0000ff' } );
    
        // Line
        var geometryLine = new THREE.Geometry();
        geometryLine.vertices.push(new THREE.Vector3( 0, 0, 0) );
        geometryLine.vertices.push(new THREE.Vector3( lineLength, 0, 0) );
        var materialLineX = new THREE.LineBasicMaterial( { color: '#ffff00' } );
        var materialLineY = new THREE.LineBasicMaterial( { color: '#00ff00' } );
        var materialLineZ = new THREE.LineBasicMaterial( { color: '#0000ff' } );
    
        // X
            // Cone
            var coneX = new THREE.Mesh( geometryCone, materialConeX );
            coneX.position.set(-1+lineLength,-1,-1)
            coneX.rotation.x += Math.PI / 2
            coneX.rotation.y += 0
            coneX.rotation.z += -Math.PI / 2
            scene.add( coneX );
            // Line
            var lineX = new THREE.Line( geometryLine, materialLineX );
            lineX.position.set(-1,-1,-1)
            lineX.rotation.x += 0
            lineX.rotation.y += 0
            lineX.rotation.z += 0
            scene.add( lineX );
        // Y
            // Cone
            var coneY = new THREE.Mesh( geometryCone, materialConeY );
            coneY.position.set(-1,-1+lineLength,-1)
            coneY.rotation.x += 0
            coneY.rotation.y += 0
            coneY.rotation.z += 0
            scene.add( coneY );
            // Line
            lineY = new THREE.Line( geometryLine, materialLineY );
            lineY.position.set(-1,-1,-1);
            lineY.rotation.x += Math.PI / 2
            lineY.rotation.y += Math.PI / 2
            lineY.rotation.z += 0
            scene.add( lineY );
        // Z
            // Cone
            var coneZ = new THREE.Mesh( geometryCone, materialConeZ );
            coneZ.position.set(-1,-1,-1+lineLength)
            coneZ.rotation.x += Math.PI / 2
            coneZ.rotation.y += 0
            coneZ.rotation.z += 0
            scene.add( coneZ );
            // Line
            lineZ = new THREE.Line( geometryLine, materialLineZ );
            lineZ.position.set(-1,-1,-1);
            lineZ.rotation.x += Math.PI / 2
            lineZ.rotation.y += Math.PI / 2
            lineZ.rotation.z += Math.PI / 2
            scene.add( lineZ );
        //

        // Text
        var loader = new THREE.FontLoader();
        loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {

            // text material
            var material = new THREE.LineBasicMaterial({
                color: 0xC9C097
            });
    
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: fontHeight,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
    
            // X
            var geometry = new THREE.TextGeometry( 'X' , options )
            var X = new THREE.Mesh( geometry, material );
            X.position.set(
                -1+lineLength+coneHeight,
                -1-0.5*fontSize,
                -1
            );
            X.rotation.x += 0;
            X.rotation.y += 0;
            X.rotation.z += 0;
            scene.add( X );
    
            // Y
            var geometry = new THREE.TextGeometry( 'Y' , options )
            var Y = new THREE.Mesh( geometry, material );
            Y.position.set(
                -1-0.5*fontSize,
                -1+lineLength+coneHeight,
                -1
            );
            Y.rotation.x += 0;
            Y.rotation.y += Math.PI / 4;
            Y.rotation.z += 0;
            scene.add( Y );
    
            // Z
            var geometry = new THREE.TextGeometry( 'Z' , options )
            var Z = new THREE.Mesh( geometry, material );
            Z.position.set(
                -1,
                -1-0.5*fontSize,
                -1+lineLength+coneHeight+0.75*fontSize
            );
            Z.rotation.x += 0;
            Z.rotation.y += Math.PI / 2;
            Z.rotation.z += 0;
            scene.add( Z );
    
        });
    
    }
    function Elements() {
        
        var lines = []

        // Data
            var pontoA = {
                'n': estruturaObj.elementos[elemento].conectividades.pontoA,
                'x': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.x,
                'y': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.y,
                'z': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.z
            }
            var pontoB = {
                'n': estruturaObj.elementos[elemento].conectividades.pontoB,
                'x': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.x,
                'y': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.y,
                'z': estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.z
            }
        //
    
        // Lines
            // Material
            var materialLines = new THREE.LineBasicMaterial( { color: 0xC9C097 } );
            // Geometry
            var geometryLines = new THREE.Geometry();
            geometryLines.vertices.push(new THREE.Vector3( pontoA.x, pontoA.y, pontoA.z) );
            geometryLines.vertices.push(new THREE.Vector3( pontoB.x, pontoB.y, pontoB.z) );
            // Element
            lines[elemento] = new THREE.Line( geometryLines, materialLines );
            scene.add( lines[elemento] );
        //
    }
    function Points() {

        // Parameters
        var radius = prm/25
        var fontSize = prm/10
        var fontHeight = prm/200
        var textPositionAdd = prm/20

        var spheres = []
        for(let i=0 ; i<nPontos ; i++) {
            // Data
            let point = {
                'x': estruturaObj.pontos[i].coordenadas.x,
                'y': estruturaObj.pontos[i].coordenadas.y,
                'z': estruturaObj.pontos[i].coordenadas.z,
            }
            // Spheres
                // Material
                var materialSphere = new THREE.MeshBasicMaterial( { color: 0xC9C097 } );
                // Geometry
                var geometrySphere = new THREE.SphereGeometry(radius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
                // Element
                spheres[i] = new THREE.Mesh(geometrySphere, materialSphere);
                spheres[i].position.set(point.x,point.y,point.z)
                scene.add( spheres[i] );
            
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    
                // text material
                var material = new THREE.LineBasicMaterial({
                    color: 0xC9C097
                });
    
                // text options
                var options = {    
                    font: font,
                    size: fontSize,
                    height: fontHeight,
                    curveSegments: 0,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0
                };
    
                // Point text
                var geometry = new THREE.TextGeometry( i+1 , options )
                var pointText = new THREE.Mesh( geometry, material );
                pointText.position.set(
                    math.sum(point.x,-2*textPositionAdd),
                    math.sum(point.y,-2*textPositionAdd),
                    math.sum(point.z,textPositionAdd)
                );
                scene.add( pointText );
    
            });
        }

        Restrictions()

        function Restrictions() {
            for (let i=0 ; i<nPontos ; i++) {
    
                // se houver qualquer restrição, a esfera será colorida de vermelho
                if (estruturaObj.pontos[i].restricoes.tx === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                } else if (estruturaObj.pontos[i].restricoes.ty === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                } else if (estruturaObj.pontos[i].restricoes.tz === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                } else if (estruturaObj.pontos[i].restricoes.rx === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                } else if (estruturaObj.pontos[i].restricoes.ry === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                } else if (estruturaObj.pontos[i].restricoes.rz === true) {
                    spheres[i].material.color = new THREE.Color('rgb(255,0,0)');
                }
        
            }
        
        }
    }
    function Loads() {
 
        element = element()

        // Parameters
        var fontSize = prm/10
        var fontHeight = prm/200
        var textPositionAdd = prm/20
        var lineLoad = prm/12
        var coneLoadRadius = prm/50
        var coneLoadHeight = prm/30
        var DL = 0.12*element.L // tamanho de cada linha
        var DF = 0.08*element.L // distância da linha das forças até o ponto
        var DM = 0.44*element.L // distância da linha dos momentos até o ponto

        FXA()
        FXB()
        FYA()
        FYB()
        FZA()
        FZB()
        MXA()
        MXB()
        MYA()
        MYB()
        MZA()
        MZB()

        function element() {
            let element = {}

                // Apenas para facilitar o uso dos dados de cada ponto
                element.xA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.x
                element.yA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.y
                element.zA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.z
                element.xB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.x
                element.yB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.y
                element.zB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.z
                element.L = estruturaObj.elementos[elemento].comprimento
                element.load = estruturaObj.elementos[elemento].matrizDeCargas //math.multiply(estruturaObj.elementos[elemento].matrizDeCargas,estruturaObj.elementos[elemento].matrizDeRotacao)

                // É necessário determinar quais pontos tem as coordenadas mínimas
                element.xMin = math.min(element.xA,element.xB)
                element.yMin = math.min(element.yA,element.yB)
                element.zMin = math.min(element.zA,element.zB)

                // É necessário utilizar os cossenos diretores entres pontos A e B de cada elemento
                element.angleX = (element.xB-element.xA)/element.L
                element.angleY = (element.yB-element.yA)/element.L
                element.angleZ = (element.zB-element.zA)/element.L

            return element
        }
        function FXA() {

            line()
            cone()
            // text()

            function line() {

                if(element.load[0] != 0) {
                    var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                    var geometryLine = new THREE.Geometry();
                    geometryLine.vertices.push(new THREE.Vector3(element.xA,element.yA,element.zA));
                    geometryLine.vertices.push(new THREE.Vector3(
                        math.sum(element.xA,0.12*(element.xB-element.xA)),
                        math.sum(element.yA,0.12*(element.yB-element.yA)),
                        math.sum(element.zA,0.12*(element.zB-element.zA))
                    ));
                }

                var lineFXA = new THREE.Line( geometryLine, materialLine );
                if(element.xMin === lineFXA.position.x) {
                    lineFXA.position.x = (math.sum(lineFXA.position.x,0.2*(element.xB-element.xA)))
                } else {
                    lineFXA.position.x = (math.sum(lineFXA.position.x,-0.2*(element.xB-element.xA)))
                }
                if(element.yMin === lineFXA.position.y) {
                    lineFXA.position.y = math.sum(lineFXA.position.y,0.2*(element.yB-element.yA))
                } else {
                    lineFXA.position.y = (math.sum(lineFXA.position.y,-0.2*(element.yB-element.yA)))
                }
                if(element.zMin === lineFXA.position.z) {
                    lineFXA.position.z = (math.sum(lineFXA.position.z,0.2*(element.zB-element.zA)))
                } else {
                    lineFXA.position.z = (math.sum(lineFXA.position.z,-0.2*(element.zB-element.zA)))
                }

                scene.add( lineFXA );

            }
            function cone() {

                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var coneFXA = new THREE.Mesh( geometryCone, materialCone );

                var p1 = [DF,0,0]

                if (element.load[0]>0) {
                    rotPositivo()  
                    posPositivo()              
                } else {
                    rotNegativo()
                    posNegativo()
                }
                
                function rotPositivo() {

                    // Ângulos
                    
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            // nada
                        } else {
                            coneFXA.rotation.z = math.pi
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) {
                            coneFXA.rotation.z = -math.pi/2
                        } else {
                            coneFXA.rotation.z = math.pi/2
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) {
                            coneFXA.rotation.x = math.pi/2
                        } else {
                            coneFXA.rotation.x = -math.pi/2
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))    
                    }
                }
                function posPositivo() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            coneFXA.position.set(element.xA,math.sum(element.yA,-DF,coneLoadHeight/2),element.zA)
                        } else {
                            coneFXA.position.set(element.xA,math.sum(element.yA,DF,-coneLoadHeight/2),element.zA)
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) {
                            coneFXA.position.set(math.sum(element.xA,-DF,coneLoadHeight/2),element.yA,element.zA)
                        } else {
                            coneFXA.position.set(math.sum(element.xA,DF,-coneLoadHeight/2),element.yA,element.zA)
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) {
                            coneFXA.position.set(element.xA,element.yA,math.sum(element.zA,-DF,coneLoadHeight/2))
                        } else {
                            coneFXA.position.set(element.xA,element.yA,math.sum(element.zA,DF,-coneLoadHeight/2))
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos

                    }
                }
                function rotNegativo() {
                    
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            coneFXA.rotation.z = math.pi
                        } else {
                            // nada
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) {
                            coneFXA.rotation.z = math.pi/2
                        } else {
                            coneFXA.rotation.z = -math.pi/2
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) {
                            coneFXA.rotation.x = -math.pi/2
                        } else {
                            coneFXA.rotation.x = math.pi/2
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))    
                    }

                }
                function posNegativo() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            coneFXA.position.set(element.xA,math.sum(element.yA,-DF,-DL,-coneLoadHeight/2),element.zA)
                        } else {
                            coneFXA.position.set(element.xA,math.sum(element.yA,DF,DL,coneLoadHeight/2),element.zA)
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) {
                            coneFXA.position.set(math.sum(element.xA,-DF,-DL,-coneLoadHeight/2),element.yA,element.zA)
                        } else {
                            coneFXA.position.set(math.sum(element.xA,DF,DL,coneLoadHeight/2),element.yA,element.zA)
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) {
                            coneFXA.position.set(element.xA,element.yA,math.sum(element.zA,-DF,-DL,-coneLoadHeight/2))
                        } else {
                            coneFXA.position.set(element.xA,element.yA,math.sum(element.zA,DF,DL,coneLoadHeight/2))
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos

                    }
                }

                scene.add( coneFXA );

            }
            function text() {

                var loader = new THREE.FontLoader();
                loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
                var material = new THREE.LineBasicMaterial({
                    color: '#00cc00'
                });
                var options = {    
                    font: font,
                    size: fontSize,
                    height: 0,
                    curveSegments: 0,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0
                };
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[0],1000),3) +' kN' , options )
                var FXB = new THREE.Mesh( geometry, material );
                if(element.load[0] > 0) {
                    FXB.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FXB.rotation.x += 0;
                    FXB.rotation.y += 0;
                    FXB.rotation.z += 0;
                } else {
                    FXB.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FXB.rotation.x += 0;
                    FXB.rotation.y += 0;
                    FXB.rotation.z += 0;
                }
                scene.add( FXB );
                });

            }
        }
        function FXB() {

            line()
            // cone()
            // text()

            function line() {
                if(element.load[6] != 0) {
                    var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                    var geometryLine = new THREE.Geometry();
                    geometryLine.vertices.push(new THREE.Vector3(element.xB,element.yB,element.zB));
                    geometryLine.vertices.push(new THREE.Vector3(
                        math.sum(element.xB,0.12*(element.xB-element.xA)),
                        math.sum(element.yB,0.12*(element.yB-element.yA)),
                        math.sum(element.zB,0.12*(element.zB-element.zA))
                    ));
                }    
                var lineFXB = new THREE.Line( geometryLine, materialLine );
                if(element.xMin === lineFXB.position.x) {
                    lineFXB.position.x = (math.sum(lineFXB.position.x,-0.08*(element.xB-element.xA)))
                } else {
                    lineFXB.position.x = (math.sum(lineFXB.position.x,0.08*(element.xB-element.xA)))
                }
                if(element.yMin === lineFXB.position.y) {
                    lineFXB.position.y = (math.sum(lineFXB.position.y,-0.08*(element.yB-element.yA)))
                } else {
                    lineFXB.position.y = (math.sum(lineFXB.position.y,0.08*(element.yB-element.yA)))
                }
                if(element.zMin === lineFXB.position.z) {
                    lineFXB.position.z = (math.sum(lineFXB.position.z,-0.08*(element.zB-element.zA)))
                } else {
                    lineFXB.position.z = (math.sum(lineFXB.position.z,0.08*(element.zB-element.zA)))
                }
                scene.add( lineFXB );
            }
            function cone() {
                var coneFX = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[6] > 0) {
                    coneFX.position.set(math.sum(element.xB,-2*radius),element.yB,element.zB)
                    coneFX.rotation.x += 0
                    coneFX.rotation.y += 0
                    coneFX.rotation.z += -Math.PI / 2
                } else {
                    coneFX.position.set(math.sum(element.xB,2*radius),element.yB,element.zB)
                    coneFX.rotation.x += 0
                    coneFX.rotation.y += 0
                    coneFX.rotation.z += Math.PI / 2
                }
                scene.add( coneFX );

            }
            function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FX text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[6],1000),3) +' kN' , options )
            var FX = new THREE.Mesh( geometry, material );
            if(element.load[6] > 0) {
                FX.position.set(math.sum(element.xB,-1.6*lineLoad),math.sum(element.yB,0.2*lineLoad),element.zB);
                FX.rotation.x += 0;
                FX.rotation.y += 0;
                FX.rotation.z += 0;
            } else {
                FX.position.set(math.sum(element.xB,0.3*lineLoad),math.sum(element.yB,0.2*lineLoad),element.zB);
                FX.rotation.x += 0;
                FX.rotation.y += 0;
                FX.rotation.z += 0;
            }
            scene.add( FX );
            });
            }
                   
        }
        function FYA() {

                line()
                // cone()
                // text()

            function line() {
                // Cria-se um objeto
                if(element.load[1] != 0) {
                    var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                    var geometryLine = new THREE.Geometry();
                    geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                    geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                }    

                // Instância do objeto
                var lineFYA = new THREE.Line( geometryLine, materialLine );

                var p1 = [DF,0,0] // apenas para posicionar a linha
                var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
                rot()
                pos()

                function rot() {

                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                    // Rotações
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        // nada
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        lineFYA.rotation.z = math.pi / 2
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        lineFYA.rotation.y = math.pi/2
                        lineFYA.rotation.x = math.pi/2
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        var rot1 = rotY(-theta1)
                        // Isso foi uma correção empírica
                        if (element.xMin === element.xA) {
                            var rot2 = rotZ(math.sum(-theta2,-math.pi/2))
                        } else {
                            var rot2 = rotZ(math.sum(theta2,-math.pi/2))
                        }
                        p1 = math.multiply(rot1,rot2,p1)
                        p2 = math.multiply(rot1,rot2,p2)
                    }
                    
                    return lineFYA
                }
                function pos() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        lineFYA.position.set (math.sum(element.xA,DF),element.yA,element.zA) 
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        lineFYA.position.set (element.xA,math.sum(element.yA,DF),element.zA)
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        lineFYA.position.set (element.xA,math.sum(element.yA,DF),element.zA)
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        lineFYA.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                        lineFYA.position.set(
                            math.sum(element.xA,p1[0]),
                            math.sum(element.yA,p1[1]),
                            math.sum(element.zA,p1[2])
                        )
                    }
                }

                scene.add( lineFYA );
            }

            function cone() {
                var coneFY = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[1] > 0) {
                    coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                    coneFY.rotation.x += 0
                    coneFY.rotation.y += 0
                    coneFY.rotation.z += -Math.PI / 2
                } else {
                    coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                    coneFY.rotation.x += 0
                    coneFY.rotation.y += 0
                    coneFY.rotation.z += Math.PI / 2
                }
                scene.add( coneFY );
            }

            function text() {
                // Text
                var loader = new THREE.FontLoader();
                loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
                // text material
                var material = new THREE.LineBasicMaterial({
                    color: '#00cc00'
                });
                // text options
                var options = {    
                    font: font,
                    size: fontSize,
                    height: 0,
                    curveSegments: 0,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0
                };
                // FY text
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[1],1000),3) +' kN' , options )
                var FY = new THREE.Mesh( geometry, material );
                if(element.load[1] > 0) {
                    FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FY.rotation.x += 0;
                    FY.rotation.y += 0;
                    FY.rotation.z += 0;
                } else {
                    FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FY.rotation.x += 0;
                    FY.rotation.y += 0;
                    FY.rotation.z += 0;
                }
                scene.add( FY );
                });
            }
        
        }
        function FYB() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[7] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineFYB = new THREE.Line( geometryLine, materialLine );

            var p1 = [DF,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    // nada
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineFYB.rotation.z = math.pi / 2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineFYB.rotation.y = math.pi/2
                    lineFYB.rotation.x = math.pi/2
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    var rot1 = rotY(-theta1)
                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(math.sum(-theta2,-math.pi/2))
                    } else {
                        var rot2 = rotZ(math.sum(theta2,-math.pi/2))
                    }
                    p1 = math.multiply(rot1,rot2,p1)
                    p2 = math.multiply(rot1,rot2,p2)
                }
                
                return lineFYB
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineFYB.position.set (math.sum(element.xB,DF),element.yB,element.zB) 
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineFYB.position.set (element.xB,math.sum(element.yB,DF),element.zB)
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineFYB.position.set (element.xB,math.sum(element.yB,DF),element.zB)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineFYB.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineFYB.position.set(
                        math.sum(element.xB,p1[0]),
                        math.sum(element.yB,p1[1]),
                        math.sum(element.zB,p1[2])
                    )
                }
            }

            scene.add( lineFYB );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function FZA() {

            line()
            // cone()
            // text()

            function line() {
                // Cria-se um objeto
                if(element.load[2] != 0) {
                    var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                    var geometryLine = new THREE.Geometry();
                    geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                    geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                }    

                // Instância do objeto
                var lineFZA = new THREE.Line( geometryLine, materialLine );

                var p1 = [DF,0,0] // apenas para posicionar a linha
                var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
                rot()
                pos()

                function rot() {

                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                    // Rotações
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        lineFZA.rotation.y = math.pi/2
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        lineFZA.rotation.z = math.pi / 2
                        lineFZA.rotation.x = -math.pi / 2
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        // nada
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        
                        var rot1 = rotY(-theta1)

                        // Isso foi uma correção empírica
                        if (element.xMin === element.xA) {
                            var rot2 = rotZ(-theta2)
                        } else {
                            var rot2 = rotZ(theta2)
                        }

                        var rot3 = rotY(math.pi/2)

                        p1 = math.multiply(rot1,rot2,rot3,p1)
                        p2 = math.multiply(rot1,rot2,rot3,p2)

                    }
                    
                    return lineFZA
                }
                function pos() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        lineFZA.position.set (element.xA,element.yA,math.sum(element.zA,-DF))
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        lineFZA.position.set (element.xA,element.yA,math.sum(element.zA,-DF))
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        lineFZA.position.set (math.sum(element.xA,DF),element.yA,element.zA)
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        lineFZA.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                        lineFZA.position.set(
                            math.sum(element.xA,p1[0]),
                            math.sum(element.yA,p1[1]),
                            math.sum(element.zA,p1[2])
                        )
                    }
                }
                scene.add( lineFZA );
            }
            function cone() {
                var coneFY = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[7] > 0) {
                    coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                    coneFY.rotation.x += 0
                    coneFY.rotation.y += 0
                    coneFY.rotation.z += -Math.PI / 2
                } else {
                    coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                    coneFY.rotation.x += 0
                    coneFY.rotation.y += 0
                    coneFY.rotation.z += Math.PI / 2
                }
                scene.add( coneFY );
            }
            function text() {
                // Text
                var loader = new THREE.FontLoader();
                loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
                // text material
                var material = new THREE.LineBasicMaterial({
                    color: '#00cc00'
                });
                // text options
                var options = {    
                    font: font,
                    size: fontSize,
                    height: 0,
                    curveSegments: 0,
                    bevelEnabled: false,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0
                };
                // FY text
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
                var FY = new THREE.Mesh( geometry, material );
                if(element.load[1] > 0) {
                    FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FY.rotation.x += 0;
                    FY.rotation.y += 0;
                    FY.rotation.z += 0;
                } else {
                    FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                    FY.rotation.x += 0;
                    FY.rotation.y += 0;
                    FY.rotation.z += 0;
                }
                scene.add( FY );
                });
            }
        }
        function FZB() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[8] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineFZB = new THREE.Line( geometryLine, materialLine );

            var p1 = [DF,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineFZB.rotation.y = math.pi/2
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineFZB.rotation.y = math.pi/2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    // nada
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    
                    var rot1 = rotY(-theta1)

                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(-theta2)
                    } else {
                        var rot2 = rotZ(theta2)
                    }

                    var rot3 = rotY(math.pi/2)

                    p1 = math.multiply(rot1,rot2,rot3,p1)
                    p2 = math.multiply(rot1,rot2,rot3,p2)

                }
                
                return lineFZB
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineFZB.position.set (element.xB,element.yB,math.sum(element.zB,-DF)) 
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineFZB.position.set (element.xB,element.yB,math.sum(element.zB,-DF))
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineFZB.position.set (math.sum(element.xB,DF),element.yB,element.zB)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineFZB.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineFZB.position.set(
                        math.sum(element.xB,p1[0]),
                        math.sum(element.yB,p1[1]),
                        math.sum(element.zB,p1[2])
                    )
                }
            }

            scene.add( lineFZB );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function MXA() {

            line()
            // cone()
            // text()

            function line() {
                // Cria-se um objeto
                if(element.load[3] != 0) {
                    var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                    var geometryLine = new THREE.Geometry();
                    geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                    geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                }    

                // Instância do objeto
                var lineMXA = new THREE.Line( geometryLine, materialLine );

                var p1 = [0.7*DM,0,0] // apenas para posicionar a linha
                var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
                rot()
                pos()

                function rot() {

                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                    // Rotações
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                            lineMXA.rotation.z = math.pi/2
                        } else {
                            lineMXA.rotation.z = -math.pi/2
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                            // nada
                        } else {
                            lineMXA.rotation.z = math.pi
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                            lineMXA.rotation.y = -math.pi/2
                        } else {
                            lineMXA.rotation.y = math.pi/2
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        
                        var rot1 = rotY(-theta1)

                        // Isso foi uma correção empírica
                        if (element.xMin === element.xA) {
                            var rot2 = rotZ(math.sum(-theta2,math.pi))
                        } else {
                            var rot2 = rotZ(theta2)
                        }

                        p1 = math.multiply(rot1,rot2,p1)
                        p2 = math.multiply(rot1,rot2,p2)

                    }
                
                    return lineMXA
                }
                function pos() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            lineMXA.position.set (element.xA,math.sum(element.yA,-DM),element.zA) 
                        } else {
                            lineMXA.position.set (element.xA,math.sum(element.yA,DM),element.zA) 
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if (element.xMin === element.xA) {
                            lineMXA.position.set (math.sum(element.xA,-DM),element.yA,element.zA)
                        } else {
                            lineMXA.position.set (math.sum(element.xA,DM),element.yA,element.zA)
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if (element.zMin === element.zA) {
                            lineMXA.position.set (element.xA,element.yA,math.sum(element.zA,-DM))
                        } else {
                            lineMXA.position.set (element.xA,element.yA,math.sum(element.zA,DM))
                        }
                    } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                        lineMXA.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                        lineMXA.position.set(
                            math.sum(element.xA,p1[0]),
                            math.sum(element.yA,p1[1]),
                            math.sum(element.zA,p1[2])
                        )
                    }
                }

                scene.add( lineMXA );
            }

            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var coneMXA1 = new THREE.Mesh( geometryCone, materialCone );
                var coneMXA2 = new THREE.Mesh( geometryCone, materialCone );

                var p1 = [DF,0,0]
                rot()
                pos()
                
                function rot() {

                    // Ângulos
                    // var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    // var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                    // var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                    
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            // nada
                        } else {
                            coneMXA1.rotation.y = math.pi
                            coneMXA2.rotation.y = math.pi
                        }
                    }
                
                }
                function pos() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if (element.yMin === element.yA) {
                            coneMXA1.position.set(element.xA,math.sum(element.yA,-element.L*0.25),element.zA)
                            coneMXA2.position.set(element.xA,math.sum(element.yA,-element.L*0.25,-coneLoadHeight),element.zA)
                        } else {

                        }
                    } else {

                    }
                }

                scene.add( coneMXA1 );
                scene.add( coneMXA2 );
            }

            function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
            }
    
        }
        function MXB() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[9] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineMXB = new THREE.Line( geometryLine, materialLine );

            var p1 = [0.3*element.L,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if (element.yMin === element.yA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                        lineMXB.rotation.z = -math.pi/2
                    } else {
                        lineMXB.rotation.z = math.pi/2
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if (element.xMin === element.xA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                        lineMXB.rotation.z = math.pi
                    } else {
                        // nada
                    }
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if (element.zMin === element.zA) { // isso se dá por conta da ordem que dos pontos no elemento (pontoA e pontoB trocados)
                        lineMXB.rotation.y = math.pi/2
                    } else {
                        lineMXB.rotation.y = -math.pi/2
                    }
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    
                    var rot1 = rotY(-theta1)

                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(-theta2)
                    } else {
                        var rot2 = rotZ(math.sum(theta2,math.pi))
                    }

                    p1 = math.multiply(rot1,rot2,p1)
                    p2 = math.multiply(rot1,rot2,p2)

                }
                
                return lineMXB

            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if (element.yMin === element.yA) {
                        lineMXB.position.set (element.xB,math.sum(element.yB,DM),element.zB) 
                    } else {
                        lineMXB.position.set (element.xB,math.sum(element.yB,-DM),element.zB) 
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if (element.xMin === element.xA) {
                        lineMXB.position.set (math.sum(element.xB,DM),element.yB,element.zB)
                    } else {
                        lineMXB.position.set (math.sum(element.xB,-DM),element.yB,element.zB)
                    }
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if (element.zMin === element.zA) {
                        lineMXB.position.set (element.xB,element.yB,math.sum(element.zB,DM))
                    } else {
                        lineMXB.position.set (element.xB,element.yB,math.sum(element.zB,-DM))
                    }
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineMXB.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineMXB.position.set(
                        math.sum(element.xB,p1[0]),
                        math.sum(element.yB,p1[1]),
                        math.sum(element.zB,p1[2])
                    )
                }
            }

            scene.add( lineMXB );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function MYA() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[4] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineMYA = new THREE.Line( geometryLine, materialLine );

            var p1 = [0.3*element.L,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMYA.rotation.z = math.pi
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMYA.rotation.z = -math.pi/2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMYA.rotation.z = -math.pi/2
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    var rot1 = rotY(-theta1)
                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(math.sum(-theta2,-math.pi/2))
                    } else {
                        var rot2 = rotZ(math.sum(theta2,-math.pi/2))
                    }
                    p1 = math.multiply(rot1,rot2,p1)
                    p2 = math.multiply(rot1,rot2,p2)
                }
                
                return lineMYA
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMYA.position.set (math.sum(element.xA,DM),element.yA,element.zA) 
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMYA.position.set (element.xA,math.sum(element.yA,DM),element.zA)
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMYA.position.set (element.xA,math.sum(element.yA,DM),element.zA)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineMYA.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineMYA.position.set(
                        math.sum(element.xA,p1[0]),
                        math.sum(element.yA,p1[1]),
                        math.sum(element.zA,p1[2])
                    )
                }
            }

            scene.add( lineMYA );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[1] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[1],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function MYB() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[10] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineMYB = new THREE.Line( geometryLine, materialLine );

            var p1 = [0.3*element.L,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMYB.rotation.y = math.pi
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMYB.rotation.z = -math.pi / 2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMYB.rotation.z = -math.pi/2
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    var rot1 = rotY(-theta1)
                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(math.sum(-theta2,-math.pi/2))
                    } else {
                        var rot2 = rotZ(math.sum(theta2,-math.pi/2))
                    }
                    p1 = math.multiply(rot1,rot2,p1)
                    p2 = math.multiply(rot1,rot2,p2)
                }
                
                return lineMYB
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMYB.position.set (math.sum(element.xB,DM),element.yB,element.zB) 
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMYB.position.set (element.xB,math.sum(element.yB,DM),element.zB)
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMYB.position.set (element.xB,math.sum(element.yB,DM),element.zB)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineMYB.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineMYB.position.set(
                        math.sum(element.xB,p1[0]),
                        math.sum(element.yB,p1[1]),
                        math.sum(element.zB,p1[2])
                    )
                }
            }

            scene.add( lineMYB );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function MZA() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[5] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineMZA = new THREE.Line( geometryLine, materialLine );

            var p1 = [0.3*element.L,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMZA.rotation.y = -math.pi/2
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMZA.rotation.y = -math.pi/2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMZA.rotation.z = math.pi
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    
                    var rot1 = rotY(-theta1)

                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(-theta2)
                    } else {
                        var rot2 = rotZ(theta2)
                    }

                    var rot3 = rotY(math.pi/2)

                    p1 = math.multiply(rot1,rot2,rot3,p1)
                    p2 = math.multiply(rot1,rot2,rot3,p2)

                }
                
                return lineMZA
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMZA.position.set (element.xA,element.yA,math.sum(element.zA,-DM))
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMZA.position.set (element.xA,element.yA,math.sum(element.zA,-DM))
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMZA.position.set (math.sum(element.xA,DM),element.yA,element.zA)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineMZA.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineMZA.position.set(
                        math.sum(element.xA,p1[0]),
                        math.sum(element.yA,p1[1]),
                        math.sum(element.zA,p1[2])
                    )
                }
            }

            scene.add( lineMZA );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function MZB() {

            line()
            // cone()
            // text()

        function line() {
            // Cria-se um objeto
            if(element.load[11] != 0) {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
            }    

            // Instância do objeto
            var lineMZB = new THREE.Line( geometryLine, materialLine );

            var p1 = [0.3*element.L,0,0] // apenas para posicionar a linha
            var p2 = [DL,0,0] // segundo ponto da linha, onde o primeiro é (0,0,0)
            rot()
            pos()

            function rot() {

                // Ângulos
                var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.yB-element.yA,2)))
                var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))

                // Rotações
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMZB.rotation.y = -math.pi/2
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMZB.rotation.y = -math.pi/2
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMZB.rotation.z = math.pi
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    
                    var rot1 = rotY(-theta1)

                    // Isso foi uma correção empírica
                    if (element.xMin === element.xA) {
                        var rot2 = rotZ(-theta2)
                    } else {
                        var rot2 = rotZ(theta2)
                    }

                    var rot3 = rotY(math.pi/2)

                    p1 = math.multiply(rot1,rot2,rot3,p1)
                    p2 = math.multiply(rot1,rot2,rot3,p2)

                }
                
                return lineMZB
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    lineMZB.position.set (element.xB,element.yB,math.sum(element.zB,-DM)) 
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    lineMZB.position.set (element.xB,element.yB,math.sum(element.zB,-DM))
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    lineMZB.position.set (math.sum(element.xB,DM),element.yB,element.zB)
                } else { // Para todos os casos em que x, y e z dos pontos A e B têm valores distintos
                    lineMZB.geometry.vertices[1] = new THREE.Vector3(p2[0],p2[1],p2[2])
                    lineMZB.position.set(
                        math.sum(element.xB,p1[0]),
                        math.sum(element.yB,p1[1]),
                        math.sum(element.zB,p1[2])
                    )
                }
            }

            scene.add( lineMZB );
        }

        function cone() {
            var coneFY = new THREE.Mesh( geometryCone, materialCone );
            if(element.load[7] > 0) {
                coneFY.position.set(math.sum(element.xA,-2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += -Math.PI / 2
            } else {
                coneFY.position.set(math.sum(element.xA,2*radius),element.yA,element.zA)
                coneFY.rotation.x += 0
                coneFY.rotation.y += 0
                coneFY.rotation.z += Math.PI / 2
            }
            scene.add( coneFY );
        }

        function text() {
            // Text
            var loader = new THREE.FontLoader();
            loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
            // text material
            var material = new THREE.LineBasicMaterial({
                color: '#00cc00'
            });
            // text options
            var options = {    
                font: font,
                size: fontSize,
                height: 0,
                curveSegments: 0,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelSegments: 0
            };
            // FY text
            var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
            var FY = new THREE.Mesh( geometry, material );
            if(element.load[1] > 0) {
                FY.position.set(math.sum(element.xA,-1.6*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            } else {
                FY.position.set(math.sum(element.xA,0.3*lineLoad),math.sum(element.yA,0.2*lineLoad),element.zA);
                FY.rotation.x += 0;
                FY.rotation.y += 0;
                FY.rotation.z += 0;
            }
            scene.add( FY );
            });
        }
    
        }
        function rotX(theta) {
            var rotX = [
                [1,0,0],
                [0,math.cos(theta),math.sin(theta)],
                [0,-math.sin(theta),math.cos(theta)]
            ]
            return rotX
        }
        function rotY(theta) {
            var rotY = [
                [math.cos(theta),0,math.sin(theta)],
                [0,1,0],
                [-math.sin(theta),0,math.cos(theta)]
            ]
            return rotY
        }
        function rotZ(theta) {
            var rotZ = [
                [math.cos(theta),math.sin(theta),0],
                [-math.sin(theta),math.cos(theta),0],
                [0,0,1]
            ]
            return rotZ
        }
    }
    function Diagrams(fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama) {
        
        // Parameters
        pointRadius = prm/25
        var opacidade = 0.6

        element = element()
        var TLG = 0.35*element.L // Tamanho da linha do diagrama
        call() // chamar funções

        function call() {
            if (fxDiagrama == true) {
                FX()
            }
            if (fyDiagrama == true) {
                FY()
            }
            if (fzDiagrama == true) {
                FZ()
            }
            if (mxDiagrama == true) {
                MX()
            }
            if (myDiagrama == true) {      
                MY()
            }
            if (mzDiagrama == true) {
                MZ()
            }
        }
        function element() {
            let element = {}

                // Apenas para facilitar o uso dos dados de cada ponto
                element.xA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.x
                element.yA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.y
                element.zA = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoA-1].coordenadas.z
                element.xB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.x
                element.yB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.y
                element.zB = estruturaObj.pontos[estruturaObj.elementos[elemento].conectividades.pontoB-1].coordenadas.z
                element.L = estruturaObj.elementos[elemento].comprimento
                element.load = estruturaObj.elementos[elemento].matrizDeCargas //math.multiply(estruturaObj.elementos[elemento].matrizDeCargas,estruturaObj.elementos[elemento].matrizDeRotacao)

                // É necessário determinar quais pontos tem as coordenadas mínimas
                element.xMin = math.min(element.xA,element.xB)
                element.yMin = math.min(element.yA,element.yB)
                element.zMin = math.min(element.zA,element.zB)

            return element
        }
        function FX() {

            diagramaFX = object()
            rot()
            pos()
            scene.add(diagramaFX)

            function object() {
                if(element.load[0] != 0) {
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#ff0000', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,TLG,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),TLG,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaFX = new THREE.Mesh(geometry, material);
                }
                return diagramaFX
            }
            function rot() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if(element.yMin == element.yA) {
                        diagramaFX.rotation.z = math.pi/2
                        diagramaFX.rotation.y = -math.pi/2
                    } else {
                        diagramaFX.rotation.y = -math.pi/2
                        diagramaFX.rotation.z = -math.pi/2
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if(element.xMin == element.xA) {
                        diagramaFX.rotation.x = -math.pi/2
                    } else {
                        diagramaFX.rotation.y = math.pi
                        diagramaFX.rotation.x = math.pi/2
                    }
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if(element.zMin == element.zA) {
                        diagramaFX.rotation.x = -math.pi/2
                        diagramaFX.rotation.z = -math.pi/2
                    } else {
                        diagramaFX.rotation.x = -math.pi/2
                        diagramaFX.rotation.z = math.pi/2
                    }
                } else {
                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                    // Rotações
                    if(element.xMin == element.xA) {
                        diagramaFX.rotateY(-theta1)
                        diagramaFX.rotateZ(theta2)
                        diagramaFX.rotateX(-math.pi/2)
                    } else {
                        diagramaFX.rotateY(math.sum(-theta1,math.pi))
                        diagramaFX.rotateZ(theta2)
                        diagramaFX.rotateX(-math.pi/2)
                    }
                }
            }
            function pos() {
                diagramaFX.position.set(element.xA,element.yA,element.zA)
            }

        }
        function FY() {

            diagramaFY = object()
            rot()
            pos()
            scene.add(diagramaFY)

            function object() {
                if(element.load[0] != 0) {
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#00ff00', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,TLG,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),TLG,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaFY = new THREE.Mesh(geometry, material);
                }
                return diagramaFY
            }
            function rot() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    diagramaFY.rotation.z = math.pi/2
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    // nada
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    diagramaFY.rotation.y = -math.pi/2
                } else {
                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                    // Rotações
                    if(element.xMin == element.xA) {
                        diagramaFY.rotateY(-theta1)
                        diagramaFY.rotateZ(theta2)
                    } else {
                        diagramaFY.rotateY(math.sum(-theta1,math.pi))
                        diagramaFY.rotateZ(theta2)
                    }
                }
            }
            function pos() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if (element.yMin === element.yA) {
                        diagramaFY.position.set(element.xA,element.yA,element.zA)
                    } else {
                        diagramaFY.position.set(element.xB,element.yB,element.zB)
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if (element.xMin === element.xA) {
                        diagramaFY.position.set(element.xA,element.yA,element.zA)
                    } else {
                        diagramaFY.position.set(element.xB,element.yB,element.zB)
                    }
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if (element.zMin === element.zA) {
                        diagramaFY.position.set(element.xA,element.yA,element.zA)
                    } else {
                        diagramaFY.position.set(element.xB,element.yB,element.zB)
                    }
                } else {
                    diagramaFY.position.set(element.xA,element.yA,element.zA)
                }
            }

        }
        function FZ() {

            diagramaFZ = object()
            rot()
            pos()
            scene.add(diagramaFZ)

            function object() {
                if(element.load[0] != 0) {
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#0000ff', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,TLG,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),TLG,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaFZ = new THREE.Mesh(geometry, material);
                }
                return diagramaFZ
            }
            function rot() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if(element.yMin == element.yA){
                        diagramaFZ.rotation.z = math.pi/2
                        diagramaFZ.rotation.y = math.pi/2    
                    } else {
                        diagramaFZ.rotation.z = -math.pi/2
                        diagramaFZ.rotation.y = math.pi/2
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if(element.xMin == element.xA) {
                        diagramaFZ.rotation.x = math.pi/2
                    } else {
                        diagramaFZ.rotation.y = math.pi
                        diagramaFZ.rotation.x = -math.pi/2
                    }
                } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if(element.zMin == element.zA) {
                        diagramaFZ.rotation.z = -math.pi/2
                        diagramaFZ.rotation.x = -math.pi/2
                        diagramaFZ.rotation.y = math.pi
                    } else {
                        diagramaFZ.rotation.x = math.pi/2
                        diagramaFZ.rotation.z = -math.pi/2
                    }
                } else {
                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                    // Rotações
                    if(element.xMin == element.xA) {
                        diagramaFZ.rotateY(-theta1)
                        diagramaFZ.rotateZ(theta2)
                        diagramaFZ.rotateX(math.pi/2)
                    } else {
                        diagramaFZ.rotateY(math.sum(-theta1,math.pi))
                        diagramaFZ.rotateZ(theta2)
                        diagramaFZ.rotateX(math.pi/2)
                    }
                }
            }
            function pos() {
                diagramaFZ.position.set(element.xA,element.yA,element.zA)
            }

        }
        function MX() {

            diagramaMX = object()
            rot()
            pos()
            scene.add(diagramaMX)

            function object() {
                if(element.load[0] != 0) {
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#ffff00', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,TLG,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),TLG,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaMX = new THREE.Mesh(geometry, material);
                }
                return diagramaMX
            }
            function rot() {
                if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    if (element.yMin === element.yA) {
                        diagramaMX.rotateZ(math.pi/2)
                        diagramaMX.rotateX(math.pi)
                    } else {
                        diagramaMX.rotateZ(-math.pi/2)
                    }
                } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    if (element.xMin === element.xA) {
                        diagramaMX.rotateX(math.pi)
                    } else {
                        diagramaMX.rotateY(math.pi)
                        diagramaMX.rotateX(math.pi)
                    }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    if (element.zMin === element.zA) {
                        diagramaMX.rotateX(math.pi)
                        diagramaMX.rotateY(math.pi/2)
                    } else {
                        diagramaMX.rotateX(math.pi)
                        diagramaMX.rotateY(-math.pi/2)
                    }
                } else {
                    // Ângulos
                    var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                    var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                    var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                    // Rotações
                    if(element.xMin == element.xA) {
                        diagramaMX.rotateY(-theta1)
                        diagramaMX.rotateZ(theta2)
                        diagramaMX.rotateX(math.pi)
                    } else {
                        diagramaMX.rotateY(math.sum(-theta1,math.pi))
                        diagramaMX.rotateZ(theta2)
                        diagramaMX.rotateX(math.pi)
                    }
                }
            }
            function pos() {
                diagramaMX.position.set(element.xA,element.yA,element.zA)
            }

        }
        function MY() {

            if(element.load[4]*element.load[10]>0) {
                areaTri()
            } else {
                areaTrap()
            }

            function areaTrap() {

                diagramaMY = object()
                rot()
                pos()
                scene.add(diagramaMY)

                function object() {
                    Ref = math.divide(1,math.max(math.abs(element.load[4]),math.abs(element.load[10])))
                    var hA = math.multiply(math.abs(element.load[4]),Ref,TLG)
                    var hB = math.multiply(math.abs(element.load[10]),Ref,TLG)
                    if(element.load[4]<0) {
                        hA = -hA
                        hB = -hB
                    }    
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#ffffff', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,hA,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),hB,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaMY = new THREE.Mesh(geometry, material);
                    scene.add(diagramaMY)  
                    return diagramaMY  
                }
                function rot() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if(element.yMin == element.yA) {
                            diagramaMY.rotation.y = -math.pi/2
                            diagramaMY.rotation.x = -math.pi/2
                        } else {
                            diagramaMY.rotation.x = math.pi/2
                            diagramaMY.rotation.y = -math.pi/2
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if(element.xMin == element.xA) {
                            diagramaMY.rotation.x = -math.pi/2
                        } else {
                            diagramaMY.rotation.x = math.pi/2
                            diagramaMY.rotation.y = math.pi
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if(element.zMin == element.zA) {
                            diagramaMY.rotation.z = -math.pi/2
                            diagramaMY.rotation.x = -math.pi/2
                        } else {
                            diagramaMY.rotation.x = -math.pi/2
                            diagramaMY.rotation.z = math.pi/2
                        }
                    } else {
                        // Ângulos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                        // Rotações
                        if(element.xMin == element.xA) {
                            diagramaMY.rotateY(-theta1)
                            diagramaMY.rotateZ(theta2)
                            diagramaMY.rotateX(-math.pi/2)
                        } else {
                            diagramaMY.rotateY(math.sum(-theta1,math.pi))
                            diagramaMY.rotateZ(theta2)
                            diagramaMY.rotateX(-math.pi/2)
                        }
                    }
                }
                function pos() {
                    diagramaMY.position.set(element.xA,element.yA,element.zA)
                }
                
            }
            function areaTri() {

                distance = math.divide(element.load[4],element.load[2])
                diagramaMY = object()
                rot()
                pos()
                scene.add(diagramaMY)

                function object() {
                    Ref = math.divide(1,math.max(math.abs(element.load[4]),math.abs(element.load[10])))
                    var hA = -math.multiply(math.abs(element.load[4]),Ref,TLG)
                    var hB = math.multiply(math.abs(element.load[10]),Ref,TLG)
                    if(element.load[4]<0) {
                        hA = -hA
                        hB = -hB
                    }    
                    var dA = math.divide(math.abs(element.load[4]),math.abs(element.load[2]))
                    if(element.load[0] != 0) {
                        var material = new THREE.MeshBasicMaterial( { 
                            color: '#ffffff', 
                            transparent: true,
                            opacity: opacidade,
                            side: THREE.DoubleSide 
                        } );
                        var geometry = new THREE.Geometry()
                        var v1 = new THREE.Vector3(pointRadius,0,0)
                        var v2 = new THREE.Vector3(pointRadius,hA,0)
                        var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),hB,0)
                        var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                        var v5 = new THREE.Vector3(dA,0,0)
                        geometry.vertices.push(v1)
                        geometry.vertices.push(v2)
                        geometry.vertices.push(v3)
                        geometry.vertices.push(v4)
                        geometry.vertices.push(v5)
                        geometry.faces.push(new THREE.Face3(0,1,4))
                        geometry.faces.push(new THREE.Face3(2,3,4))
                        var diagramaMY = new THREE.Mesh(geometry, material);
                    }
                    return diagramaMY
                }
                function rot() {
                    if (element.zB == element.zA && element.xB == element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if(element.yMin == element.yA) {
                            diagramaMY.rotation.z = math.pi/2
                            diagramaMY.rotation.y = math.pi/2    
                        } else {
                            diagramaMY.rotation.z = -math.pi/2
                            diagramaMY.rotation.y = math.pi/2
                        }
                    } else if (element.zB == element.zA && element.yB == element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if(element.xMin == element.xA) {
                            diagramaMY.rotation.x = math.pi/2
                        } else {
                            diagramaMY.rotation.x = math.pi/2
                            diagramaMY.rotation.z = math.pi
                        }
                    } else if (element.xB == element.xA && element.yB == element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if(element.zMin == element.zA) {
                            diagramaMY.rotation.z = math.pi/2
                            diagramaMY.rotation.x = math.pi/2
                        } else {
                            diagramaMY.rotation.x = math.pi/2
                            diagramaMY.rotation.z = -math.pi/2
                        }
                    } else {
                        // Ângulos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                        // Rotações

                        // var p = []
                        // var rot1 = rotY(-theta1)
                        // var rot2 = rotZ(theta2)
                        // diagramaMY = math.multiply()

                        if(element.xMin == element.xA) {
                            diagramaMY.rotateY(-theta1)
                            diagramaMY.rotateZ(theta2)
                            diagramaMY.rotateX(math.pi/2)
                        } else {
                            diagramaMY.rotateY(math.sum(-theta1,math.pi))
                            diagramaMY.rotateZ(theta2)
                            diagramaMY.rotateX(math.sum(math.pi/2))
                        }
                    }
                }
                function pos() {
                    diagramaMY.position.set(element.xA,element.yA,element.zA)

                    // if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    //     if (element.yMin === element.yA) {
                    //         diagramaMY.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMY.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    //     if (element.xMin === element.xA) {
                    //         diagramaMY.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMY.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    //     if (element.zMin === element.zA) {
                    //         diagramaMY.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMY.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else {

                    // }
                }
                
            }

        }
        function MZ() {

            if(element.load[5]*element.load[11]>0) {
                areaTri()
            } else {
                areaTrap()
            }

            function areaTrap() {

                diagramaMZ = object()
                rot()
                pos()
                scene.add(diagramaMZ)

                function object() {
                    Ref = math.divide(1,math.max(math.abs(element.load[5]),math.abs(element.load[11])))
                    var hA = math.multiply(math.abs(element.load[5]),Ref,TLG)
                    var hB = math.multiply(math.abs(element.load[11]),Ref,TLG)
                    if(element.load[5]<0) {
                        hA = -hA
                        hB = -hB
                    }    
                    var material = new THREE.MeshBasicMaterial( { 
                        color: '#000000', 
                        transparent: true,
                        opacity: opacidade,
                        side: THREE.DoubleSide 
                    } );
                    var geometry = new THREE.Geometry()
                    var v1 = new THREE.Vector3(pointRadius,0,0)
                    var v2 = new THREE.Vector3(pointRadius,hA,0)
                    var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),hB,0)
                    var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                    geometry.vertices.push(v1)
                    geometry.vertices.push(v2)
                    geometry.vertices.push(v3)
                    geometry.vertices.push(v4)
                    geometry.faces.push(new THREE.Face3(0,1,2))
                    geometry.faces.push(new THREE.Face3(0,2,3))
                    var diagramaMZ = new THREE.Mesh(geometry, material);
                    scene.add(diagramaMZ)  
                    return diagramaMZ  
                }
                function rot() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                            if(element.yMin == element.yA) {
                                diagramaMZ.rotation.z = math.pi/2
                            } else {
                                diagramaMZ.rotation.z = -math.pi/2
                                // diagramaMZ.rotation.y = math.pi
                            }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                            if(element.xMin == element.xA) {
                                // nada
                            } else {
                                diagramaMZ.rotation.y = math.pi
                            }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                            if(element.zMin == element.zA) {
                                diagramaMZ.rotation.y = -math.pi/2
                            } else {
                                diagramaMZ.rotation.y = math.pi/2
                            }
                    } else {
                        // Ângulos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                        // Rotações
                        if(element.xMin == element.xA) {
                            diagramaMZ.rotateY(-theta1)
                            diagramaMZ.rotateZ(theta2)
                        } else {
                            diagramaMZ.rotateY(math.sum(-theta1,math.pi))
                            diagramaMZ.rotateZ(theta2)
                        }
                    }
                }
                function pos() {
                    diagramaMZ.position.set(element.xA,element.yA,element.zA)
                }
                
            }
            function areaTri() {

                distance = math.divide(element.load[5],element.load[2])
                diagramaMZ = object()
                rot()
                pos()
                scene.add(diagramaMZ)

                function object() {
                    Ref = math.divide(1,math.max(math.abs(element.load[5]),math.abs(element.load[11])))
                    var hA = -math.multiply(math.abs(element.load[5]),Ref,TLG)
                    var hB = math.multiply(math.abs(element.load[11]),Ref,TLG)
                    if(element.load[5]<0) {
                        hA = -hA
                        hB = -hB
                    }    
                    var dA = math.divide(math.abs(element.load[5]),math.abs(element.load[1]))
                    if(element.load[0] != 0) {
                        var material = new THREE.MeshBasicMaterial( { 
                            color: '#000000', 
                            transparent: true,
                            opacity: opacidade,
                            side: THREE.DoubleSide 
                        } );
                        var geometry = new THREE.Geometry()
                        var v1 = new THREE.Vector3(pointRadius,0,0)
                        var v2 = new THREE.Vector3(pointRadius,hA,0)
                        var v3 = new THREE.Vector3(math.sum(element.L,-pointRadius),hB,0)
                        var v4 = new THREE.Vector3(math.sum(element.L,-pointRadius),0,0)
                        var v5 = new THREE.Vector3(dA,0,0)
                        geometry.vertices.push(v1)
                        geometry.vertices.push(v2)
                        geometry.vertices.push(v3)
                        geometry.vertices.push(v4)
                        geometry.vertices.push(v5)
                        geometry.faces.push(new THREE.Face3(0,1,4))
                        geometry.faces.push(new THREE.Face3(2,3,4))
                        var diagramaMZ = new THREE.Mesh(geometry, material);
                    }
                    return diagramaMZ
                }
                function rot() {
                    if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                        if(element.yMin == element.yA) {
                            diagramaMZ.rotation.z = math.pi/2
                            diagramaMZ.rotation.y = math.pi 
                        } else {
                            diagramaMZ.rotation.z = -math.pi/2
                        }
                    } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                        if(element.xMin == element.xA) {
                            diagramaMZ.rotation.x = math.pi
                        } else {
                            diagramaMZ.rotation.y = math.pi
                            diagramaMZ.rotation.x = math.pi
                        }
                    } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                        if(element.zMin == element.zA) {
                            diagramaMZ.rotation.x = math.pi
                            diagramaMZ.rotation.y = math.pi/2
                        } else {
                            diagramaMZ.rotation.x = math.pi
                            diagramaMZ.rotation.y = -math.pi/2
                        }
                    } else {
                        // Ângulos
                        var theta1 = math.atan(math.divide(math.sum(element.zB,-element.zA),math.sum(element.xB,-element.xA)))
                        var LZY = math.sqrt(math.sum(math.pow(element.zB-element.zA,2),math.pow(element.xB-element.xA,2)))
                        var theta2 = math.atan(math.divide(element.yB-element.yA,LZY))
                        // Rotações
                        if(element.xMin == element.xA) {
                            diagramaMZ.rotateY(-theta1)
                            diagramaMZ.rotateZ(theta2)
                            diagramaMZ.rotateX(math.pi)
                        } else {
                            diagramaMZ.rotateY(math.sum(-theta1,math.pi))
                            diagramaMZ.rotateZ(theta2)
                            diagramaMZ.rotateX(math.pi)
                        }
                    }
                }
                function pos() {
                    diagramaMZ.position.set(element.xA,element.yA,element.zA)

                    // if (element.zB === element.zA && element.xB === element.xA) { // Caso o elemento esteja na mesma direção do eixo Y
                    //     if (element.yMin === element.yA) {
                    //         diagramaMZ.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMZ.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else if (element.zB === element.zA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo X
                    //     if (element.xMin === element.xA) {
                    //         diagramaMZ.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMZ.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else if (element.xB === element.xA && element.yB === element.yA) { // Caso o elemento esteja na mesma direção do eixo Z
                    //     if (element.zMin === element.zA) {
                    //         diagramaMZ.position.set(element.xA,element.yA,element.zA)
                    //     } else {
                    //         diagramaMZ.position.set(element.xB,element.yB,element.zB)
                    //     }
                    // } else {

                    // }
                }
                
            }

        }

    }
}
function animateDiagramaGlobal() {
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animateDiagramaGlobal);   
}
