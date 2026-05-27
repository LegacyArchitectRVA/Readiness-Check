(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  // -------------------------
  // CLEAN EMBED RESET
  // -------------------------
  const rootReset = () => {
    const rest = document.getElementById('pg-rest');
    if (rest) rest.innerHTML = '';
  };
  rootReset();

  // -------------------------
  // DATA MODEL
  // -------------------------
  const P = [
    { n:'Digital Life', d:'Access and continuity for essential digital systems.', i:[
      'PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE'
    ]},
    { n:'Financial & Assets', d:'Documentation of financial accounts, obligations, and payment systems.', i:[
      'BANKING & CREDIT ACCESS','INVESTMENTS','CRYPTO WALLETS','RETIREMENT ACCOUNTS','INSURANCE','TAX RECORDS'
    ]},
    { n:'Household & Property', d:'Property records and operational access.', i:[
      'DEEDS','VEHICLE REGISTRATION','UTILITIES','HOME MAINTENANCE','INSURANCE','KEY ACCESS INFO'
    ]},
    { n:'Health & Medical', d:'Medical and emergency continuity.', i:[
      'INSURANCE','MEDICAL RECORDS','PRESCRIPTIONS','ALLERGIES','PRIMARY CARE INFO','ADVANCE DIRECTIVE'
    ]},
    { n:'Legal & Estate', d:'Legal continuity framework.', i:[
      'WILL','TRUST','POWER OF ATTORNEY','INSURANCE POLICIES','BUSINESS STRUCTURE','LEGAL CONTACTS'
    ]},
    { n:'Business Continuity', d:'Business operational continuity.', i:[
      'ENTITY DOCS','BANKING','OPERATIONS','VENDORS','CLIENT ACCESS','KEY ROLES'
    ]},
    { n:'Legacy & Wishes', d:'Personal intent and closure instructions.', i:[
      'LETTER','ETHICAL WILL','FUNERAL WISHES','OBITUARY','MESSAGES','FINAL NOTES'
    ]}
  ];

  let ST = JSON.parse(localStorage.getItem('la_st') || 'null') ||
           Array.from({length:7},()=>Array(6).fill(0));

  let NA = JSON.parse(localStorage.getItem('la_na') || 'null') ||
           Array.from({length:7},()=>Array(6).fill(0));

  let OB = null;

  const save = () => {
    localStorage.setItem('la_st', JSON.stringify(ST));
    localStorage.setItem('la_na', JSON.stringify(NA));
  };

  // -------------------------
  // HELPERS
  // -------------------------
  const checked = (p)=>ST[p].reduce((a,v)=>a+v,0);
  const max = (p)=>6-NA[p].reduce((a,v)=>a+v,0);

  // -------------------------
  // PROGRESS BAR
  // -------------------------
  function progress(p){
    let h = `<div class="la-prog">`;
    for(let i=0;i<7;i++){
      h += `<div class="bar ${i<p?'on':''}"></div>`;
    }
    return h + `</div>`;
  }

  // -------------------------
  // COUNTER
  // -------------------------
  function counter(p){
    return `
      <div class="counter">
        <div class="box">
          <span>${checked(p)}</span>
          <small>of ${max(p)}</small>
        </div>
      </div>
    `;
  }

  // -------------------------
  // TOGGLE
  // -------------------------
  window.__la = {};

  __la.toggle = function(p,i){
    ST[p][i] = ST[p][i] ? 0 : 1;
    if (ST[p][i]) NA[p][i] = 0;
    save();
    render(p);
  };

  __la.na = function(p,i){
    NA[p][i] = NA[p][i] ? 0 : 1;
    if (NA[p][i]) ST[p][i] = 0;
    save();
    render(p);
  };

  // -------------------------
  // ANIMATION SWAP
  // -------------------------
  function swap(html){
    const el = document.getElementById('pg-rest');
    if (!el) return;

    el.style.opacity = 0;
    el.style.transform = 'translateY(10px)';

    setTimeout(()=>{
      el.innerHTML = html;
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    },150);
  }

  // -------------------------
  // PILLAR RENDER
  // -------------------------
  function render(p){
    const data = P[p];

    let rows = '';

    for(let i=0;i<6;i++){
      const on = ST[p][i];
      const na = NA[p][i];

      rows += `
      <div class="row ${na?'na':''}">
        <div class="left" onclick="__la.toggle(${p},${i})">
          <div class="box ${on?'on':''}">✓</div>
          <div class="label ${on?'on':''}">${data.i[i]}</div>
        </div>
        <button class="naBtn ${na?'on':''}" onclick="__la.na(${p},${i})">N/A</button>
      </div>`;
    }

    const html =
      progress(p) +
      `<div class="title">PILLAR ${p+1} OF 7</div>` +
      `<div class="head">${data.n}</div>` +
      `<div class="sub">${data.d}</div>` +
      counter(p) +
      `<div class="rows">${rows}</div>` +
      `<div class="nav">
        ${p>0?`<button onclick="render(${p-1})">BACK</button>`:''}
        <button onclick="next(${p})">NEXT</button>
      </div>`;

    swap(html);
  }

  function next(p){
    render(p+1);
  }

  __la.next = next;

  // -------------------------
  // EMAIL + RESULTS
  // -------------------------
  __la.send = async function(){

    const payload = {
      name: document.getElementById('la-fn')?.value || '',
      email: document.getElementById('la-em')?.value || '',
      state: ST,
      na: NA,
      timestamp: new Date().toISOString()
    };

    // replace with Resend / GitHub webhook / backend
    try{
      await fetch("https://YOUR-WEBHOOK-HERE", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });

      alert("Sent. Check your email.");
    }catch(e){
      alert("Could not send (no backend connected yet).");
    }
  };

  // -------------------------
  // INIT
  // -------------------------
  document.addEventListener('DOMContentLoaded',()=>{
    const start = document.getElementById('la-start');
    if(start){
      start.onclick = ()=>render(0);
    }
  });

})();
