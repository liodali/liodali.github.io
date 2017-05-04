
	function init(){
					scene=new THREE.Scene();
					//scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
					//scene.fog.color.setHSL( 0.6, 0, 1 );
					renderer=new THREE.WebGLRenderer({canvas :document.getElementById('mycanvas'),antialias : true});
					renderer.autoClear = false;
					//renderer.setClearColor(0xefefef);
					renderer.setPixelRatio(window.devicePixelRatio);
					renderer.setSize(window.innerWidth-300,window.innerHeight);
					renderer.shadowMap.enabled = true;
					renderer.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
					//renderer.setClearColor( scene.fog.color );
					renderer.gammaInput = true;
					renderer.gammaOutput = true;
					//renderer.shadowMap.renderReverseSided = false;	

					 camera=new THREE.PerspectiveCamera(60,(window.innerWidth-300)/(window.innerHeight),0.1,5000);
					camera.position.set( 0, 200, 2000 );
					 


					//scene.add( new THREE.GridHelper( 1000, 10 ) );// helpergrid
					helper = new THREE.GridHelper( 2000, 100 );
					helper.position.y = - 199;
					helper.material.opacity = 0.25;
					helper.material.transparent = true;
					scene.add( helper );

					raycaster = new THREE.Raycaster();

					var light = new THREE.AmbientLight(0xFFFFFF,0.3); // soft white light AmbientLight(color,Intensity)
					light.position.set(0,100,0);
					scene.add(light);
					 
					var lightpoint = new THREE.PointLight(0xFFFFFF,1, 1000); // soft white light PointLight( color, intensity, distance, decay )
					lightpoint.position.set(0,400,0);
					lightpoint.castShadow = true;
					// Will not light anything closer than 0.1 units or further than 25 units
						lightpoint.shadow.camera.near = 0.1;
						lightpoint.shadow.camera.far = 5000;
					scene.add(lightpoint);

					var sphereSize = 50;
					var pointLightHelper = new THREE.PointLightHelper( lightpoint, sphereSize );
					scene.add( pointLightHelper );
					// LIGHTS
					/*hemiLight = new THREE.HemisphereLight( 0xf00fff, 0xf00fff, 0.2 );
					hemiLight.color.setHSL( 0.6, 1, 0.6 );
					hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
					hemiLight.position.set( 0, 500, 0 );
					scene.add( hemiLight );

					//
					dirLight = new THREE.DirectionalLight( 0xffffff, 1, 500 );
					dirLight.color.setHSL( 0.1, 1, 0.95 );
					dirLight.position.set( 0, 100, 0 );
					dirLight.position.multiplyScalar( 10 );
						dirLight.castShadow = true;
					scene.add( dirLight );
				
					dirLight.shadow.mapSize.width = 512;
					dirLight.shadow.mapSize.height = 512;
					var d = 50;
					dirLight.shadow.camera.left = -d;
					dirLight.shadow.camera.right = d;
					dirLight.shadow.camera.top = d;
					dirLight.shadow.camera.bottom = -d;
					dirLight.shadow.camera.far = 25;
					dirLight.shadow.bias = -0.0001;*/
					
					/*var helper = new THREE.DirectionalLightHelper( dirLight, 20 );

					scene.add( helper );*/
					//control
					control = new THREE.TransformControls( camera, renderer.domElement );
					control.addEventListener( 'change', render );
					control.setSize(0.5);
					var axis = new THREE.AxisHelper();
									axis.position.set( -500, -500, -500 );
									scene.add( axis );

					// Controls camera rotation and zooming
					controls = new THREE.OrbitControls( camera, renderer.domElement );
					controls.damping = 0.5;
					controls.enablePan = false;
					controls.minDistance=-200;
					controls.maxDistance=1000;
					controls.minAzimuthAngle=-Math.PI/2;
					controls.maxAzimuthAngle=Math.PI/2;				
					controls.minPolarAngle=-Math.PI/2;
					controls.maxPolarAngle=Math.PI/2;
					controls.zoomSpeed=2.0;	
					controls.addEventListener( 'change', render );

// GROUND
			    createGround();
				
				 createWall(750,-Math.PI/2,0,0xdbdbdb,"WallL");//Left
				 createWall(-750,Math.PI/2,0,0xdbdbdb,"WallR");//Right
				 createWall(-750,0,-900,0xdbdbdb,"WallF");
			/*	// SKYDOME
				var vertexShader = document.getElementById( 'vertexShader' ).textContent;
				var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
				var uniforms = {
					topColor:    { value: new THREE.Color( 0x0077ff ) },
					bottomColor: { value: new THREE.Color( 0xffffff ) },
					offset:      { value: 33 },
					exponent:    { value: 0.6 }
				};
				uniforms.topColor.value.copy( hemiLight.color );
				scene.fog.color.copy( uniforms.bottomColor.value );
				var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
				var sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );*/
			
				//loaderModels("");
				geometry=new THREE.BoxGeometry(100,100,100);//
				/*
				var mat=new THREE.MeshLambertMaterial({color:0xF3FFF2});
				var mesh = new THREE.Mesh(geometry, mat);
				mesh.position.set(0, 0, -1000);
				mesh.rotation.x=30;
				mesh.rotation.z=30;
				var geometry1=new THREE.BoxGeometry(100,200,100);//
				var mat1=new THREE.MeshLambertMaterial({color:0xF3FFF2});
				var mesh1 = new THREE.Mesh(geometry, mat);
				mesh1.position.set(100, 100, -1000);
				*/
				//camera.lookAt( mesh.position);

				/*scene.add(mesh);
				scene.add(mesh1);*/
				//control.attach( mesh );
				scene.add( control );
				//window.addEventListener( 'resize', onWindowResize, false );
				window.addEventListener( 'keydown', function ( event ) {
					switch ( event.keyCode ) {
						case 81: // Q
							control.setSpace( control.space === "local" ? "world" : "local" );
							break;
						case 17: // Ctrl
							control.setTranslationSnap( 100 );
							control.setRotationSnap( THREE.Math.degToRad( 15 ) );
							break;
						case 87: // W
							control.setMode( "translate" );
							break;
						case 69: // E
							control.setMode( "rotate" );
							break;
					/*	case 82: // R
							control.setMode( "scale" );
							break;*/
						case 187:
						case 107: // +, =, num+
							control.setSize( control.size + 0.1 );
							break;
						case 189:
						case 109: // -, _, num-
							control.setSize( Math.max( control.size - 0.1, 0.1 ) );
							break;
					}
				});
				window.addEventListener( 'keyup', function ( event ) {
					switch ( event.keyCode ) {
						case 17: // Ctrl
							control.setTranslationSnap( null );
							control.setRotationSnap( null );
							break;
					}
				});
				dragcontrols = new THREE.DragControls( splineHelperObjects, camera, renderer.domElement ); //
				dragcontrols.enabled = false;
				dragcontrols.addEventListener( 'dragstart', function ( event ) 
					{
						//options.innerHTML ="pos :"+event.object.position.x;
							
						objectSelect=event.object;
						document.getElementById("emptyobject_color").innerHTML='object:'+event.object.name;
						document.getElementById("ObjectMat").innerHTML='<label>Object : </label>'+event.object.name;
						$("#assignMat").removeClass("disabled");	
						$("#removeobject").removeClass("disabled");
						
					} );
				dragcontrols.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );
				dragcontrols.addEventListener( 'hoveron', function ( event ) {
					
						control.attach( event.object );
					
					
				//	options.innerHTML ="pos :"+event.object.position.x;
				document.getElementById("coordonne").innerHTML='<ul class="list-group">\
							  <li class="list-group-item">Position</li>\
							  <li class="list-group-item">x : '+Math.floor(event.object.position.x)+'\
							  y : '+Math.floor(event.object.position.y)+'\
							   z : '+Math.floor(event.object.position.z)+'</li>\
							  <li class="list-group-item">Rotation</li>\
							  <li class="list-group-item">x : '+Math.floor(event.object.quaternion.x)+'\
							  y : '+Math.floor(event.object.quaternion.y)+'\
							   z : '+Math.floor(event.object.quaternion.z)+'</li>\
							</ul>';
							
							
					cancelHideTransorm();
				} );
				
				dragcontrols.addEventListener( 'hoveroff', function ( event ) {
					delayHideTransform();
				} );
	

				controls.addEventListener( 'start', function() {
					cancelHideTransorm();
				} );
				controls.addEventListener( 'end', function() {
					delayHideTransform();
				} );
				var hiding;
				function delayHideTransform() {
					cancelHideTransorm();
					hideTransform();
				}
				function hideTransform() {
					hiding = setTimeout( function() {
						control.detach( control.object );
						objectSelect=null;
						document.getElementById("ObjectMat").innerHTML='<label>Object : </label>Clicker un object';
						$("#assignMat").addClass("disabled");
					$("#removeobject").addClass("disabled");
						document.getElementById("coordonne").innerHTML='<ul class="list-group">\
							  <li class="list-group-item">Position</li>\
							  <li class="list-group-item">x :\
							  y :\
							   z :</li>\
							  <li class="list-group-item">Rotation</li>\
							  <li class="list-group-item">x :\
							  y :\
							   z :</li>\
							</ul>';
							
						/*var d=document.getElementById("coordonne");
						d.remove();*/
					}, 2500 )
				}
				function cancelHideTransorm() {
					if ( hiding ) clearTimeout( hiding );
				}

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}
		    	var i;
				for ( i = 0; i < splinePointsLength; i ++ ) {
					addSplineObject( positions[ i ],i );
				}
				/*positions = [];
				for ( i = 0; i < splinePointsLength; i ++ ) {
					positions.push( splineHelperObjects[ i ].position );
				}*/	


}