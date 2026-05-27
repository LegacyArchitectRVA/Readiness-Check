(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  window.__la = {};

  // ---------- DATA ----------
  const P = [
    { n:'Digital Life', d:'Access and continuity for essential digital systems.', i:[
      'PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE',
      '2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE'
    ]},
    { n:'Financial & Assets', d:'Financial accounts and ownership continuity.', i:[
      'BANKING & CREDIT ACCESS','INVESTMENTS','CRYPTOCURRENCY WALLETS'
    ]},
    { n:'Household & Property', d:'Property and household operations.', i:[
      'DEEDS & TITLES','VEHICLE REGISTRATION','HOME RECORDS','UTILITY ACCESS'
    ]},
    { n:'Health & Medical', d:'Medical continuity and directives.', i:[
      'INSURANCE INFO','MEDICAL RECORDS','PRESCRIPTIONS','DIRECTIVES'
    ]},
    { n:'Legal & Estate', d:'Legal and estate planning.', i:[
      'WILL','TRUST','POWER OF ATTORNEY','LIFE INSURANCE','BUSINESS ENTITIES'
    ]},
    { n:'Business Continuity', d:'Operational continuity for business.', i:[
      'BUSINESS DOCS','BANKING ACCESS','OPERATING AGREEMENTS','VENDORS'
    ]},
    { n:'Legacy & Wishes', d:'Personal instructions and messages.', i:[
      'PERSONAL LETTERS','ETHICAL WILL','FUNERAL PREFERENCES','OBITUARY INFO'
    ]}
  ];

  // ---------- STATE ----------
  let ST = Array.from({length:7},()=>Array(6).fill(0));
  let NA = Array.from({length:7},()=>Array(6).fill(0));

  let step = 0; // 0 intro, 1-7 pillars, 8 results

  // ---------- ENGINE ----------
  function pillarScore(p){
    let c = 0, m = 0;
    for (let i=0;i<6;i++){
      if (NA[p][i]) continue;
      m++;
      if (ST[p][i]) c++;
    }
    return {c,m};
  }

  function overallScore(){
    let c=0,m=0;
    for (let p=0;p<7;p++){
      let s = pillarScore(p);
      c += s.c; m += s.m;
    }
    return m ? Math.round((c/m)*100) : 0;
  }

  function pillarTier(pct){
    if (pct >= 85) return "Strong";
    if (pct >= 60) return "Moderate";
    if (pct >= 35) return "Fragile";
    return "Critical";
  }

  function weakestPillar(){
    let worst = null;
    for (let p=0;p<7;p++){
      let {c,m} = pillarScore(p);
      let pct = m ? c/m : 1;
      if (!worst || pct < worst.pct){
        worst = {p, pct, name:P[p].n};
      }
    }
    return worst;
  }

  // ---------- ANIMATION ----------
  function mount(html, dir = 1){
    const root = document.getElementById("pg-rest");
    if (!root) return;

    const old = document.getElementById("la-app");

    const incoming = document.createElement("div");
    incoming.id = "la-app";
    incoming.innerHTML = html;

    incoming.style.transform = `translateX(${dir*40}px)`;
    incoming.style.opacity = "0";
    incoming.style.transition = "all 0.35s ease";

    if (old){
      old.style.transform = `translateX(${-dir*40}px)`;
      old.style.opacity = "0";
      old.style.transition = "all 0.35s ease";

      setTimeout(()=>{
        root.removeChild(old);
        root.appendChild(incoming);

        requestAnimationFrame(()=>{
          incoming.style.transform = "translateX(0)";
          incoming.style.opacity = "1";
        });
      }, 200);
    } else {
      root.appendChild(incoming);
      requestAnimationFrame(()=>{
        incoming.style.transform = "translateX(0)";
        incoming.style.opacity = "1";
      });
    }
  }

  // ---------- ACTIONS ----------
  window.__la.toggle = function(p,i){
    ST[p][i] = ST[p][i] ? 0 : 1;
    if (ST[p][i]) NA[p][i] = 0;
    render(step);
  };

  window.__la.na = function(p,i){
    NA[p][i] = NA[p][i] ? 0 : 1;
    if (NA[p][i]) ST[p][i] = 0;
    render(step);
  };

  window.__la.next = function(){
    render(step+1);
  };

  window.__la.back = function(){
    render(step-1);
  };

  window.__la.results = function(){
    render(8);
  };

  // ---------- RENDER ----------
  function render(n){
    step = n;

    // INTRO
    if (n === 0){
      mount(`
        <div style="text-align:center;font-family:Cinzel;color:#c1b085">
          <h2>7 PILLAR AUDIT</h2>
          <button onclick="__la.next()"
            style="padding:14px 28px;background:#c1b085;border:none;cursor:pointer;">
            START
          </button>
        </div>
      `,1);
      return;
    }

    // RESULTS
    if (n === 8){
      const score = overallScore();
      const weak = weakestPillar();

      mount(`
        <div style="max-width:620px;margin:auto;text-align:center;font-family:Cinzel;color:#c1b085">
          <h2>ANALYSIS COMPLETE</h2>

          <div style="font-size:56px;margin:10px 0">${score}%</div>

          <div style="color:#8a7240;margin-bottom:20px">
            Weakest Area: ${weak.name}
          </div>

          <div style="margin-top:20px">
            <button onclick="__la.render(0)"
              style="padding:12px 24px;background:#c1b085;border:none;">
              RESTART
            </button>
          </div>
        </div>
      `,1);
      return;
    }

    // PILLARS
    const p = n-1;
    const data = P[p];

    let rows = "";

    for (let i=0;i<6;i++){
      const on = ST[p][i];
      const na = NA[p][i];

      rows += `
        <div style="display:flex;justify-content:space-between;
          margin:10px 0;opacity:${na?0.4:1};">

          <div onclick="__la.toggle(${p},${i})"
            style="flex:1;cursor:pointer;
            color:${on?'#c1b085':'#9a8d7a'}">
            ${data.i[i] || ''}
          </div>

          <button onclick="__la.na(${p},${i})"
            style="border:1px solid #342a1c;
            background:${na?'rgba(193,176,133,0.1)':'transparent'};
            color:#c1b085;font-size:10px;padding:6px 10px;">
            N/A
          </button>
        </div>
      `;
    }

    const {c,m} = pillarScore(p);
    const pct = m ? Math.round((c/m)*100) : 0;

    mount(`
      <div style="max-width:620px;margin:auto;font-family:Cinzel">

        <div style="color:#b8984e;letter-spacing:4px;font-size:12px">
          PILLAR ${p+1} OF 7
        </div>

        <h2 style="color:#c1b085">${data.n}</h2>

        <div style="font-family:Georgia;font-style:italic;color:#a09484;margin-bottom:10px">
          ${data.d}
        </div>

        <div style="margin:20px 0;color:#8a7240">
          ${c} / ${m} complete (${pct}%)
        </div>

        ${rows}

        <div style="display:flex;justify-content:space-between;margin-top:30px">
          <button onclick="__la.back()" style="background:none;border:none;color:#8a7240">Back</button>

          ${p===6
            ? `<button onclick="__la.results()" style="background:#c1b085;border:none;padding:12px 24px;">Finish</button>`
            : `<button onclick="__la.next()" style="background:#c1b085;border:none;padding:12px 24px;">Next</button>`
          }
        </div>
      </div>
    `,1);
  }

  window.__la.render = render;

  // init
  render(0);

})();
