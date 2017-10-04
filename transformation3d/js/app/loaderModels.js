function loaderModels(name){
	console.log(name);
loadingManager = new THREE.LoadingManager();



var group = new THREE.Group();
var loader = new THREE.ColladaLoader(loadingManager);
				//loader.options.convertUpAxis = true;
				loader.load( name, function ( collada ) {
					var objCollada = collada.scene;
					objCollada.traverse(function(child){
						
							child.traverse(function(e){
							

							   e.updateMatrix();
						    	
							});
							
						

					});
					//objCollada.scale.set(100,100,100);
					
					objCollada.position.set(0, 55, 55);
					objCollada.scale.set(60,60,60);
					
					objCollada.updateMatrix();
				
					console.log(objCollada);	
					group.add(objCollada);
				
				    scene.add(group);
				    splinePointsLength++;
					splineHelperObjects.push(group.children[0]); //group.children[0].children[0] );
				

	
					
					//console.log(group.children[0]);
				} );

}