
function animate() {
				requestAnimationFrame( animate );
				render();
				
				//console.log("r: "+Res.elements);
				//console.log("c: "+cube.matrix.elements);
				//controls.update();
				
			
			}
			function render() {
				var speed1 =  0.001;//0.001;
				var speed2 =  0.01;

				
				
				if(new_phy>=(phy/23) && new_delta>=(delta/23) && new_theta>=(theta/23)){
					playanim=false;
					new_theta=0; 
					new_delta=0;
					new_phy=0;
				}
				if(playanim){
					 new_theta=new_theta+theta*speed1;
					 new_delta=new_delta+ delta*speed1;
					 new_phy=new_phy+phy*speed1;
					console.log(new_theta );
					console.log(theta );
					/* ***** calculation ***** */
					// rotation x we used theta=30
					var rotx=new  THREE.Matrix4();
					rotx.set(1,0,0,0 ,
						     0,Math.cos(new_theta),Math.sin(new_theta),0, 
						     0,-Math.sin(new_theta),Math.cos(new_theta),0,
						     0,0,0,1 );
					//console.log(rotx.elements );
					// rotation y we used delta=25
					var roty=new  THREE.Matrix4();
					roty.set(Math.cos(new_delta),0,-Math.sin(new_delta),0, 
							 0,1,0,0 ,
						     Math.sin(new_delta),0,Math.cos(new_delta),0,
						     0,0,0,1 );
					//console.log(roty.elements );
					var rotz=new THREE.Matrix4();
					rotz.set(Math.cos(new_phy),-Math.sin(new_phy),0,0,
							Math.sin(new_phy),Math.cos(new_phy),0,0,
							0,0,1,0,
							0,0,0,1);
					
					var R=prod_order(Xord,Yord,Zord,rotx,roty,rotz);
					//translation
					var Trans=new THREE.Matrix4();
					Trans.set(1,0,0,tx*speed2,
							  0,1,0,ty*speed2,
							  0,0,1,tz*speed2,
							  0,0,0,1);

					// mutliple T*R
					var Res=new THREE.Matrix4();
					Res.multiplyMatrices(R,Trans);
					
					airplan.applyMatrix(Res);
					axishelp.applyMatrix(Res);
					//playanim=false;
				}
				if(resetcube){

					airplan.position.set(0,0,0);
					airplan.rotation.set(0,0,0);
					axishelp.position.set(0,0,0);
					axishelp.rotation.set(0,0,0);
					resetcube=false;
				}
				
			
				
				renderer.render( scene, camera );
			}
			function calculprodMat(mat1,mat2){
				var R=new THREE.Matrix4();
				
				R.multiplyMatrices(mat1,mat2);
				return R;
			}
			function prod_order(xo,yo,zo,rx,ry,rz){
				var r1,r;
					if(xo=="1"){// rotation x first
						if(yo=="2"){
							 r1=calculprodMat(rx,ry);
							 r=calculprodMat(r1,rz);
							
						}else{
							 r1=calculprodMat(rx,rz);
							 r=calculprodMat(r1,ry);
						}
					}else
					if(yo=="1"){// rotation y first
						if(xo=="2"){
							 r1=calculprodMat(ry,rx);
							 r=calculprodMat(r1,rz);
							return r;
						}else{
							 r1=calculprodMat(ry,rz);
							 r=calculprodMat(r1,rx);
						}
					}else
					if(zo=="1"){// rotation y first
						if(xo=="2"){
							 r1=calculprodMat(rz,rx);
							 r=calculprodMat(r1,ry);
							return r;
						}else{
							 r1=calculprodMat(rz,ry);
							 r=calculprodMat(r1,rx);
						}
					}
					return r;	

			}