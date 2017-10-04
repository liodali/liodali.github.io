


var typesMat = document.getElementById("typeMat");
var mat,colorMat=0xffffff,colorMatEmissive=0x000000,colorMatSpectacular=0x000000;
var transp=false,opacityVal,shininessVal=50;
typesMat.addEventListener("change", function() {
    if(typesMat.value == "MeshBasicMaterial")
    {
    	$("#Roughness").hide();
    	$("#Emissive").hide();
        $("#Specular").hide();
    	transp=false;
    	opacityVal=1;
    	
       	mat=new THREE.MeshBasicMaterial( {
       		         color:colorMat,
					opacity: opacityVal,
					transparent: transp
				} );
        addActivityItem(mat);
    }else if(typesMat.value == "MeshPhongMaterial")
    {
    	$("#Roughness").hide();
    	$("#Emissive").hide();
        $("#Specular").show();
    	transp=false;
    	opacityVal=1;
        $("#Shininess").show();
    	mat=new THREE.MeshPhongMaterial( {
    				color:colorMat,
					opacity: opacityVal,
                    specular: colorMatSpectacular,
                    shininess:shininessVal,
                    reflectivity: 0,
                    shading: THREE.SmoothShading,
					transparent: transp
				} );
        addActivityItem(mat);
    }else if(typesMat.value == "MeshPhysicalMaterial")
    {
        
    	$("#Roughness").show();
    	//$("#Opacity").hide();
    	$("#Emissive").hide();
        $("#Specular").hide();
    	opacityVal=0.15;
    	transp=true;
        $("#Shininess").hide();
        mat=new THREE.MeshPhysicalMaterial( {
		        	color:colorMat,
		        	metalness: 0.0,
					roughness: 0,
					reflectivity:0,
					metalness: 1.0,
					opacity: opacityVal,
					side: THREE.FrontSide,
					transparent: transp,
					shading: THREE.SmoothShading,
					envMapIntensity: 5,
					premultipliedAlpha: true
            } );
        addActivityItem(mat);
    }else if(typesMat.value == "MeshLambertMaterial")
    {
        $("#Roughness").hide();
        $("#Emissive").show();
        $("#Shininess").hide();
        $("#Specular").hide();
        mat=new THREE.MeshLambertMaterial( {color:colorMat ,emissive:colorMatEmissive} );
        addActivityItem(mat);
    }
      document.getElementById("opacity").noUiSlider.set(opacityVal);
});

function addActivityItem(m) {
	
	sphere.material.copy(m);
	sphere.material.needsUpdate = true;
    
}