import{_ as k}from"./BuPQQ9wv.js";import{_ as h,o as _,c as p,a,b as o,w as d,d as c,m as w,r as g,n as b,p as M,s as L}from"./IcNTadWd.js";const B={},C={class:"border-b pb-3"},E={class:"relative z-50"},$={class:"mx-auto px-2 sm:px-6 lg:px-8"},R={class:"flex flex-1 items-center justify-center gap-0 -ml-20 xs:-ml-0 sm:items-stretch sm:justify-start sm:gap-10"},z={class:"flex flex-shrink-0 items-center"},F={class:"flex space-x-6 text-green-500 mt-5"};function H(u,t){const n=k;return _(),p("div",C,[a("header",E,[a("div",$,[a("div",R,[a("div",z,[o(n,{to:"/",class:"text-3xl xs:text-4xl text-white font-black ml-16 mt-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"},{default:d(()=>t[0]||(t[0]=[c("Happy Birthday")])),_:1})]),a("div",null,[a("ul",F,[a("li",null,[o(n,{to:"/",class:"transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 tracking-wider underline-offset-4 hover:underline"},{default:d(()=>t[1]||(t[1]=[c("Birthday")])),_:1})]),a("li",null,[o(n,{to:"/about",class:"transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 tracking-wider underline-offset-4 hover:underline"},{default:d(()=>t[2]||(t[2]=[c("About")])),_:1})]),a("li",null,[o(n,{to:"/friend-forever",class:"transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 tracking-wider underline-offset-4 hover:underline"},{default:d(()=>t[3]||(t[3]=[c("Friend Forever")])),_:1})])])])])])])])}const N=h(B,[["render",H]]),S={class:""},V=300,q=.5,j=5,A=.075,I=w({__name:"footer",setup(u){const t=g(null);let n=null,s=[];const m=[{front:"red",back:"darkred"},{front:"green",back:"darkgreen"},{front:"blue",back:"darkblue"},{front:"yellow",back:"darkyellow"},{front:"orange",back:"darkorange"},{front:"pink",back:"darkpink"},{front:"purple",back:"darkpurple"},{front:"turquoise",back:"darkturquoise"}],v=()=>{t.value&&n&&(t.value.width=window.innerWidth,t.value.height=window.innerHeight,n.canvas.width/2,n.canvas.height/2)},i=(e,r)=>Math.random()*(r-e)+e,l=()=>{for(let e=0;e<V;e++)s.push({color:m[Math.floor(i(0,m.length))],dimensions:{x:i(10,20),y:i(10,30)},position:{x:i(0,t.value.width),y:t.value.height-1},rotation:i(0,2*Math.PI),scale:{x:1,y:1},velocity:{x:i(-25,25),y:i(0,-50)}})},x=()=>{!n||!t.value||(n.clearRect(0,0,t.value.width,t.value.height),s.forEach((e,r)=>{let y=e.dimensions.x*e.scale.x,f=e.dimensions.y*e.scale.y;n.translate(e.position.x,e.position.y),n.rotate(e.rotation),e.velocity.x-=e.velocity.x*A,e.velocity.y=Math.min(e.velocity.y+q,j),e.velocity.x+=Math.random()>.5?Math.random():-Math.random(),e.position.x+=e.velocity.x,e.position.y+=e.velocity.y,e.position.y>=t.value.height&&s.splice(r,1),e.position.x>t.value.width&&(e.position.x=0),e.position.x<0&&(e.position.x=t.value.width),e.scale.y=Math.cos(e.position.y*.1),n.fillStyle=e.scale.y>0?e.color.front:e.color.back,n.fillRect(-y/2,-f/2,y,f),n.setTransform(1,0,0,1,0,0)}),s.length<=10&&l(),window.requestAnimationFrame(x))};return b(()=>{t.value&&(n=t.value.getContext("2d"),v(),l(),x(),window.addEventListener("resize",v),window.addEventListener("click",l))}),M(()=>{window.removeEventListener("resize",v),window.removeEventListener("click",l)}),(e,r)=>(_(),p("div",S,[r[0]||(r[0]=a("h3",{class:"name pt-12"},"Happy Birthday",-1)),a("canvas",{class:"confetti",ref_key:"canvasRef",ref:t},null,512)]))}}),T=h(I,[["__scopeId","data-v-92141fe1"]]),P={};function U(u,t){const n=N,s=T;return _(),p("div",null,[o(n),L(u.$slots,"default"),a("div",null,[o(s)])])}const G=h(P,[["render",U]]);export{G as default};
