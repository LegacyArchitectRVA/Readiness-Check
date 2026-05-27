(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  // Detect iframe (Carrd embed mode)
  if (window.self !== window.top) {
    document.documentElement.classList.add('embed-mode');
  }

  window.__la = window.__la || {};

  var P = [
    { n: 'Digital Life', d: 'Access and continuity for essential digital systems.', i: ['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    { n: 'Financial & Assets', d: 'Documentation of financial accounts, obligations, and payment systems.', i: ['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS']},
    { n: 'Household & Property', d: 'Property records, access information, and household operations.', i: ['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS']},
    { n: 'Health & Medical', d: 'Medical history, directives, and emergency access information.', i: ['HEALTH INSURANCE INFORMATION','MEDICAL RECORDS & HISTORY','PRESCRIPTION MEDICATIONS LIST','ADVANCE DIRECTIVES']},
    { n: 'Legal & Estate', d: 'Legal instruments, policy documentation, and estate planning records.', i: ['LAST WILL & TESTAMENT','TRUST DOCUMENTATION','POWERS OF ATTORNEY','LIFE INSURANCE POLICIES','BUSINESS ENTITIES']},
    { n: 'Business Continuity', d: 'Operational documentation for business owners.', i: ['BUSINESS ENTITY DOCUMENTS','BUSINESS BANKING ACCESS','OPERATING AGREEMENTS','KEY CUSTOMER & VENDOR RECORDS']},
    { n: 'Legacy & Wishes', d: 'Personal statements and instructions for loved ones.', i: ['PERSONAL LETTERS','ETHICAL WILL','FUNERAL PREFERENCES','OBITUARY INFORMATION']}
  ];

  var ST = Array.from({ length: 7 }, () => Array(6).fill(0));
  var NA = Array.from({ length: 7 }, () => Array(6).fill(0));
  var currentPage = 1;

  function el(id){ return document.getElementById(id); }

  function pillarChecked(pi){
    return ST[pi].reduce((a,v)=>a+v,0);
  }

  function pillarMax(pi){
    return 6 - NA[pi].reduce((a,v)=>a+v,0);
  }

  // ---------- PROGRESS BAR ----------
  function prog(active){
    let h = '<div class="la-prog">';
    for (let i=0;i<7;i++){
      h += `<div class="la-bar ${i<active?'on':''}"></div>`;
    }
    return h + '</div>';
  }

  // ---------- COUNTER ----------
  function counter(pi){
    const c = pillarChecked(pi);
    const m = pillarMax(pi);
    return `
      <div class="la-counter">
        <div class="la-counter-box">
          <span class="la-num">${c}</span>
          <span class="la-of">of ${m}</span>
        </div>
      </div>
    `;
  }

  // ---------- TOGGLES ----------
  window.__la.toggle = function(pi,ii){
    ST[pi][ii] = ST[pi][ii] ? 0 : 1;
    if (ST[pi][ii]) NA[pi][ii] = 0;
    renderPillar(pi);
  };

  window.__la.na = function(pi,ii){
    NA[pi][ii] = NA[pi][ii] ? 0 : 1;
    if (NA[pi][ii]) ST[pi][ii] = 0;
    renderPillar(pi);
  };

  // ---------- PAGE ANIMATION ----------
  function animateSwap(html){
    const elr = el('pg-rest');
    if (!elr) return;

    elr.style.opacity = 0;
    elr.style.transform = 'translateY(10px)';

    setTimeout(()=>{
      elr.innerHTML = html;
      elr.style.opacity = 1;
      elr.style.transform = 'translateY(0)';
    },160);
  }

  // ---------- PILLAR RENDER ----------
  function renderPillar(pi){
    const p = P[pi];

    let rows = '';

    for (let i=0;i<6;i++){
      const on = ST[pi][i];
      const na = NA[pi][i];

      rows += `
      <div class="la-row ${na?'na':''}">
        <div class="la-left" onclick="__la.toggle(${pi},${i})">
          <div class="la-box ${on?'on':''}">
            <svg width="14" height="11" viewBox="0 0 14 11">
              <path d="M1 6L5 10L13 1" stroke="#c1b085" stroke-width="1.6" fill="none"/>
            </svg>
          </div>
          <div class="la-label ${on?'on':''}">${p.i[i]}</div>
        </div>

        <button class="la-na ${na?'on':''}" onclick="__la.na(${pi},${i})">N/A</button>
      </div>
      `;
    }

    const html =
      prog(pi) +
      `<div class="la-title">PILLAR ${pi+1} OF 7</div>` +
      `<div class="la-head">${p.n}</div>` +
      `<div class="la-sub">${p.d}</div>` +
      counter(pi) +
      `<div class="la-items">${rows}</div>` +
      `<div class="la-nav">
        ${pi>0?`<button onclick="go(${pi})">BACK</button>`:''}
        <button onclick="go(${pi+2})">NEXT</button>
      </div>`;

    animateSwap(html);
  }

  // ---------- NAV ----------
  function go(n){
    currentPage = n;

    const pg1 = el('pg1');
    const rest = el('pg-rest');

    if (n === 1){
      pg1.style.display = '';
      animateSwap('');
      return;
    }

    pg1.style.display = 'none';

    if (n === 8){
      animateSwap(`<div class="la-results">RESULTS ENGINE HERE</div>`);
      return;
    }

    renderPillar(n-1);
  }

  window.__la.go = go;

  // ---------- INIT ----------
  document.addEventListener('DOMContentLoaded', function(){
    const btn = el('la-next');
    if (btn){
      btn.onclick = function(){
        go(2);
      };
    }
  });

})();
