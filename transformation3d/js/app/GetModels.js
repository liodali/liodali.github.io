var canvas;
var scenes_M = [], renderer_3;
var index=0;
var geometries = [];
function InsertModels(Url){
	index=0;
	geometries = [];
	scenes_M = [];
	initModels(Url);
	animateModels();

}
function initModels(Url){

	canvas = document.getElementById( "Models" );
	var template = document.getElementById( "template" ).text;
	var content = document.getElementById( "ContentModels" );
	


   
	
	for(var i=0;i<nbr_files;i++){
		
					
			
					var manager = new THREE.LoadingManager();
					var loader = new THREE.ColladaLoader(manager);
			
					var scene_m = new THREE.Scene();
					var element = document.createElement( "div" );
					element.className = "list-item";
					element.id="M"+(i+1);
					element.innerHTML = template.replace( '$', i + 1);
					var element1 = document.createElement( "div" );
					element1.innerHTML="<button  class=\"btn btn-primary\" onclick='addToMainScene("+i+")'>add</div>";
					element.appendChild(element1);
					
					scene_m.userData.element = element.querySelector( ".scene" );
		
					content.appendChild(element);



					var camera = new THREE.PerspectiveCamera( 50, 1, 1, 1000 );
					camera.position.z = -5;
					camera.position.x =1;
					scene_m.userData.camera = camera;
					var controls = new THREE.OrbitControls( scene_m.userData.camera, scene_m.userData.element );
					controls.minDistance = 2;
					controls.maxDistance = 5;
					controls.enablePan = false;
					controls.enableZoom = true;
					scene_m.userData.controls = controls;

					
							
							
							var light = new THREE.DirectionalLight( 0xffffff, 0.4 );
							light.position.set( 0, 8, 1 );
							scene_m.add( light );
							scenes_M.push( scene_m );
		
	}
	//console.log(scenes_M[0]);
	loadingJSON(Url,scenes_M);

				renderer_3 = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
				renderer_3.setClearColor( 0xffffff, 1 );
				renderer_3.setPixelRatio( window.devicePixelRatio );

}
function loadingJSON(Url,scenes){
	var manager = new THREE.LoadingManager();
		var loader = new THREE.JSONLoader(manager);
		
					
			if (index > nbr_files.length - 1) return;
			var mesh = new THREE.Object3D();
			loader.load( Url+nameFiles[index], function ( geo,mats ) {
					
					//var objCollada = collada.scene;
					var mat=new THREE.MultiMaterial(mats);
					 model=new THREE.Mesh(geo,mat);
					if(model!=undefined){
						var s=scenes_M[index];
						//console.log(i);
							
							if(index>0){
								$("#prog").css("width", (index * 25) +"%");
							}
							// add one random mesh to each scene
						//	scene_m.add(loaderModels(Url+nameFiles[i]));
							//console.log(loaderModels(Url+nameFiles[i]));
							model.position.set(0,0, 0);
							model.scale.set(0.5,0.5,0.5);
							console.log( model);
							model.material.side = THREE.DoubleSide;
					
							model.updateMatrix();
							s.userData.camera.lookAt(model);
							s.add(model);
							index++;
							geometries.push(model);
							console.log(geometries);
							loadingJSON(Url,scenes);
							if(index ==nbr_files ){
								$("#prog").css("width", (4 * 25) +"%");
								$('#wait').modal('hide');
							}
							
					}
					
					});
}
function animateModels() {
				renderModels();
				requestAnimationFrame( animateModels );
			}

			function updateSize() {
				var width = canvas.clientWidth;
				var height = canvas.clientHeight;
				if ( canvas.width !== width || canvas.height != height ) {
					renderer_3.setSize( width, height, false );
				}
			}
function renderModels() {
				updateSize();
				renderer_3.setClearColor( 0xffffff );
				renderer_3.setScissorTest( false );
				renderer_3.clear();
				renderer_3.setClearColor( 0xe0e0e0 );
				renderer_3.setScissorTest( true );
				scenes_M.forEach( function( scenes ) {
					// so something moves
					scenes.children[0].rotation.z = Date.now() * 0.001;
					// get the element that is a place holder for where we want to
					// draw the scene
					var element = scenes.userData.element;
					// get its position relative to the page's viewport
					var rect = element.getBoundingClientRect();
					// check if it's offscreen. If so skip it
					if ( rect.bottom < 0 || rect.top  > renderer_3.domElement.clientHeight ||
						 rect.right  < 0 || rect.left > renderer_3.domElement.clientWidth ) {
						return;  // it's off screen
					}
					// set the viewport
					
					var width  = rect.right - rect.left;
					var height = rect.bottom - rect.top;
					var left   = rect.left;
					var bottom = renderer_3.domElement.clientHeight - rect.bottom;
					renderer_3.setViewport( left, bottom, width, height );
					renderer_3.setScissor( left, bottom, width, height );
					var camera = scenes.userData.camera;
					//camera.aspect = width / height; // not changing in this example
					//camera.updateProjectionMatrix();
					//scene.userData.controls.update();
					renderer_3.render( scenes, camera );
				} );
			}




			function addToMainScene(i){
			


					splinePointsLength++;
					splineHelperObjects.push(geometries[i]);
					geometries[i].scale.set(50,50,50);
				
					scene.add(geometries[i]);
					$("#back").addClass("hide");
					$("#mycanvas").show();
					$("#Models").addClass("hide");
					$("#ContentModels").addClass("hide");
			}