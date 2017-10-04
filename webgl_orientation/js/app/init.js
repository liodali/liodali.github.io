
	function init(){
								
					 scene = new THREE.Scene();
 
					renderer=new THREE.WebGLRenderer({canvas :document.getElementById('mycanvas'),antialias : true});
					renderer.autoClear = false;
					//renderer.setClearColor(0xefefef);
					renderer.setPixelRatio(window.devicePixelRatio);
					renderer.setSize(window.innerWidth,window.innerHeight);
					//renderer.shadowMap.enabled = true;
					//renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
					//renderer.setClearColor( scene.fog.color );
					renderer.gammaInput = true;
					renderer.gammaOutput = true;


					camera=new THREE.PerspectiveCamera(100,(window.innerWidth)/(window.innerHeight),0.1,5000);
					camera.position.set( 0, 0, 35 );
					/*
					// Create a new mesh with
					// cube geometry - we will cover
					// the MeshBasicMaterial next!
					var geometry = new THREE.BoxGeometry( 5, 5, 5 );
					for ( var i = 0; i < geometry.faces.length; i += 2 ) {
						var hex = Math.random() * 0xffffff;
						geometry.faces[ i ].color.setHex( hex );
						geometry.faces[ i + 1 ].color.setHex( hex );
					}
					var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
					cube = new THREE.Mesh( geometry, material );
					cube.castShadow = true;
					var mat=cube.matrix;
					console.log(mat.elements );
					scene.add( cube );
					*/

					//ground 
					var ground = new THREE.Mesh(
						new THREE.PlaneBufferGeometry( 100, 100, 1, 1 ),
						new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
					);
					ground.rotation.x = - Math.PI /2; // rotates X/Y to X/Z
					ground.position.y=-5;
					ground.receiveShadow = true;
					scene.add( ground );
					// LIGHTS
					var light = new THREE.AmbientLight(0xFFFFFF,0.3); // soft white light AmbientLight(color,Intensity)
					light.position.set(0,100,0);
					scene.add(light);
					 
					var lightpoint = new THREE.PointLight(0xFFFFFF,1, 1000); // soft white light PointLight( color, intensity, distance, decay )
					lightpoint.position.set(0,500,0);
					lightpoint.castShadow = true;
					// Will not light anything closer than 0.1 units or further than 25 units
						lightpoint.shadow.camera.near = 0.1;
						lightpoint.shadow.camera.far = 5000;
					scene.add(lightpoint);

					var sphereSize = 50;
					var pointLightHelper = new THREE.PointLightHelper( lightpoint, sphereSize );
					scene.add( pointLightHelper );
					
					// camera controle
					var controls = new THREE.OrbitControls( camera, renderer.domElement );
					controls.target.set( 0, 1, 0 );
					controls.update();
				
					var manager = new THREE.LoadingManager();
					var loader = new THREE.JSONLoader(manager);
					loader.load( './model/airplan.json', function ( geometry, materials ) {
						var mat=new THREE.MultiMaterial(materials);
						airplan = new THREE.Mesh( geometry, mat );
							// adjust color a bit
							
							airplan.position.set(0,0, 0);
							airplan.scale.set(0.2,0.2,0.2);
							
							scene.add( airplan );	
							camera.lookAt(airplan);
								axishelp=new THREE.AxisHelper( 30);
								scene.add( axishelp );
								airplan.matrixAutoUpdate=true;
								axishelp.matrixAutoUpdate=true;
					});

}