

var renderer,camera,scene,helper,geometry,axishelp,airplan;

var loadingManager = null;
var container = document.createElement( 'div' );

var nbr_files=0;
var fileExt = ".json";
var Url;
var click=0;

var cube;
// data default
var theta,delta,phy;
var tx=0.04,ty=0.04,tz=0.04;
var Xord=1,Yord=2,Zord=3;
var playanim=false;
var resetcube=false;
var translation=false;
var Rotationfinal=new THREE.Matrix4();
 var $toastContent = $('<span>Check Order Rotation</span>').add($('<button class="btn-flat toast-action">Undo</button>'));
 var degree_x, degree_y,degree_z;
 var new_theta=0, new_delta=0,new_phy=0;
// Set up the sphere vars
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;
document.body.appendChild( container );


			var zero=new THREE.Matrix4();
			zero.set(1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					0,0,0,1);
			init();
			animate();


function showMenu(){
	if($("#menu").hasClass("scale-out")){
		$("#btmenu").removeClass("pulse");
		$("#menu").removeClass("scale-out");
		$("#menu").addClass("scale-in");
	}else{
		$("#menu").removeClass("scale-in");
		$("#menu").addClass("scale-out");
		$("#btmenu").addClass("pulse");
	}

}
function reset(){
	$("#menu").removeClass("scale-in");
		$("#menu").addClass("scale-out");
		$("#btmenu").addClass("pulse");
	playanim=false;
	resetcube=true;
}
function playanimation(){

	 degree_x=$("#theta").val();
	 degree_y=$("#phi").val();
	 degree_z=$("#delta").val();
	var order_x=$("#ordertheta").val();
	var order_y=$("#orderphi").val();
	var order_z=$("#orderdelta").val();
	var t_x=$("#x").val();
	var t_y=$("#y").val();
	var t_z=$("#z").val();
	console.log(order_y);
	if(order_z==order_x  || order_z==order_y || order_y==order_x ){

  			Materialize.toast($toastContent, 10000);
	}else{
		$("#menu").removeClass("scale-in");
		$("#menu").addClass("scale-out");
		$("#btmenu").addClass("pulse");
		Xord=order_x;
		Yord=order_y;
		Zord=order_z;
		tx=t_x;
		ty=t_y;
		tz=t_z;
		theta=degree_x* Math.PI /180;
		delta=degree_y* Math.PI /180;
		phy=degree_z* Math.PI /180;
		playanim=true;
	}


}
