(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  var P = [
    { n: 'Digital Life', d: 'Access and continuity for essential digital systems.', i: ['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    { n: 'Financial & Assets', d: 'Documentation of financial accounts, obligations, and payment systems.', i: ['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS','','','']},
    { n: 'Household & Property', d: 'Property records, access information, and household operations.', i: ['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS','','']},
    { n: 'Health & Medical', d: 'Medical history, directives, and emergency access information.', i: ['HEALTH INSURANCE','MEDICAL RECORDS','PRESCRIPTIONS','ADVANCE DIRECTIVES','','']},
    { n: 'Legal & Estate', d: 'Legal instruments, policy documentation, and estate planning records.', i: ['WILL','TRUSTS','POA','LIFE INSURANCE','BUSINESS ENTITIES','']},
    { n: 'Business Continuity', d: 'Operational documentation for business owners.', i: ['ENTITY DOCS','BANKING ACCESS','AGREEMENTS','CUSTOMERS & VENDORS','','']},
    { n: 'Legacy & Wishes', d: 'Personal statements and instructions for loved ones.', i: ['LETTERS','ETHICAL WILL','FUNERAL','OBITUARY','','']}
  ];

  var ST = Array.from({ length: 7 }, () => Array(6).fill(0));
  var NA = Array.from({ length: 7 }, () => Array(6).fill(0));
  var OB = null;

  window.__la = window.__la || {};

  function pillarChecked(pi) {
    return ST[pi].reduce((a, v) => a + v, 0);
  }

  function pillarMax(pi) {
    return 6 - NA[pi].reduce((a, v) => a + v, 0);
  }

  function ctrStyles(c, m) {
    var full = m > 0 && c === m;
    return {
      border: full ? '#c1b085' : '#4a3d28',
      bg: full ? 'rgba(193,176,133,0.06)' : 'rgba(193,176,133,0.02)',
      num: full ? '#c1b085' : '#8a7240'
    };
  }

  function counterHTML(pi) {
    var c = pillarChecked(pi);
    var m = pillarMax(pi);
    var s = ctrStyles(c, m);

    return `
      <div id="ctr-${pi}" style="display:flex;justify-content:center;margin:20px 0;">
        <div style="border:1px solid ${s.border};background:${s.bg};padding:10px 20px;display:flex;gap:8px;">
          <span id="ctr-n-${pi}" style="color:${s.num};font-family:Cinzel;font-size:24px">${c}</span>
          <span style="color:#8a7240">of</span>
          <span>${m}</span>
        </div>
      </div>
    `;
  }

  function updateCtr(pi) {
    var el = document.getElementById('ctr-' + pi);
    if (!el) return;

    var c = pillarChecked(pi);
    var m = pillarMax(pi);
    var s = ctrStyles(c, m);

    el.firstElementChild.style.borderColor = s.border;
    el.firstElementChild.style.background = s.bg;
    document.getElementById('ctr-n-' + pi).textContent = c;
  }

  function prog(active) {
    var h = '<div style="display:flex;gap:4px;margin:20px 0;">';
    for (var i = 0; i < 7; i++) {
      h += `<div style="flex:1;height:3px;background:${i < active ? '#c1b085' : '#342a1c'}"></div>`;
    }
    return h + '</div>';
  }

  window.__la.t = function (pi, ii) {
    ST[pi][ii] = ST[pi][ii] ? 0 : 1;
    if (ST[pi][ii]) NA[pi][ii] = 0;
    updateCtr(pi);
  };

  window.__la.na = function (pi, ii) {
    NA[pi][ii] = NA[pi][ii] ? 0 : 1;
    if (NA[pi][ii]) ST[pi][ii] = 0;
    updateCtr(pi);
  };

  function pillarHTML(pi) {
    var pl = P[pi];
    var rows = '';

    for (var i = 0; i < 6; i++) {
      rows += `
        <div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0;opacity:${NA[pi][i] ? 0.4 : 1}">
          <div onclick="__la.t(${pi},${i})" style="cursor:pointer;color:${ST[pi][i] ? '#c1b085' : '#9a8d7a'};flex:1">
            ${pl.i[i] || ''}
          </div>
          <button onclick="__la.na(${pi},${i})" style="margin-left:10px">N/A</button>
        </div>
      `;
    }

    return `
      ${prog(pi)}
      <div style="font-family:Cinzel;font-size:26px;color:#c1b085">${pl.n}</div>
      <div style="margin-bottom:20px">${pl.d}</div>
      ${counterHTML(pi)}
      ${rows}
      <div style="text-align:right;margin-top:20px;">
        <button onclick="window.__la.go(${pi + 2})">NEXT PILLAR</button>
      </div>
    `;
  }

  function resultsHTML() {
    var includeBiz = OB === true;
    var total = 0, max = 0, data = [];

    for (var i = 0; i < 7; i++) {
      if (i === 5 && !includeBiz) continue;

      var c = pillarChecked(i);
      var m = pillarMax(i);

      total += c;
      max += m;

      var pct = m ? Math.round((c / m) * 100) : 0;

      data.push({
        name: P[i].n,
        pct: pct
      });
    }

    var overall = max ? Math.round((total / max) * 100) : 0;

    return `
      <div style="text-align:center">
        <div style="font-size:34px;color:#c1b085">${overall}%</div>
        <div style="margin-bottom:20px">Continuity Score</div>

        ${data.map(d => `
          <div style="margin:10px 0">
            <div>${d.name}</div>
            <div style="height:6px;background:#1a1510">
              <div style="width:${d.pct}%;height:6px;background:#c1b085"></div>
            </div>
          </div>
        `).join('')}

        <button onclick="window.__la.go(1)">Restart</button>
      </div>
    `;
  }

  function show(html) {
    var el = document.getElementById('pg-rest');
    if (el) el.innerHTML = html;
  }

  function showPg1() {
    var el = document.getElementById('pg1');
    if (el) el.style.display = '';
  }

  function hidePg1() {
    var el = document.getElementById('pg1');
    if (el) el.style.display = 'none';
  }

  window.__la.go = function (n) {
    if (n === 1) {
      showPg1();
      show('');
    } else if (n === 'R') {
      hidePg1();
      show(resultsHTML());
    } else {
      hidePg1();
      show(pillarHTML(n - 1));
    }
  };

})();
