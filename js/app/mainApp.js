
var raycaster;
var splineHelperObjects = [];
var splinePointsLength = 4;
var positions = [];
var renderer,camera,scene,helper,geometry;
var dragcontrols;
var mouse = new THREE.Vector2(), INTERSECTED;
var objectSelect;	
var loadingManager = null;	
var container = document.createElement( 'div' );
var hide_canvas=0;
var nameFiles=[];
var ObjectLoader=[];
var nbr_files=0;
var fileExt = ".json";
var Url;
var click=0;
document.body.appendChild( container );



			init();
			animate();
			
			function createGround(){
	            var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
				var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff} );
			//	groundMat.color.setHSL( 0.075, 1, 0.75 );
				var ground = new THREE.Mesh( groundGeo, groundMat );
				ground.rotation.x -= Math.PI/2;
				ground.position.y = -100;
				ground.receiveShadow = true;
				ground.name="Floor";
				scene.add( ground );
			}

			function createWall(x,y,z,c,name){

							var WallGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
							 groundMat = new THREE.MeshLambertMaterial( { color: c});//, specular: 0x011505 } );
						//	groundMat.color.setHSL( 0.075, 1, 0.75 );
							var  Wall = new THREE.Mesh( WallGeo, groundMat );
							Wall.rotation.y = y;
							Wall.position.x = x;
							Wall.position.y = 0;
							Wall.position.z = z;
							Wall.name=name;
							Wall.receiveShadow = true;
							scene.add( Wall );
							var greenLight = new THREE.PointLight( c, 0.5, 1000 );
							greenLight.position.set( x-50, y+300, 0 );
							scene.add( greenLight );
							
			}	


function removeObject(){
	var index = splineHelperObjects.indexOf(objectSelect); 
	if (index > -1) {
		control.detach( objectSelect );
    splineHelperObjects.splice(index, 1);
    splinePointsLength--;
	}
	
	scene.remove(objectSelect);
	$("#removeobject").addClass("disabled");

}
//create geometry ou change interface 
function makeGeometry(x){

				if(x==1){
				
							nameFiles=[];
						 nbr_files=0;
						 document.getElementById("ContentModels").innerHTML="";
						 Url="./model/salle/";
						GetFileOdModels(Url);	
						$("#back").removeClass("hide");
						$("#backAdd").text("Living Room");
						$("#backAdd").addClass('active');
						hide_canvas=1;	
						click==1;
				}else if(x==2){
								 nameFiles=[];
						 nbr_files=0;
						 document.getElementById("ContentModels").innerHTML="";
						 Url="./model/cuisine/";
						GetFileOdModels(Url);	
						$("#back").removeClass("hide");
						$("#backAdd").text("Kitchen");
						$("#backAdd").addClass('active');
						hide_canvas=1;	
						click==1;
				}else if(x==4){

					
			
					
				}else if(x==3){

					
						 nameFiles=[];
						 nbr_files=0;
						 $("#back").removeClass("hide");
						$("#backAdd").text("Table");
						 document.getElementById("ContentModels").innerHTML="";
						 Url="./model/table/";
						GetFileOdModels(Url);	
						
			
			}
		}
function backhome(){
						nameFiles=[];
						$("#back").addClass("hide");
						$("#mycanvas").show();
						$("#Models").addClass("hide");
						$("#ContentModels").addClass("hide");
						nbr_files=0;
						$("#mycanvas").show();
						hide_canvas=0;	

}
			
function addSplineObject( position,index ) {
				console.log(index);
				//var material = new THREE.MeshPhongMaterial( { color:  0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
			/*	var mat =new THREE.MeshLambertMaterial( {
					color: Math.random() * 0xffffff
					} );
				var object = new THREE.Mesh( geometry,mat );
				//object.material.ambient = object.material.color;
				if ( position ) {
					object.position.copy( position );
				} else {
					object.position.x = Math.random() * 1000 - 500;
					object.position.y = -55;
					object.position.z = Math.random() * 800 - 400;
				}
				object.castShadow = true;
				object.receiveShadow = true;
				object.name="mesh"+index;
				scene.add( object );
				splineHelperObjects.push( object );*/
				switch(index){
						case 0:
						loaderInitScene(-529,-85,0,"./model/salle/couch.json",index);
						
							break;
						case 1:
							loaderInitScene(64,-76,-13,"./model/table/table5.json",index);
							//splineHelperObjects.push( scene.getObjectByName("mesh1") );
				
							break;
						case 2:
							loaderInitScene(-336,-7,-492,"./model/salle/chair2.json",index);
							//splineHelperObjects.push( scene.getObjectByName("mesh2") );
				
							break;
						case 3:
						loaderInitScene(626,-77,-81,"./model/salle/table_salle.json",index);
						//splineHelperObjects.push( scene.getObjectByName("mesh3") );
						//splineHelperObjects[3].object.rotateX(180);
						 
							break;
				}
				console.log(splineHelperObjects);
				//return object;
			}
