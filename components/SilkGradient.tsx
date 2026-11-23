/* eslint-disable */
// @ts-nocheck
"use client";
// Vendored from the Framer component "SilkGradient" (framer.com/m/SilkGradient-LX6MqN.js).
// Only change: the Framer-only imports (addPropertyControls, RenderTarget) are removed; the shader is untouched.
// Local additions: maxFps (draw throttle) and maxDpr (pixel-density cap), for cheap secondary surfaces.
// Props: colors [{color, ratio}], direction, scale, stretch, turbulence, softness, grain, seed, speed.
// SilkGradient — flowing, silky WebGL gradient background for Framer.
// Drop it into a frame (Fill / Fill) behind your content.
import{jsx as _jsx}from"react/jsx-runtime";import{useEffect,useRef}from"react";const MAX_COLORS=8;const DEFAULT_COLORS=[{color:"#03050C",ratio:.8},{color:"#0A2BD6",ratio:1.1},{color:"#3772FF",ratio:1.4},{color:"#AFC9FF",ratio:.7},{color:"#FFFFFF",ratio:.6}];/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 400
 * @framerDisableUnlink
 */export function SilkGradient(props){const{colors=DEFAULT_COLORS,style,animateInCanvas=false}=props;const canvasRef=useRef(null);const propsRef=useRef(props);propsRef.current=props;const drawRef=useRef(null);const shouldAnimate=true;// GL setup + render loop (runs once per mount / animate mode change)
useEffect(()=>{const canvas=canvasRef.current;if(!canvas)return;const gl=canvas.getContext("webgl",{antialias:false,alpha:false,premultipliedAlpha:false,powerPreference:"low-power"});if(!gl)return;const program=createProgram(gl,VERT,FRAG);if(!program)return;gl.useProgram(program);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const aPos=gl.getAttribLocation(program,"aPos");gl.enableVertexAttribArray(aPos);gl.vertexAttribPointer(aPos,2,gl.FLOAT,false,0,0);const u=n=>gl.getUniformLocation(program,n);const U={res:u("uRes"),time:u("uTime"),angle:u("uAngle"),scale:u("uScale"),stretch:u("uStretch"),warp:u("uWarp"),soft:u("uSoft"),grain:u("uGrain"),seed:u("uSeed"),count:u("uCount"),colors:u("uColors"),stops:u("uStops")};let time=0;let last=performance.now();let raf=0;let visible=true;const reduceMotion=typeof window!=="undefined"&&window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,propsRef.current.maxDpr??1.5);const w=Math.max(1,Math.round(canvas.clientWidth*dpr));const h=Math.max(1,Math.round(canvas.clientHeight*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);};const draw=()=>{const p=propsRef.current;resize();const{rgb,stops,count}=buildRamp(p.colors);gl.uniform2f(U.res,canvas.width,canvas.height);gl.uniform1f(U.time,time);gl.uniform1f(U.angle,(p.direction??0)*Math.PI/180);gl.uniform1f(U.scale,p.scale??1);gl.uniform1f(U.stretch,p.stretch??1.6);gl.uniform1f(U.warp,p.turbulence??1);gl.uniform1f(U.soft,p.softness??.6);gl.uniform1f(U.grain,p.grain??.15);gl.uniform1f(U.seed,p.seed??0);gl.uniform1i(U.count,count);gl.uniform3fv(U.colors,rgb);gl.uniform1fv(U.stops,stops);gl.drawArrays(gl.TRIANGLES,0,3);};drawRef.current=draw;let lastDraw=0;const loop=now=>{const dt=Math.min((now-last)/1e3,.1);last=now;if(visible){time+=dt*(propsRef.current.speed??1);const gap=1e3/(propsRef.current.maxFps??60);if(now-lastDraw>=gap-2){lastDraw=now;draw();}}raf=requestAnimationFrame(loop);};const ro=new ResizeObserver(()=>draw());ro.observe(canvas);const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(canvas);if(shouldAnimate&&!reduceMotion){raf=requestAnimationFrame(loop);}else{draw();}return()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();drawRef.current=null;gl.deleteBuffer(buf);gl.deleteProgram(program);};},[shouldAnimate]);// Static mode: redraw when props change
useEffect(()=>{if(!shouldAnimate)drawRef.current?.();});const fallback=`linear-gradient(${(props.direction??0)+90}deg, ${(colors.length?colors:DEFAULT_COLORS).map(c=>c.color).join(", ")})`;return /*#__PURE__*/_jsx("div",{style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:fallback,...style},children:/*#__PURE__*/_jsx("canvas",{ref:canvasRef,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block"}})});}// ---------- helpers ----------
let colorCtx=null;function parseColor(input){let c=input||"#000";// Framer color tokens: var(--token-…, rgb(…)) → use fallback
const m=c.match(/var\([^,]+,\s*(.+)\)\s*$/);if(m)c=m[1];if(!colorCtx)colorCtx=document.createElement("canvas").getContext("2d");if(!colorCtx)return[0,0,0];colorCtx.fillStyle="#000";colorCtx.fillStyle=c;const v=String(colorCtx.fillStyle);if(v.startsWith("#")){const n=parseInt(v.slice(1,7),16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];}const nums=v.match(/[\d.]+/g)?.map(Number)??[0,0,0];return[nums[0]/255,nums[1]/255,nums[2]/255];}// Converts colors + ratios into cumulative boundaries (0..1) for the shader
function buildRamp(list){const items=(list&&list.length?list:DEFAULT_COLORS).slice(0,MAX_COLORS);const count=items.length;const rgb=new Float32Array(MAX_COLORS*3);const stops=new Float32Array(MAX_COLORS);const total=items.reduce((s,c)=>s+Math.max(.01,c.ratio??1),0);let acc=0;items.forEach((c,i)=>{const[r,g,b]=parseColor(c.color);rgb.set([r,g,b],i*3);acc+=Math.max(.01,c.ratio??1)/total;stops[i]=acc// end of this color's band
;});return{rgb,stops,count};}function createProgram(gl,vs,fs){const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.error(gl.getShaderInfoLog(s));return null;}return s;};const v=compile(gl.VERTEX_SHADER,vs);const f=compile(gl.FRAGMENT_SHADER,fs);if(!v||!f)return null;const p=gl.createProgram();gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS)){console.error(gl.getProgramInfoLog(p));return null;}return p;}// ---------- shaders ----------
const VERT=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;const FRAG=`
precision highp float;
uniform vec2 uRes;
uniform float uTime, uAngle, uScale, uStretch, uWarp, uSoft, uGrain, uSeed;
uniform int uCount;
uniform vec3 uColors[${MAX_COLORS}];
uniform float uStops[${MAX_COLORS}];

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float f = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { f += a * snoise(p); p = p * 2.02 + 17.0; a *= 0.5; }
  return f;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  uv.y = 1.0 - uv.y;                       // screen space: y down
  vec2 p = uv - 0.5;
  p.x *= uRes.x / uRes.y;

  // align flow direction with +x (0deg = right, 90deg = down)
  float c = cos(uAngle), s = sin(uAngle);
  p = mat2(c, -s, s, c) * p;
  p.x /= max(uStretch, 0.1);               // elongate along the flow
  p *= 0.6 / max(uScale, 0.05);
  p += uSeed * 3.17;

  float t = uTime * 0.12;
  p.x -= t;                                // travel along the flow

  // low-frequency domain warp -> big, soft, liquid shapes
  vec2 q = vec2(snoise(p * 0.7 + vec2(0.0, t * 0.5)),
                snoise(p * 0.7 + vec2(3.1, 7.4) - t * 0.4));
  vec2 r = vec2(snoise(p + uWarp * 0.7 * q + vec2(1.7, 9.2) + t * 0.3),
                snoise(p + uWarp * 0.7 * q + vec2(8.3, 2.8) - t * 0.2));
  float n = snoise(p * 0.9 + uWarp * 0.6 * r);

  // silky folds running along the flow
  float v = p.y * 0.7 + n * 0.8 + r.x * 0.35;
  float f = 0.5 + 0.5 * sin(v * 2.6);
  f = clamp(mix(f, 0.5 + 0.6 * n, 0.5), 0.0, 1.0);

  // colour ramp with ratio-based bands
  float w = max(uSoft, 0.001) * 0.22;
  vec3 col = uColors[0];
  for (int i = 0; i < ${MAX_COLORS-1}; i++) {
    if (i >= uCount - 1) break;
    float b = uStops[i];
    col = mix(col, uColors[i + 1], smoothstep(b - w, b + w, f));
  }

  float g = hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5;
  col += g * (uGrain * 0.12 + 0.004);      // grain + dither against banding
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;