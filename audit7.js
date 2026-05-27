(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  // Detect embed (Carrd iframe safe mode)
  if (window.self !== window.top) {
    document.documentElement.classList.add('embed-mode');
  }

  window.__la = window.__la || {};

  var P = [
    { n:'Digital Life', d:'Access and continuity for essential digital systems.', i:['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    { n:'Financial & Assets', d:'Documentation of financial accounts, obligations, and payment systems.', i:['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS']},
    { n:'Household & Property', d:'Property records, access information, and household operations.', i:['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS']},
    { n:'Health & Medical', d:'Medical history, directives, and emergency access information.', i:['HEALTH INSURANCE INFORMATION','MEDICAL RECORDS & HISTORY','PRESCRIPTION MEDICATIONS LIST','ADVANCE DIRECTIVES']},
    { n:'Legal & Estate', d:'Legal instruments, policy documentation, and estate planning records.', i:['LAST WILL & TESTAMENT','TRUST DOCUMENTATION','POWERS OF ATTORNEY','LIFE INSURANCE POLICIES','BUSINESS ENTITIES']},
    { n:'Business Continuity', d:'Operational documentation for business owners, including transition planning.', i:['BUSINESS ENTITY DOCUMENTS','BUSINESS BANKING ACCESS','OPERATING OR PARTNERSHIP AGREEMENTS','KEY CUSTOMER & VENDOR RECORDS']},
    { n:'Legacy & Wishes', d:'Personal statements, preferences, and messages for those left behind.', i:['PERSONAL LETTERS & MESSAGES','ETHICAL WILL STATEMENT','FUNERAL PREFERENCES','OBITUARY INFORMATION']}
  ];

  var ST = Array.from({length:7},()=>Array(6).fill(0));
  var NA = Array.from({length:7},()=>Array(6).fill(0));
  var OB = null;

  // ---------- STATE ----------
  function pillarChecked(pi){
    return ST[pi].reduce((a,v)=>a+v,0);
  }

  function pillarMax(pi){
    return 6 - NA[pi].reduce((a,v)=>a+v,0);
  }

  // ---------- UI HELPERS ----------
  function ctr(pi){
    var c = pillarChecked(pi);
    var m = pillarMax(pi);
    return `<div style="margin:18px 0;text-align:center;
      font-family:Cinzel,serif;color:#c1b085;">
      <div style="font-size:28px">${c}</div>
      <div style="font-size:14px;color:#8a7240">of ${m}</div>
    </div>`;
  }

  function prog(active){
    var h='<div style="display:flex;gap:5px;margin-bottom:25px;">';
    for(var i=0;i<7;i++){
      h+='<div style="flex:1;height:3px;background:'+(i<active?'#c1b085':'#342a1c')+'"></div>';
    }
    return h+'</div>';
  }

  // ---------- TOGGLE CHECK ----------
  window.__la.t = function(pi,ii){
    ST[pi][ii] = ST[pi][ii] ? 0 : 1;
    if(ST[pi][ii]) NA[pi][ii] = 0;
    render();
  };

  // ---------- TOGGLE N/A ----------
  window.__la.na = function(pi,ii){
    NA[pi][ii] = NA[pi][ii] ? 0 : 1;
    if(NA[pi][ii]) ST[pi][ii] = 0;
    render();
  };

  // ---------- RENDER PILLAR ----------
  function pillarHTML(pi){
    var p = P[pi];

    var rows = '';
    for(var i=0;i<6;i++){
      var on = ST[pi][i];
      var na = NA[pi][i];
      var disabled = na ? 0.35 : 1;

      rows+=`
      <div style="display:flex;justify-content:space-between;
        align-items:center;margin:8px 0;opacity:${disabled}">
        
        <div onclick="__la.t(${pi},${i})"
          style="flex:1;cursor:pointer;color:${on?'#c1b085':'#9a8d7a'}">
          ${p.i[i]||''}
        </div>

        <button onclick="__la.na(${pi},${i})"
          style="border:1px solid #342a1c;
          background:${na?'rgba(193,176,133,0.08)':'transparent'};
          color:${na?'#c1b085':'#8a7240'};
          padding:6px 10px;font-size:10px;cursor:pointer;">
          N/A
        </button>
      </div>`;
    }

    return `
      ${prog(pi)}
      <div style="font-family:Cinzel;font-size:26px;color:#c1b085">${p.n}</div>
      <div style="font-family:Georgia;font-style:italic;color:#a09484;margin-bottom:12px">${p.d}</div>

      ${ctr(pi)}

      ${rows}

      <div style="margin-top:24px;text-align:right;">
        <button onclick="__la.go(${pi+2})"
          style="padding:12px 24px;
          font-family:Cinzel;
          background:#c1b085;
          border:none;
          cursor:pointer;">
          NEXT
        </button>
      </div>
    `;
  }

  // ---------- RESULTS ----------
  function resultsHTML(){

    var total=0,max=0;

    for(var i=0;i<7;i++){
      total+=pillarChecked(i);
      max+=pillarMax(i);
    }

    var pct = max?Math.round((total/max)*100):0;

    return `
      <div style="text-align:center;font-family:Cinzel;color:#c1b085">
        <h2>YOUR SCORE</h2>
        <div style="font-size:48px">${pct}%</div>
        <div style="margin-top:20px;color:#8a7240">Audit Complete</div>

        <div style="margin-top:30px">
          <button onclick="__la.go(1)"
            style="padding:12px 24px;background:#c1b085;border:none;">
            RESTART
          </button>
        </div>
      </div>
    `;
  }

  // ---------- RENDER CORE ----------
  function render(n){

    var wrap = document.getElementById('pg-rest');
    var pg1 = document.getElementById('pg1');

    if(n===undefined) n=1;

    if(n===1){
      if(pg1) pg1.style.display='';
      if(wrap) wrap.innerHTML='';
      return;
    }

    if(pg1) pg1.style.display='none';

    if(n===99){
      if(wrap) wrap.innerHTML = resultsHTML();
      return;
    }

    if(wrap) wrap.innerHTML = pillarHTML(n-1);
  }

  // ---------- NAV ----------
  window.__la.go = function(n){
    render(n);
  };

  // ---------- EMAIL (SAFE STUB) ----------
  window.__la.send = function(){
    var msg = document.getElementById('la-msg');
    if(msg){
      msg.innerHTML = "Results captured. Email integration can be connected via backend.";
    }
  };

  // initial state
  render(1);

})();
