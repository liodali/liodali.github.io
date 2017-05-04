			


			var splineHelperObjects = [],
				splineOutline;
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
			var stats = new Stats();
			var renderer = new THREE.WebGLRenderer();
			var container = document.createElement( 'div' );
				document.body.appendChild( container );
			renderer.setClearColor( 0xf0f0f0 );
				renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
			var light = new THREE.SpotLight( 0xffffff, 1.5 );
			light.position.set( 0, 1500, 200 );
				light.castShadow = true;
				light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) );
				light.shadow.bias = -0.000222;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
				scene.add( light );
				spotlight = light;


			var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
				planeGeometry.rotateX( - Math.PI / 2 );
				var planeMaterial = new THREE.ShadowMaterial();
				planeMaterial.opacity = 0.2;

				var plane = new THREE.Mesh( planeGeometry, planeMaterial );
				plane.position.y = -200;
				plane.receiveShadow = true;
				scene.add( plane );

			
				var helper = new THREE.GridHelper( 2000, 100 );
				helper.position.y = - 199;
				helper.material.opacity = 0.25;
				helper.material.transparent = true;
				scene.add( helper );	
			var axis = new THREE.AxisHelper(5);
			axis.position.set( -500, -500, -500 );
  			scene.add(axis);
  					
			var geometry = new THREE.BoxGeometry( 4, 2, 5 );
			var material = new THREE.MeshLambertMaterial( { color: 0x0022aa } );
			var cube = new THREE.Mesh( geometry, material );
			cube.position.x = 10;
			cube.position.y = 10;
			cube.position.z = 10;
			scene.add( cube );
			var cube1 = new THREE.Mesh( geometry, material );
			cube1.position.x = 20;
			cube1.position.y = 10;
			cube1.position.z = 20;
			scene.add( cube1 );
		    camera.position.x = 30;
  			camera.position.y = 40;
  			camera.position.z = 40;
  		
  			// Controls
				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.damping = 0.2;
				controls.addEventListener( 'change', render );

				transformControl = new THREE.TransformControls( camera, renderer.domElement );
				transformControl.addEventListener( 'change', render );

				scene.add( transformControl );
	

			/*
			
				 begin

			*/	



			// Hiding transform situation is a little in a mess :()
				transformControl.addEventListener( 'change', function( e ) {

					cancelHideTransorm();

				} );

				transformControl.addEventListener( 'mouseDown', function( e ) {

					cancelHideTransorm();

				} );

				transformControl.addEventListener( 'mouseUp', function( e ) {

					delayHideTransform();

				} );

				

				var dragcontrols = new THREE.DragControls( splineHelperObjects, camera, renderer.domElement ); //
				dragcontrols.enabled = false;
				dragcontrols.addEventListener( 'hoveron', function ( event ) {

					transformControl.attach( event.object );
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

						transformControl.detach( transformControl.object );

					}, 2500 )

				}

				function cancelHideTransorm() {

					if ( hiding ) clearTimeout( hiding );

				}


				var geometry = new THREE.Geometry();

				for ( var i = 0; i < 4; i ++ ) {

					geometry.vertices.push( new THREE.Vector3() );

				}	


			// end
  			// rotation
  			var isDragging = false;
			var previousMousePosition = {
			    x: 0,
			    y: 0
			};
  			$(renderer.domElement).on('mousedown', function(e) {
			    isDragging = true;
			})
			.on('mousemove', function(e) {
			    //console.log(e);
			    var deltaMove = {
			        x: e.offsetX-previousMousePosition.x,
			        y: e.offsetY-previousMousePosition.y
			    };

			    if(isDragging) {
			            
			        /*var deltaRotationQuaternion = new THREE.Quaternion()
			            .setFromEuler(new THREE.Euler(
			                toRadians(deltaMove.y * 1),
			                toRadians(deltaMove.x * 1),
			                0,
			                'XYZ'
			            ));
			        
			        cube1.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube1.quaternion);
			        axis1.quaternion.multiplyQuaternions(deltaRotationQuaternion, axis1.quaternion);*/
			        //cube1.position.x+=0.1;
			    }
			    
			    previousMousePosition = {
			        x: e.offsetX,
			        y: e.offsetY
			    };
			});
			/* */

			$(document).on('mouseup', function(e) {
			    isDragging = false;
						});
						window.requestAnimFrame = (function(){
			    return  window.requestAnimationFrame ||
			        window.webkitRequestAnimationFrame ||
			        window.mozRequestAnimationFrame ||
			        function(callback) {
			            window.setTimeout(callback, 1000 / 60);
			        };
			})();

				var light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );

			var lastFrameTime = new Date().getTime() / 1000;
			var totalGameTime = 0;
			function update(dt, t) {
			    //console.log(dt, t);
			    
			    //camera.position.z += 1 * dt;
			    //cube.rotation.x += 1 * dt;
			    //cube.rotation.y += 1 * dt;
			    
			    setTimeout(function() {
			        var currTime = new Date().getTime() / 1000;
			        var dt = currTime - (lastFrameTime || currTime);
			        totalGameTime += dt;
			        
			        update(dt, totalGameTime);
			    
			        lastFrameTime = currTime;
			    }, 0);
			}


			//camera.position.z = 5;
			camera.lookAt(scene.position);	
			
			function animate() {

				requestAnimationFrame( animate );
				render();
				stats.update();
				controls.update();
				transformControl.update();

			}
			var render = function () {
				/*	requestAnimationFrame( render );
				cube.rotation.x += 0.05;
				cube.rotation.y += 0.1;
				axis.rotation.x += 0.05;
				axis.rotation.y += 0.1;*/
				renderer.render(scene, camera);
			};
			//render();
			//animate();
			update(0, totalGameTime);
			function toRadians(angle) {
				return angle * (Math.PI / 180);
			}

			function toDegrees(angle) {
				return angle * (180 / Math.PI);
			}