<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

#la-wrap{
  font-family:Lora,serif;
  color:#fdfcfa;
  max-width:680px;
  margin:0 auto;
}

/* ---------------- PROGRESS ---------------- */
.la-prog{
  display:flex;
  gap:6px;
  margin-bottom:40px;
}
.la-bar{
  flex:1;
  height:3px;
  background:#2a2218;
  border-radius:2px;
  transition:all .3s;
}
.la-bar.on{
  background:#c1b085;
  box-shadow:0 0 10px rgba(193,176,133,.6);
}

/* ---------------- COUNTER ---------------- */
.la-counter{
  text-align:center;
  margin:25px 0;
}
.la-counter-box{
  display:inline-flex;
  gap:10px;
  padding:12px 24px;
  border:1px solid #4a3d28;
  background:rgba(193,176,133,.05);
}
.la-counter-box span{
  font-family:Cinzel;
  font-size:28px;
  color:#c1b085;
}

/* ---------------- ROW ---------------- */
.la-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px;
  margin-bottom:8px;
  border-radius:4px;
  transition:.25s;
}

.la-left{
  display:flex;
  align-items:center;
  gap:14px;
  cursor:pointer;
  flex:1;
}

/* CHECKBOX */
.la-box{
  width:22px;
  height:22px;
  border:1px solid #7a6842;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:.25s;
}
.la-box.on{
  border-color:#c1b085;
  box-shadow:0 0 12px rgba(193,176,133,.7);
}
.la-box svg{
  opacity:0;
  transform:scale(.6);
  transition:.2s;
}
.la-box.on svg{
  opacity:1;
  transform:scale(1);
}

/* LABEL */
.la-label{
  font-family:Cinzel;
  font-size:15px;
  color:#9a8d7a;
  letter-spacing:1px;
  transition:.25s;
}
.la-label.on{
  color:#c1b085;
  text-shadow:0 0 10px rgba(193,176,133,.4);
}

/* N/A BUTTON */
.naBtn{
  font-family:Cinzel;
  font-size:11px;
  padding:6px 10px;
  border:1px solid #342a1c;
  background:transparent;
  color:#4a3d28;
  cursor:pointer;
  transition:.25s;
}
.naBtn.on{
  border-color:#c1b085;
  color:#b8984e;
  box-shadow:0 0 12px rgba(193,176,133,.5);
}

/* ---------------- TITLES ---------------- */
.title{
  font-family:Cinzel;
  font-size:14px;
  letter-spacing:4px;
  color:#b8984e;
}
.head{
  font-family:Cinzel;
  font-size:28px;
  margin-bottom:6px;
}
.sub{
  font-style:italic;
  color:#a09484;
  margin-bottom:20px;
}

/* ---------------- BUTTONS ---------------- */
button{
  cursor:pointer;
}

/* ---------------- RESULTS ---------------- */
.result-box{
  text-align:center;
  padding:30px;
}
.result-score{
  font-size:46px;
  color:#c1b085;
  font-family:Cinzel;
}

/* ---------------- EMAIL ---------------- */
input{
  width:100%;
  padding:12px;
  margin:6px 0;
  background:#0b0806;
  border:1px solid #2a2218;
  color:#fff;
}

