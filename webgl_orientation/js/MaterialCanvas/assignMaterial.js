function assignMat(){
  if(objectSelect.parent instanceof THREE.Group){
  	  	objectSelect.material.materials[1].copy(sphere.material);
 objectSelect.material.needsUpdate = true;
 objectSelect=null;	
  }	else{
     objectSelect.material.copy(sphere.material);
 objectSelect.material.needsUpdate = true;
 objectSelect=null;
  	
  }
 
}