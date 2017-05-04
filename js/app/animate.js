function animate() {
				requestAnimationFrame( animate );
				render();
				
				controls.update();
				if ( control.object != null) {
					if (control.object.position.x>-750 && control.object.position.x<750 ){
						    
							control.update();
					}else{
						if (control.object.position.x<-750)
								control.object.position.x = -700;
						else if(control.object.position.x>750)
								control.object.position.x = 750;	
					}
				        
				}
				if ( control.object != null) {
					document.getElementById("coordonne").innerHTML='<div id="coordonne"><ul class="list-group">\
							  <li class="list-group-item">Position</li>\
							  <li class="list-group-item">x : '+Math.floor(control.object.position.x)+'\
							  y : '+Math.floor(control.object.position.y)+'\
							   z : '+Math.floor(control.object.position.z)+'</li>\
							  <li class="list-group-item">Rotation</li>\
							  <li class="list-group-item">x : '+Math.floor(control.object.quaternion.x)+'\
							  y : '+Math.floor(control.object.quaternion.y)+'\
							   z : '+Math.floor(control.object.quaternion.z)+'</li>\
							</ul>';
							if(objectSelect!=null){
								$("#removeobject").removeClass("disabled");
							}
							

				}
				
			}
			function render() {
				/*raycaster.setFromCamera ( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
			
				if ( intersects.length > 0 ) {
					if ( INTERSECTED != intersects[ 0 ].object ) {
						control.attach( control.object );
						}
				}else{
					
					control.detach( control.object );
				}*/
				/*renderer.shadowMap.enabled = true;
				renderer.shadowMap.renderReverseSided = false;*/
				
				renderer.render( scene, camera );
			}