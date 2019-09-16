var renderer, scene, camera, controls;

function initDeformada(width,height) {
    // Render
    renderer = new THREE.WebGLRenderer({antialias: true}); // cria a renderização
    renderer.setSize( width, height ); // tamanho da tela do desenho
    renderer.setClearColor(0x1F5A94); // cor do fundo do canvas
    renderer.domElement.id = 'desenhoDeformada' // id do desenho
    container = document.getElementById( 'canvasDeformada' ); // identifica a div com id='canvasDeformada' no html
    document.body.appendChild( container ); 
    container.appendChild( renderer.domElement );
    
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera( 25, width/height, 0.1, 1000 );
    camera.position.set( 5, 8, 8 );
    camera.lookAt( 0, 0, 0 );

    // Controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    controls.update();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.target = new THREE.Vector3(0,0,0);
}    
function structureDeformada(scale) {

    // Imports
    const Store = require('electron-store');
    const store = new Store()
    const math = require('mathjs');

    let estruturaObj = store.get('estrutura')
    let nPontos = estruturaObj.pontos.length
    let nElementos = estruturaObj.elementos.length

    // Parameters
    var prm = 1;
    for(let i=0 ; i<nPontos ; i++) {
        for(let j=0 ; j<nPontos ; j++){
            distX = estruturaObj.pontos[i].coordenadas.x-estruturaObj.pontos[j].coordenadas.x
            distY = estruturaObj.pontos[i].coordenadas.y-estruturaObj.pontos[j].coordenadas.y
            distZ = estruturaObj.pontos[i].coordenadas.z-estruturaObj.pontos[j].coordenadas.z
            if( distX > prm) {
                prm = distX;
            }
            if( distY > prm) {
                prm = distY;
            }
            if( distZ > prm) {
                prm = distZ;
            }
        }
    }
        // Axes
        var coneRadius = prm/50
        var coneHeight = prm/15
        var lineLength = prm/3
        // Spheres
        var radius = prm/40
        var fontSize = prm/20
        var fontHeight = prm/200
        var textPositionAdd = prm/40
        // Loads
            // Line
            var lineLoad = prm/7
            // Cone
            var coneLoadRadius = prm/75
            var coneLoadHeight = prm/30
        //

    // Axes
    function axes() {

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
    axes();

    // Elements (deformed)
    var lines = []
    for(let i=0 ; i<nElementos ; i++) {
        
        // Data
            var pontoA = {}
            pontoA.n = estruturaObj.elementos[i].conectividades.pontoA
            pontoA.x = math.sum(estruturaObj.pontos[pontoA.n-1].coordenadas.x,scale*estruturaObj.global.deslocamentos[(pontoA.n-1)*6+0])
            pontoA.y = math.sum(estruturaObj.pontos[pontoA.n-1].coordenadas.y,scale*estruturaObj.global.deslocamentos[(pontoA.n-1)*6+1])
            pontoA.z = math.sum(estruturaObj.pontos[pontoA.n-1].coordenadas.z,scale*estruturaObj.global.deslocamentos[(pontoA.n-1)*6+2])
            
            var pontoB = {}
            pontoB.n = estruturaObj.elementos[i].conectividades.pontoB
            pontoB.x = math.sum(estruturaObj.pontos[pontoB.n-1].coordenadas.x,scale*estruturaObj.global.deslocamentos[(pontoB.n-1)*6+0])
            pontoB.y = math.sum(estruturaObj.pontos[pontoB.n-1].coordenadas.y,scale*estruturaObj.global.deslocamentos[(pontoB.n-1)*6+1])
            pontoB.z = math.sum(estruturaObj.pontos[pontoB.n-1].coordenadas.z,scale*estruturaObj.global.deslocamentos[(pontoB.n-1)*6+2])
            
        //

        // Lines
            // Material
            var materialLines = new THREE.LineDashedMaterial( { 
                color: '#A0A0A0',
                linewidth: 1,
                scale: prm*2,
                dashSize: 0.4,
                gapSize: 0.2,
            } );

            // Geometry
            var geometryLines = new THREE.Geometry();
            geometryLines.vertices.push(new THREE.Vector3( pontoA.x, pontoA.y, pontoA.z) );
            geometryLines.vertices.push(new THREE.Vector3( pontoB.x, pontoB.y, pontoB.z) );
            // Element
            lines[i] = new THREE.Line( geometryLines, materialLines );
            scene.add( lines[i] );
            geometryLines.computeLineDistances();
        //

    }

    // Points (deformed)
    var spheres = []
    for(let i=0 ; i<nPontos ; i++) {
        // Data
        let point = {
            'x': math.sum(estruturaObj.pontos[i].coordenadas.x,scale*estruturaObj.global.deslocamentos[6*i+0]),
            'y': math.sum(estruturaObj.pontos[i].coordenadas.y,scale*estruturaObj.global.deslocamentos[6*i+1]),
            'z': math.sum(estruturaObj.pontos[i].coordenadas.z,scale*estruturaObj.global.deslocamentos[6*i+2])
        }
        // Spheres
            // Material
            var materialSphere = new THREE.MeshBasicMaterial( { color: '#A0A0A0' } );
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
                color: '#A0A0A0'
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

    // Elements
    var lines = []
    for(let i=0 ; i<nElementos ; i++) {
        
        // Data
            var pontoA = {
                'n': estruturaObj.elementos[i].conectividades.pontoA,
                'x': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoA-1].coordenadas.x,
                'y': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoA-1].coordenadas.y,
                'z': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoA-1].coordenadas.z
            }
            var pontoB = {
                'n': estruturaObj.elementos[i].conectividades.pontoB,
                'x': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoB-1].coordenadas.x,
                'y': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoB-1].coordenadas.y,
                'z': estruturaObj.pontos[estruturaObj.elementos[i].conectividades.pontoB-1].coordenadas.z
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
            lines[i] = new THREE.Line( geometryLines, materialLines );
            scene.add( lines[i] );
        //

    }

    // Points
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


    // // Loads
    // for(let i=0 ; i<nPontos ; i++) {

    //     // Data
    //     let point = {
    //         'x': math.sum(estruturaObj.pontos[i].coordenadas.x,estruturaObj.global.deslocamentos[6*i+0]),
    //         'y': math.sum(estruturaObj.pontos[i].coordenadas.y,estruturaObj.global.deslocamentos[6*i+1]),
    //         'z': math.sum(estruturaObj.pontos[i].coordenadas.z,estruturaObj.global.deslocamentos[6*i+2]),
    //         'load': estruturaObj.pontos[i].cargas
    //     }
        
    //     // Line
    //     var materialLine = new THREE.LineBasicMaterial( { color: '#00cc00' } );
    //     var geometryLine = new THREE.Geometry();
    //     geometryLine.vertices.push(new THREE.Vector3( 0, 0, 0) );
    //     geometryLine.vertices.push(new THREE.Vector3( lineLoad, 0, 0) );

    //     // Cone
    //     var geometryCone = new THREE.ConeGeometry( coneLoadRadius, coneLoadHeight, 30 );
    //     var materialCone = new THREE.MeshBasicMaterial( {color: '#00cc00'} );
    
    //     function FX() {
    //         if(point.load.fx != 0) {
    //             // Line
    //             var lineFX = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.fx > 0) {
    //                 lineFX.position.set(math.sum(point.x,-1.4*lineLoad),point.y,point.z)
    //                 lineFX.rotation.x += 0
    //                 lineFX.rotation.y += 0
    //                 lineFX.rotation.z += 0
    //             } else {
    //                 lineFX.position.set(math.sum(point.x,0.4*lineLoad),point.y,point.z)
    //                 lineFX.rotation.x += 0
    //                 lineFX.rotation.y += 0
    //                 lineFX.rotation.z += 0
    //             }
    //             scene.add( lineFX );
    //             // Cone
    //             var coneFX = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.fx > 0) {
    //                 coneFX.position.set(math.sum(point.x,-2*radius),point.y,point.z)
    //                 coneFX.rotation.x += 0
    //                 coneFX.rotation.y += 0
    //                 coneFX.rotation.z += -Math.PI / 2
    //             } else {
    //                 coneFX.position.set(math.sum(point.x,2*radius),point.y,point.z)
    //                 coneFX.rotation.x += 0
    //                 coneFX.rotation.y += 0
    //                 coneFX.rotation.z += Math.PI / 2
    //             }
    //             scene.add( coneFX );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // FX text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.fx,1000)+' kN' , options )
    //             var FX = new THREE.Mesh( geometry, material );
    //             if(point.load.fx > 0) {
    //                 FX.position.set(math.sum(point.x,-1.6*lineLoad),math.sum(point.y,0.2*lineLoad),point.z);
    //                 FX.rotation.x += 0;
    //                 FX.rotation.y += 0;
    //                 FX.rotation.z += 0;
    //             } else {
    //                 FX.position.set(math.sum(point.x,0.3*lineLoad),math.sum(point.y,0.2*lineLoad),point.z);
    //                 FX.rotation.x += 0;
    //                 FX.rotation.y += 0;
    //                 FX.rotation.z += 0;
    //             }
    //             scene.add( FX );
    //             });
    //         }   
    //     }
    //     function FY() {
    //         if(point.load.fy != 0) {
    //             // Line
    //             var lineFY = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.fy > 0) {
    //                 lineFY.position.set(point.x,math.sum(point.y,-0.4*lineLoad),point.z)
    //                 lineFY.rotation.x += 0
    //                 lineFY.rotation.y += 0
    //                 lineFY.rotation.z += -Math.PI / 2
    //             } else {
    //                 lineFY.position.set(point.x,math.sum(point.y,1.4*lineLoad),point.z)
    //                 lineFY.rotation.x += 0
    //                 lineFY.rotation.y += 0
    //                 lineFY.rotation.z += -Math.PI / 2
    //             }
    //             scene.add( lineFY );
    //             // Cone
    //             var coneFY = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.fy > 0) {
    //                 coneFY.position.set(point.x,math.sum(point.y,-2*radius),point.z)
    //                 coneFY.rotation.x += 0
    //                 coneFY.rotation.y += 0
    //                 coneFY.rotation.z += 0
    //             } else {
    //                 coneFY.position.set(point.x,math.sum(point.y,2*radius),point.z)
    //                 coneFY.rotation.x += 0
    //                 coneFY.rotation.y += 0
    //                 coneFY.rotation.z += Math.PI
    //             }
    //             scene.add( coneFY );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // FY text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.fy,1000)+' kN' , options )
    //             var FY = new THREE.Mesh( geometry, material );
    //             if(point.load.fy > 0) {
    //                 FY.position.set(math.sum(point.x,0.1*lineLoad),math.sum(point.y,-lineLoad),point.z);
    //                 FY.rotation.x += 0;
    //                 FY.rotation.y += 0;
    //                 FY.rotation.z += 0;
    //             } else {
    //                 FY.position.set(math.sum(point.x,0.1*lineLoad),math.sum(point.y,0.75*lineLoad),point.z);
    //                 FY.rotation.x += 0;
    //                 FY.rotation.y += 0;
    //                 FY.rotation.z += 0;
    //             }
    //             scene.add( FY );
    //             });
    //         }   
    //     }
    //     function FZ() {
    //         if(point.load.fz != 0) {
    //             // Line
    //             var lineFZ = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.fz > 0) {
    //                 lineFZ.position.set(point.x,point.y,math.sum(point.z,-1.4*lineLoad))
    //                 lineFZ.rotation.x += 0
    //                 lineFZ.rotation.y += -Math.PI / 2
    //                 lineFZ.rotation.z += 0
    //             } else {
    //                 lineFZ.position.set(point.x,point.y,math.sum(point.z,0.4*lineLoad))
    //                 lineFZ.rotation.x += 0
    //                 lineFZ.rotation.y += -Math.PI / 2
    //                 lineFZ.rotation.z += 0
    //             }
    //             scene.add( lineFZ );
    //             // Cone
    //             var coneFZ = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.fz > 0) {
    //                 coneFZ.position.set(point.x,point.y,math.sum(point.z,-2*radius))
    //                 coneFZ.rotation.x += Math.PI/2
    //                 coneFZ.rotation.y += 0
    //                 coneFZ.rotation.z += 0
    //             } else {
    //                 coneFZ.position.set(point.x,point.y,math.sum(point.z,2*radius))
    //                 coneFZ.rotation.x += -Math.PI/2
    //                 coneFZ.rotation.y += 0
    //                 coneFZ.rotation.z += 0
    //             }
    //             scene.add( coneFZ );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // FZ text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.fz,1000)+' kN' , options )
    //             var FZ = new THREE.Mesh( geometry, material );
    //             if(point.load.fz > 0) {
    //                 FZ.position.set(point.x,math.sum(point.y,0.2*lineLoad),math.sum(point.z,-0.1*lineLoad));
    //                 FZ.rotation.x += 0;
    //                 FZ.rotation.y += Math.PI/2;
    //                 FZ.rotation.z += 0;
    //             } else {
    //                 FZ.position.set(point.x,math.sum(point.y,0.2*lineLoad),math.sum(point.z,1.9*lineLoad));
    //                 FZ.rotation.x += 0;
    //                 FZ.rotation.y += Math.PI/2;
    //                 FZ.rotation.z += 0;
    //             }
    //             scene.add( FZ );
    //             });
    //         }   
    //     }
    //     function MX() {
    //         if(point.load.mx != 0) {
    //             // Line
    //             var lineMX = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.mx > 0) {
    //                 lineMX.position.set(math.sum(point.x,-2.9*lineLoad),point.y,point.z)
    //                 lineMX.rotation.x += 0
    //                 lineMX.rotation.y += 0
    //                 lineMX.rotation.z += 0
    //             } else {
    //                 lineMX.position.set(math.sum(point.x,2*lineLoad),point.y,point.z)
    //                 lineMX.rotation.x += 0
    //                 lineMX.rotation.y += 0
    //                 lineMX.rotation.z += 0
    //             }
    //             scene.add( lineMX );
    //             // Cone
    //             var coneMX1 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.mx > 0) {
    //                 coneMX1.position.set(math.sum(point.x,-1.3*lineLoad-2*radius),point.y,point.z)
    //                 coneMX1.rotation.x += 0
    //                 coneMX1.rotation.y += 0
    //                 coneMX1.rotation.z += -Math.PI / 2
    //             } else {
    //                 coneMX1.position.set(math.sum(point.x,1.4*lineLoad+2*radius),point.y,point.z)
    //                 coneMX1.rotation.x += 0
    //                 coneMX1.rotation.y += 0
    //                 coneMX1.rotation.z += Math.PI / 2
    //             }
    //             scene.add( coneMX1 );
    //             var coneMX2 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.mx > 0) {
    //                 coneMX2.position.set(math.sum(point.x,-1.3*lineLoad-2*radius-coneLoadHeight),point.y,point.z)
    //                 coneMX2.rotation.x += 0
    //                 coneMX2.rotation.y += 0
    //                 coneMX2.rotation.z += -Math.PI / 2
    //             } else {
    //                 coneMX2.position.set(math.sum(point.x,1.4*lineLoad+2*radius+coneLoadHeight),point.y,point.z)
    //                 coneMX2.rotation.x += 0
    //                 coneMX2.rotation.y += 0
    //                 coneMX2.rotation.z += Math.PI / 2
    //             }
    //             scene.add( coneMX2 );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // MX text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.mx,1000)+' kNm' , options )
    //             var MX = new THREE.Mesh( geometry, material );
    //             if(point.load.mx > 0) {
    //                 MX.position.set(math.sum(point.x,-3.5*lineLoad),math.sum(point.y,0.2*lineLoad),point.z);
    //                 MX.rotation.x += 0;
    //                 MX.rotation.y += 0;
    //                 MX.rotation.z += 0;
    //             } else {
    //                 MX.position.set(math.sum(point.x,2*lineLoad),math.sum(point.y,0.2*lineLoad),point.z);
    //                 MX.rotation.x += 0;
    //                 MX.rotation.y += 0;
    //                 MX.rotation.z += 0;
    //             }
    //             scene.add( MX );
    //             });
                
    //         }
    //     }
    //     function MY() {
    //         if(point.load.my != 0) {
    //             // Line
    //             var lineMY = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.my > 0) {
    //                 lineMY.position.set(point.x,math.sum(point.y,-2*lineLoad),point.z)
    //                 lineMY.rotation.x += 0
    //                 lineMY.rotation.y += 0
    //                 lineMY.rotation.z += -Math.PI / 2
    //             } else {
    //                 lineMY.position.set(point.x,math.sum(point.y,3*lineLoad),point.z)
    //                 lineMY.rotation.x += 0
    //                 lineMY.rotation.y += 0
    //                 lineMY.rotation.z += -Math.PI / 2
    //             }
    //             scene.add( lineMY );
    //             // Cone
    //             var coneMY1 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.my > 0) {
    //                 coneMY1.position.set(point.x,math.sum(point.y,-1.3*lineLoad-2*radius),point.z)
    //                 coneMY1.rotation.x += 0
    //                 coneMY1.rotation.y += 0
    //                 coneMY1.rotation.z += 0
    //             } else {
    //                 coneMY1.position.set(point.x,math.sum(point.y,1.3*lineLoad+2*radius),point.z)
    //                 coneMY1.rotation.x += 0
    //                 coneMY1.rotation.y += 0
    //                 coneMY1.rotation.z += Math.PI
    //             }
    //             scene.add( coneMY1 );
    //             var coneMY2 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.my > 0) {
    //                 coneMY2.position.set(point.x,math.sum(point.y,-1.3*lineLoad-2*radius-coneLoadHeight),point.z)
    //                 coneMY2.rotation.x += 0
    //                 coneMY2.rotation.y += 0
    //                 coneMY2.rotation.z += 0
    //             } else {
    //                 coneMY2.position.set(point.x,math.sum(point.y,1.3*lineLoad+2*radius+coneLoadHeight),point.z)
    //                 coneMY2.rotation.x += 0
    //                 coneMY2.rotation.y += 0
    //                 coneMY2.rotation.z += Math.PI
    //             }
    //             scene.add( coneMY2 );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // MY text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.my,1000)+' kNm' , options )
    //             var MY = new THREE.Mesh( geometry, material );
    //             if(point.load.my > 0) {
    //                 MY.position.set(math.sum(point.x,0.1*lineLoad),math.sum(point.y,-2.5*lineLoad),point.z);
    //                 MY.rotation.x += 0;
    //                 MY.rotation.y += 0;
    //                 MY.rotation.z += 0;
    //             } else {
    //                 MY.position.set(math.sum(point.x,0.1*lineLoad),math.sum(point.y,2.3*lineLoad),point.z);
    //                 MY.rotation.x += 0;
    //                 MY.rotation.y += 0;
    //                 MY.rotation.z += 0;
    //             }
    //             scene.add( MY );
    //             });
                
    //         }
    //     }
    //     function MZ() {
    //         if(point.load.mz != 0) {
    //             // Line
    //             var lineMZ = new THREE.Line( geometryLine, materialLine );
    //             if(point.load.mz > 0) {
    //                 lineMZ.position.set(point.x,point.y,math.sum(point.z,-3*lineLoad))
    //                 lineMZ.rotation.x += 0
    //                 lineMZ.rotation.y += -Math.PI / 2
    //                 lineMZ.rotation.z += 0
    //             } else {
    //                 lineMZ.position.set(point.x,point.y,math.sum(point.z,2*lineLoad))
    //                 lineMZ.rotation.x += 0
    //                 lineMZ.rotation.y += -Math.PI / 2
    //                 lineMZ.rotation.z += 0
    //             }
    //             scene.add( lineMZ );
    //             // Cone 1
    //             var coneMZ1 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.mz > 0) {
    //                 coneMZ1.position.set(point.x,point.y,math.sum(point.z,-1.3*lineLoad-2*radius))
    //                 coneMZ1.rotation.x += Math.PI/2
    //                 coneMZ1.rotation.y += 0
    //                 coneMZ1.rotation.z += 0
    //             } else {
    //                 coneMZ1.position.set(point.x,point.y,math.sum(point.z,1.3*lineLoad+2*radius))
    //                 coneMZ1.rotation.x += -Math.PI/2
    //                 coneMZ1.rotation.y += 0
    //                 coneMZ1.rotation.z += 0
    //             }
    //             scene.add( coneMZ1 );
    //             // Cone 2
    //             var coneMZ2 = new THREE.Mesh( geometryCone, materialCone );
    //             if(point.load.mz > 0) {
    //                 coneMZ2.position.set(point.x,point.y,math.sum(point.z,-1.3*lineLoad-2*radius-coneLoadHeight))
    //                 coneMZ2.rotation.x += Math.PI/2
    //                 coneMZ2.rotation.y += 0
    //                 coneMZ2.rotation.z += 0
    //             } else {
    //                 coneMZ2.position.set(point.x,point.y,math.sum(point.z,1.3*lineLoad+2*radius+coneLoadHeight))
    //                 coneMZ2.rotation.x += -Math.PI/2
    //                 coneMZ2.rotation.y += 0
    //                 coneMZ2.rotation.z += 0
    //             }
    //             scene.add( coneMZ2 );
    //             // Text
    //             var loader = new THREE.FontLoader();
    //             loader.load( '../Assets/helvetiker_regular.typeface.json', function ( font ) {
    //             // text material
    //             var material = new THREE.LineBasicMaterial({
    //                 color: '#00cc00'
    //             });
    //             // text options
    //             var options = {    
    //                 font: font,
    //                 size: fontSize,
    //                 height: 0,
    //                 curveSegments: 0,
    //                 bevelEnabled: false,
    //                 bevelThickness: 0,
    //                 bevelSize: 0,
    //                 bevelSegments: 0
    //             };
    //             // MZ text
    //             var geometry = new THREE.TextGeometry( math.divide(point.load.mz,1000)+' kNm' , options )
    //             var MZ = new THREE.Mesh( geometry, material );
    //             if(point.load.mz > 0) {
    //                 MZ.position.set(point.x,math.sum(point.y,0.2*lineLoad),math.sum(point.z,-1.7*lineLoad));
    //                 MZ.rotation.x += 0;
    //                 MZ.rotation.y += Math.PI/2;
    //                 MZ.rotation.z += 0;
    //             } else {
    //                 MZ.position.set(point.x,math.sum(point.y,0.2*lineLoad),math.sum(point.z,4*lineLoad));
    //                 MZ.rotation.x += 0;
    //                 MZ.rotation.y += Math.PI/2;
    //                 MZ.rotation.z += 0;
    //             }
    //             scene.add( MZ );
    //             });
                
    //         }
    //     }
    //     FX()
    //     FY()
    //     FZ()
    //     MX()
    //     MY()
    //     MZ()
    // }

    // Restrictions
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
function animateDeformada() {
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animateDeformada);   
}
