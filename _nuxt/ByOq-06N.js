import{m as k,r as x,n as f,p as _,o as p,c as g,a as i,t as s,d as c,_ as w,b as M}from"./DwALMfA3.js";const C={class:"about-page"},y="Rohan Chourasia",E="Kaam Kaam Kaam",R="GM",B="MOM",z=200,F=.5,H=5,L=.075,N=k({__name:"Description",setup(b){const a=x(null);let n=null,o=[];const u=[{front:"red",back:"darkred"},{front:"green",back:"darkgreen"},{front:"blue",back:"darkblue"},{front:"yellow",back:"darkyellow"},{front:"orange",back:"darkorange"},{front:"pink",back:"darkpink"},{front:"purple",back:"darkpurple"},{front:"turquoise",back:"darkturquoise"}],d=()=>{a.value&&n&&(a.value.width=window.innerWidth,a.value.height=window.innerHeight,n.canvas.width/2,n.canvas.height/2)},r=(e,t)=>Math.random()*(t-e)+e,l=()=>{for(let e=0;e<z;e++)o.push({color:u[Math.floor(r(0,u.length))],dimensions:{x:r(10,20),y:r(10,30)},position:{x:r(0,a.value.width),y:a.value.height-1},rotation:r(0,2*Math.PI),scale:{x:1,y:1},velocity:{x:r(-25,25),y:r(0,-50)}})},h=()=>{!n||!a.value||(n.clearRect(0,0,a.value.width,a.value.height),o.forEach((e,t)=>{let m=e.dimensions.x*e.scale.x,v=e.dimensions.y*e.scale.y;n.translate(e.position.x,e.position.y),n.rotate(e.rotation),e.velocity.x-=e.velocity.x*L,e.velocity.y=Math.min(e.velocity.y+F,H),e.velocity.x+=Math.random()>.5?Math.random():-Math.random(),e.position.x+=e.velocity.x,e.position.y+=e.velocity.y,e.position.y>=a.value.height&&o.splice(t,1),e.position.x>a.value.width&&(e.position.x=0),e.position.x<0&&(e.position.x=a.value.width),e.scale.y=Math.cos(e.position.y*.1),n.fillStyle=e.scale.y>0?e.color.front:e.color.back,n.fillRect(-m/2,-v/2,m,v),n.setTransform(1,0,0,1,0,0)}),o.length<=10&&l(),window.requestAnimationFrame(h))};return f(()=>{a.value&&(n=a.value.getContext("2d"),d(),l(),h(),window.addEventListener("resize",d),window.addEventListener("click",l))}),_(()=>{window.removeEventListener("resize",d),window.removeEventListener("click",l)}),(e,t)=>(p(),g("div",C,[i("header",{class:"header"},[i("h1",{class:"greeting"},"Happy Birthday, "+s(y)+"!"),t[0]||(t[0]=i("h2",{class:"sub-heading"},"Here's to celebrating a wonderful friend!",-1))]),i("section",{class:"about-friend"},[i("p",{class:"message"}," Today, we celebrate an amazing person: "+s(y)+"! Your kindness, humor, and creativity make the world a brighter place. From all the adventures we’ve shared to the endless laughs, it’s a blessing to know you. I can’t wait to create more memories and celebrate many more birthdays together! "),i("ul",{class:"memories"},[i("li",null,[t[1]||(t[1]=i("strong",null,"Favorite hobby:",-1)),c(" "+s(E))]),i("li",null,[t[2]||(t[2]=i("strong",null,"Best memory together:",-1)),c(" "+s(R))]),i("li",null,[t[3]||(t[3]=i("strong",null,"Favorite movie:",-1)),c(" "+s(B))])])]),i("canvas",{class:"confetti",ref_key:"canvasRef",ref:a},null,512)]))}}),V=w(N,[["__scopeId","data-v-cddd8d4b"]]),q={};function D(b,a){const n=V;return p(),g("div",null,[M(n)])}const K=w(q,[["render",D]]);export{K as default};