function loaderInitScene(x,y,z,modelName,index){
	var manager = new THREE.LoadingManager();
				var loader = new THREE.JSONLoader(manager);
				loader.load( modelName, function ( geo,mats ) {
					
					//var objCollada = collada.scene;
					var mat=new THREE.MultiMaterial(mats);
					 var model=new THREE.Mesh(geo,mat);
					
					 
					
					if(model!=undefined){
					
						//console.log(i);
						
							// add one random mesh to each scene
						//	scene_m.add(loaderModels(Url+nameFiles[i]));
							//console.log(loaderModels(Url+nameFiles[i]));
							 model.position.set(x,y,z);
							model.scale.set(50,50,50);
							/*if ( position ) {
								model.position.copy( position );
							}*/
							if(index==3){
								model.rotateY(-91	);
							}
							model.material.side = THREE.DoubleSide;
							model.castShadow = true;
							model.receiveShadow = true;
							model.updateMatrix();
							model.name="mesh"+index;
							scene.add( model );
							 console.log(model);
							splineHelperObjects.push( model );
							
							
					}
					
					});
}
function GetFileOdModels(Url){
				
				$(document).ready(function () 
						    {
						         
						          $.get(Url, function(data) 
							        {
							            $(data).find("a:contains(" + fileExt + ")").each(function () {

						                    	nbr_files++;

						                        nameFiles.push($(this).text());
						                        	
						                    });
							            $("#mycanvas").hide();
										$("#Models").removeClass("hide");
										$("#ContentModels").removeClass("hide");
										$('#wait').modal('show');
										$("#prog").css("width", "1%");
										InsertModels(Url);		
							        });
						      });
						       
			}
// gestion des Texturing
function addTexture(x,image){
				
				var e = document.getElementById("AcTexture");
				var strT = e.options[e.selectedIndex].value;
				
				switch(strT){
					case "Floor": 
							var object = scene.getObjectByName( strT);
							//affTexture(loader,image,object);

							var texture= new THREE.TextureLoader().load( image );
							texture.wrapS = THREE.RepeatWrapping;
							texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set( 32, 32 );
							object.material.map=texture;
							object.material.needsUpdate = true;
							choixTexture(x,object);
						break;

					case "WallF":case "WallR": case "WallL":
							var object = scene.getObjectByName( strT);
							var texture= new THREE.TextureLoader().load( image );
							texture.wrapS = THREE.RepeatWrapping;
							texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set( 128, 128 );
							object.material.map=texture;
							object.material.needsUpdate = true;
							choixTexture(x,object);
						break;	
				}
			}
			function affTexture(url,obj){
				
						var texture= THREE.TextureLoader( image );

							
							loader.wrapS = THREE.RepeatWrapping;
							loader.wrapT = THREE.RepeatWrapping;
							loader.repeat.set( 128, 128 );	
							obj.material.map=loader;
							
							obj.material.map.needsUpdate = true;
			}
			
			function choixTexture(x,object){
				
				switch(x){
					case 1:
						
						affNormaleTexture("texture/t1_normal.jpg",object );
						
						break;

					case 2:
						affNormaleTexture( "texture/t2_normal.jpg",object  );
						
						break;
						
				
				}
				
			}
			function affNormaleTexture(url,obj){
			
							var texture= THREE.TextureLoader( image );
							texture.wrapS = THREE.RepeatWrapping;
							texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set( 128, 128 );	
							  // do something with the texture
							obj.material.normalMap=texture;
							obj.material.needsUpdate = true;
							console.log(obj);
							    
							
							
			}
			function removeTexture(){
				
					var e = document.getElementById("AcTexture");
				var strT = e.options[e.selectedIndex].value;
				
				switch(strT){
					case "Floor":
							var object=object= scene.getObjectByName( strT);
							//affTexture(loader,image,object);
							
							object.material.copy(new THREE.MeshPhongMaterial( { color: 0xffffff}));
								object.material.needsUpdate = true;
						break;

					case "WallR":case "WallF":	case "WallL":
							 var object=object= scene.getObjectByName( strT);
							//affTexture(loader,image,object);
							
							object.material.copy(new THREE.MeshLambertMaterial( { color: 0xdbdbdb}));
								object.material.needsUpdate = true;
							
						break;
					
				}
			
			}

