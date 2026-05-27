(function(){
  if(window.__laLoaded)return;
  window.__laLoaded=true;

window.__la = window.__la || {};

  var P=[
    {n:'Digital Life',d:'Access and continuity for essential digital systems.',i:['PRIMARY EMAIL ACCESS','PASSWORD MANAGER','CLOUD STORAGE','2FA RECOVERY KEYS','SOCIAL MEDIA ACCESS','DIGITAL ARCHIVE']},
    {n:'Financial & Assets',d:'Documentation of financial accounts, obligations, and payment systems.',i:['BANKING & CREDIT ACCESS','INVESTMENT & RETIREMENT ACCOUNTS','CRYPTOCURRENCY WALLETS & KEYS']},
    {n:'Household & Property',d:'Property records, access information, and household operations.',i:['PROPERTY DEEDS & TITLES','VEHICLE REGISTRATIONS','HOME MAINTENANCE RECORDS','UTILITY ACCOUNT ACCESS']},
    {n:'Health & Medical',d:'Medical history, directives, and emergency access information.',i:['HEALTH INSURANCE INFORMATION','MEDICAL RECORDS & HISTORY','PRESCRIPTION MEDICATIONS LIST','ADVANCE DIRECTIVES']},
    {n:'Legal & Estate',d:'Legal instruments, policy documentation, and estate planning records.',i:['LAST WILL & TESTAMENT','TRUST DOCUMENTATION','POWERS OF ATTORNEY','LIFE INSURANCE POLICIES','BUSINESS ENTITIES']},
    {n:'Business Continuity',d:'Operational documentation for business owners, including transition planning.',i:['BUSINESS ENTITY DOCUMENTS','BUSINESS BANKING ACCESS','OPERATING OR PARTNERSHIP AGREEMENTS','KEY CUSTOMER & VENDOR RECORDS']},
    {n:'Legacy & Wishes',d:'Personal statements, preferences, and messages for those left behind.',i:['PERSONAL LETTERS & MESSAGES','ETHICAL WILL STATEMENT','FUNERAL PREFERENCES','OBITUARY INFORMATION']},
  ];

  var ST=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
  var NA=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
  var OB=null;
  var lastP1Cnt=-1;
  var lastP1Na=-1;

  window.__la._ST = ST;
  window.__la._NA = NA;
  window.__la._P = P;

  function getPg1State(){
    for(var i=0;i<6;i++){
      var cb=document.getElementById('c0-'+i);
      ST[0][i]=(cb&&cb.checked)?1:0;
      var naCb=document.getElementById('na0-'+i);
      NA[0][i]=(naCb&&naCb.checked)?1:0;
    }
  }

  window.getPg1State = getPg1State;
  window.__la.getPg1State = getPg1State;

  function pillarChecked(pi){ return ST[pi].reduce(function(a,v){return a+v;},0); }
  function pillarNa(pi){ return NA[pi].reduce(function(a,v){return a+v;},0); }
  function pillarMax(pi){ return 6-pillarNa(pi); }

  function ctrStyles(cnt,mx){
    var f=mx>0&&cnt===mx;
    return {
      border: f?'#c1b085': cnt>0?'rgba(193,176,133,'+(0.3+cnt*0.1).toFixed(1)+')':'#342a1c',
      shadow: cnt>0?'0 0 '+(8+cnt*4)+'px rgba(193,176,133,'+(0.15+cnt*0.05).toFixed(2)+')'+(f?',0 0 32px rgba(193,176,133,0.3)':''):'none',
      bg: 'rgba(193,176,133,'+(f?'0.06':'0.02')+')',
      numColor: f?'#c1b085': cnt>0?'#c1b085':'#6b5a38',
      numShadow: f?'0 0 16px rgba(193,176,133,0.5)':'none'
    };
  }

  function counterHTML(pi){
    var cnt=pillarChecked(pi), mx=pillarMax(pi), s=ctrStyles(cnt,mx);
    return '<div id="la-ctr-'+pi+'" style="display:flex;align-items:center;justify-content:center;margin-bottom:32px;">'+
      '<div style="display:inline-flex;align-items:baseline;gap:8px;padding:14px 32px;border:1px solid '+s.border+';border-radius:2px;background:'+s.bg+';box-shadow:'+s.shadow+';transition:border-color 0.3s,box-shadow 0.3s,background 0.3s;">'+
      '<span id="la-ctr-num-'+pi+'" style="font-family:Cinzel,serif;font-size:29px;font-weight:700;color:'+s.numColor+';line-height:1;text-shadow:'+s.numShadow+';">'+cnt+'</span>'+
      '<span style="font-family:Bodoni Moda,serif;font-size:17px;font-style:italic;color:#8a7240;line-height:1;">of </span>'+
      '<span id="la-ctr-mx-'+pi+'" style="font-family:Bodoni Moda,serif;font-size:17px;font-style:italic;color:#8a7240;line-height:1;">'+mx+'</span>'+
      '</div></div>';
  }

  function updateCtr(pi){
    var cnt=pillarChecked(pi), mx=pillarMax(pi), wrap=document.getElementById('la-ctr-'+pi);
    if(!wrap)return;
    var box=wrap.firstElementChild, num=document.getElementById('la-ctr-num-'+pi), mxEl=document.getElementById('la-ctr-mx-'+pi), s=ctrStyles(cnt,mx);
    if(box){ box.style.borderColor=s.border; box.style.boxShadow=s.shadow; box.style.background=s.bg; }
    if(num){ num.textContent=cnt; num.style.color=s.numColor; num.style.textShadow=s.numShadow; }
    if(mxEl){ mxEl.textContent=mx; }
  }

  function prog(active){
    var h='<div style="display:flex;gap:6px;margin-bottom:52px;">';
    for(var s=0;s<7;s++){
      var bg=s<active?'#8a7030':s===active?'#c1b085':'#342a1c';
      var sh=s===active?'0 0 8px rgba(193,176,133,0.6)':'none';
      h+='<div style="height:3px;flex:1;background:'+(s<active?'linear-gradient(90deg,#8a7030,#c1b085)':bg)+';border-radius:2px;box-shadow:'+sh+';transition:background 0.4s;"></div>';
    }
    return h+'</div>';
  }

  function naStyle(isNa){
    return 'display:inline-flex;align-items:center;justify-content:center;width:auto;min-width:42px;height:24px;padding:0 8px;flex-shrink:0;border:1px solid '+(isNa?'#c1b085':'#342a1c')+';border-radius:2px;background:'+(isNa?'rgba(193,176,133,0.08)':'transparent')+';box-shadow:'+(isNa?'0 0 12px rgba(193,176,133,0.5),0 0 24px rgba(193,176,133,0.2)':'none')+';cursor:pointer;transition:border-color 0.3s,background 0.3s,box-shadow 0.3s;';
  }

  function pillarHTML(pi){
    var pl=P[pi], isP5=pi===4, isLast=pi===6, rows='';
    for(var ii=0;ii<6;ii++){
      var on=ST[pi][ii], isNa=NA[pi][ii], rowOpacity=isNa?'0.35':'1';
      rows+='<div id="r'+pi+'-'+ii+'" style="display:flex;align-items:center;gap:12px;padding:13px 16px;border:1px solid '+(on?'rgba(193,176,133,0.12)':'transparent')+';border-radius:2px;background:'+(on?'rgba(193,176,133,0.03)':'transparent')+';opacity:'+rowOpacity+';transition:border-color 0.3s,background 0.3s,opacity 0.3s;">'+
        '<div onclick="__la.t('+pi+','+ii+')" style="display:flex;align-items:center;gap:18px;flex:1;cursor:pointer;">'+
        '<div id="sh'+pi+'-'+ii+'" style="width:24px;height:24px;flex-shrink:0;border:1px solid '+(on?'#c1b085':'#7A6842')+';border-radius:2px;display:flex;align-items:center;justify-content:center;transition:border-color 0.3s,box-shadow 0.3s;">'+
        '<svg id="mk'+pi+'-'+ii+'" width="14" height="11" viewBox="0 0 14 11" fill="none" style="opacity:'+(on?'1':'0')+';transform:'+(on?'scale(1)':'scale(0.6)')+';transition:opacity 0.2s,transform 0.2s;"><path d="M1 6.5L5 10L13 1" stroke="#c1b085" stroke-width="1.5" fill="none"/></svg>'+
        '</div>'+
        '<div id="lb'+pi+'-'+ii+'" style="font-family:Cinzel,serif;font-size:17px;letter-spacing:2px;color:'+(on?'#c1b085':'#9a8d7a')+';'+(on?'text-shadow:0 0 12px rgba(193,176,133,0.3);':'')+'transition:color 0.3s,text-shadow 0.3s;">'+pl.i[ii]+'</div>'+
        '</div>'+
        '<div id="na'+pi+'-'+ii+'" onclick="__la.na('+pi+','+ii+')" style="'+naStyle(isNa)+'"><span style="font-family:Cinzel,serif;font-size:10px;letter-spacing:1.5px;font-weight:700;color:'+(isNa?'#b8984e':'#4a3d28')+';transition:color 0.3s;">N/A</span></div>'+
      '</div>';
    }

    var gate='';
    if(isP5){
      gate='<div style="margin-top:36px;padding-top:32px;border-top:1px solid #2a2218;margin-bottom:52px;">'+
      '<div style="font-family:Cinzel,serif;font-size:17px;letter-spacing:3px;color:#b8984e;margin-bottom:20px;">DO YOU OWN A BUSINESS?</div>'+
      '<div style="display:flex;gap:12px;">'+
      '<button id="by" onclick="__la.by()" style="font-family:Cinzel,serif;font-size:15px;font-weight:700;letter-spacing:3px;padding:13px 32px;border:1px solid '+(OB===true?'#c1b085':'#4a3d28')+';border-radius:2px;background:'+(OB===true?'rgba(193,176,133,0.05)':'transparent')+';color:'+(OB===true?'#c1b085':'#8a7240')+';cursor:pointer;transition:border-color 0.3s,background 0.3s,color 0.3s;">YES</button>'+
      '<button id="bn" onclick="__la.bn()" style="font-family:Cinzel,serif;font-size:15px;font-weight:700;letter-spacing:3px;padding:13px 32px;border:1px solid '+(OB===false?'#c1b085':'#4a3d28')+';border-radius:2px;background:'+(OB===false?'rgba(193,176,133,0.05)':'transparent')+';color:'+(OB===false?'#c1b085':'#8a7240')+';cursor:pointer;transition:border-color 0.3s,background 0.3s,color 0.3s;">NO</button>'+
      '</div>'+
      '<div id="bh" style="font-family:Bodoni Moda,serif;font-size:17px;font-style:italic;color:'+(OB!==null?'#9a8d7a':'transparent')+';margin-top:14px;min-height:18px;transition:color 0.3s;">'+(OB===true?'All 7 pillars will be included in your analysis.':(OB===false?'Your score will be calculated across 6 pillars.':''))+'</div>'+
      '</div>';
    }

    var nextBtn;
    if(isP5){ nextBtn='<button onclick="__la.p5()" style="font-family:Cinzel,serif;font-size:17px;font-weight:700;letter-spacing:3px;color:#100d0a;background:linear-gradient(135deg,#c1b085,#d4c4a0);border:none;padding:14px 36px;border-radius:2px;cursor:pointer;transition:opacity 0.3s;opacity:0.95;">CALCULATE</button>';
    } else if(isLast){ nextBtn='<button onclick="__la.go(\'R\')" style="font-family:Cinzel,serif;font-size:17px;font-weight:700;letter-spacing:3px;color:#100d0a;background:linear-gradient(135deg,#c1b085,#d4c4a0);border:none;padding:14px 36px;border-radius:2px;cursor:pointer;transition:opacity 0.3s;opacity:0.95;">GET MY RESULTS</button>';
    } else { nextBtn='<button onclick="__la.go('+(pi+2)+')" style="font-family:Cinzel,serif;font-size:17px;font-weight:700;letter-spacing:3px;color:#100d0a;background:linear-gradient(135deg,#c1b085,#d4c4a0);border:none;padding:14px 36px;border-radius:2px;cursor:pointer;transition:opacity 0.3s;opacity:0.95;">NEXT PILLAR</button>';
    }

    var backTarget=pi===1?1:(pi===6&&OB===false)?5:pi;
    var backBtn=pi===0?'':'<button onclick="__la.go('+backTarget+')" style="font-family:Cinzel,serif;font-size:17px;font-weight:700;letter-spacing:3px;color:#6b5a38;background:none;border:none;cursor:pointer;transition:color 0.3s;padding:0;">← BACK</button>';

    return prog(pi)+'<div style="font-family:Cinzel,serif;font-size:17px;letter-spacing:5px;color:#b8984e;margin-bottom:10px;">PILLAR '+(pi+1)+' OF 7</div>'+
      '<div style="font-family:Cinzel,serif;font-size:32px;font-weight:700;color:#c1b085;letter-spacing:2px;margin-bottom:12px;line-height:1.15;">'+pl.n.toUpperCase()+'</div>'+
      '<div style="font-family:Bodoni Moda,serif;font-size:19px;font-style:italic;color:#a09484;line-height:1.6;margin-bottom:20px;">'+pl.d+'</div>'+
      '<div style="display:flex;align-items:center;gap:16px;margin-bottom:40px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#4a3d28);"></div><div style="font-family:Bodoni Moda,serif;font-size:13px;font-style:italic;color:#8a7240;">Items to Document</div><div style="flex:1;height:1px;background:linear-gradient(90deg,#4a3d28,transparent);"></div></div>'+
      counterHTML(pi)+'<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:'+(isP5?'0':'52px')+';">'+rows+'</div>'+gate+
      '<div style="display:flex;justify-content:'+(pi===0?'flex-end':'space-between')+';align-items:center;">'+backBtn+nextBtn+'</div>';
  }

  function resultsHTML(){
    var includeBiz=OB===true, totalChecked=0, totalMax=0, pillarData=[];
    for(var pi=0;pi<7;pi++){
      if(pi===5&&!includeBiz) continue;
      var checked=pillarChecked(pi), max=pillarMax(pi);
      totalChecked+=checked; totalMax+=max;
      var pPct=max>0?Math.round(checked/max*100):0, pTier;
      if(max===0) pTier='N/A';
      else if(checked===max) pTier='Fully Documented';
      else if(pPct>=75) pTier='Nearly Complete';
      else if(pPct>=25) pTier='Needs Attention';
      else pTier='Critical Gaps';
      var items=[];
      for(var ii=0;ii<6;ii++) items.push({name:P[pi].i[ii],checked:ST[pi][ii]===1,na:NA[pi][ii]===1});
      pillarData.push({index:pi,name:P[pi].n,checked:checked,max:max,percent:pPct,tier:pTier,items:items});
    }
    var percent=totalMax>0?Math.round(totalChecked/totalMax*100):0, tier;
    if(percent>=86) tier='COMPREHENSIVE';
    else if(percent>=66) tier='WELL STRUCTURED';
    else if(percent>=46) tier='CRITICAL COMPLEXITY';
    else if(percent>=21) tier='LEAN & READY';
    else tier='LEGACY AT RISK';

    function tColor(t){
      if(t==='Fully Documented'||t==='COMPREHENSIVE') return '#4a7c59';
      if(t==='Nearly Complete'||t==='WELL STRUCTURED') return '#7a8a3e';
      if(t==='Needs Attention'||t==='CRITICAL COMPLEXITY'||t==='LEAN & READY') return '#b8984e';
      return '#8b3a3a';
    }

    var pillarRows='', weakest=null, weakestPct=101, totalGaps=totalMax-totalChecked;
    for(var p=0;p<pillarData.length;p++){
      var pd=pillarData[p], barW=pd.max>0?pd.percent:0, pc=tColor(pd.tier);
      if(pd.tier!=='N/A'&&pd.percent<weakestPct){weakestPct=pd.percent;weakest=pd;}
      pillarRows+='<div style="margin-bottom:28px;">'+
        '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">'+
        '<span style="font-family:Cinzel,serif;font-size:13px;font-weight:700;letter-spacing:2px;color:#fdfcfa;text-transform:uppercase;">'+pd.name+'</span>'+
        '<span style="font-family:Cinzel,serif;font-size:18px;font-weight:700;color:#c1b085;">'+pd.checked+'/'+pd.max+'</span></div>'+
        '<div style="background:#1a1510;border-radius:4px;height:8px;width:100%;margin-bottom:6px;">'+
        '<div style="background:linear-gradient(90deg,'+pc+',#c1b085);height:8px;border-radius:4px;width:'+barW+'%;"></div></div>'+
        '<div style="font-family:Cinzel,serif;font-size:11px;font-weight:600;letter-spacing:2px;color:'+pc+';text-transform:uppercase;">'+pd.tier+'</div></div>';
    }

    var wn=weakest?weakest.name:'your most critical areas';
    var rec;
    if(percent>=86) rec='Your continuity planning is strong. A Life Manual would formalize everything into a single successor-ready system.';
    else if(percent>=66) rec='You have solid foundations — but the remaining gaps could still create real confusion for your family.';
    else if(percent>=46) rec='Your planning has real complexity creating hidden risk. The gaps you\'re carrying could cost your family dozens of hours and real money.';
    else rec='Your continuity gaps are significant. Without action, your family faces potentially weeks of confusion and costly decisions made in the dark.';

    var tc=tColor(tier);

    window.__laResults={score:totalChecked,maxScore:totalMax,percent:percent,tier:tier,businessOwner:includeBiz,pillarData:pillarData,recommendation:rec};

    return '<div style="max-width:600px;margin:0 auto;">'+
      '<div style="text-align:center;margin-bottom:36px;">'+
      '<div style="font-family:Cinzel,serif;font-size:11px;letter-spacing:6px;color:#b8984e;text-transform:uppercase;margin-bottom:20px;">7 PILLAR AUDIT</div>'+
      '<div style="font-family:Cinzel,serif;font-size:26px;font-weight:700;color:#fdfcfa;letter-spacing:2px;margin-bottom:8px;">Your Continuity Score</div></div>'+

      '<div style="text-align:center;margin-bottom:32px;">'+
      '<div style="display:inline-flex;align-items:center;justify-content:center;width:150px;height:150px;border-radius:50%;border:3px solid '+tc+';">'+
      '<div><div style="font-family:Cinzel,serif;font-size:48px;font-weight:700;color:#fdfcfa;line-height:1;">'+percent+'<span style="font-size:22px;color:#c1b085;">%</span></div>'+
      '<div style="font-family:Georgia,serif;font-size:12px;color:#c1b085;">'+totalChecked+' of '+totalMax+'</div></div></div>'+
      '<div style="margin-top:14px;font-family:Cinzel,serif;font-size:12px;font-weight:600;letter-spacing:2px;color:'+tc+';text-transform:uppercase;">'+tier+'</div></div>'+

      '<div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#4a3d28);"></div><div style="font-family:Bodoni Moda,serif;font-size:13px;font-style:italic;color:#8a7240;">Performance Summary</div><div style="flex:1;height:1px;background:linear-gradient(90deg,#4a3d28,transparent);"></div></div>'+

      '<div style="font-family:Cinzel,serif;font-size:12px;letter-spacing:4px;color:#b8984e;margin-bottom:20px;text-transform:uppercase;">Pillar Overview</div>'+
      pillarRows+

      '<div style="background:#13100c;border:1px solid #2a2218;border-radius:6px;padding:24px;margin-bottom:36px;">'+
      '<div style="font-family:Cinzel,serif;font-size:11px;letter-spacing:4px;color:#b8984e;margin-bottom:12px;text-transform:uppercase;">What This Means</div>'+
      '<div style="font-family:Georgia,serif;font-size:16px;font-style:italic;color:#fdfcfa;line-height:1.6;">'+rec+'</div></div>'+

      '<div style="background:#13100c;border:1px solid #c1b085;border-radius:6px;padding:32px;margin-bottom:36px;text-align:center;">'+
      '<div style="font-family:Cinzel,serif;font-size:14px;letter-spacing:3px;color:#c1b085;margin-bottom:8px;text-transform:uppercase;">Unlock Your Full Breakdown</div>'+
      '<div style="font-family:Bodoni Moda,serif;font-size:15px;font-style:italic;color:#9a8d7a;margin-bottom:8px;">See exactly which items need attention in each pillar</div>'+
      '<div style="font-family:Georgia,serif;font-size:13px;color:#6b5a38;margin-bottom:24px;">You have '+totalGaps+' uncovered items across '+pillarData.length+' pillars. We\'ll send the complete breakdown to your email.</div>'+
      '<div style="display:flex;flex-direction:column;gap:12px;max-width:360px;margin:0 auto;">'+
      '<input id="la-fn" type="text" placeholder="First name" style="font-family:Georgia,serif;font-size:15px;padding:12px 16px;background:#0a0806;border:1px solid #342a1c;border-radius:2px;color:#fdfcfa;">'+
      '<input id="la-em" type="email" placeholder="Email address" style="font-family:Georgia,serif;font-size:15px;padding:12px 16px;background:#0a0806;border:1px solid #342a1c;border-radius:2px;color:#fdfcfa;">'+
      '<button id="la-send" onclick="__la.send()" style="font-family:Cinzel,serif;font-size:14px;font-weight:700;letter-spacing:3px;color:#100d0a;background:linear-gradient(135deg,#c1b085,#d4c4a0);border:none;padding:12px 24px;border-radius:2px;cursor:pointer;transition:opacity 0.3s;">SEND MY RESULTS</button>'+
      '<div id="la-msg" style="font-family:Georgia,serif;font-size:13px;color:#9a8d7a;min-height:20px;"></div></div></div>'+

      '<div style="text-align:center;margin-bottom:36px;">'+
      '<div style="font-family:Cinzel,serif;font-size:13px;letter-spacing:3px;color:#b8984e;margin-bottom:16px;text-transform:uppercase;">Ready to Close the Gaps?</div>'+
      '<div style="display:flex;flex-direction:column;gap:14px;align-items:center;">'+
      '<a href="https://buy.stripe.com/dRm5kw3n46D1f3O7Bs1Nu01" target="_blank" style="display:inline-block;font-family:Cinzel,serif;font-size:13px;font-weight:700;letter-spacing:3px;color:#100d0a;background:linear-gradient(135deg,#c1b085,#d4c4a0);text-decoration:none;padding:14px 36px;border-radius:2px;transition:opacity 0.3s;opacity:0.95;">ORDER YOUR LIFE MANUAL</a>'+
      '<a href="https://cal.com/legacyarchitectrva/the-blueprint-session" target="_blank" style="display:inline-block;font-family:Cinzel,serif;font-size:12px;letter-spacing:2px;color:#c1b085;text-decoration:none;border:1px solid #c1b085;padding:12px 24px;border-radius:2px;transition:all 0.3s;opacity:0.95;">Schedule a Planning Session</a>'+

      '<div style="text-align:center;border-top:1px solid #2a2218;padding-top:24px;">'+
      '<div style="font-family:Cinzel,serif;font-size:10px;letter-spacing:3px;color:#8d774a;">LEGACY ARCHITECT RVA</div>'+
      '<div style="font-family:Bodoni Moda,serif;font-size:12px;font-style:italic;color:#8a7e6a;margin-top:8px;">&ldquo;Order in Your Absence&rdquo;</div></div></div>';
  }

  function showRest(html){ var el=document.getElementById('pg-rest'); if(!el)return; el.innerHTML=html; el.style.animation='none'; void el.offsetWidth; el.style.animation='la-in 0.4s ease'; }
  function hidePg1(){var e=document.getElementById('pg1');if(e)e.style.display='none';}
  function showPg1(){var e=document.getElementById('pg1');if(e)e.style.display='';}
  function scrollToanalysis(){
    var el=document.getElementById('la-wrap')||document.getElementById('pg-rest');
    if(el) el.scrollIntoView({behavior:'auto',block:'start'});
  }

  window.__la={
    send:function(){
      var fn=document.getElementById('la-fn'),em=document.getElementById('la-em'),msg=document.getElementById('la-msg'),btn=document.getElementById('la-send');
      var email=em?em.value.trim():'',firstName=fn?fn.value.trim():'';
      if(!email||email.indexOf('@')<1){if(msg){msg.textContent='Please enter a valid email address.';msg.style.color='#b8984e';}return;}
      if(btn){btn.textContent='SENDING...';btn.disabled=true;}
      var r=window.__laResults,pillars=[];
      for(var i=0;i<r.pillarData.length;i++){var pd=r.pillarData[i];pillars.push({name:pd.name,checked:pd.checked,max:pd.max,tier:pd.tier,items:pd.items});}
      fetch('https://la-audit-email.craig-a51.workers.dev',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:email,firstName:firstName,score:r.score,maxScore:r.maxScore,percent:r.percent,tier:r.tier,businessOwner:r.businessOwner,pillars:pillars,recommendation:r.recommendation})
      }).then(function(res){
        if(res.ok){if(msg){msg.textContent='Results sent! Check your inbox.';msg.style.color='#4a7c59';}if(btn){btn.textContent='SENT ✓';}}
        else{if(msg){msg.textContent='Something went wrong. Please try again.';msg.style.color='#8b3a3a';}if(btn){btn.textContent='SEND MY RESULTS';btn.disabled=false;}}
      }).catch(function(){if(msg){msg.textContent='Connection error. Please try again.';msg.style.color='#8b3a3a';}if(btn){btn.textContent='SEND MY RESULTS';btn.disabled=false;}});
    },
    go:function(n){
      if(n===1){showPg1();showRest('');}
      else if(n==='R'){getPg1State();hidePg1();showRest(resultsHTML());}
      else{hidePg1();showRest(pillarHTML(n-1));}
      scrollToanalysis();
      setTimeout(function(){scrollToanalysis();},0);
      setTimeout(function(){scrollToanalysis();},50);
      setTimeout(function(){scrollToanalysis();},150);
    },
    t:function(pi,ii){
      if(NA[pi][ii]) return;
      ST[pi][ii]=ST[pi][ii]?0:1; var on=ST[pi][ii];
      var r=document.getElementById('r'+pi+'-'+ii), s=document.getElementById('sh'+pi+'-'+ii), m=document.getElementById('mk'+pi+'-'+ii), l=document.getElementById('lb'+pi+'-'+ii);
      if(r){r.style.borderColor=on?'rgba(193,176,133,0.12)':'transparent';r.style.background=on?'rgba(193,176,133,0.03)':'transparent';}
      if(s){s.style.borderColor=on?'#c1b085':'#7A6842';s.style.boxShadow=on?'0 0 12px rgba(193,176,133,0.6),0 0 24px rgba(193,176,133,0.25),inset 0 0 8px rgba(193,176,133,0.1)':'none';}
      if(m){m.style.opacity=on?'1':'0';m.style.transform=on?'scale(1)':'scale(0.6)';}
      if(l){l.style.color=on?'#c1b085':'#9a8d7a';l.style.textShadow=on?'0 0 12px rgba(193,176,133,0.3)':'none';}
      updateCtr(pi);
    },
    na:function(pi,ii){
      NA[pi][ii]=NA[pi][ii]?0:1; var isNa=NA[pi][ii];
      if(isNa&&ST[pi][ii]){
        ST[pi][ii]=0;
        var s=document.getElementById('sh'+pi+'-'+ii), m=document.getElementById('mk'+pi+'-'+ii), l=document.getElementById('lb'+pi+'-'+ii);
        if(s){s.style.borderColor='#7A6842';s.style.boxShadow='none';}
        if(m){m.style.opacity='0';m.style.transform='scale(0.6)';}
        if(l){l.style.color='#9a8d7a';l.style.textShadow='none';}
      }
      var r=document.getElementById('r'+pi+'-'+ii); if(r){r.style.opacity=isNa?'0.35':'1';r.style.borderColor='transparent';r.style.background='transparent';}
      var naBtn=document.getElementById('na'+pi+'-'+ii);
      if(naBtn){
        naBtn.style.borderColor=isNa?'#c1b085':'#342a1c';
        naBtn.style.background=isNa?'rgba(193,176,133,0.08)':'transparent';
        naBtn.style.boxShadow=isNa?'0 0 12px rgba(193,176,133,0.5),0 0 24px rgba(193,176,133,0.2)':'none';
        var span=naBtn.querySelector('span'); if(span) span.style.color=isNa?'#b8984e':'#4a3d28';
      }
      updateCtr(pi);
    },
    by:function(){
      OB=true;
      var y=document.getElementById('by'),n=document.getElementById('bn'),h=document.getElementById('bh');
      if(y){y.style.borderColor='#c1b085';y.style.color='#c1b085';y.style.background='rgba(193,176,133,0.05)';y.style.boxShadow='0 0 18px rgba(193,176,133,0.5),inset 0 0 12px rgba(193,176,133,0.05)';}
      if(n){n.style.borderColor='#4a3d28';n.style.color='#8a7240';n.style.background='transparent';n.style.boxShadow='none';}
      if(h){h.textContent='All 7 pillars will be included in your analysis.';h.style.color='#9a8d7a';}
    },
    bn:function(){
      OB=false;
      var y=document.getElementById('by'),n=document.getElementById('bn'),h=document.getElementById('bh');
      if(n){n.style.borderColor='#c1b085';n.style.color='#c1b085';n.style.background='rgba(193,176,133,0.05)';n.style.boxShadow='0 0 18px rgba(193,176,133,0.5),inset 0 0 12px rgba(193,176,133,0.05)';}
      if(y){y.style.borderColor='#4a3d28';y.style.color='#8a7240';y.style.background='transparent';y.style.boxShadow='none';}
      if(h){h.textContent='Your score will be calculated across 6 pillars.';h.style.color='#9a8d7a';}
    },
    p5:function(){
      if(OB===null){
        var h=document.getElementById('bh');
        if(h){h.textContent='Please answer before continuing.';h.style.color='#b8984e';}
        return;
      }
      window.__la.go(OB?6:7);
    }
  };

  window.__la.goOrig = window.__la.go;
  window.__la.go = function(n){
    if(n===1){showPg1();showRest('');}
    else if(n==='R'){window.__la.getPg1State();hidePg1();showRest(resultsHTML());}
    else{hidePg1();showRest(pillarHTML(n-1));}
    scrollToanalysis();
    setTimeout(function(){scrollToanalysis();},0);
    setTimeout(function(){scrollToanalysis();},50);
    setTimeout(function(){scrollToanalysis();},150);
  };

  window.laNextPillar = function(){
    getPg1State();
    window.__la.go(2);
};

  (function injectP1Ctr(){
    if(document.getElementById('la-ctr-num-0'))return;
    var pg1=document.getElementById('pg1'); if(!pg1){setTimeout(injectP1Ctr,200);return;}
    var old=document.getElementById('la-ctr-0'); if(old) old.remove();
    var firstCb=document.getElementById('c0-0');
    var target=firstCb?firstCb.closest('[id^="r0-"]')||firstCb.parentElement.parentElement:null;
    var ctrDiv=document.createElement('div'); ctrDiv.innerHTML=counterHTML(0);
    if(target&&target.parentElement){target.parentElement.insertBefore(ctrDiv.firstElementChild,target);} else {pg1.insertBefore(ctrDiv.firstElementChild,pg1.firstChild);}
    updateCtr(0);
  })();

  setInterval(function(){
    var c=document.getElementById('la-go');
    if(c&&c.checked){c.checked=false;getPg1State();window.__la.go(2);}
    var pg1=document.getElementById('pg1');
    if(pg1&&pg1.style.display!=='none'){
      var cnt=0,naCnt=0;
      for(var i=0;i<6;i++){
        var cb=document.getElementById('c0-'+i), naCb=document.getElementById('na0-'+i), cbOn=cb&&cb.checked, naOn=naCb&&naCb.checked;
        if(cbOn&&naOn){ if(!ST[0][i]){naCb.checked=false; naOn=false;} else if(!NA[0][i]){cb.checked=false; cbOn=false;} }
        if(cbOn)cnt++; if(naOn)naCnt++;
      }
      if(cnt!==lastP1Cnt||naCnt!==lastP1Na){
        lastP1Cnt=cnt; lastP1Na=naCnt;
        for(var j=0;j<6;j++){
          var cb2=document.getElementById('c0-'+j), naCb2=document.getElementById('na0-'+j);
          ST[0][j]=(cb2&&cb2.checked)?1:0; NA[0][j]=(naCb2&&naCb2.checked)?1:0;
          var row=cb2&&(cb2.closest('[id^="r0-"]')||cb2.parentElement.parentElement); if(row) row.style.opacity=NA[0][j]?'0.35':'1';
        }
        updateCtr(0);
      }
    }
  },150);
})();
