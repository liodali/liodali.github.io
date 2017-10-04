



var renderer2, camera2,scene2,helper1,geometry1,sphere,control_Mat;
function Run(){

console.log("hi");
var w=150,h=150;

scene2=new THREE.Scene();
//scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
//scene.fog.color.setHSL( 0.6, 0, 1 );
renderer2=new THREE.WebGLRenderer({canvas :document.getElementById('MatCanvas'),antialias : true});
renderer2.setClearColor(0xefefef);
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(w,h);
renderer2.shadowMap.enabled = true;
renderer2.shadowMap.type = THREE.BasicShadowMap; // default THREE.PCFShadowMap
//renderer.setClearColor( scene.fog.color );
renderer2.gammaInput = true;
renderer2.gammaOutput = true;
//renderer.shadowMap.renderReverseSided = false;	

 camera2=new THREE.PerspectiveCamera(60,w/h,0.1,5000);
camera2.position.set( 0, 200, 2000 );
 
// LIGHTS
	var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( 
		{ color: 0xffffff } 
		) );
	scene2.add( particleLight );
	ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene2.add(ambientLight);
	var directionalLight = new THREE.DirectionalLight( /*Math.random() * */ 0xffffff, 0.3 );
	
	scene2.add( directionalLight );
	var pointLight = new THREE.PointLight( 0xffffff, 1 );
	particleLight.add( pointLight );
	



//scene.add( new THREE.GridHelper( 1000, 10 ) );// helpergrid
helper1 = new THREE.GridHelper( 2000, 100 );
helper1.position.y = - 500;
helper1.material.opacity = 0.25;
helper1.material.transparent = true;
scene2.add( helper1 );


 geometry1 = new THREE.SphereGeometry(500, 32, 32 );
var material = new THREE.MeshLambertMaterial( {color: 0xdddddd, shading: THREE.SmoothShading } );
 sphere = new THREE.Mesh( geometry1, material );
	sphere.receiveShadow = true;
	sphere.castShadow = true;
	scene2.add(sphere);

// Controls camera rotation and zooming
control_Mat  = new THREE.OrbitControls( camera2, renderer2.domElement );
control_Mat.damping = 0.5;
control_Mat.enablePan = true;

control_Mat.maxDistance=2000;

control_Mat.zoomSpeed=2.0;	
control_Mat.addEventListener( 'change', renderMat );
scene2.add( control_Mat );


}


Run();
animateMat();
function animateMat() {
	requestAnimationFrame( animateMat );
	control_Mat.update();
	renderMat();
}
function renderMat() {
				
				renderer2.render( scene2, camera2 );
			}















