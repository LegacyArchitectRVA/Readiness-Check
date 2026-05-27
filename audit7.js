(function () {
  if (window.__laLoaded) return;
  window.__laLoaded = true;

  const WEBHOOK = "https://hook.us2.make.com/8sf4ost41gkncwh2tqvspqi5h29ll41b";

  window.__la = window.__la || {};

  // -----------------------------
  // STATE (client-facing only)
  // -----------------------------
  let ST = Array.from({ length: 7 }, () => Array(6).fill(0));
  let NA = Array.from({ length: 7 }, () => Array(6).fill(0));

  let current = 0;

  const $ = (id) => document.getElementById(id);

  // -----------------------------
  // SAFE INIT (hide Carrd page 1 duplication)
  // -----------------------------
  function init() {
    const pg1 = $("pg1");
    if (pg1) pg1.style.display = "none";

    const rest = $("pg-rest");
    if (rest) {
      rest.style.transition = "all .4s ease";
      rest.style.opacity = 1;
    }

    go(0);
  }

  // -----------------------------
  // SCORE ENGINE (simple + stable)
  // -----------------------------
  function score() {
    let t = 0, m = 0;

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (!NA[i][j]) {
          m++;
          t += ST[i][j];
        }
      }
    }

    return m ? Math.round((t / m) * 100) : 0;
  }

  function totalGaps() {
    let g = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (!ST[i][j] && !NA[i][j]) g++;
      }
    }
    return g;
  }

  // -----------------------------
  // UI HELPERS
  // -----------------------------
  function ring(percent) {
    const c = 2 * Math.PI * 54;
    const offset = c - (percent / 100) * c;

    return `
      <svg width="170" height="170">
        <circle cx="85" cy="85" r="54"
          stroke="#2a2218" stroke-width="6" fill="none"/>
        <circle cx="85" cy="85" r="54"
          stroke="#c1b085" stroke-width="6" fill="none"
          stroke-linecap="round"
          stroke-dasharray="${c}"
          stroke-dashoffset="${offset}"
          style="transition: stroke-dashoffset 1s ease;
                 filter: drop-shadow(0 0 10px rgba(193,176,133,0.5));"/>
        <text x="50%" y="50%" text-anchor="middle"
          dy=".3em"
          fill="#c1b085"
          font-size="28"
          font-family="Cinzel">
          ${percent}%
        </text>
      </svg>
    `;
  }

  function pill(on) {
    return `
      width:22px;height:22px;
      border:1px solid ${on ? "#c1b085" : "#5a4b33"};
      display:flex;align-items:center;justify-content:center;
      box-shadow:${on ? "0 0 10px rgba(193,176,133,0.6)" : "none"};
      transition:all .3s;
      margin-right:12px;
      color:#c1b085;
      font-size:14px;
    `;
  }

  // -----------------------------
  // TOGGLE
  // -----------------------------
  function toggle(pi, ii) {
    ST[pi][ii] = ST[pi][ii] ? 0 : 1;
    NA[pi][ii] = 0;
    render(current);
  }

  window.__la.t = toggle;

  // -----------------------------
  // NAVIGATION (ANIMATED SLIDE)
  // -----------------------------
  function go(pi) {
    current = pi;

    const el = $("pg-rest");
    if (!el) return;

    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";

    setTimeout(() => {
      if (pi === "R") {
        el.innerHTML = results();
      } else {
        el.innerHTML = pillar(pi);
      }

      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 180);
  }

  window.__la.go = go;

  window.__la.next = function (pi) {
    go(pi + 1);
  };

  // -----------------------------
  // PILLAR UI (NO INSIGHTS)
  // -----------------------------
  function pillar(pi) {
    const items = [
      "PRIMARY EMAIL ACCESS",
      "PASSWORD",
      "CLOUD STORAGE",
      "2FA AUTHENTICATION",
      "SOCIAL MEDIA ACCESS",
      "DIGITAL ARCHIVES"
    ];

    const rows = items.map((txt, i) => {
      const on = ST[pi][i];

      return `
        <div onclick="__la.t(${pi},${i})"
          style="
            display:flex;align-items:center;
            padding:12px;
            margin:8px 0;
            border:1px solid ${on ? "#c1b085" : "#2a2218"};
            background:${on ? "rgba(193,176,133,0.05)" : "transparent"};
            cursor:pointer;
            transition:all .3s;
          ">
          <div style="${pill(on)}">
            ${on ? "✓" : ""}
          </div>
          <div style="font-family:Cinzel;color:${on ? "#c1b085" : "#9a8d7a"};">
            ${txt}
          </div>
        </div>
      `;
    }).join("");

    const progress = Math.round((pi / 6) * 100);

    return `
      <div style="margin-bottom:20px;height:4px;background:#2a2218;">
        <div style="width:${progress}%;height:4px;background:#c1b085;transition:width .5s;"></div>
      </div>

      <div style="max-width:700px;margin:auto;">
        <div style="font-family:Cinzel;font-size:28px;color:#c1b085;">
          Pillar ${pi + 1}
        </div>

        <div style="color:#a09484;font-style:italic;margin-bottom:20px;">
          Complete this section to continue
        </div>

        ${rows}

        <button onclick="__la.next(${pi})"
          style="margin-top:20px;padding:14px 24px;background:#c1b085;border:none;cursor:pointer;">
          NEXT
        </button>
      </div>
    `;
  }

  // -----------------------------
  // RESULTS (CLIENT-FACING ONLY)
  // -----------------------------
  function results() {
    const s = score();

    return `
      <div style="text-align:center;padding:40px;">
        ${ring(s)}

        <div style="margin-top:20px;font-family:Cinzel;color:#c1b085;">
          Your Continuity Score
        </div>

        <div style="margin-top:30px;">
          <input id="la-name" placeholder="Name"
            style="padding:10px;margin:5px;border:1px solid #2a2218;background:#0b0a08;color:#fff;">
          <input id="la-email" placeholder="Email"
            style="padding:10px;margin:5px;border:1px solid #2a2218;background:#0b0a08;color:#fff;">
        </div>

        <button onclick="__la.send()"
          style="margin-top:20px;padding:14px 24px;background:#c1b085;border:none;cursor:pointer;">
          SEND MY RESULTS
        </button>

        <div id="la-msg" style="margin-top:10px;color:#9a8d7a;"></div>
      </div>
    `;
  }

  // -----------------------------
  // WEBHOOK (PRIVATE DATA ONLY)
  // -----------------------------
  async function send() {
    const name = $("la-name")?.value || "";
    const email = $("la-email")?.value || "";

    const payload = {
      name,
      email,
      score: score(),
      totalGaps: totalGaps(),
      matrix: ST,
      naMatrix: NA,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const msg = $("la-msg");
      if (msg) msg.innerText = "Results sent.";
    } catch (e) {
      const msg = $("la-msg");
      if (msg) msg.innerText = "Send failed.";
    }
  }

  window.__la.send = send;

  // -----------------------------
  // BOOT
  // -----------------------------
  console.log("PREMIUM V2 LOADED");
  init();
})();
