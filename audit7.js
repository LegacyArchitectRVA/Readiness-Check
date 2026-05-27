(function(){
  if(window.__laLoaded) return;
  window.__laLoaded = true;

  console.log("AUDIT LOADED");

  window.__la = window.__la || {};

  /* =========================
     DATA
  ========================= */

  var P=[
    {n:'Digital Life',d:'Access and continuity for essential digital systems.',i:['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    {n:'Financial & Assets',d:'Documentation of financial accounts, obligations, and payment systems.',i:['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS']},
    {n:'Household & Property',d:'Property records, access information, and household operations.',i:['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS']},
    {n:'Health & Medical',d:'Medical history, directives, and emergency access information.',i:['HEALTH INSURANCE INFORMATION','MEDICAL RECORDS & HISTORY','PRESCRIPTION MEDICATIONS LIST','ADVANCE DIRECTIVES']},
    {n:'Legal & Estate',d:'Legal instruments, policy documentation, and estate planning records.',i:['LAST WILL & TESTAMENT','TRUST DOCUMENTATION','POWERS OF ATTORNEY','LIFE INSURANCE POLICIES','BUSINESS ENTITIES']},
    {n:'Business Continuity',d:'Operational documentation for business owners.',i:['BUSINESS ENTITY DOCUMENTS','BUSINESS BANKING ACCESS','OPERATING AGREEMENTS','KEY CUSTOMER & VENDOR RECORDS']},
    {n:'Legacy & Wishes',d:'Personal statements and final wishes.',i:['PERSONAL LETTERS','ETHICAL WILL','FUNERAL PREFERENCES','OBITUARY INFORMATION']},
  ];

  var ST = Array.from({length:7},()=>Array(6).fill(0));
  var NA = Array.from({length:7},()=>Array(6).fill(0));
  var OB = null;

  window.__la._ST = ST;
  window.__la._NA = NA;
  window.__la._P = P;

  /* =========================
     CSS INJECTION (MOBILE + ANIMATION)
  ========================= */

  (function injectCSS(){
    var css = `
      #pg1, #pg-rest{
        transition: opacity 0.35s ease, transform 0.35s ease;
      }

      .la-hidden{
        opacity:0;
        transform: translateY(10px);
        pointer-events:none;
      }

      .la-show{
        opacity:1;
        transform: translateY(0);
      }

      #la-wrap{
        padding: clamp(18px, 4vw, 48px) 16px 60px !important;
      }

      @media (max-width: 600px){
        .la-item-wrap{
          padding: 12px !important;
        }
        .lalb{
          font-size: 14px !important;
          letter-spacing: 1px !important;
        }
        button{
          width: 100%;
        }
      }
    `;
    var style=document.createElement("style");
    style.innerHTML=css;
    document.head.appendChild(style);
  })();

  /* =========================
     STATE
  ========================= */

  function getPg1State(){
    for(var i=0;i<6;i++){
      var cb=document.getElementById('c0-'+i);
      var na=document.getElementById('na0-'+i);
      ST[0][i]=(cb&&cb.checked)?1:0;
      NA[0][i]=(na&&na.checked)?1:0;
    }
  }

  window.__la.getPg1State=getPg1State;

  function pillarChecked(pi){
    return ST[pi].reduce((a,v)=>a+v,0);
  }

  function pillarMax(pi){
    return 6 - NA[pi].reduce((a,v)=>a+v,0);
  }

  /* =========================
     ANIMATION ENGINE
  ========================= */

  function swapView(html){
    var pg1=document.getElementById('pg1');
    var rest=document.getElementById('pg-rest');
    if(!pg1||!rest) return;

    rest.classList.add("la-hidden");
    rest.innerHTML = html;

    setTimeout(function(){
      pg1.classList.add("la-hidden");
      rest.classList.remove("la-hidden");
      rest.classList.add("la-show");
    }, 10);

    setTimeout(function(){
      rest.scrollIntoView({behavior:"smooth",block:"start"});
    }, 250);
  }

  function showHome(){
    var pg1=document.getElementById('pg1');
    var rest=document.getElementById('pg-rest');
    if(!pg1||!rest) return;

    rest.innerHTML = "";

    pg1.classList.remove("la-hidden");
    pg1.classList.add("la-show");
  }

  /* =========================
     PILLAR RENDER
  ========================= */

  function pillarHTML(pi){
    var pl=P[pi];
    var rows="";

    for(var i=0;i<pl.i.length;i++){
      rows+=`
        <div style="
          margin:10px 0;
          font-family:Lora,serif;
          color:#a09484;
          font-size:16px;
          line-height:1.4;
        ">
          ${pl.i[i]}
        </div>
      `;
    }

    return `
      <div style="max-width:650px;margin:0 auto;">
        <div style="font-family:Cinzel;letter-spacing:4px;color:#b8984e;">
          PILLAR ${pi+1}
        </div>

        <div style="font-family:Cinzel;font-size:28px;color:#fdfcfa;margin:10px 0;">
          ${pl.n}
        </div>

        <div style="font-family:Lora;font-style:italic;color:#a09484;margin-bottom:20px;">
          ${pl.d}
        </div>

        ${rows}

        <div style="margin-top:30px;display:flex;gap:12px;flex-wrap:wrap;">
          <button onclick="__la.go(${pi===6?'R':pi+2})"
            style="padding:12px 18px;background:#c1b085;border:none;cursor:pointer;">
            NEXT
          </button>

          <button onclick="__la.go(1)"
            style="padding:12px 18px;background:#342a1c;color:#fff;border:none;cursor:pointer;">
            BACK
          </button>
        </div>
      </div>
    `;
  }

  function resultsHTML(){
    return `
      <div style="max-width:650px;margin:0 auto;font-family:Lora;color:#fdfcfa;">
        <h2>Results</h2>
        <button onclick="__la.go(1)">Restart</button>
      </div>
    `;
  }

  /* =========================
     NAVIGATION
  ========================= */

  window.__la.go=function(n){
    getPg1State();

    if(n===1){
      showHome();
      return;
    }

    if(n==="R"){
      swapView(resultsHTML());
      return;
    }

    swapView(pillarHTML(n-1));
  };

  /* =========================
     NEXT HOOK (CARRD)
  ========================= */

  window.laNextPillar=function(){
    getPg1State();
    window.__la.go(2);
  };

})();
