import { useEffect, useRef } from 'react';
import { NODES } from '../data';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export default function Galaxy() {
  const galRef = useRef(null), backRef = useRef(null), coreRef = useRef(null), frontRef = useRef(null), tipRef = useRef(null);

  useEffect(() => {
    const gal = galRef.current, cb = backRef.current, cf = frontRef.current, cg = coreRef.current, tip = tipRef.current;
const xb=cb.getContext('2d'),xf=cf.getContext('2d');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ACC=[125,227,244],ORB=[.36,.52,.68,.85,1.02],TILT=-.12;
let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
let W=0,H=0,dpr=1,cx=0,cy=0,R0=300,sc=1,wide=true;
let cdrag=null,cX=0,cY=0,vX=0,vY=0,drag=null,vel=0,yaw=0,flat=.34,mx=-1e4,my=-1e4,px=0,py=0,tpx=0,tpy=0,hov=null,t=0,spd=1,last=0,running=false,glDraw=null;

const nodes=NODES.map((d,i)=>{
  const dots=[];const cnt=10+d.w*14,spread=20+d.w*15;
  for(let k=0;k<cnt;k++){const a=rnd()*6.283,r=8+Math.pow(rnd(),.75)*spread;
    dots.push({x:Math.cos(a)*r*1.55,y:Math.sin(a)*r*.78,r:.6+rnd()*1.9*(1-r/(spread+14))+.2,a:.25+rnd()*.5,l:rnd()<.45,p:rnd()*6.283});}
  return {...d,o:i%ORB.length,a:i*2.39996+rnd()*.4,dots,x:0,y:0,z:0,s:1};
});
const stars=Array.from({length:300},()=>({x:rnd(),y:rnd(),r:.3+rnd()*.9,a:.08+rnd()*.35,p:rnd()*6.283}));
const pulses=Array.from({length:7},(_,i)=>({n:(i*3+1)%nodes.length,dx:(rnd()-.5)*70,dy:(rnd()-.5)*36,p:rnd()*6.283}));

function size(){
  const r=gal.getBoundingClientRect();W=r.width;H=r.height;dpr=Math.min(devicePixelRatio||1,2);wide=W>900;
  for(const c of [cb,cf]){c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);}
  cx=wide?W*.68:W*.5;cy=H*(wide?.5:.5);
  R0=wide?Math.min(W*.5,H*1.35):Math.min(W*.66,H*.95);
  sc=Math.max(.75,Math.min(1.25,R0/380));
  const core=Math.round(Math.min(R0*.78,420));
  Object.assign(cg.style,{width:core+'px',height:core+'px',left:(cx-core/2)+'px',top:(cy-core/2)+'px'});
  if(glDraw){const res=Math.min(512,Math.round(core*dpr*1.4));cg.width=cg.height=res;}
}
function place(n){
  const rx=ORB[n.o]*R0,ry=rx*flat,lx=rx*Math.cos(n.a),ly=ry*Math.sin(n.a),c=Math.cos(TILT),s=Math.sin(TILT);
  n.z=Math.sin(n.a);const f=n.z>=0?1:-.5;
  n.x=cx+lx*c-ly*s+px*f;n.y=cy+lx*s+ly*c+py*f;n.s=(.8+.2*(n.z+1))*sc;
}
function drawNode(x,n){
  const S=n.s,hot=n===hov,fade=hot?1:(.5+.25*(n.z+1))*(wide?Math.min(1,Math.max(.12,(n.x-W*.3)/(W*.2))):1);
  x.globalAlpha=fade;x.lineWidth=hot?.8:.6;
  x.strokeStyle=hot?`rgba(${ACC},.45)`:'rgba(255,255,255,.075)';
  x.beginPath();for(const d of n.dots)if(d.l){x.moveTo(n.x,n.y);x.lineTo(n.x+d.x*S,n.y+d.y*S);}x.stroke();
  for(const d of n.dots){const tw=.75+.25*Math.sin(t*1.4+d.p);
    x.fillStyle=hot?`rgba(${ACC},${Math.min(1,d.a*1.7)*tw})`:`rgba(205,210,218,${d.a*tw})`;
    x.beginPath();x.arc(n.x+d.x*S,n.y+d.y*S,d.r*S*(hot?1.25:1),0,6.283);x.fill();}
  x.globalAlpha=1;
  const R=13*S;
  if(hot){x.strokeStyle=`rgba(${ACC},.9)`;x.lineWidth=1.2;x.beginPath();x.arc(n.x,n.y,R+7,0,6.283);x.stroke();}
  x.fillStyle='#111316';x.strokeStyle=hot?`rgba(${ACC},.8)`:'rgba(255,255,255,.14)';x.lineWidth=1;
  x.beginPath();x.arc(n.x,n.y,R,0,6.283);x.fill();x.stroke();
  const g=n.g.replace('.','');
  x.fillStyle=hot?'#fff':`rgba(232,235,239,${fade})`;x.font=`700 ${(g.length>2?8.5:10.5)*S}px "Plus Jakarta Sans",sans-serif`;
  x.textAlign='center';x.textBaseline='middle';x.fillText(g,n.x,n.y+.5);
}
function drawBack(){
  const x=xb;x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  const gr=x.createRadialGradient(cx,cy,0,cx,cy,R0*.9);gr.addColorStop(0,'rgba(255,255,255,.06)');gr.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=gr;x.fillRect(0,0,W,H);
  for(const s of stars){x.fillStyle=`rgba(255,255,255,${s.a*(.7+.3*Math.sin(t*.8+s.p))})`;x.beginPath();x.arc(s.x*W,s.y*H,s.r,0,6.283);x.fill();}
  x.lineWidth=1;
  ORB.forEach((k,i)=>{x.strokeStyle=`rgba(255,255,255,${.05+i*.008})`;x.beginPath();x.ellipse(cx+px*.2,cy+py*.2,k*R0,k*R0*flat,TILT,0,6.283);x.stroke();});
  if(!glDraw){x.fillStyle='rgba(235,238,242,.9)';x.font=`800 ${R0*.3}px "Plus Jakarta Sans",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText('S',cx,cy);}
  nodes.filter(n=>n.z<0).sort((a,b)=>a.z-b.z).forEach(n=>drawNode(x,n));
}
function drawFront(){
  const x=xf;x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,W,H);
  nodes.filter(n=>n.z>=0).sort((a,b)=>a.z-b.z).forEach(n=>drawNode(x,n));
  for(const p of pulses){const n=nodes[p.n],k=.5+.5*Math.sin(t*1.6+p.p);
    x.strokeStyle=`rgba(${ACC},${.2+.45*k})`;x.lineWidth=1.1;x.beginPath();x.arc(n.x+p.dx*n.s,n.y+p.dy*n.s,(5+3*k)*n.s,0,6.283);x.stroke();}
}
function pick(){
  let best=null,bd=1e9;
  for(const n of nodes){const d=Math.hypot(n.x-mx,n.y-my);if(d<26*n.s&&d<bd){bd=d;best=n;}}
  if(best!==hov){hov=best;gal.style.cursor=hov?'pointer':'grab';
    if(hov){tip.innerHTML=`<small><i></i>${esc(hov.c)}</small><strong>${esc(hov.n)}</strong><p>${esc(hov.d)}</p>`;tip.classList.add('on');}
    else tip.classList.remove('on');}
}
function moveTip(){
  if(!hov)return;const tw=tip.offsetWidth,th=tip.offsetHeight;
  let x=hov.x+24,y=hov.y-th-18;
  if(x+tw>W-12)x=hov.x-tw-24;if(x<12)x=12;if(y<12)y=hov.y+24;if(y+th>H-12)y=H-th-12;
  tip.style.transform=`translate(${x}px,${y}px)`;
}
function frame(now){
  const dt=last?Math.min((now-last)/1000,.05):0;last=now;
  spd+=((hov?.1:1)-spd)*.08;
  if(!RM){t+=dt;for(const n of nodes)n.a+=dt*spd*.055/(1+n.o*.55);}
  if(!drag&&Math.abs(vel)>.0005){const st=RM?0:vel*dt;for(const n of nodes)n.a+=st;yaw+=st*1.6;vel*=Math.pow(.94,dt*60);}else if(!drag)vel=0;
  if(!drag)yaw*=Math.pow(.985,dt*60);
  if(!cdrag&&!RM&&Math.abs(vX)+Math.abs(vY)>.001){cX+=vX*dt;cY+=vY*dt;const k=Math.pow(.95,dt*60);vX*=k;vY*=k;}
  px+=(tpx-px)*.06;py+=(tpy-py)*.06;
  for(const n of nodes)place(n);
  if(mx>-1e3&&!drag)pick();
  drawBack();drawFront();moveTip();
  if(glDraw)glDraw(RM?0:t,tpx/12,tpy/8,yaw+cY,(flat-.34)*1.2+cX);
  if(running)requestAnimationFrame(frame);else last=0;
}
gal.addEventListener('pointermove',e=>{const r=gal.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
  if(!RM){tpx=(mx/W-.5)*12;tpy=(my/H-.5)*8;}
  if(drag){const now=performance.now(),dx=e.clientX-drag.x,dy=e.clientY-drag.y,dt=Math.max(16,now-drag.t)/1000;
    if(!drag.moved&&Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>4){drag.moved=true;hov=null;tip.classList.remove('on');gal.style.cursor='grabbing';}
    if(drag.moved){const da=-dx*.006;for(const n of nodes)n.a+=da;yaw+=da*1.6;vel=vel*.6+(da/dt)*.4;
      if(e.pointerType==='mouse')flat=Math.max(.16,Math.min(.62,flat+dy*.0016));}
    drag.x=e.clientX;drag.y=e.clientY;drag.t=now;}});
const endDrag=e=>{if(!drag)return;if(performance.now()-drag.t>90)vel=0;drag=null;gal.style.cursor=hov?'pointer':'grab';};
cg.addEventListener('pointerdown',e=>{e.stopPropagation();cdrag={x:e.clientX,y:e.clientY,t:performance.now()};vX=vY=0;
  cg.style.cursor='grabbing';hov=null;tip.classList.remove('on');try{cg.setPointerCapture(e.pointerId);}catch(_){}});
cg.addEventListener('pointermove',e=>{if(!cdrag)return;e.stopPropagation();
  const now=performance.now(),dt=Math.max(16,now-cdrag.t)/1000,ay=-(e.clientX-cdrag.x)*.012,ax=(e.clientY-cdrag.y)*.012;
  cY+=ay;cX+=ax;vY=vY*.5+(ay/dt)*.5;vX=vX*.5+(ax/dt)*.5;cdrag.x=e.clientX;cdrag.y=e.clientY;cdrag.t=now;});
const cEnd=()=>{if(!cdrag)return;if(performance.now()-cdrag.t>90)vX=vY=0;cdrag=null;cg.style.cursor='grab';};
cg.addEventListener('pointerup',cEnd);cg.addEventListener('pointercancel',cEnd);
gal.addEventListener('pointerup',endDrag);gal.addEventListener('pointercancel',endDrag);
gal.addEventListener('pointerdown',e=>{const r=gal.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
  drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:performance.now(),moved:false};vel=0;try{gal.setPointerCapture(e.pointerId);}catch(_){}});
gal.addEventListener('pointerleave',()=>{if(drag)return;mx=my=-1e4;hov=null;tip.classList.remove('on');gal.style.cursor='grab';tpx=tpy=0;});

/* WebGL chrome "S" — raymarched, extruded from a 2D signed-distance S */
function initGL(){
  const gl=cg.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false});
  if(!gl){cg.style.display='none';return null;}
  const vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs=`precision highp float;uniform vec2 R;uniform float T;uniform vec2 M;uniform vec2 D;float Y,X;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sdArc(vec2 p,vec2 sc,float ra,float rb){p.x=abs(p.x);return((sc.y*p.x>sc.x*p.y)?length(p-sc*ra):abs(length(p)-ra))-rb;}
float sdS(vec2 p){float ra=.34,rb=.085;vec2 sc=vec2(.866,-.5);mat2 m=rot(1.0472);vec2 c=vec2(0.,ra);
 return min(sdArc(m*(p-c),sc,ra,rb),sdArc(m*(-p-c),sc,ra,rb));}
float map(vec3 p){p.xz=rot(Y)*p.xz;p.yz=rot(X)*p.yz;vec2 w=vec2(sdS(p.xy),abs(p.z)-.08);
 return min(max(w.x,w.y),0.)+length(max(w,0.))-.035;}
vec3 nor(vec3 p){vec2 e=vec2(.0015,-.0015);return normalize(e.xyy*map(p+e.xyy)+e.yyx*map(p+e.yyx)+e.yxy*map(p+e.yxy)+e.xxx*map(p+e.xxx));}
vec3 pal(float t){return .5+.5*cos(6.2831*(t+vec3(0.,.33,.67)));}
vec3 env(vec3 r){float sk=smoothstep(-.2,1.,r.y);vec3 c=mix(vec3(.015,.018,.022),vec3(.8,.83,.88),sk);
 c+=smoothstep(.93,.99,sin(r.x*4.+r.y*2.+T*.25))*vec3(.9);c+=pal(dot(r,vec3(.4,.7,.3))*.9+T*.03)*.2;return c;}
void main(){vec2 uv=(gl_FragCoord.xy*2.-R)/R.y;Y=sin(T*.35)*.6+M.x*.06+D.x;X=sin(T*.23)*.18-M.y*.05+D.y;
 vec3 ro=vec3(0.,0.,3.2),rd=normalize(vec3(uv,-1.8));float t=0.,h=1.;
 for(int i=0;i<90;i++){h=map(ro+rd*t);if(h<.001||t>6.)break;t+=h;}
 if(h>.002){gl_FragColor=vec4(0.);return;}
 vec3 p=ro+rd*t,n=nor(p),r=reflect(rd,n);float f=pow(1.-max(dot(n,-rd),0.),3.);vec3 L=normalize(vec3(-.5,.8,.6));
 vec3 col=vec3(.05,.055,.06)+env(r)*(.55+.45*f);col+=pow(max(dot(r,L),0.),48.)*vec3(1.);col+=vec3(.49,.89,.96)*pow(f,2.)*.4;
 col=1.-exp(-col*1.5);gl_FragColor=vec4(col,1.);}`;
  const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(s));return null;}return s;};
  const v=sh(gl.VERTEX_SHADER,vs),f=sh(gl.FRAGMENT_SHADER,fs);if(!v||!f){cg.style.display='none';return null;}
  const pr=gl.createProgram();gl.attachShader(pr,v);gl.attachShader(pr,f);gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){cg.style.display='none';return null;}
  gl.useProgram(pr);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  const uR=gl.getUniformLocation(pr,'R'),uT=gl.getUniformLocation(pr,'T'),uM=gl.getUniformLocation(pr,'M'),uD=gl.getUniformLocation(pr,'D');
  gl.clearColor(0,0,0,0);
  return (time,mxn,myn,dyaw,dpit)=>{gl.viewport(0,0,cg.width,cg.height);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uR,cg.width,cg.height);gl.uniform1f(uT,time);gl.uniform2f(uM,mxn,myn);gl.uniform2f(uD,dyaw,dpit);gl.drawArrays(gl.TRIANGLES,0,3);};
}
glDraw=initGL();
size();
const ro=new ResizeObserver(()=>{size();if(!running)requestAnimationFrame(frame);});ro.observe(gal);
const io=new IntersectionObserver(es=>{const vis=es[0].isIntersecting&&!document.hidden;if(vis&&!running){running=true;requestAnimationFrame(frame);}else if(!vis)running=false;});
io.observe(gal);
const onVis=()=>{if(document.hidden)running=false;else{const r=gal.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight&&!running){running=true;requestAnimationFrame(frame);}}};
document.addEventListener('visibilitychange',onVis);
if(document.fonts)document.fonts.ready.then(()=>{if(!running)requestAnimationFrame(frame);});
    return () => {
      running = false;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="galaxy" id="galaxy" ref={galRef} aria-label="My tech stack drawn as a galaxy. Hover a star for details.">
      <canvas id="gBack" ref={backRef}></canvas>
      <canvas id="gCore" ref={coreRef} width="512" height="512"></canvas>
      <canvas id="gFront" ref={frontRef}></canvas>
      <div className="tip" id="tip" ref={tipRef} role="status"></div>
    </div>
  );
}
