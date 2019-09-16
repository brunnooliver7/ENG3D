var renderer, scene, camera, controls;

function initDiagramaLocal(width,height) {
    // Render
    renderer = new THREE.WebGLRenderer({antialias: true}); // cria a renderização
    renderer.setSize( width, height ); // tamanho da tela do desenho
    renderer.setClearColor(0x1F5A94); // cor do fundo do canvas
    renderer.domElement.id = 'desenhoDiagramaLocal' // id do desenho
    container = document.getElementById( 'canvasDiagramaLocal' ); // identifica a div com id='canvas' no html
    document.body.appendChild( container ); 
    container.appendChild( renderer.domElement );
    
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera( 25, width/height, 0.1, 1000 );
    camera.position.set( -2, 2, 3 );
    camera.lookAt( 2,0,0 );

    // Controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.update();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target = new THREE.Vector3(0,0,0);
}    
function structureDiagramaLocal(elemento,fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama) {

    elemento = elemento-1

    // Imports
    const Store = require('electron-store');
    const store = new Store()
    const math = require('mathjs');

    let estruturaObj = store.get('estrutura')
    let nPontos = estruturaObj.pontos.length
    let nElementos = estruturaObj.elementos.length

    element = element()

    Axes()
    Line()
    Points()
    Loads()
    Diagrams(fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama)

    function element() {
        let element = {}

            // Apenas para facilitar o uso dos dados de cada ponto
            element.nA = estruturaObj.elementos[elemento].conectividades.pontoA-1
            element.nB = estruturaObj.elementos[elemento].conectividades.pontoB-1
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
    function Axes() {

        // Parameters
        var coneRadius = 1/50
        var coneHeight = 1/15
        var lineLength = 1/3
        var fontSize = 1/10
        var fontHeight = 1/200

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
    function Line() {
        var materialLines = new THREE.LineBasicMaterial( { color: 0xC9C097 } );
        var geometryLines = new THREE.Geometry();
        geometryLines.vertices.push(new THREE.Vector3( 0,0,0) );
        geometryLines.vertices.push(new THREE.Vector3( 1,0,0) );
        var lines = []
        lines[elemento] = new THREE.Line( geometryLines, materialLines );
        scene.add( lines[elemento] );
    }
    function Points() {

        // Parameters
        var pointRadius = 1/25
        var fontSize = 1/15
        var fontHeight = 1/200
        var textPositionAdd = 1/40

        sphereA()
        sphereB()
        text()

        function sphereA() {
            var materialSphere = new THREE.MeshBasicMaterial( { color: 0xC9C097 } );
            var geometrySphere = new THREE.SphereGeometry(pointRadius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
            sphereA = new THREE.Mesh(geometrySphere, materialSphere);
            sphereA.position.set(0,0,0)
            // Restrictions
            if (
                (estruturaObj.pontos[element.nA].restricoes.tx === true)
             || (estruturaObj.pontos[element.nA].restricoes.ty === true)
             || (estruturaObj.pontos[element.nA].restricoes.tz === true)
             || (estruturaObj.pontos[element.nA].restricoes.rx === true)
             || (estruturaObj.pontos[element.nA].restricoes.ry === true)
             || (estruturaObj.pontos[element.nA].restricoes.rz === true)
         ){
             sphereA.material.color = new THREE.Color('rgb(255,0,0)');
         } else {
             // sphereA.material.color = new THREE.Color('0xC9C097');
         }
         scene.add( sphereA );
        }
        function sphereB() {
            var materialSphere = new THREE.MeshBasicMaterial( { color: 0xC9C097 } );
            var geometrySphere = new THREE.SphereGeometry(pointRadius, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
            sphereB = new THREE.Mesh(geometrySphere, materialSphere);
            sphereB.position.set(1,0,0)
            if (
                   (estruturaObj.pontos[element.nB].restricoes.tx === true)
                || (estruturaObj.pontos[element.nB].restricoes.ty === true)
                || (estruturaObj.pontos[element.nB].restricoes.tz === true)
                || (estruturaObj.pontos[element.nB].restricoes.rx === true)
                || (estruturaObj.pontos[element.nB].restricoes.ry === true)
                || (estruturaObj.pontos[element.nB].restricoes.rz === true)
            ){
                sphereB.material.color = new THREE.Color('rgb(255,0,0)');
            } else {
                // sphereB.material.color = new THREE.Color('0xC9C097');
            }
            scene.add( sphereA, sphereB );

        }
        function text() {
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
    
                // Point A text
                var geometryA = new THREE.TextGeometry( element.nA+1 , options )
                var pointAText = new THREE.Mesh( geometryA, material );
                pointAText.position.set(
                    math.sum(-0.12),
                    math.sum(-0.1),
                    math.sum(0.05)
                );
                scene.add( pointAText );
                // Point B text
                var geometryB = new THREE.TextGeometry( element.nB+1 , options )
                var pointBText = new THREE.Mesh( geometryB, material );
                pointBText.position.set(
                    math.sum(0.03,1),
                    math.sum(-0.1),
                    math.sum(0.05)
                );
                scene.add( pointBText );
            });
        }

    }
    function Loads() {
 
        // Parameters
        var fontSize = 1/40
        var fontHeight = 1/200
        var textPositionAdd = 1/20
        var lineLoad = 1/12
        var coneLoadRadius = 1/50
        var coneLoadHeight = 1/30
        var DL = 0.12 // tamanho de cada linha
        var DF = 0.10 // distância da linha das forças até o ponto
        var DM = 0.35 // distância da linha dos momentos até o ponto
        
        // Chamar funções
        call()

        function call() {
            if(math.round(math.divide(element.load[0],1000),3) != 0) {
                FXA()
            }
            if(math.round(math.divide(element.load[6],1000),3) != 0) {
                FXB()
            }
            if(math.round(math.divide(element.load[1],1000),3) != 0) {
                FYA()
            }
            if(math.round(math.divide(element.load[7],1000),3) != 0) {
                FYB()
            }
            if(math.round(math.divide(element.load[2],1000),3) != 0) {
                FZA()
            }
            if(math.round(math.divide(element.load[8],1000),3) != 0) {
                FZB()
            }
            if(math.round(math.divide(element.load[3],1000),3) != 0) {
                MXA()
            }
            if(math.round(math.divide(element.load[9],1000),3) != 0) {
                MXB()
            }
            if(math.round(math.divide(element.load[4],1000),3) != 0) {
                MYA()
            }
            if(math.round(math.divide(element.load[10],1000),3) != 0) {
                MYB()
            }
            if(math.round(math.divide(element.load[5],1000),3) != 0) {
                MZA()
            }
            if(math.round(math.divide(element.load[11],1000),3) != 0) {
                MZB()
            }    
        }
        function FXA() {

            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(-DF,0,0)
                line.rotation.z = math.pi
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[0]>=0) {
                    cone.position.set(math.sum(-DF,coneLoadHeight/2),0,0)
                    cone.rotation.z = -math.pi/2
                } else {
                    cone.position.set(math.sum(-DF,-coneLoadHeight/2,-DL),0,0)
                    cone.rotation.z = math.pi/2
                }
                scene.add( cone );
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
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(-DF,-DL,-coneLoadHeight),0.05,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });

            }
        }
        function FXB() {

            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(math.sum(1,DF),0,0)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[6]>=0) {
                    cone.position.set(math.sum(1,DF,coneLoadHeight/2,DL),0,0)
                    cone.rotation.z = -math.pi/2
                } else {
                    cone.position.set(math.sum(1,DF,-coneLoadHeight/2),0,0)
                    cone.rotation.z = math.pi/2
                }
                scene.add( cone );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[6],1000),3) +' kN' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(1,DF),0.05,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });

            }
        }
        function FYA() {
       
            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,DL,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(0,DF,0)
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[1]>=0) {
                    cone.position.set(0,math.sum(DF,DL,coneLoadHeight/2),0)
                    // não precisa rotacionar
                } else {
                    cone.position.set(0,math.sum(DF,-coneLoadHeight/2),0)
                    cone.rotation.z = math.pi
                }
                scene.add( cone );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[1],1000),3) +' kN' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(-DF,-DL),0.15,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });

            }
        }
        function FYB() {
          
            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,DL,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(1,DF,0)
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[7]>=0) {
                    cone.position.set(1,math.sum(DF,DL,coneLoadHeight/2),0)
                    // não precisa rotacionar
                } else {
                    cone.position.set(1,math.sum(DF,-coneLoadHeight/2),0)
                    cone.rotation.z = math.pi
                }
                scene.add( cone );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[7],1000),3) +' kN' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(1,0.03),0.15,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function FZA() {
           
            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,0,DL));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(0,0,DF)
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[2]>=0) {
                    cone.position.set(0,0,math.sum(DF,DL,coneLoadHeight/2))
                    cone.rotation.x = math.pi/2
                } else {
                    cone.position.set(0,0,math.sum(DF,-coneLoadHeight/2))
                    cone.rotation.x = -math.pi/2
                }
                scene.add( cone );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[2],1000),3) +' kN' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(0,0.05,math.sum(DF,DL));
                text.rotation.x += 0;
                text.rotation.y += math.pi/2;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function FZB() {
          
            line()
            cone()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,0,DL));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(1,0,DF)
                scene.add( line );
            }
            function cone() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[8]>=0) {
                    cone.position.set(1,0,math.sum(DF,DL,coneLoadHeight/2))
                    cone.rotation.x = math.pi/2
                } else {
                    cone.position.set(1,0,math.sum(DF,-coneLoadHeight/2))
                    cone.rotation.x = -math.pi/2
                }
                scene.add( cone );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[8],1000),3) +' kN' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(1,0.05,math.sum(DF,DL));
                text.rotation.x += 0;
                text.rotation.y += math.pi/2;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function MXA() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(-DM,0,0)
                line.rotation.z = math.pi
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[3]>=0) {
                    cone1.position.set(math.sum(-DM,coneLoadHeight/2),0,0)
                    cone1.rotation.z = -math.pi/2
                } else {
                    cone1.position.set(math.sum(-DM,-coneLoadHeight/2,-DL),0,0)
                    cone1.rotation.z = math.pi/2
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[3]>=0) {
                    cone2.position.set(math.sum(-DM,coneLoadHeight/2,coneLoadHeight),0,0)
                    cone2.rotation.z = -math.pi/2
                } else {
                    cone2.position.set(math.sum(-DM,-coneLoadHeight/2,-DL,-coneLoadHeight),0,0)
                    cone2.rotation.z = math.pi/2
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[3],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(-DL,-DM,-coneLoadHeight),0.05,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });

            }
        }
        function MXB() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(DL,0,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(math.sum(1,DM),0,0)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[9]>=0) {
                    cone1.position.set(math.sum(1,DM,DL,coneLoadHeight/2),0,0)
                    cone1.rotation.z = -math.pi/2
                } else {
                    cone1.position.set(math.sum(1,DM,-coneLoadHeight/2),0,0)
                    cone1.rotation.z = math.pi/2
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[9]>=0) {
                    cone2.position.set(math.sum(1,DM,DL,coneLoadHeight/2,coneLoadHeight),0,0)
                    cone2.rotation.z = -math.pi/2
                } else {
                    cone2.position.set(math.sum(1,DM,-coneLoadHeight/2,-coneLoadHeight),0,0)
                    cone2.rotation.z = math.pi/2
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[9],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(1,DM),0.05,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });

            }
        }
        function MYA() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,DL,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(0,DM,0)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[4]>=0) {
                    cone1.position.set(0,math.sum(DM,DL,coneLoadHeight/2),0)
                    cone1.rotation.z = 0
                } else {
                    cone1.position.set(0,math.sum(DM,-coneLoadHeight/2),0)
                    cone1.rotation.z = math.pi
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[4]>=0) {
                    cone2.position.set(0,math.sum(DM,DL,coneLoadHeight/2,coneLoadHeight),0)
                    cone2.rotation.z = 0
                } else {
                    cone2.position.set(0,math.sum(DM,-coneLoadHeight/2,-coneLoadHeight),0)
                    cone2.rotation.z = math.pi
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[4],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(-DF,-DL),0.4,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function MYB() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,DL,0));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(1,DM,0)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[10]>=0) {
                    cone1.position.set(1,math.sum(DM,DL,coneLoadHeight/2),0)
                    cone1.rotation.z = 0
                } else {
                    cone1.position.set(1,math.sum(DM,-coneLoadHeight/2),0)
                    cone1.rotation.z = math.pi
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[10]>=0) {
                    cone2.position.set(1,math.sum(DM,DL,coneLoadHeight/2,coneLoadHeight),0)
                    cone2.rotation.z = 0
                } else {
                    cone2.position.set(1,math.sum(DM,-coneLoadHeight/2,-coneLoadHeight),0)
                    cone2.rotation.z = math.pi
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[10],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(math.sum(1,0.03),0.4,0);
                text.rotation.x += 0;
                text.rotation.y += 0;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function MZA() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,0,DL));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(0,0,DM)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[5]>=0) {
                    cone1.position.set(0,0,math.sum(DM,DL,coneLoadHeight/2))
                    cone1.rotation.x = math.pi/2
                } else {
                    cone1.position.set(0,0,math.sum(DM,-coneLoadHeight/2))
                    cone1.rotation.x = -math.pi/2
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[5]>=0) {
                    cone2.position.set(0,0,math.sum(DM,DL,coneLoadHeight/2,coneLoadHeight))
                    cone2.rotation.x = math.pi/2
                } else {
                    cone2.position.set(0,0,math.sum(DM,-coneLoadHeight/2,-coneLoadHeight))
                    cone2.rotation.x = -math.pi/2
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[5],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(0,0.05,0.5);
                text.rotation.x += 0;
                text.rotation.y += math.pi/2;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }
        function MZB() {

            line()
            cone1()
            cone2()
            text()

            function line() {
                var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
                var geometryLine = new THREE.Geometry();
                geometryLine.vertices.push(new THREE.Vector3(0,0,0));
                geometryLine.vertices.push(new THREE.Vector3(0,0,DL));
                var line = new THREE.Line( geometryLine, materialLine );
                line.position.set(1,0,DM)
                line.rotation.z = 0
                scene.add( line );
            }
            function cone1() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone1 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[11]>=0) {
                    cone1.position.set(1,0,math.sum(DM,DL,coneLoadHeight/2))
                    cone1.rotation.x = math.pi/2
                } else {
                    cone1.position.set(1,0,math.sum(DM,-coneLoadHeight/2))
                    cone1.rotation.x = -math.pi/2
                }
                scene.add( cone1 );
            }
            function cone2() {
                var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
                var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );        
                var cone2 = new THREE.Mesh( geometryCone, materialCone );
                if(element.load[11]>=0) {
                    cone2.position.set(1,0,math.sum(DM,DL,coneLoadHeight/2,coneLoadHeight),0)
                    cone2.rotation.x = math.pi/2
                } else {
                    cone2.position.set(1,0,math.sum(DM,-coneLoadHeight/2,-coneLoadHeight))
                    cone2.rotation.x = -math.pi/2
                }
                scene.add( cone2 );
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
                var geometry = new THREE.TextGeometry( math.round(math.divide(element.load[11],1000),3) +' kNm' , options )
                var text = new THREE.Mesh( geometry, material );
                text.position.set(1,0.05,0.5);
                text.rotation.x += 0;
                text.rotation.y += math.pi/2;
                text.rotation.z += 0;
                scene.add( text );
                });
            }
        }

    }
    function Diagrams(fxDiagrama,fyDiagrama,fzDiagrama,mxDiagrama,myDiagrama,mzDiagrama) {

        // Parameters
        pointRadius = 1/25
        var TLG = 0.5 // Tamanho da linha do diagrama
        var opacidade = 0.6
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

        function FX() {
            var material = new THREE.MeshBasicMaterial( { 
                color: '#ff0000', 
                transparent: true,
                opacity: opacidade,
                side: THREE.DoubleSide 
            } );
            var geometry = new THREE.Geometry()
            var v1 = new THREE.Vector3(pointRadius,0,0)
            var v2 = new THREE.Vector3(pointRadius,0,-TLG)
            var v3 = new THREE.Vector3(math.sum(1,-pointRadius),0,-TLG)
            var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
            geometry.vertices.push(v1)
            geometry.vertices.push(v2)
            geometry.vertices.push(v3)
            geometry.vertices.push(v4)
            geometry.faces.push(new THREE.Face3(0,1,2))
            geometry.faces.push(new THREE.Face3(0,2,3))
            var diagrama = new THREE.Mesh(geometry, material);
            scene.add(diagrama)
        }
        function FY() {
            var material = new THREE.MeshBasicMaterial( { 
                color: '#00ff00', 
                transparent: true,
                opacity: opacidade,
                side: THREE.DoubleSide 
            } );
            var geometry = new THREE.Geometry()
            var v1 = new THREE.Vector3(pointRadius,0,0)
            var v2 = new THREE.Vector3(pointRadius,TLG,0)
            var v3 = new THREE.Vector3(math.sum(1,-pointRadius),TLG,0)
            var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
            geometry.vertices.push(v1)
            geometry.vertices.push(v2)
            geometry.vertices.push(v3)
            geometry.vertices.push(v4)
            geometry.faces.push(new THREE.Face3(0,1,2))
            geometry.faces.push(new THREE.Face3(0,2,3))
            var diagrama = new THREE.Mesh(geometry, material);
            scene.add(diagrama)
        }
        function FZ() {
            var material = new THREE.MeshBasicMaterial( { 
                color: '#0000ff', 
                transparent: true,
                opacity: opacidade,
                side: THREE.DoubleSide 
            } );
            var geometry = new THREE.Geometry()
            var v1 = new THREE.Vector3(pointRadius,0,0)
            var v2 = new THREE.Vector3(pointRadius,0,TLG)
            var v3 = new THREE.Vector3(math.sum(1,-pointRadius),0,TLG)
            var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
            geometry.vertices.push(v1)
            geometry.vertices.push(v2)
            geometry.vertices.push(v3)
            geometry.vertices.push(v4)
            geometry.faces.push(new THREE.Face3(0,1,2))
            geometry.faces.push(new THREE.Face3(0,2,3))
            var diagramaFY = new THREE.Mesh(geometry, material);
            scene.add(diagramaFY)
        }
        function MX() {
            var material = new THREE.MeshBasicMaterial( { 
                color: '#ffff00', 
                transparent: true,
                opacity: opacidade,
                side: THREE.DoubleSide 
            } );
            var geometry = new THREE.Geometry()
            var v1 = new THREE.Vector3(pointRadius,0,0)
            var v2 = new THREE.Vector3(pointRadius,-TLG,0)
            var v3 = new THREE.Vector3(math.sum(1,-pointRadius),-TLG,0)
            var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
            geometry.vertices.push(v1)
            geometry.vertices.push(v2)
            geometry.vertices.push(v3)
            geometry.vertices.push(v4)
            geometry.faces.push(new THREE.Face3(0,1,2))
            geometry.faces.push(new THREE.Face3(0,2,3))
            var diagrama = new THREE.Mesh(geometry, material);
            scene.add(diagrama)
        }
        function MY() {

            if(element.load[4]*element.load[10]>0) {
                tri()
            } else {
                trap()
            }

            function trap() {
                Ref = math.divide(1,math.max(math.abs(element.load[4]),math.abs(element.load[10])))
                var hA = -math.multiply(math.abs(element.load[4]),Ref,TLG)
                var hB = -math.multiply(math.abs(element.load[10]),Ref,TLG)
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
                var v2 = new THREE.Vector3(pointRadius,0,hA)
                var v3 = new THREE.Vector3(math.sum(1,-pointRadius),0,hB)
                var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
                geometry.vertices.push(v1)
                geometry.vertices.push(v2)
                geometry.vertices.push(v3)
                geometry.vertices.push(v4)
                geometry.faces.push(new THREE.Face3(0,1,2))
                geometry.faces.push(new THREE.Face3(0,2,3))
                var diagrama = new THREE.Mesh(geometry, material);
                scene.add(diagrama)    
            }
            function tri() {
                Ref = math.divide(1,math.max(math.abs(element.load[4]),math.abs(element.load[10])))
                var hA = -math.multiply(math.abs(element.load[4]),Ref,TLG)
                var hB = math.multiply(math.abs(element.load[10]),Ref,TLG)
                if(element.load[4]<0) { // falta o if do load[10] ?
                    hA = -hA
                    hB = -hB
                }
                var dA = math.divide(math.abs(element.load[4]),math.abs(element.load[2]))
                dA = dA/element.L
                var material = new THREE.MeshBasicMaterial( { 
                    color: '#ffffff', 
                    transparent: true,
                    opacity: opacidade,
                    side: THREE.DoubleSide 
                } );
                var geometry = new THREE.Geometry()
                var v1 = new THREE.Vector3(pointRadius,0,0)
                var v2 = new THREE.Vector3(pointRadius,0,hA)
                var v3 = new THREE.Vector3(math.sum(1,-pointRadius),0,hB)
                var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
                var v5 = new THREE.Vector3(dA,0,0)
                geometry.vertices.push(v1) // 0
                geometry.vertices.push(v2) // 1
                geometry.vertices.push(v3) // 2
                geometry.vertices.push(v4) // 3
                geometry.vertices.push(v5) // 4
                geometry.faces.push(new THREE.Face3(0,1,4))
                geometry.faces.push(new THREE.Face3(2,3,4))
                var diagrama = new THREE.Mesh(geometry, material);
                scene.add(diagrama)    

            }

        }
        function MZ() {

            if(element.load[5]*element.load[11]>0) {
                tri()
            } else {
                trap()
            }

            function trap() {
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
                var v3 = new THREE.Vector3(math.sum(1,-pointRadius),hB,0)
                var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
                geometry.vertices.push(v1)
                geometry.vertices.push(v2)
                geometry.vertices.push(v3)
                geometry.vertices.push(v4)
                geometry.faces.push(new THREE.Face3(0,1,2))
                geometry.faces.push(new THREE.Face3(0,2,3))
                var diagrama = new THREE.Mesh(geometry, material);
                scene.add(diagrama)    
            }
            function tri() {
                Ref = math.divide(1,math.max(math.abs(element.load[5]),math.abs(element.load[11])))
                var hA = math.multiply(math.abs(element.load[5]),Ref,TLG)
                var hB = -math.multiply(math.abs(element.load[11]),Ref,TLG)
                if(element.load[5]<0) { 
                    hA = -hA
                    hB = -hB
                }
                var dA = math.divide(math.abs(element.load[5]),math.abs(element.load[1]))
                dA = dA/element.L
                var material = new THREE.MeshBasicMaterial( { 
                    color: '#000000', 
                    transparent: true,
                    opacity: opacidade,
                    side: THREE.DoubleSide 
                } );
                var geometry = new THREE.Geometry()
                var v1 = new THREE.Vector3(pointRadius,0,0)
                var v2 = new THREE.Vector3(pointRadius,hA,0)
                var v3 = new THREE.Vector3(math.sum(1,-pointRadius),hB,0)
                var v4 = new THREE.Vector3(math.sum(1,-pointRadius),0,0)
                var v5 = new THREE.Vector3(dA,0,0)
                geometry.vertices.push(v1) // 0
                geometry.vertices.push(v2) // 1
                geometry.vertices.push(v3) // 2
                geometry.vertices.push(v4) // 3
                geometry.vertices.push(v5) // 4
                geometry.faces.push(new THREE.Face3(0,1,4))
                geometry.faces.push(new THREE.Face3(2,3,4))
                var diagrama = new THREE.Mesh(geometry, material);
                scene.add(diagrama)
            }
        }

    }
}
function animateDiagramaLocal() {
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animateDiagramaLocal);   
}