.send-btn{
  width:100%;
  padding:14px;
  margin-top:10px;
  font-family:Cinzel;
  background:linear-gradient(135deg,#c1b085,#d4c4a0);
  border:none;
  color:#100d0a;
}
</style>

<div id="la-wrap">
  <div id="pg1"></div>
  <div id="pg-rest"></div>
</div>

<script>
(function(){
  if(window.__laLoaded) return;
  window.__laLoaded = true;

  const P = [
    {n:'Digital Life',d:'Access systems',i:['EMAIL','PASSWORDS','CLOUD','2-FACTOR AUTHENTICATION','SOCIAL','ARCHIVE']},
    {n:'Financial',d:'Money systems',i:['BANK','INVEST','CRYPTO','RETIRE','INSURANCE','TAX']},
    {n:'Property',d:'Home assets',i:['DEEDS','CAR','UTILITIES','MAINT','INSURANCE','ACCESS']},
    {n:'Medical',d:'Health info',i:['INSURANCE','RECORDS','RX','ALLERGIES','DOCTOR','DIRECTIVE']},
    {n:'Legal',d:'Legal docs',i:['WILL','TRUST','POA','POLICIES','BUSINESS','CONTACTS']},
    {n:'Business',d:'Ops continuity',i:['ENTITY','BANKING','OPS','VENDORS','CLIENTS','ROLES']},
    {n:'Legacy',d:'Personal intent',i:['LETTER','WISHES','FUNERAL','OBITUARY','MESSAGES','NOTES']}
  ];

  let ST = Array.from({length:7},()=>Array(6).fill(0));
  let NA = Array.from({length:7},()=>Array(6).fill(0));
  let OB = null;

  const save = ()=> {
    localStorage.setItem('la_st',JSON.stringify(ST));
    localStorage.setItem('la_na',JSON.stringify(NA));
  };

  const c = p => ST[p].reduce((a,v)=>a+v,0);
  const m = p => 6-NA[p].reduce((a,v)=>a+v,0);

  function prog(p){
    let h='<div class="la-prog">';
    for(let i=0;i<7;i++){
      h+=`<div class="la-bar ${i<p?'on':''}"></div>`;
    }
    return h+'</div>';
  }

  function counter(p){
    return `<div class="la-counter"><div class="la-counter-box"><span>${c(p)}</span><span>of ${m(p)}</span></div></div>`;
  }

  function render(p){
    const d = P[p];

    let rows='';
    for(let i=0;i<6;i++){
      rows+=`
      <div class="la-row">
        <div class="la-left" onclick="__la.t(${p},${i})">
          <div class="la-box ${ST[p][i]?'on':''}">
            <svg width="12" height="10"><path d="M1 5L4 8L11 1" stroke="#c1b085"/></svg>
          </div>
          <div class="la-label ${ST[p][i]?'on':''}">${d.i[i]}</div>
        </div>

        <button class="naBtn ${NA[p][i]?'on':''}" onclick="__la.n(${p},${i})">N/A</button>
      </div>`;
    }

    const html =
      prog(p)+
      `<div class="title">PILLAR ${p+1}/7</div>`+
      `<div class="head">${d.n}</div>`+
      `<div class="sub">${d.d}</div>`+
      counter(p)+
      rows+
      `<div style="display:flex;justify-content:space-between;margin-top:20px;">
        ${p>0?`<button onclick="render(${p-1})">BACK</button>`:''}
        <button onclick="render(${p+1})">NEXT</button>
      </div>`;

    document.getElementById('pg-rest').innerHTML = html;
  }

  window.__la = {
    t(p,i){
      ST[p][i]=ST[p][i]?0:1;
      if(ST[p][i]) NA[p][i]=0;
      save(); render(p);
    },
    n(p,i){
      NA[p][i]=NA[p][i]?0:1;
      if(NA[p][i]) ST[p][i]=0;
      save(); render(p);
    },
    start(){
      render(0);
    },
    send(){
      const payload = {
        name:document.getElementById('la-fn')?.value||'',
        email:document.getElementById('la-em')?.value||'',
        state:ST,
        na:NA,
        time:new Date().toISOString()
      };

      fetch("https://hook.us2.make.com/8sf4ost41gkncwh2tqvspqi5h29ll41b",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });

      document.getElementById('pg-rest').innerHTML =
        `<div class="result-box">
          <div class="result-score">COMPLETE</div>
          <p>We’ve received your analysis.</p>
        </div>`;
    }
  };

  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('pg-rest').innerHTML =
      `<button onclick="__la.start()">START ANALYSIS</button>`;
  });

})();
</script>
