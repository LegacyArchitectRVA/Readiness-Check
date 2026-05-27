<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:wght@400;600&display=swap" rel="stylesheet">

<style>
#la{
  font-family:Lora,serif;
  max-width:760px;
  margin:0 auto;
  color:#fdfcfa;
}

/* PROGRESS RING */
.ringWrap{
  display:flex;
  justify-content:center;
  margin:18px 0 8px;
}
svg{transform:rotate(-90deg);}
.bgRing{fill:none;stroke:#2a2218;stroke-width:10;}
.progressRing{
  fill:none;
  stroke:#c1b085;
  stroke-width:10;
  stroke-linecap:round;
  filter:drop-shadow(0 0 10px rgba(193,176,133,.6));
  transition:stroke-dashoffset .6s ease;
}

/* PULSE STATES */
@keyframes glowGold{
  0%{box-shadow:0 0 6px rgba(193,176,133,.15);}
  50%{box-shadow:0 0 18px rgba(193,176,133,.6);}
  100%{box-shadow:0 0 6px rgba(193,176,133,.15);}
}
@keyframes glowRed{
  0%{box-shadow:0 0 6px rgba(180,60,60,.15);}
  50%{box-shadow:0 0 18px rgba(180,60,60,.65);}
  100%{box-shadow:0 0 6px rgba(180,60,60,.15);}
}
.pulseGold{animation:glowGold 2s infinite;}
.pulseRed{animation:glowRed 1.4s infinite;}

/* ITEMS */
.item{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px 10px;
  margin:6px 0;
  border:1px solid transparent;
  transition:.3s;
}

.left{
  display:flex;
  gap:12px;
  flex:1;
  cursor:pointer;
}

.box{
  width:22px;
  height:22px;
  border:1px solid #7a6842;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:.2s;
}
.box.on{
  border-color:#c1b085;
  box-shadow:0 0 14px rgba(193,176,133,.8);
}
.box svg{
  opacity:0;
  transform:scale(.6);
  transition:.2s;
}
.box.on svg{
  opacity:1;
  transform:scale(1);
}

.label{
  font-family:Cinzel;
  font-size:14px;
  color:#9a8d7a;
}
.label.on{
  color:#c1b085;
  text-shadow:0 0 10px rgba(193,176,133,.3);
}

.na{
  font-family:Cinzel;
  font-size:11px;
  padding:6px 10px;
  border:1px solid #342a1c;
  background:transparent;
  color:#4a3d28;
  cursor:pointer;
}
.na.on{
  border-color:#c1b085;
  color:#b8984e;
  box-shadow:0 0 10px rgba(193,176,133,.5);
}

/* BUTTONS */
.btn{
  width:100%;
  margin-top:14px;
  padding:14px;
  font-family:Cinzel;
  background:linear-gradient(135deg,#c1b085,#d4c4a0);
  border:none;
  color:#100d0a;
  cursor:pointer;
}

/* SLIDE ANIMATION */
.slideIn{
  animation:slideIn .35s ease;
}
@keyframes slideIn{
  from{opacity:0;transform:translateY(10px);}
  to{opacity:1;transform:translateY(0);}
}

input{
  width:100%;
  padding:12px;
  margin:6px 0;
  font-family:Lora;
  background:#0a0806;
  border:1px solid #342a1c;
  color:#fff;
}
</style>

<div id="la"><div id="view"></div></div>

<script>
(function(){

const WEBHOOK="https://hook.us2.make.com/8sf4ost41gkncwh2tqvspqi5h29ll41b";

const P=[
"Digital Life","Financial Assets","Property & Access",
"Medical (2-Factor Authentication)","Legal Estate","Business Continuity","Legacy & Wishes"
];

const items=Array.from({length:7},()=>Array(6).fill(0));
const na=Array.from({length:7},()=>Array(6).fill(0));

let step=0;

/* SCORE */
const score=p=>items[p].reduce((a,b)=>a+b,0);
const max=p=>6-na[p].reduce((a,b)=>a+b,0);

function total(){
let t=0,m=0;
for(let i=0;i<7;i++){t+=score(i);m+=max(i);}
return {t,m,pct:m?Math.round((t/m)*100):0};
}

/* RING */
function ring(){
const {pct}=total();
const r=70;
const c=2*Math.PI*r;
const o=c-(pct/100)*c;

return `
<div class="ringWrap ${pct>80?'pulseGold':pct<40?'pulseRed':''}">
<svg width="180" height="180">
<circle class="bgRing" cx="90" cy="90" r="${r}"/>
<circle class="progressRing" cx="90" cy="90" r="${r}"
style="stroke-dasharray:${c};stroke-dashoffset:${o};"/>
</svg>
</div>
<div style="text-align:center;font-family:Cinzel;color:#c1b085;">
${pct}% Continuity Score
</div>`;
}

/* CRM BUILDER (HIDDEN INSIGHTS) */
function buildCRM(){

const {t,m,pct}=total();

let tier="AT RISK";
if(pct>85)tier="COMPREHENSIVE";
else if(pct>65)tier="STRUCTURED";
else if(pct>40)tier="FRAGILE";

/* weakest pillar */
let weakest=null, worst=999;
let gaps=[];

for(let i=0;i<7;i++){
let g=max(i)-score(i);
gaps.push({pillar:P[i],gap:g});
if(g<worst){worst=g;weakest=P[i];}
}

/* follow-ups */
let followUps=[
Date.now(),
Date.now()+86400000,
Date.now()+259200000
];

/* public share id */
let shareId=Math.random().toString(36).substring(2,10);

return {
score:t,
max:m,
percent:pct,
tier,
weakest,
gaps,
followUps,
shareLink:location.origin+location.pathname+"#"+shareId,
crmTag:pct>75?"HOT LEAD":"STANDARD",
riskLevel:pct<50?"HIGH":"MEDIUM"
};
}

/* RENDER */
function render(anim=true){

const v=document.getElementById("view");
const {t,m,pct}=total();

let h=ring()+
`<h2 style="text-align:center;font-family:Cinzel;">${P[step]}</h2>`;

/* items */
for(let i=0;i<6;i++){

let on=items[step][i];
let n=na[step][i];

h+=`
<div class="item ${anim?'slideIn':''}">
<div class="left" onclick="toggle(${step},${i})">
<div class="box ${on?'on':''}">
<svg width="12" height="10"><path d="M1 5L4 8L11 1" stroke="#c1b085"/></svg>
</div>
<div class="label ${on?'on':''}">Item ${i+1}</div>
</div>
<button class="na ${n?'on':''}" onclick="toggleNA(${step},${i})">N/A</button>
</div>`;
}

h+=`<button class="btn" onclick="next()">
${step<6?'NEXT PILLAR':'FINISH ANALYSIS'}
</button>`;

/* EMAIL CAPTURE ONLY ON LAST STEP */
if(step===6){
h+=`
<div style="margin-top:16px">
<input id="nm" placeholder="First Name">
<input id="em" placeholder="Email">

<button class="btn" onclick="send()">SEND FULL ANALYSIS</button>
<button class="btn" onclick="downloadPDF()">DOWNLOAD REPORT</button>
</div>`;
}

v.innerHTML=h;
}

/* ACTIONS */
window.toggle=(p,i)=>{
items[p][i]=items[p][i]?0:1;
if(items[p][i]) na[p][i]=0;
render();
};

window.toggleNA=(p,i)=>{
na[p][i]=na[p][i]?0:1;
if(na[p][i]) items[p][i]=0;
render();
};

window.next=()=>{if(step<6)step++;render();};

/* SEND WEBHOOK */
function send(){

const crm=buildCRM();

fetch(WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:document.getElementById("nm")?.value||"",
email:document.getElementById("em")?.value||"",
crm,
raw:{items,na},
timestamp:new Date().toISOString()
})
});

document.getElementById("view").innerHTML=
`<div style="text-align:center;font-family:Cinzel;">
<h2>Analysis Sent</h2>
<p>Your results are being prepared.</p>
</div>`;
}

/* PDF */
function downloadPDF(){
const crm=buildCRM();
const {jsPDF}=window.jspdf;
const doc=new jsPDF();

doc.text("Analysis Report",10,10);
doc.text("Score: "+crm.percent+"%",10,20);
doc.text("Tier: "+crm.tier,10,30);
doc.text("Weakest: "+crm.weakest,10,40);

doc.save("analysis-report.pdf");
}

window.send=send;
window.downloadPDF=downloadPDF;

/* INIT */
render();

})();
</script>
