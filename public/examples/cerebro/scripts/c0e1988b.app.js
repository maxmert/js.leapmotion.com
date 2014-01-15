!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c,d,e;e=new Backbone.Marionette.Application,e.config=a("./config.coffee"),c=a("./layouts/spinner.coffee"),d=a("./routers/newmer.coffee"),$.app=e,e.addRegions({content:"#content",spinner:"#spinner"}),e.ensureAuth=function(a){return $.ajax({url:"/ensureAuth",type:"GET",dataType:"json",success:a,error:function(){return e.router.navigate("/error",{trigger:!0,replace:!0})}})},e.spinner.show(new c),e.addInitializer(function(){return $.app.vent.on("route:index",function(){var b;return b=a("./layouts/index.coffee"),e.vent.trigger("loading:text","Loading main page"),e.content.show(new b)}),$.app.vent.on("route:cerebro",function(){var b;return b=a("./layouts/cerebro.coffee"),e.vent.trigger("loading:text","loading Cerebro"),e.content.show(new b)}),$.app.vent.on("route:error",function(){var b;return b=a("./layouts/error.coffee"),e.vent.trigger("loading:text","loading error list"),e.content.show(new b)}),this.router=new d,this.router.on("route",function(){return e.vent.trigger("loading:start"),e.vent.trigger("route"),$("body").attr("id",Backbone.history.location.id),null!=$.music?$.music.pause():void 0}),Backbone.history.start({pushState:!0,silent:!1,trigger:!0}),$.app.config.debug?console.info("Router :: Initialized"):void 0}),b.exports=e},{"./config.coffee":4,"./layouts/cerebro.coffee":20,"./layouts/error.coffee":21,"./layouts/index.coffee":22,"./layouts/spinner.coffee":23,"./routers/newmer.coffee":28}],2:[function(a,b){var c;c=a("../models/profile.coffee"),b.exports=Backbone.Collection.extend({url:function(){return $.app.config.google?""+$.app.config.api+"/analytics/profiles":"./scripts/profiles.json"},model:c})},{"../models/profile.coffee":25}],3:[function(a,b){var c,d;d=a("../itemviews/profile.coffee"),c=a("../collections/profiles.coffee"),b.exports=Backbone.Marionette.CollectionView.extend({tagName:"select",className:"profiles",itemView:d,collection:c,events:{change:"getProject"},initialize:function(){return this.listenTo($.app.vent,"project:next",this.next),this.listenTo($.app.vent,"project:prev",this.prev)},next:function(){return this.$el.find("option:selected").removeAttr("selected").next("option").attr("selected","selected"),$.app.vent.trigger("project:get",this.$el.find("option:selected").attr("name"))},prev:function(){return this.$el.find("option:selected").removeAttr("selected").prev("option").attr("selected","selected"),$.app.vent.trigger("project:get",this.$el.find("option:selected").attr("name"))},onRender:function(){return $.app.vent.trigger("project:get",this.$el.find("option:first-child").attr("name"))},getProject:function(){return $.app.vent.trigger("project:get",this.$el.find("option:selected").attr("name"))}})},{"../collections/profiles.coffee":2,"../itemviews/profile.coffee":17}],4:[function(a,b){Backbone.Marionette.Renderer.render=function(a,b){return Mustache.to_html(a,b)},$(document).on("click","a:not([data-bypass])",function(a){var b,c;return b={prop:$(this).prop("href"),attr:$(this).attr("href")},c=location.protocol+"//"+location.host,b.prop&&b.prop.slice(0,c.length)===c?(a.preventDefault(),Backbone.history.navigate(b.attr,!0)):void 0}),b.exports={debug:!1,api:"/api/0.1",music:"Shudan_Ancients",voice:!0,google:!1}},{}],5:[function(){var a,b,c,d;c=null,d=null,b=null,a={enableGestures:!0},Leap.loop(a,function(a){var e,f,g;if(null!=a&&a.valid){if($.leap={initialized:!0,frame:a},$.leap.gestureCircle=$.leap.frame.gestures.length>0?"circle"===$.leap.frame.gestures[0].type&&"stop"===$.leap.frame.gestures[0].state&&$.leap.frame.gestures[0].progress>1?$.leap.frame.gestures[0]:null:null,1!==$.leap.frame.hands.length)return 2===$.leap.frame.hands.length?(f=$.leap.frame.hands[0],g=$.leap.frame.hands[1],f.fingers.length>3&&g.fingers.length>3?(b=null,null==d&&(d=g.sphereCenter[2]-f.sphereCenter[2]),$.leap.zoom=(g.sphereCenter[2]-f.sphereCenter[2]-d)/500):(d=null,null==b&&(b=g.sphereCenter[2]-f.sphereCenter[2]),$.leap.fingerzoom=(g.sphereCenter[2]-f.sphereCenter[2]-b)/500)):(d=null,b=null);if(d=b=null,e=$.leap.frame.hands[0],$.leap.handMove=e.palmPosition,e.fingers.length>3)return null==c&&(c=e._translation),$.leap.fingerMove=null,$.leap.handRotate={translation:e._translation,velocity:e.palmVelocity},null!=c&&($.leap.handRotate.normalize=[c[0]-$.leap.handRotate.translation[0],c[1]-$.leap.handRotate.translation[1],c[2]-$.leap.handRotate.translation[2]]),$.leap.handRotateVelocity=e.palmVelocity;if(c=null,$.leap.handRotate=null,1===e.fingers.length)return $.leap.fingerMove=e.fingers[0]}})},{}],6:[function(){"use strict";$.app.vent.on("project:set",function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;for(null!=$.earthVisits&&$.scene.remove($.earthVisits),null!=$.earthVisitsSphere&&$.scene.remove($.earthVisitsSphere),null!=$.earthVisitsSphereText&&$.scene.remove($.earthVisitsSphereText),i=new THREE.Geometry,j=new THREE.Geometry,i.dynamic=!0,b=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.attributes),A=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.uniforms),A.texture.value=THREE.ImageUtils.loadTexture("./images/cerebro/textures/b39061c7.dot.png"),v=new THREE.ShaderMaterial({uniforms:A,attributes:b,vertexShader:THREE.ShaderExtras.particle.vertexShader,fragmentShader:THREE.ShaderExtras.particle.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0,fog:!0}),i.verticesNeedUpdate=!0,$.earthVisits=new THREE.ParticleSystem(i,v),$.earthVisits.dynamic=!0,$.earthVisits.sortParticles=!0,c=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.attributes),c.displacement.needsUpdate=!0,c.customColor.needsUpdate=!0,B=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.uniforms),B.opacity.value=.1,p=new THREE.ShaderMaterial({uniforms:B,attributes:c,vertexShader:THREE.ShaderExtras.line.vertexShader,fragmentShader:THREE.ShaderExtras.line.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0,fog:!0}),$.earthVisitsSphere=new THREE.Line(j,p,THREE.LinePieces),L=a.rows,J=0,K=L.length;K>J;J++)G=L[J],f=G[0],g=G[1],d=G[2],m=G[3],n=G[4],o=G[5],t=G[6],q=G[7],r=latLongToVector3(m,n,100,5),i.vertices.push(r);for(k=0;k<a.rows.length;)u=Math.floor(Math.random()*(a.rows.length-1))+0,m=a.rows[u][3],n=a.rows[u][4],s=latLongToVector3(m,n,100,0),j.vertices.push(s),k++;for(F=$.earthVisits.geometry.vertices,E=b.size.value,D=b.customColor.value,y=[],k=0;k<F.length;)E[k]=3,D[k]=new THREE.Color(15243832),function(a,b,c){return c[a]=new TWEEN.Tween({x:1},{loop:!0}).to({x:Math.floor(15*Math.random())+1},Math.floor(4e3*Math.random())+1e3).repeat(1/0).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(){return b[a]=this.x}).start()}(k,E,y),b.size.needsUpdate=!0,b.customColor.needsUpdate=!0,k++;for($.earthVisitsSphereText=new THREE.Object3D,$.scene.add($.earthVisitsSphereText),x={height:.1,size:.7,curveSegments:4,bevelThickness:2,bevelSize:1.5,bevelSegments:3,font:"droid sans"},w=new THREE.MeshBasicMaterial({color:13421772,transparent:!0,opacity:.4}),F=$.earthVisitsSphere.geometry.vertices,h=c.displacement.value,e=c.customColor.value,C=0,I=0,z=[],l=[];C<F.length;)h[C]=new THREE.Vector3(Math.random(),Math.random(),Math.random()),e[C]=new THREE.Color(16775584),function(a,b,c){return u=Math.floor(Math.random()*b.length)+0,c[a]=new TWEEN.Tween({x:b[a].x,y:b[a].y,z:b[a].z},{loop:!0}).to({x:b[u].x,y:b[u].y,z:b[u].z},Math.floor(2e4*Math.random())+3e3).repeat(1/0).delay(Math.floor(5e4*Math.random())+1e4).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(){return b[a].x=this.x,b[a].y=this.y,b[a].z=this.z}).start()}(C,F,z),C++;return $.earthVisitsSphere.geometry.verticesNeedUpdate=!0,$.scene.add($.earthVisitsSphere),$.earthVisits.rotateAnimate=function(){if(null!=$.earth&&($.earthVisits.rotation.x=$.earth.rotation.x,$.earthVisits.rotation.y=$.earth.rotation.y,$.earthVisitsSphere.rotation.x=$.earthVisits.rotation.x,$.earthVisitsSphere.rotation.y=$.earthVisits.rotation.y,$.earthVisitsSphereText.rotation.x=$.earthVisits.rotation.x,$.earthVisitsSphereText.rotation.y=$.earthVisits.rotation.y,null!=$.leap))if(null!=$.leap.zoom){if(null==$.earthVisits.firstScale&&($.earthVisits.firstScale=$.earthVisits.scale.x),$.earthVisits.firstScale+1.7*$.leap.zoom>1)return $.earthVisits.scale.x=$.earthVisits.scale.y=$.earthVisits.scale.z=$.earthVisitsSphere.scale.x=$.earthVisitsSphere.scale.y=$.earthVisitsSphere.scale.z=$.earthVisitsSphereText.scale.x=$.earthVisitsSphereText.scale.y=$.earthVisitsSphereText.scale.z=$.earthVisits.firstScale+1.7*$.leap.zoom}else if(null!=$.earthVisits.firstScale)return $.earthVisits.firstScale=null},$.scene.add($.earthVisits),$.app.config.voice?(H=Math.random()<.5?"render":"Sir",$.voice.pause(),$.voice.load({src:"/media/voice/"+H+".mp3"}).setVolume(2.5),$.voice.play()):void 0})},{}],7:[function(a,b){var c,d,e,f,g,h,i,j,k,l;for(e=new Dancer,j=1024,h=new THREE.Object3D,f=new THREE.SphereGeometry(5,32,32),g=new THREE.SphereGeometry(5,32,32),f.dynamic=!0,d=[],h.position.x=0,h.position.y=0,h.position.z=0,h.scale.x=h.scale.y=h.scale.z=.8,$.scene.add(h),c=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.attributes),c.displacement.needsUpdate=!0,c.customColor.needsUpdate=!0,l=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.uniforms),l.opacity.value=.1,k=new THREE.ParticleSystemMaterial({color:8644351,fog:!1,transparent:!0,opacity:.2,vertexColors:THREE.vertexColors,size:.5}),i=0;i<f.vertices.length;)f.colors.push(new THREE.Color(16755200)),i++;f.verticesNeedUpdate=!0,f.colorsNeedUpdate=!0,$.mainMusicVisualization=new THREE.ParticleSystem(f,k),$.mainMusicVisualization.dynamic=!0,$.mainMusicVisualization.animate=function(){return $.mainMusicVisualization.rotation.y=$.earth.rotation.y,$.mainMusicVisualization.rotation.x=$.earth.rotation.x},h.add($.mainMusicVisualization),e.load({src:"/media/music/"+$.app.config.music+".mp3"}).setVolume(.7),e.bind("update",function(){var a,b;for(a=this.getWaveform(),i=0,b=[];i<f.vertices.length;)f.vertices[i].x=g.vertices[i].x*(1+a[i]),f.vertices[i].y=g.vertices[i].y*(1+a[i]),f.vertices[i].z=g.vertices[i].z*(1+a[i]),f.colorsNeedUpdate=!0,f.colors[i].setHSL(a[i],.5,.5),b.push(i++);return b}),e.play(),b.exports=e},{}],8:[function(a,b){"use strict";b.exports=new Dancer},{}],9:[function(a,b){"use strict";var c,d,e,f,g,h,i;i=new THREE.Object3D,c=[],e=void 0,d=void 0,f=new Image,f.onload=function(){var a,b,c,e;return e=document.createElement("canvas"),e.width=this.width,e.height=this.height,a=e.getContext("2d"),a.drawImage(this,0,0),c=e.width,b=e.height,d=a.getImageData(0,0,c,b).data,h()},f.src="./images/cerebro/textures/559d67f8.day_medium.jpg",h=function(){var a;return a=new Image,a.onload=function(){var a,b,e,f,h,i,j,k,l,m,n,o,p,q,r,s;for(k=document.createElement("canvas"),k.width=this.width,k.height=this.height,f=k.getContext("2d"),f.drawImage(this,0,0),j=k.width,i=k.height,n=f.getImageData(0,0,j,i).data,l=0,m=0,r=0;j>r;){for(s=0;i>s;)o=n[l],h=n[l+1],b=n[l+2],a=n[l+3],e=new THREE.Color,e.setRGB(d[l]/255,d[l+1]/255,d[l+2]/255),l=4*r+4*s*j,p=o+h+b,p>43&&(q={x:r-j/2,y:s-i/2,scale:p,color:e,mod:m},c.push(q)),++s;++m,++r}return g()},a.src="./images/cerebro/textures/642103e8.bump_medium2.jpg",g()},g=function(){var a,b,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P;for($.scene.add(i),K=new THREE.Object3D,K.rotation.x=-Math.PI/2,i.add(K),B=100,e=new THREE.Geometry,k=new THREE.LineBasicMaterial({color:16777215,linewidth:1,vertexColors:THREE.VertexColors,transparent:!0,opacity:.5}),j=new THREE.Line(e,k,THREE.LinePieces),K.add(j),d=[],J=2*Math.PI/512,f=Math.PI/256,g=0;g<c.length;)O=0,c[g].mod%2===0&&(O=.5),M=c[g].x*J,N=(c[g].y-O)*f,C=c[g].scale/765,b=c[g].color,H=new THREE.Vector3,H.x=B*Math.cos(N)*Math.cos(M),H.y=B*Math.cos(N)*Math.sin(M),H.z=B*-Math.sin(N),I=H.clone(),I.multiplyScalar(1+C/6),e.vertices.push(H),e.vertices.push(I),d.push(b),d.push(b),g++;for(e.colors=d,a=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.attributes),a.size.needsUpdate=!0,a.customColor.needsUpdate=!0,E=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.uniforms),E.texture.value=THREE.ImageUtils.loadTexture("./images/cerebro/textures/d59f5356.pixel.png"),n=new THREE.ShaderMaterial({uniforms:E,attributes:a,vertexShader:THREE.ShaderExtras.particle.vertexShader,fragmentShader:THREE.ShaderExtras.particle.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,opacity:.2,transparent:!0,fog:!0}),m=new THREE.ParticleBasicMaterial({color:10021631,size:.7,blending:THREE.AdditiveBlending,depthTest:!0,transparent:!0,opacity:.3}),v=5e3,x=new THREE.Geometry,y=new THREE.Geometry,y.verticesNeedUpdate=!0,l=0,g=0,G=a.size.value,F=a.customColor.value,D=[],o=20,q=s=p=r=t=2;v>l;)M=o+l,N=q,P=s,o+=Math.sin(1.3*N)*Math.cos(10.3*P)*2,q+=Math.sin(1.5*M)*Math.cos(10.5*P)*2,s+=Math.sin(1.7*M)*Math.cos(10.7*N)*2,u=new THREE.Vector3(o,q,s),x.vertices.push(u),l%10===0&&(w=new THREE.Vector3(o,q,s),y.vertices.push(w),G[g]=6,F[g]=new THREE.Color(3918060),function(a,b,c){return c[a]=new TWEEN.Tween({x:6},{loop:!0}).to({x:Math.floor(50*Math.random())+50},Math.floor(5e3*Math.random())+2e3).repeat(1/0).yoyo(!0).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(){return F[a].setHSL(.511+a/5e3,.82,.58),b[a]=this.x}).start()}(g,G,D),g++),l++;return z=new THREE.ParticleSystem(x,m),z.position.y=-20,z.position.z=30,z.position.x=-20,i.add(z),A=new THREE.ParticleSystem(y,n),A.dynamic=!0,A.sortParticles=!0,A.position.y=z.position.y=-20,A.position.z=z.position.z=30,A.position.x=z.position.x=-20,i.add(A),L=null,h=null,i.rotateAnimate=function(){if(!$.leap)return i.rotation.y-=$.mouseX/2e4,i.rotation.x-=(Math.sin($.mouseY/500)+i.rotation.x)/10,z.geometry.verticesNeedUpdate=!0;if(null!=$.leap.handRotate&&null!=$.leap.handRotate.normalize?(null==L&&(L=_.clone(i.rotation)),i.rotation.y=$.leap.handRotate.normalize[0]/-100+L.y,i.rotation.x=$.leap.handRotate.normalize[1]/300+L.x,h=Math.abs($.leap.handRotateVelocity[0])>85?$.leap.handRotateVelocity:null):(L=null,null!=h?(h[0]/=1.04,h[1]/=1.04,i.rotation.y+=h[0]/3e3,Math.abs(h[0])<2e-6&&Math.abs(h[1])<2e-6&&(h=null)):i.rotation.y+=.002),null!=$.leap.zoom){if(null==i.firstScale&&(i.firstScale=i.scale.x),i.firstScale+$.leap.zoom/5>1)return i.scale.x=i.scale.y=i.scale.z=i.firstScale+$.leap.zoom/5}else if(null!=i.firstScale)return i.firstScale=null}},b.exports=i},{}],10:[function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;for(f=new THREE.Geometry,q=new THREE.LineBasicMaterial({opacity:.05,transparent:!0,color:8644351}),r=new THREE.LineBasicMaterial({opacity:.5,transparent:!0,color:8644351}),n=function(a,b,c,d){var e,f,g,h,i;return e=a*Math.PI/180,f=(b-180)*Math.PI/180,g=-(c+d)*Math.cos(e)*Math.cos(f),h=(c+d)*Math.sin(e),i=(c+d)*Math.cos(e)*Math.sin(f),new THREE.Vector3(g,h,i)},l=360,c=3,g=new THREE.Geometry;l>1;)o=0,m=c*l,s=120,j=5,t=n(m,o,s,j),u=t.clone(),u.multiplyScalar(1.05),g.vertices.push(t),g.vertices.push(u),--l;d=new THREE.Line(g,q,THREE.LinePieces),d.position.set(0,0,0),d.lookAt(new THREE.Vector3(0,0,0)),d.rotation.x=90*Math.PI/180,h=g.clone(),i=g.clone(),e=new THREE.Line(h,r,THREE.LinePieces),e.position.set(0,0,0),e.lookAt(new THREE.Vector3(0,0,0)),e.rotation.x=0,$.app.config.voice&&$.voice.bind("update",function(){var a,b;for(a=this.getWaveform(),l=0,b=[];l<i.vertices.length;)h.vertices[l].x=i.vertices[l].x*(1+a[l]),h.vertices[l].y=i.vertices[l].y*(1+a[l]),h.verticesNeedUpdate=!0,b.push(l++);return b}),p=$(document).find("#info-minor-main"),k=$(document).find("#info-minor-human"),e.rotateAnimate=function(){var a,b,c,d;return e.rotation.x=$.earth.rotation.x,b=e.position.clone(),b.x-=130,b.y-=30,a=toScreenXY(b,$.camera,$.scene.renderer.domElement),p.css({top:a.y,left:a.x,zIndex:120}),c=e.position.clone(),c.x-=120,c.y-=50,a=toScreenXY(c,$.camera,$.scene.renderer.domElement),k.css({top:a.y,left:a.x,zIndex:120}),null!=$.userBlock?(d=e.position.clone(),d.x=80,d.y=80,d.z=170,a=toScreenXY(d,$.camera,$.scene.renderer.domElement),$.userBlock.css({top:a.y,left:a.x,zIndex:120})):void 0},$.scene.add(e),b.exports=e},{}],11:[function(){var a,b,c,d,e,f,g,h,i,j,k,l;for(e=20,f=new THREE.Shape,f.absarc(e,e,e,0,2*Math.PI,!1),i=f.createPointsGeometry(500),a=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.attributes),a.displacement.needsUpdate=!0,a.customColor.needsUpdate=!0,j=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.uniforms),j.opacity.value=.17,l=i.vertices,k=a.customColor.value,g=0;g<l.length;)k[g]=new THREE.Color(8644351),g++;h=new THREE.ShaderMaterial({uniforms:j,attributes:a,vertexShader:THREE.ShaderExtras.line.vertexShader,fragmentShader:THREE.ShaderExtras.line.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0,fog:!0,linewidth:.4}),b=new THREE.Line(i,h),b.position.x=-e,b.position.y=-e,b.position.z=2*e,c=new THREE.Line(i,h),c.position.x=-e,c.position.y=-e,c.position.z=4*e,d=new THREE.Line(i,h),d.position.x=-e,d.position.y=-e,d.position.z=6*e,$.scene.add(b),$.scene.add(c),$.scene.add(d)},{}],12:[function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;for(o=0,i=new THREE.Object3D,k=1e3,j=new THREE.Geometry,j.dynamic=!0,c=new THREE.Vector3(0,-400,-300),f=function(a,b,c){return new THREE.Vector3(a,b,c)},a={__pools:[],get:function(){return this.__pools.length>0?this.__pools.pop():null},add:function(a){return this.__pools.push(a)}},d=0;k>d;)l=f(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),j.vertices.push(l),a.add(d),d++;for(b=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.attributes),b.size.needsUpdate=!0,b.customColor.needsUpdate=!0,p=THREE.UniformsUtils.clone(THREE.ShaderExtras.particle.uniforms),p.texture.value=THREE.ImageUtils.loadTexture("./images/cerebro/textures/a6ceb119.airdust.png"),e=new THREE.ShaderMaterial({uniforms:p,attributes:b,vertexShader:THREE.ShaderExtras.particle.vertexShader,fragmentShader:THREE.ShaderExtras.particle.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,opacity:.3,transparent:!0,fog:!1}),$.particleCloud=new THREE.ParticleSystem(j,e),$.particleCloud.dynamic=!0,$.particleCloud.sortParticles=!0,t=$.particleCloud.geometry.vertices,s=b.size.value,r=b.customColor.value,q=0;q<t.length;)r[q]=new THREE.Color(3918060),s[q]=10,j.vertices[q].set(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),q++;$.particleCloud,m=function(){var b;return b=a.get()},g=function(a){var b,d,e;return d=a.position,null!=a.target&&(a.target.position=d,e=a.target)?(b=Math.random()>.5?-1:1,c.x=b*Math.floor(500*Math.random())+0,c.z=-(Math.floor(800*Math.random())+300),b=Math.random()>.5?-1:1,c.y=b*Math.floor(500*Math.random())+0,j.vertices[e]=a.position,s[e]=Math.abs(c.z/800*10)+10,r[e].setHSL(Math.random()*(.6-.4)+.4,Math.random(Math.abs(c.z/2e3)),Math.random()*(Math.abs(c.z/2800)-.01)+.01)):void 0},h=function(b){var c;return c=b.target,c?(r[c].setHSL(0,0,0),j.vertices[c].set(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),a.add(b.target)):void 0},n=new SPARKS.Emitter(new SPARKS.SteadyCounter(100)),n.addInitializer(new SPARKS.Position(new SPARKS.PointZone(c))),n.addInitializer(new SPARKS.Lifetime(20,60)),n.addInitializer(new SPARKS.Target(null,m)),n.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(2e-5,2e-5,2e-5)))),n.addAction(new SPARKS.Age(TWEEN.Easing.Linear.None)),n.addAction(new SPARKS.Accelerate(0,0,0)),n.addAction(new SPARKS.Move),n.addAction(new SPARKS.RandomDrift(70,70,40)),n.addCallback("created",g),n.addCallback("dead",h),n.start(),$.scene.add($.particleCloud)},{}],13:[function(){var a;a=new THREE.Mesh(new THREE.PlaneGeometry(3600,1e3),new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture("./images/cerebro/f1f4c6a3.room-blured-dark.jpg")})),a.position.z=-810,a.position.x=-710,$.sceneRoom.add(a)},{}],14:[function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B;for(null==$.cursors&&($.cursors={}),f=120,g=10,h=new THREE.Shape,i=new THREE.Shape,j=new THREE.Shape,k=new THREE.Shape,h.absarc(f,f,f,0,2*Math.PI,!1),i.absarc(f-2,f-2,f-2,0,2*Math.PI,!1),j.absarc(g-2,g-2,g-2,0,2*Math.PI,!1),k.absarc(g-3,g-3,g-3,0,2*Math.PI,!1),q=h.createPointsGeometry(500),r=i.createPointsGeometry(100),s=j.createPointsGeometry(100),t=k.createPointsGeometry(20),c=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.attributes),c.displacement.needsUpdate=!0,c.customColor.needsUpdate=!0,y=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.uniforms),y.opacity.value=1,y.fogNear.value=0,y.fogFar.value=1e4,B=q.vertices,A=c.customColor.value,x=[],n=0;n<B.length;)A[n]=new THREE.Color(9098728),n++;o=new THREE.ShaderMaterial({uniforms:y,attributes:c,vertexShader:THREE.ShaderExtras.line.vertexShader,fragmentShader:THREE.ShaderExtras.line.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0,fog:!0,linewidth:1}),z=THREE.UniformsUtils.clone(THREE.ShaderExtras.line.uniforms),z.opacity.value=1,z.fogFar.value=2200,p=new THREE.ShaderMaterial({uniforms:z,attributes:c,vertexShader:THREE.ShaderExtras.line.vertexShader,fragmentShader:THREE.ShaderExtras.line.fragmentShader,blending:THREE.AdditiveBlending,depthTest:!1,transparent:!0,fog:!0,linewidth:1}),$.cursors=new THREE.Object3D,$.cursorsSmall=new THREE.Object3D,d=new THREE.Line(q,o,THREE.LinePieces),e=new THREE.Line(r,o,THREE.LinePieces),l=new THREE.Line(s,p),m=new THREE.Line(t,p,THREE.LinePieces),d.position.x=-f,d.position.y=-f,e.position.x=-f+2,e.position.y=-f+2,l.position.x=l.position.y=-g+2,m.position.x=m.position.y=-g+3,$.cursors.add(d),$.cursors.add(e),$.cursorsSmall.add(l),$.cursors.add(m),$("body").find("#content > div").append("<div id='info-minor-state' class='info-minor'>TELLUS_852<br>SOLAR_SYSTEM_94325<br>MILKY_WAY_13.754<br><span id='xrotate' class='sub'>"+$.cursors.rotation.x+"</span>&nbsp;&nbsp;<span id='zrotate' class='sub'>"+$.cursors.rotation.z+"</span</div>"),u=$("body").find("#info-minor-state"),v=u.find("#xrotate"),w=u.find("#zrotate"),$.cursors.animate=function(){var a,b;return $.cursorsSmall.rotation.y=$.earth.rotation.y,$.cursorsSmall.rotation.x=$.earth.rotation.x,$.cursors.rotation.z-=($.earth.rotation.y/2+$.cursors.rotation.z)/10,$.cursors.rotation.x=$.earth.rotation.x,v.html($.cursors.rotation.x.toFixed(4)),w.html($.cursorsSmall.rotation.y.toFixed(4)),b=$.cursors.position.clone(),b.x+=10,b.y+=0,a=toScreenXY(b,$.camera,$.scene.renderer.domElement),u.css({top:a.y,left:a.x,zIndex:110})},$.scene.add($.cursors),$.scene.add($.cursorsSmall),b.exports=null},{}],15:[function(){var a,b,c,d,e,f;d=THREE.ImageUtils.loadTexture("./images/cerebro/textures/d33e8d57.monitor.jpg"),e=THREE.ImageUtils.loadTexture("./images/cerebro/textures/e907e20a.monitor1.jpg"),f=THREE.ImageUtils.loadTexture("./images/cerebro/textures/e907e20a.monitor1.jpg"),a=new THREE.Color(16777215),a.setHSL(.55,.9,1),b=new THREE.LensFlare(d,500,0,THREE.AdditiveBlending,a),b.add(e,512,.4,THREE.AdditiveBlending),b.add(e,512,.4,THREE.AdditiveBlending),b.add(e,80,.4,THREE.AdditiveBlending),b.add(f,500,.6,THREE.AdditiveBlending),b.add(f,300,.7,THREE.AdditiveBlending),b.add(f,120,.9,THREE.AdditiveBlending),b.add(f,70,1,THREE.AdditiveBlending),c=function(a){var b,c,d,e,f;for(b=void 0,c=a.lensFlares.length,d=void 0,e=2*-a.positionScreen.x,f=2*-a.positionScreen.y,b=0;c>b;)d=a.lensFlares[b],d.x=a.positionScreen.x+e*d.distance,d.y=a.positionScreen.y+f*d.distance,d.rotation=0,b++;return a.lensFlares[2].y+=.025,a.lensFlares[3].rotation=.5*a.positionScreen.x+THREE.Math.degToRad(45)},b.customUpdateCallback=c,b.position.set(700,100,-800),$.sceneRoom.add(b)},{}],16:[function(){var a,b,c,d,e,f;$.app.vent.trigger("loading:push","turn up light on"),d=THREE.ImageUtils.loadTexture("./images/cerebro/textures/b2c7793e.lensflare0.png"),e=THREE.ImageUtils.loadTexture("./images/cerebro/textures/e595ca92.lensflare3.png"),f=THREE.ImageUtils.loadTexture("./images/cerebro/textures/4bbb138f.topLamp1.png"),a=new THREE.Color(16777215),a.setHSL(0,0,1),b=new THREE.LensFlare(d,100,0,THREE.AdditiveBlending,a),b.add(f,500,1,THREE.AdditiveBlending),b.add(f,300,.9,THREE.AdditiveBlending),b.customUpdateCallback=c,b.position.set(-210,295,-800),$.sceneRoom.add(b),c=function(a){var b,c,d,e,f;for(b=void 0,c=a.lensFlares.length,d=void 0,e=2*-a.positionScreen.x,f=2*-a.positionScreen.y,b=0;c>b;)d=a.lensFlares[b],d.x=a.positionScreen.x+e*d.distance,d.y=a.positionScreen.y+f*d.distance,d.rotation=0,b++;return a.lensFlares[2].y+=.025,a.lensFlares[3].rotation=.5*a.positionScreen.x+THREE.Math.degToRad(45)}},{}],17:[function(a,b){var c;c=a("../models/profile.coffee"),b.exports=Backbone.Marionette.ItemView.extend({tagName:"option",className:"",model:new c,template:TMPL.pages.cerebro.profile.item,onRender:function(){return this.$el.attr("name",this.model.id)}})},{"../models/profile.coffee":25}],18:[function(a,b){var c;c=a("../models/project.coffee"),b.exports=Backbone.Marionette.ItemView.extend({model:new c,template:TMPL.pages.cerebro.project.item,initialize:function(){return this.listenTo($.app.vent,"project:get",this.setProject),this.listenTo(this.model,"change",this.render)},setProject:function(a){var b,c=this;return $.app.config.voice&&(b=Math.random()<.5?"lot":"fetch",$.voice.load({src:"/media/voice/"+b+".mp3"}).setVolume(2.5),$.voice.play()),this.model.options.id=a,this.model.fetch({success:function(){return $.app.vent.trigger("project:set",c.model.toJSON())}})}})},{"../models/project.coffee":26}],19:[function(a,b){var c;c=a("../../models/spinner.coffee"),b.exports=Backbone.Marionette.ItemView.extend({className:"-text",model:new c,template:TMPL.spinner.text,initialize:function(){return this.listenTo($.app.vent,"loading:push",this.push),this.listenTo($.app.vent,"loading:text",this.text),this.listenTo(this.model,"change:text",this.render)},text:function(a){var b;return b=this.model.get("text"),null!=b&&null!=a&&"string"==typeof a&&(b=[a],this.model.set("text",b),this.model.trigger("change:text"),$.app.config.debug)?console.log("Spinner :: Text changed to "+a):void 0},push:function(a){var b;return b=this.model.get("text"),null!=b&&null!=a&&"string"==typeof a?(b.unshift(a),this.model.set("text",b),this.model.trigger("change:text")):void 0}})},{"../../models/spinner.coffee":27}],20:[function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;c=a("../collections/profiles.coffee"),d=a("../collectionviews/profiles.coffee"),f=a("../models/project.coffee"),e=a("../itemviews/project.coffee"),window.toScreenXY=function(a,b,c){var d,e,f;return e=a.clone(),f=new THREE.Matrix4,f.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),e.applyProjection(f),d=l(c),{x:(e.x+1)*c.width/2+d.left,y:(-e.y+1)*c.height/2+d.top}},window.latLongToVector3=function(a,b,c,d){var e,f,g,h,i;return e=a*Math.PI/180,f=(b-180)*Math.PI/180,g=-(c+d)*Math.cos(e)*Math.cos(f),h=(c+d)*Math.sin(e),i=(c+d)*Math.cos(e)*Math.sin(f),new THREE.Vector3(g,h,i)},l=function(a){var b;if(b=new Object,b.left=b.top=0,a.offsetParent)for(;;)if(b.left+=a.offsetLeft,b.top+=a.offsetTop,!(a=a.offsetParent))break;return b},i=void 0,$.camera=void 0,$.scene=void 0,s=void 0,h=void 0,m=!1,j=void 0,t=0,n=0,k=0,o=void 0,$.mouseX=0,$.mouseY=0,$.post={enable:!0},i=document.createElement("div"),$.scene=new THREE.Scene,$.sceneRoom=new THREE.Scene,$.scene.fog=new THREE.Fog(2175021,350,500),$.camera=new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,1e4),$.cameraRoom=new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,1e4),$.camera.position.z=490,$.cameraRoom.position=$.camera.position,$.scene.add($.camera),$.sceneRoom.add($.cameraRoom),p=function(a){var b,c;return b=window.innerWidth>>1,c=window.innerHeight>>1,$.mouseX=a.clientX-b,$.mouseY=a.clientY-c},q=function(a){var b,c;return a.preventDefault(),b=window.innerWidth>>1,c=window.innerHeight>>1,$.mouseX=-1*(a.touches[0].clientX-b),$.mouseY=-1*(a.touches[0].clientY-c)},g=function(){return"cerebro"===Backbone.history.location.id&&requestAnimationFrame(g),$.app.config.debug&&$.scene.stats.update(),null!=$.mouseY&&null!=$.mouseX&&null==$.leap&&($.camera.position.x=-$.mouseX/50,$.camera.position.y=-$.mouseY/30),null!=$.leap&&null!=$.leap.handMove&&($.camera.position.x=-$.leap.handMove[0]/10,$.camera.position.y=-$.leap.handMove[1]/5+50),$.cursor&&$.cursor.move(),null!=$.earth&&null!=$.earth.rotateAnimate&&$.earth.rotateAnimate(),null!=$.earthp&&null!=$.earthp.rotateAnimate&&$.earthp.rotateAnimate(),null!=$.earthp&&null!=$.earthp.geometry&&($.earthp.geometry.verticesNeedUpdate=!0,$.earthp.geometry.colorsNeedUpdate=!0),null!=$.equator&&null!=$.equator.rotateAnimate&&$.equator.rotateAnimate(),null!=$.earthVisits&&null!=$.earthVisits.rotateAnimate&&$.earthVisits.rotateAnimate(),null!=$.cursors&&$.cursors.animate(),null!=$.musicVisualization&&($.musicVisualization.geometry.verticesNeedUpdate=!0,$.musicVisualization.geometry.colorsNeedUpdate=!0),null!=$.earthVisitsSphere&&($.earthVisitsSphere.geometry.verticesNeedUpdate=!0),null!=$.mainMusicVisualization&&($.mainMusicVisualization.geometry.verticesNeedUpdate=!0,$.mainMusicVisualization.animate()),null!=$.voiceVisualization&&($.voiceVisualization.geometry.verticesNeedUpdate=!0),null!=$.particleCloud&&($.particleCloud.geometry.verticesNeedUpdate=!0,$.particleCloud.geometry.__dirtyVertices=!0),null!=$.plane&&(null!=$.plane.geometry&&($.plane.geometry.verticesNeedUpdate=!0),null!=$.plane.animate&&$.plane.animate()),null!=$.lineChart&&null!=$.lineChart.geometry&&($.lineChart.geometry.verticesNeedUpdate=!0,$.lineChart.geometry.colorsNeedUpdate=!0),null!=$.leap&&(null!=$.leap.zoom?(null==$.camera.firstPosition&&($.camera.firstPosition=$.camera.position.clone()),$.camera.firstPosition.z-100*$.leap.zoom<490&&$.camera.firstPosition.z-100*$.leap.zoom>300&&($.camera.position.z=$.camera.firstPosition.z-100*$.leap.zoom)):null!=$.camera.firstPosition&&($.camera.firstPosition=null),null!=$.leap.gestureCircle&&"stop"===$.leap.gestureCircle.state&&($.leap.gestureCircle.normal[2]<=0?$.app.vent.trigger("project:next"):$.app.vent.trigger("project:prev"))),null!=$.emitter&&null!=$.emitter.animation&&$.emitter.animation(),r()},r=function(){return t=(new Date).getTime(),j=t-o,o=t,(isNaN(j)||j>1e3||0===j)&&(j=1e3/60),TWEEN.update(),$.scene.renderer.render($.scene,$.camera),$.sceneRoom.renderer.render($.sceneRoom,$.cameraRoom)},document.addEventListener("mousemove",p,!1),document.addEventListener("touchmove",q,!1),b.exports=Backbone.Marionette.Layout.extend({template:TMPL.pages.cerebro.layout,model:new Backbone.Model,regions:{profiles:"#profiles",projects:"#projects"},onRender:function(){var b,h=this;return $.userBlock=this.$el.find(".analytics-user"),$.app.config.voice&&($.voice=a("../gl/cerebro/elements/ai/voice.coffee")),b=new c,b.fetch({beforeSend:function(){return $.app.vent.trigger("loading:push","fetching google profiles")},success:function(){return h.profiles.show(new d({collection:b}))}}),this.projects.show(new e({model:new f({id:null})})),this.$el.append(i),this.$el.find("canvas").remove(),$.app.config.debug&&($.app.vent.trigger("loading:push","initializing stats"),$.scene.stats=new Stats,$.scene.stats.setMode(2),$.scene.stats.domElement.style.position="absolute",$.scene.stats.domElement.style.zIndex=2e3,$.scene.stats.domElement.style.left="0px",$.scene.stats.domElement.style.top="0px",i.appendChild($.scene.stats.domElement)),setTimeout(function(){var b,c,d,e,f,h,j,k,l,n,o;try{s=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),n=new THREE.WebGLRenderer({antialias:!0,alpha:!0}),$.scene.renderer=s,$.sceneRoom.renderer=n,s.setSize(window.innerWidth,window.innerHeight),n.setSize(window.innerWidth,window.innerHeight),THREEx.WindowResize(s,$.camera),l=new THREE.RenderPass($.scene,$.camera),l=new THREE.RenderPass($.sceneRoom,$.cameraRoom),i.appendChild(s.domElement),i.appendChild(n.domElement),$(s.domElement).css("z-index",2),$(n.domElement).css("z-index",1),m=!0,o=a("../gl/cerebro/elements/room.coffee"),$.earth=a("../gl/cerebro/elements/earth.coffee"),b=a("../gl/cerebro/data/analytics.coffee"),d=a("../gl/cerebro/elements/user/earthData.coffee"),e=a("../gl/cerebro/elements/hud/height.coffee"),$.app.config.music&&""!==$.app.config.music&&($.music=a("../gl/cerebro/elements/ai/music.coffee")),$.equator=a("../gl/cerebro/elements/equator.coffee"),j=a("../gl/cerebro/lights/monitor.coffee"),h=a("../gl/cerebro/lights/topLamp.coffee"),f=a("../gl/cerebro/controllers/leap.coffee"),k=a("../gl/cerebro/elements/particles.coffee"),g()
}catch(p){return c=p,void 0}return $.app.vent.trigger("loading:end")},1)}})},{"../collections/profiles.coffee":2,"../collectionviews/profiles.coffee":3,"../gl/cerebro/controllers/leap.coffee":5,"../gl/cerebro/data/analytics.coffee":6,"../gl/cerebro/elements/ai/music.coffee":7,"../gl/cerebro/elements/ai/voice.coffee":8,"../gl/cerebro/elements/earth.coffee":9,"../gl/cerebro/elements/equator.coffee":10,"../gl/cerebro/elements/hud/height.coffee":11,"../gl/cerebro/elements/particles.coffee":12,"../gl/cerebro/elements/room.coffee":13,"../gl/cerebro/elements/user/earthData.coffee":14,"../gl/cerebro/lights/monitor.coffee":15,"../gl/cerebro/lights/topLamp.coffee":16,"../itemviews/project.coffee":18,"../models/project.coffee":26}],21:[function(a,b){b.exports=Backbone.Marionette.Layout.extend({template:TMPL.pages.error,onRender:function(){return setTimeout(function(){return $.app.vent.trigger("loading:end")},100)}})},{}],22:[function(a,b){b.exports=Backbone.Marionette.Layout.extend({template:TMPL.pages.index,className:"-container",events:{"click .fullscreen":"fullscreen","click .nofullscreen":"startAuth","change #music-select":"changeMusic","change #voice-check":"changeVoice","change #my-profile-check":"changeProfile"},fullscreen:function(){var a;return a=document.documentElement,a.requestFullscreen?a.requestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullScreen&&a.webkitRequestFullScreen(),this.startAuth()},startAuth:function(){var a,b,c,d,e,f,g=this;return $.app.vent.trigger("loading:start"),$.app.vent.trigger("loading:push","Authorizing"),$.app.config.google?(f=1e3,a=600,c=screen.width/2-f/2,e=screen.height/2-a/2,d=window.open("/auth/google","","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+f+", height="+a+", top="+e+", left="+c),b=setInterval(function(){var a;try{if(null==d||null!=d&&d.closed)return clearInterval(b),$.app.vent.trigger("loading:end"),g.authorized()}catch(c){if(a=c,null!=a)return $.app.vent.trigger("loading:end")}},500)):this.authorized()},authorized:function(){return $.app.router.navigate("/cerebro",{trigger:!0,replace:!1})},changeMusic:function(){return $.app.config.music=this.$el.find("#music-select option:checked").val()},changeVoice:function(){return $.app.config.voice=this.$el.find("#voice-check").is(":checked")},changeProfile:function(){return $.app.config.google=this.$el.find("#my-profile-check").is(":checked")},onRender:function(){return $.app.config.music=this.$el.find("#music-select option:checked").val(),setTimeout(function(){return $.app.vent.trigger("loading:end")},100)}})},{}],23:[function(a,b){var c;c=a("../itemviews/spinner/text.coffee"),b.exports=Backbone.Marionette.Layout.extend({className:"-loader",template:TMPL.loader,regions:{text:"#text"},initialize:function(){return this.listenTo($.app.vent,"loading:start",this.start),this.listenTo($.app.vent,"loading:end",this.end),$.app.config.debug?console.info("Spinner :: Initialized"):void 0},onRender:function(){return this.text.show(new c)},start:function(){return $.app.config.debug&&console.log("Spinner :: Loading start"),this.$el.show()},end:function(){return $.app.config.debug&&console.log("Spinner :: Loading end"),this.$el.fadeOut()}})},{"../itemviews/spinner/text.coffee":19}],24:[function(a){"use strict";var b;b=a("./app.coffee"),b.start(),b.config.debug&&console.info("Application :: Started")},{"./app.coffee":1}],25:[function(a,b){b.exports=Backbone.Model.extend({defaults:{id:null,name:null}})},{}],26:[function(a,b){b.exports=Backbone.Model.extend({initialize:function(a){return this.options=a},url:function(){return $.app.config.google?""+$.app.config.api+"/analytics/data?id="+this.options.id:"./scripts/data.json"},defaults:{id:null,name:null}})},{}],27:[function(a,b){b.exports=Backbone.Model.extend({defaults:{text:[]}})},{}],28:[function(a,b){var c;c={index:function(){return Backbone.history.location.name="Cerebro",Backbone.history.location.id="index",$.app.vent.trigger("route:index")},cerebro:function(){return Backbone.history.location.name="Cerebro",Backbone.history.location.id="cerebro",$.app.vent.trigger("route:cerebro")},error:function(){return Backbone.history.location.name="Cerebro",Backbone.history.location.id="error",$.app.vent.trigger("route:error")}},b.exports=Backbone.Marionette.AppRouter.extend({controller:c,appRoutes:{"examples/cerebro/index.html":"cerebro"}})},{}]},{},[24]);