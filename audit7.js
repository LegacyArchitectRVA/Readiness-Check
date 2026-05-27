(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  var P = [
    { n: 'Digital Life', d: 'Access and continuity for essential digital systems.', i: ['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    { n: 'Financial & Assets', d: 'Documentation of financial accounts, obligations, and payment systems.', i: ['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS']},
    { n: 'Household & Property', d: 'Property records, access information, and household operations.', i: ['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS']},
    { n: 'Health & Medical', d: 'Medical history, directives, and emergency access information.', i: ['HEALTH INSURANCE INFORMATION','MEDICAL RECORDS & HISTORY','PRESCRIPTION MEDICATIONS LIST','ADVANCE DIRECTIVES']},
    { n: 'Legal & Estate', d: 'Legal instruments, policy documentation, and estate planning records.', i: ['LAST WILL & TESTAMENT','TRUST DOCUMENTATION','POWERS OF ATTORNEY','LIFE INSURANCE POLICIES','BUSINESS ENTITIES']},
    { n: 'Business Continuity', d: 'Operational documentation for business owners.', i: ['BUSINESS ENTITY DOCUMENTS','BUSINESS BANKING ACCESS','OPERATING AGREEMENTS','KEY CUSTOMER & VENDOR RECORDS']},
    { n: 'Legacy & Wishes', d: 'Personal statements and instructions for loved ones.', i: ['PERSONAL LETTERS','ETHICAL WILL','FUNERAL PREFERENCES','OBITUARY INFORMATION']}
  ];

  var ST = Array.from({length:7},()=>Array(6).fill(0));
  var NA = Array.from({length:7},()=>Array(6).fill(0));
  var OB = null;

  window.__la = window.__la || {};

  function pillarChecked(pi){
    return ST[pi].reduce((a,v)=>a+v,0);
  }

  function pillarMax(pi){
    return 6 - NA[pi].reduce((a,v)=>a+v,0);
  }

  function ctrStyles(cnt,mx){
    var full = mx>0 && cnt===mx;
    return {
      border: full?'#c1b085':'#4a3d28',
      bg: full?'rgba(193,176,133,0.06)':'rgba(193,176,133,0.02)',
      shadow: cnt>0?'0 0 18px rgba(193,176,133,0.25)':'none',
      num: full?'#c1b085':'#6b5a38'
    };
  }

  function counterHTML(pi){
    var c=pillarChecked(pi),m=pillarMax(pi),s=ctrStyles(c,m);
    return `
      <div id="la-ctr-${pi}" style="display:flex;justify-content:center;margin-bottom:28px;">
        <div style="padding:14px 28px;border:1px solid ${s.border};background:${s.bg};box-shadow:${s.shadow};display:flex;gap:8px;">
          <span id="la-ctr-num-${pi}" style="font-family:Cinzel;font-size:28px;color:${s.num};">${c}</span>
          <span style="font-family:Bodoni Moda;color:#8a7240;">of</span>
          <span>${m}</span>
        </div>
      </div>
    `;
  }

  function updateCtr(pi){
    var c=pillarChecked(pi),m=pillarMax(pi);
    var el=document.getElementById('la-ctr-'+pi);
    if(!el) return;
    var s=ctrStyles(c,m);
    el.firstElementChild.style.borderColor=s.border;
    el.firstElementChild.style.background=s.bg;
    el.firstElementChild.style.boxShadow=s.shadow;
    document.getElementById('la-ctr-num-'+pi).textContent=c;
  }

  function prog(active){
    var h='<div style="display:flex;gap:5px;margin-bottom:30px;">';
    for(var i=0;i<7;i++){
      h+=`<div style="flex:1;height:3px;background:${i<active?'#c1b085':'#342a1c'}"></div>`;
    }
    return h+'</div>';
  }

  // TOGGLE CHECKBOX
  window.__la.t=function(pi,ii){
    ST[pi][ii]=ST[pi][ii]?0:1;
    if(ST[pi][ii]) NA[pi][ii]=0;

    var s=document.getElementById('sh'+pi+'-'+ii);
    var m=document.getElementById('mk'+pi+'-'+ii);
    var l=document.getElementById('lb'+pi+'-'+ii);

    var on=ST[pi][ii];

    if(s){s.style.borderColor=on?'#c1b085':'#7A6842';}
    if(m){m.style.opacity=on?'1':'0';m.style.transform=on?'scale(1)':'scale(0.6)';}
    if(l){l.style.color=on?'#c1b085':'#9a8d7a';}

    updateCtr(pi);
  };

  // TOGGLE N/A
  window.__la.na=function(pi,ii){
    NA[pi][ii]=NA[pi][ii]?0:1;
    if(NA[pi][ii]) ST[pi][ii]=0;
    updateCtr(pi);
  };

  function pillarHTML(pi){
    var pl=P[pi],rows='';
    for(var i=0;i<6;i++){
      rows+=`
        <div style="display:flex;justify-content:space-between;margin:8px 0;opacity:${NA[pi][i]?0.35:1}">
          <div onclick="__la.t(${pi},${i})" style="cursor:pointer;flex:1;color:${ST[pi][i]?'#c1b085':'#9a8d7a'}">
            ${pl.i[i]||''}
          </div>
          <button onclick="__la.na(${pi},${i})">N/A</button>
        </div>
      `;
    }
    return `
      ${prog(pi)}
      <div style="font-family:Cinzel;font-size:26px;color:#c1b085">${pl.n}</div>
      <div style="font-family:Bodoni Moda;margin-bottom:20px">${pl.d}</div>
      ${counterHTML(pi)}
      ${rows}
      <button onclick="window.__la.go(${pi+2})">NEXT PILLAR</button>
    `;
  }

  function resultsHTML(){
    var includeBiz = OB===true;
    var total=0,max=0,data=[];

    for(var i=0;i<7;i++){
      if(i===5 && !includeBiz) continue;

      var c=pillarChecked(i),m=pillarMax(i);
      total+=c; max+=m;

      var pct=m?Math.round(c/m*100):0;
      var tier=pct>85?'COMPREHENSIVE':pct>65?'WELL STRUCTURED':pct>45?'NEEDS WORK':'CRITICAL';

      data.push({name:P[i].n,c:c,m:m,pct:pct,tier:tier});
    }

    var overall=Math.round(total/max*100);

    return `
      <div style="text-align:center">
        <div style="font-size:30px;color:#c1b085">${overall}%</div>
        <div style="margin-bottom:30px">Overall Continuity Score</div>

        ${data.map(d=>`
          <div style="margin-bottom:16px">
            <div>${d.name}</div>
            <div style="height:6px;background:#1a1510">
              <div style="width:${d.pct}%;height:6px;background:#c1b085"></div>
            </div>
            <div style="font-size:12px;color:#8a7240">${d.tier}</div>
          </div>
        `).join('')}

        <button onclick="window.__la.go(1)">Restart</button>
      </div>
    `;
  }

  function show(html){
    var el=document.getElementById('pg-rest');
    if(el) el.innerHTML=html;
  }

  function hidePg1(){
    var el=document.getElementById('pg1');
    if(el) el.style.display='none';
  }

  function showPg1(){
    var el=document.getElementById('pg1');
    if(el) el.style.display='';
  }

  window.__la.go=function(n){
    if(n===1){showPg1();show('');}
    else if(n==='R'){hidePg1();show(resultsHTML());}
    else{hidePg1();show(pillarHTML(n-1));}
  };

})();
