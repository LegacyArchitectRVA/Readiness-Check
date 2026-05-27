(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  console.log("AUDIT LOADED");

  /* =========================
     STATE
  ========================= */

  var P = [
    { n: 'Digital Life', d: 'Access and continuity for essential digital systems.', i: ['PRIMARY EMAIL ACCESS', 'PASSWORD MANAGER', 'CLOUD STORAGE', '2FA RECOVERY KEYS', 'SOCIAL MEDIA ACCESS', 'DIGITAL ARCHIVE'] },
    { n: 'Financial & Assets', d: 'Documentation of financial accounts, obligations, and payment systems.', i: ['BANKING & CREDIT ACCESS', 'INVESTMENT & RETIREMENT ACCOUNTS', 'CRYPTOCURRENCY WALLETS & KEYS'] },
    { n: 'Household & Property', d: 'Property records, access information, and household operations.', i: ['PROPERTY DEEDS & TITLES', 'VEHICLE REGISTRATIONS', 'HOME MAINTENANCE RECORDS', 'UTILITY ACCOUNT ACCESS'] },
    { n: 'Health & Medical', d: 'Medical history, directives, and emergency access information.', i: ['HEALTH INSURANCE INFORMATION', 'MEDICAL RECORDS & HISTORY', 'PRESCRIPTION MEDICATIONS LIST', 'ADVANCE DIRECTIVES'] },
    { n: 'Legal & Estate', d: 'Legal instruments, policy documentation, and estate planning records.', i: ['LAST WILL & TESTAMENT', 'TRUST DOCUMENTATION', 'POWERS OF ATTORNEY', 'LIFE INSURANCE POLICIES', 'BUSINESS ENTITIES'] },
    { n: 'Business Continuity', d: 'Operational documentation for business owners, including transition planning.', i: ['BUSINESS ENTITY DOCUMENTS', 'BUSINESS BANKING ACCESS', 'OPERATING OR PARTNERSHIP AGREEMENTS', 'KEY CUSTOMER & VENDOR RECORDS'] },
    { n: 'Legacy & Wishes', d: 'Personal statements, preferences, and messages for those left behind.', i: ['PERSONAL LETTERS & MESSAGES', 'ETHICAL WILL STATEMENT', 'FUNERAL PREFERENCES', 'OBITUARY INFORMATION'] }
  ];

  var ST = Array.from({ length: 7 }, () => Array(6).fill(0));
  var NA = Array.from({ length: 7 }, () => Array(6).fill(0));
  var OB = null;

  window.__la = window.__la || {};
  window.__la._ST = ST;
  window.__la._NA = NA;
  window.__la._P = P;

  /* =========================
     STATE CAPTURE
  ========================= */

  function getPg1State() {
    for (var i = 0; i < 6; i++) {
      var cb = document.getElementById('c0-' + i);
      var na = document.getElementById('na0-' + i);

      ST[0][i] = cb && cb.checked ? 1 : 0;
      NA[0][i] = na && na.checked ? 1 : 0;
    }
  }

  window.__la.getPg1State = getPg1State;

  /* =========================
     HELPERS
  ========================= */

  function pillarChecked(pi) {
    return ST[pi].reduce((a, v) => a + v, 0);
  }

  function pillarNa(pi) {
    return NA[pi].reduce((a, v) => a + v, 0);
  }

  function pillarMax(pi) {
    return 6 - pillarNa(pi);
  }

  function ctrStyles(cnt, mx) {
    var f = mx > 0 && cnt === mx;
    return {
      border: f ? '#c1b085' : cnt > 0 ? '#7a6842' : '#342a1c',
      shadow: cnt > 0 ? '0 0 12px rgba(193,176,133,0.3)' : 'none',
      bg: 'rgba(193,176,133,' + (f ? '0.06' : '0.02') + ')',
      numColor: f ? '#c1b085' : '#6b5a38'
    };
  }

  function counterHTML(pi) {
    var cnt = pillarChecked(pi);
    var mx = pillarMax(pi);
    var s = ctrStyles(cnt, mx);

    return '<div id="la-ctr-' + pi + '" style="margin-bottom:32px;">' +
      '<div style="display:inline-flex;gap:10px;padding:12px 24px;border:1px solid ' + s.border + ';background:' + s.bg + ';box-shadow:' + s.shadow + ';">' +
      '<span id="la-ctr-num-' + pi + '" style="font-family:Cinzel;font-size:26px;color:' + s.numColor + '">' + cnt + '</span>' +
      '<span style="font-family:Cinzel;font-size:14px;color:#8a7240;">of</span>' +
      '<span id="la-ctr-mx-' + pi + '" style="font-family:Cinzel;font-size:16px;color:#8a7240;">' + mx + '</span>' +
      '</div></div>';
  }

  function updateCtr(pi) {
    var cnt = pillarChecked(pi);
    var mx = pillarMax(pi);

    var num = document.getElementById('la-ctr-num-' + pi);
    var mxEl = document.getElementById('la-ctr-mx-' + pi);
    var wrap = document.getElementById('la-ctr-' + pi);

    if (!wrap) return;

    if (num) num.textContent = cnt;
    if (mxEl) mxEl.textContent = mx;
  }

  function prog(active) {
    var h = '<div style="display:flex;gap:6px;margin-bottom:40px;">';
    for (var i = 0; i < 7; i++) {
      h += '<div style="flex:1;height:3px;background:' +
        (i <= active ? '#c1b085' : '#342a1c') +
        ';"></div>';
    }
    return h + '</div>';
  }

  function pillarHTML(pi) {
    var pl = P[pi];
    var rows = '';

    for (var ii = 0; ii < 6; ii++) {
      rows += '<div style="display:flex;justify-content:space-between;margin:10px 0;">' +
        '<div>' + (pl.i[ii] || '') + '</div>' +
        '</div>';
    }

    return prog(pi) +
      '<div style="font-family:Cinzel;font-size:18px;">PILLAR ' + (pi + 1) + '</div>' +
      '<div style="font-size:28px;margin:10px 0;">' + pl.n + '</div>' +
      '<div style="opacity:0.8;margin-bottom:20px;">' + pl.d + '</div>' +
      counterHTML(pi) +
      rows +
      '<div style="margin-top:30px;">' +
      '<button onclick="__la.go(' + (pi === 6 ? 'R' : (pi + 2)) + ')">NEXT PILLAR</button>' +
      '</div>';
  }

  function resultsHTML() {
    return '<div style="padding:40px;font-family:Cinzel;">RESULTS SCREEN</div>';
  }

  /* =========================
     SINGLE SAFE NAV SYSTEM (FIXED)
  ========================= */

  window.__la.go = function (n) {
    var pg1 = document.getElementById('pg1');
    var rest = document.getElementById('pg-rest');

    if (!pg1 || !rest) return;

    getPg1State();

    if (n === 1) {
      pg1.style.display = '';
      rest.innerHTML = '';
      return;
    }

    pg1.style.display = 'none';

    if (n === 'R') {
      rest.innerHTML = resultsHTML();
      return;
    }

    rest.innerHTML = pillarHTML(n - 1);

    setTimeout(function () {
      rest.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  /* =========================
     SAFE NEXT HOOK
  ========================= */

  window.laNextPillar = function () {
    getPg1State();
    window.__la.go(2);
  };

})();
