/** Workshop-style 2D sketches for each Locost system. Clickable groups use data-part. */

let BOX = { w: 640, h: 420 };

function onCls(id, active) {
  return id === active ? "on" : "";
}

function partById(id) {
  return (window.ZO && Array.isArray(ZO.parts) && ZO.parts.find((p) => p.id === id)) || null;
}

function specVal(id, key) {
  const row = ((partById(id) || {}).spec || []).find((s) => s.k === key);
  return row && row.v ? String(row.v) : "";
}

/** Live blueprint label. Workbook `sheet` / spec "On sheet" win over the inked fallback. */
function sheetLabel(id, fallback) {
  const p = partById(id);
  if (p && p.sheet) return p.sheet;
  const onSheet = specVal(id, "On sheet");
  if (onSheet) return onSheet;
  return fallback;
}

function callout(x1, y1, x2, y2, label, partId, active, extra = "", gotoSys = "") {
  const goto = gotoSys ? `data-goto="${gotoSys}"` : "";
  const tw = Math.min(label.length * 6.7 + 8, 230);
  const pad = 22;
  const maxX = BOX.w - pad;
  const ly = Math.min(Math.max(y2, 20), BOX.h - 22);
  let anchor = "start";
  let lx = x2;
  const leftFits = x2 - tw >= pad;
  const wantLeft = x2 < x1;
  if (wantLeft && leftFits) {
    anchor = "end";
    lx = Math.min(Math.max(x2, pad + tw), maxX);
  } else {
    anchor = "start";
    lx = Math.min(Math.max(Math.max(x2, x1), pad), maxX - tw);
  }
  const textX = anchor === "start" ? lx + 6 : lx - 6;
  const hitX = anchor === "start" ? lx : lx - tw;
  return `
    <g class="hot ${onCls(partId, active)} ${extra}" data-part="${partId}" ${goto}>
      <rect class="hit" x="${hitX}" y="${ly - 12}" width="${tw + 8}" height="18" />
      <line class="leader" x1="${x1}" y1="${y1}" x2="${lx}" y2="${ly}" />
      <circle class="pin" cx="${x1}" cy="${y1}" r="4" />
      <text class="call" x="${textX}" y="${ly + 4}" text-anchor="${anchor}">${label}</text>
    </g>`;
}

const SKETCH = {
  "front-suspension"(active) {
    return `
      <g class="chassis-bay">
        <rect class="rail" x="46" y="48" width="14" height="320" />
        <rect class="rail" x="78" y="70" width="12" height="276" />
        <line class="ink" x1="60" y1="108" x2="90" y2="96" />
        <line class="ink" x1="60" y1="156" x2="90" y2="146" />
        <line class="ink" x1="60" y1="268" x2="90" y2="258" />
        <line class="ink" x1="60" y1="320" x2="90" y2="312" />
      </g>
      <g class="hot ${onCls("upper-wishbone", active)}" data-part="upper-wishbone">
        <path class="arm" d="M104 96 L128 88 L348 148 L362 162 L348 176 L128 148 L104 140 Z" />
        <path class="ink" d="M118 104 L338 156" />
        <path class="ink" d="M118 132 L338 168" />
        <circle class="tube" cx="112" cy="118" r="11" />
        <circle class="tube" cx="112" cy="118" r="4" />
      </g>
      <g class="hot ${onCls("lower-wishbone", active)}" data-part="lower-wishbone">
        <path class="arm" d="M104 248 L132 240 L372 214 L388 230 L372 252 L132 312 L104 304 Z" />
        <path class="ink" d="M118 256 L362 226" />
        <path class="ink" d="M118 292 L362 242" />
        <circle class="tube" cx="114" cy="276" r="11" />
        <circle class="tube" cx="114" cy="276" r="4" />
      </g>
      <g class="hot replace ${onCls("poly-135", active)}" data-part="poly-135">
        <ellipse class="bush" cx="112" cy="100" rx="14" ry="10" />
        <ellipse class="bush" cx="112" cy="142" rx="14" ry="10" />
        <circle cx="112" cy="100" r="4" />
        <circle cx="112" cy="142" r="4" />
      </g>
      <g class="hot ${onCls("sw-91008015", active)}" data-part="sw-91008015">
        <ellipse class="bush" cx="114" cy="256" rx="12" ry="9" />
        <ellipse class="bush" cx="114" cy="300" rx="12" ry="9" />
        <circle cx="114" cy="256" r="3.5" />
        <circle cx="114" cy="300" r="3.5" />
      </g>
      <g class="upright">
        <path class="arm" d="M352 158 L378 150 L392 168 L396 214 L388 246 L368 258 L352 240 L348 188 Z" />
        <path class="ink" d="M372 162 L376 246" />
        <path class="ink" d="M388 200 L470 200" />
        <circle class="rim" cx="500" cy="200" r="22" />
        <circle cx="500" cy="200" r="8" />
      </g>
      <g class="hot ghost-wheel" data-part="tires" data-goto="wheels">
        <ellipse cx="548" cy="200" rx="78" ry="78" />
        <ellipse cx="548" cy="200" rx="52" ry="52" />
      </g>
      <g class="hot ${onCls("napa-10269", active)}" data-part="napa-10269">
        <path class="body" d="M348 150 L372 146 L378 168 L352 174 Z" />
        <circle cx="360" cy="160" r="5" />
      </g>
      <g class="hot ${onCls("napa-10390", active)}" data-part="napa-10390">
        <path class="body" d="M360 236 L388 226 L394 248 L366 258 Z" />
        <circle cx="376" cy="242" r="5" />
      </g>
      <g class="hot coil" data-part="qa1-ur4855p" data-goto="front-dampers">
        <rect class="hit" x="214" y="78" width="48" height="176" />
        <line class="ink" x1="238" y1="92" x2="238" y2="236" />
        ${[0,1,2,3,4,5,6].map((i) => `<ellipse class="spring" cx="238" cy="${228 - i * 18}" rx="16" ry="5" />`).join("")}
        <rect class="body" x="228" y="132" width="20" height="62" />
        <circle cx="238" cy="86" r="7" />
        <circle cx="238" cy="242" r="7" />
      </g>
      ${callout(112, 100, 160, 36, "135 POLY .175", "poly-135", active, "replace")}
      ${callout(180, 118, 250, 56, "Upper plate", "upper-wishbone", active)}
      ${callout(200, 300, 250, 372, "Lower FINAL MOD", "lower-wishbone", active)}
      ${callout(360, 160, 400, 48, "BJ 10269", "napa-10269", active)}
      ${callout(376, 242, 430, 330, "BJ 10390", "napa-10390", active)}
      ${callout(238, 86, 400, 28, "QA1", "qa1-ur4855p", active, "", "front-dampers")}
      <text class="title-note" x="46" y="408">Front corner · chassis 1442 · inboard looking out</text>
    `;
  },

  "front-dampers"(active) {
    const coils = Array.from({ length: 9 }, (_, i) => {
      const y = 150 + i * 16;
      return `<ellipse class="spring" cx="280" cy="${y}" rx="42" ry="9" />`;
    }).join("");
    return `
      <g class="ghost-wheel"><ellipse cx="500" cy="220" rx="70" ry="70" /><ellipse cx="500" cy="220" rx="42" ry="42" /></g>
      <line class="ink faint" x1="80" y1="80" x2="80" y2="360" />
      <g class="hot ${onCls("qa1-ur4855p", active)}" data-part="qa1-ur4855p">
        ${coils}
        <rect class="body" x="266" y="168" width="28" height="96" />
        <line class="ink" x1="280" y1="110" x2="280" y2="330" />
        <text class="stamp" x="320" y="220" text-anchor="start">QA1</text>
      </g>
      <g class="hot ${onCls("qa1-b6031k", active)}" data-part="qa1-b6031k">
        <circle cx="280" cy="92" r="18" />
        <circle cx="280" cy="92" r="7" />
        <circle cx="280" cy="348" r="18" />
        <circle cx="280" cy="348" r="7" />
      </g>
      <line class="ink" x1="80" y1="92" x2="262" y2="92" />
      <line class="ink" x1="298" y1="348" x2="430" y2="270" />
      ${callout(298, 92, 330, 48, "B6031K poly eye", "qa1-b6031k", active)}
      ${callout(308, 200, 360, 86, "UR4855P 12 in", "qa1-ur4855p", active)}
      ${callout(298, 348, 330, 372, "Lower poly eye", "qa1-b6031k", active)}
      <text class="title-note" x="24" y="408">QA1 Ultra Ride · P = poly eyes</text>
    `;
  },

  steering(active) {
    return `
      <g class="hot ${onCls("mustang-rack", active)}" data-part="mustang-rack">
        <path class="rack" d="M150 214 C170 196, 210 196, 230 214 L390 214 C410 196, 450 196, 470 214 L470 246 C450 264, 410 264, 390 246 L230 246 C210 264, 170 264, 150 246 Z" />
        <rect class="body" x="250" y="208" width="120" height="44" />
        <circle class="body" cx="310" cy="188" r="10" />
        <line class="ink" x1="310" y1="178" x2="310" y2="120" />
      </g>
      <g class="hot ${onCls("tie-rods", active)}" data-part="tie-rods">
        <line class="ink thick" x1="118" y1="230" x2="168" y2="230" />
        <line class="ink thick" x1="452" y1="230" x2="520" y2="198" />
        <circle cx="168" cy="230" r="6" />
        <circle cx="452" cy="230" r="6" />
        <circle cx="520" cy="198" r="7" />
      </g>
      <g class="hot ${onCls("heims", active)}" data-part="heims">
        <circle class="body" cx="118" cy="230" r="9" />
        <circle cx="118" cy="230" r="3" />
        <circle class="body" cx="520" cy="198" r="8" />
        <circle cx="520" cy="198" r="3" />
      </g>
      <g class="wheel-steer">
        <circle class="rim" cx="250" cy="78" r="36" />
        <circle cx="250" cy="78" r="8" />
        <line class="ink" x1="250" y1="46" x2="250" y2="110" />
        <line class="ink" x1="218" y1="78" x2="282" y2="78" />
        <line class="ink" x1="250" y1="114" x2="310" y2="168" />
      </g>
      <path class="upright" d="M512 168 L536 168 L540 188 L534 230 L512 236 L506 200 Z" />
      <g class="ghost-wheel"><ellipse cx="586" cy="200" rx="46" ry="46" /></g>
      ${callout(310, 208, 300, 300, "Mustang II 91034340", "mustang-rack", active)}
      ${callout(500, 210, 500, 330, "Track rod", "tie-rods", active)}
      ${callout(118, 230, 40, 180, "Heim", "heims", active)}
      <text class="title-note" x="40" y="400">Manual rack · boots over the inner joints · LHD</text>
    `;
  },

  "rear-suspension"(active) {
    return `
      <g class="ghost-wheel"><ellipse cx="500" cy="200" rx="74" ry="74" /><ellipse cx="500" cy="200" rx="46" ry="46" /></g>
      <rect class="rail" x="70" y="80" width="22" height="240" rx="2" />
      <g class="hot ${onCls("trailing-bush", active)}" data-part="trailing-bush">
        <line class="ink thick" x1="92" y1="130" x2="430" y2="188" />
        <line class="ink thick" x1="92" y1="250" x2="430" y2="212" />
        <ellipse class="bush" cx="100" cy="130" rx="16" ry="13" />
        <ellipse class="bush" cx="100" cy="250" rx="16" ry="13" />
        <ellipse class="bush" cx="430" cy="188" rx="12" ry="10" />
        <ellipse class="bush" cx="430" cy="212" rx="12" ry="10" />
      </g>
      <g class="hot ${onCls("panhard", active)}" data-part="panhard">
        <line class="ink thick" x1="110" y1="300" x2="470" y2="268" />
        <circle cx="110" cy="300" r="8" />
        <circle cx="470" cy="268" r="8" />
      </g>
      <rect class="axle" x="420" y="170" width="18" height="90" rx="3" />
      ${callout(100, 130, 40, 48, "Trailing bush 1.06 in", "trailing-bush", active)}
      ${callout(290, 300, 40, 360, "Panhard 18.36 in", "panhard", active)}
      <text class="title-note" x="72" y="400">4130 trailing rods · bush width on the drawing</text>
    `;
  },

  brakes(active) {
    return `
      <g class="hot ${onCls("wilwood-mc", active)}" data-part="wilwood-mc">
        <path class="box" d="M48 150 L78 118 L150 118 L168 150 L168 196 L48 196 Z" />
        <line class="ink" x1="70" y1="150" x2="58" y2="96" />
        <line class="ink" x1="108" y1="150" x2="108" y2="88" />
        <path class="mc" d="M168 162 L300 162 L312 174 L312 188 L300 200 L168 200 Z" />
        <path class="mc" d="M186 128 L214 128 L220 148 L180 148 Z" />
        <path class="mc" d="M236 124 L268 124 L274 148 L230 148 Z" />
        <path class="hose" d="M200 128 C200 100, 248 96, 252 124" />
        <line class="ink" x1="312" y1="181" x2="338" y2="181" />
      </g>
      <g class="disc">
        <circle cx="470" cy="168" r="62" />
        <circle cx="470" cy="168" r="28" />
        <circle cx="470" cy="168" r="10" />
        ${[0,1,2,3,4].map((i) => {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          return `<circle cx="${(470 + 18 * Math.cos(a)).toFixed(1)}" cy="${(168 + 18 * Math.sin(a)).toFixed(1)}" r="2.2" />`;
        }).join("")}
      </g>
      <g class="hot ${onCls("caliper-front-rh", active)}" data-part="caliper-front-rh">
        <path class="body" d="M430 118 L512 112 L524 132 L512 148 L470 152 L430 146 Z" />
        <path class="body" d="M434 186 L512 180 L522 200 L508 214 L434 208 Z" />
        <path class="arm" d="M500 148 L508 148 L508 180 L500 180 Z" />
        <line class="ink" x1="492" y1="112" x2="492" y2="96" />
        <circle cx="492" cy="94" r="3" />
      </g>
      <g class="hot ${onCls("an-lines", active)}" data-part="an-lines">
        <path class="hose" d="M338 181 C380 181, 400 150, 430 140" />
        <circle class="body" cx="378" cy="196" r="7" />
        <path class="hose" d="M338 192 C390 230, 430 250, 470 250" />
      </g>
      <g class="hot ${onCls("wc-37625", active)}" data-part="wc-37625">
        <rect class="mc" x="448" y="236" width="52" height="22" />
        <circle cx="458" cy="247" r="6" />
        <circle cx="490" cy="247" r="6" />
        <line class="ink" x1="474" y1="236" x2="474" y2="226" />
      </g>
      <g class="hot ${onCls("residual-valves", active)}" data-part="residual-valves">
        <rect class="body" x="352" y="210" width="16" height="28" />
        <line class="ink" x1="360" y1="210" x2="360" y2="198" />
        <line class="ink" x1="360" y1="238" x2="360" y2="250" />
      </g>
      ${callout(230, 162, 200, 48, "Wilwood 260-7563", "wilwood-mc", active)}
      ${callout(470, 118, 520, 48, "19141004 / 005", "caliper-front-rh", active)}
      ${callout(378, 196, 300, 300, "AN3", "an-lines", active)}
      ${callout(474, 247, 500, 330, "WC 37625", "wc-37625", active)}
      <text class="title-note" x="24" y="400">Tandem with remote pots · floating caliper over the disc · drum cylinder separate</text>
    `;
  },

  engine(active) {
    return `
      <g class="hot ${onCls("gm-30", active)}" data-part="gm-30">
        <path class="block" d="M150 168 L150 292 L420 292 L420 210 L400 168 Z" />
        <path class="head" d="M162 132 L400 132 L408 168 L158 168 Z" />
        ${[0,1,2,3].map((i) => `<ellipse cx="${210 + i * 52}" cy="150" rx="12" ry="7" />`).join("")}
        <path class="bell" d="M420 188 L470 176 L488 210 L488 270 L470 286 L420 268 Z" />
        <circle class="rim" cx="508" cy="228" r="40" />
        <circle cx="508" cy="228" r="16" />
        ${[0,1,2,3,4,5].map((i) => {
          const a = (i * Math.PI) / 3;
          return `<circle cx="${(508 + 28 * Math.cos(a)).toFixed(1)}" cy="${(228 + 28 * Math.sin(a)).toFixed(1)}" r="3" />`;
        }).join("")}
        <path class="hose" d="M200 132 L200 92 L280 78 L340 92 L340 108" />
      </g>
      <g class="hot ${onCls("valve-cover", active)}" data-part="valve-cover">
        <path class="cover" d="M180 108 L386 108 L392 132 L174 132 Z" />
      </g>
      <g class="hot ${onCls("valve-cover-gasket", active)}" data-part="valve-cover-gasket">
        <path class="cover" d="M178 130 L390 130 L392 134 L176 134 Z" />
      </g>
      <g class="hot ${onCls("clutch-fork", active)}" data-part="clutch-fork">
        <path class="line" d="M470 250 L 530 290" fill="none" />
        <circle cx="530" cy="290" r="8" />
      </g>
      <g class="hot ${onCls("fuel-hardware", active)}" data-part="fuel-hardware">
        <path class="hose" d="M170 220 C 120 240, 90 280, 80 320" fill="none" />
      </g>
      <g class="hot ${onCls("fuel-hose", active)}" data-part="fuel-hose">
        <path class="hose" d="M110 248 C 88 232, 70 220, 58 236" fill="none" />
        <path class="hose" d="M110 292 C 88 308, 72 328, 80 340" fill="none" />
      </g>
      <g class="hot ${onCls("fuel-filter", active)}" data-part="fuel-filter">
        <rect class="cover" x="96" y="248" width="28" height="44" rx="10" />
        <circle cx="110" cy="258" r="4" />
        <circle cx="110" cy="282" r="4" />
      </g>
      ${callout(300, 70, 80, 40, "3.0L I4 · 181 cid", "gm-30", active)}
      ${callout(280, 108, 420, 36, sheetLabel("valve-cover", "Valve cover 8M0122491"), "valve-cover", active)}
      ${callout(186, 132, 40, 70, sheetLabel("valve-cover-gasket", "18-0347"), "valve-cover-gasket", active)}
      ${callout(500, 224, 560, 70, "AWS 04-065 clutch", "gm-30", active)}
      ${callout(530, 290, 500, 360, "Fork 15592270", "clutch-fork", active)}
      ${callout(80, 320, 40, 360, "Fuel H-176 · choke 732-1153", "fuel-hardware", active)}
      ${callout(110, 270, 200, 360, sheetLabel("fuel-filter", "Wix 33003"), "fuel-filter", active)}
      ${callout(96, 248, 200, 220, sheetLabel("fuel-hose", "3/8 × ~4 in"), "fuel-hose", active)}
      <text class="title-note" x="24" y="400">Pilot 3914000 · T/O 614018 · belt 25-7417 · 15530202 printed IRRIGATION</text>
    `;
  },

  cooling(active) {
    return `
      <g class="hot ${onCls("jegs-rad", active)}" data-part="jegs-rad">
        <path class="rad" d="M78 70 L168 70 L176 92 L176 300 L168 322 L78 322 L70 300 L70 92 Z" />
        ${Array.from({ length: 12 }, (_, i) => `<line class="core" x1="86" y1="${104 + i * 16}" x2="160" y2="${104 + i * 16}" />`).join("")}
        <circle class="rim" cx="250" cy="196" r="58" />
        <circle cx="250" cy="196" r="14" />
        ${[0,1,2,3,4,5,6].map((i) => {
          const a = (i * Math.PI * 2) / 7;
          const x2 = (250 + 48 * Math.cos(a)).toFixed(1);
          const y2 = (196 + 48 * Math.sin(a)).toFixed(1);
          return `<path class="ink" d="M250 196 Q ${(250 + 20 * Math.cos(a + 0.5)).toFixed(1)} ${(196 + 20 * Math.sin(a + 0.5)).toFixed(1)} ${x2} ${y2}" />`;
        }).join("")}
        <path class="block-ghost" d="M320 150 L470 150 L490 180 L490 280 L320 280 Z" />
      </g>
      <g class="hot ${onCls("rad-hose", active)}" data-part="rad-hose">
        <path class="hose" d="M168 108 C 210 96, 250 120, 300 140" />
        <path class="hose" d="M168 286 C 230 310, 280 270, 320 240" />
      </g>
      <g class="hot ${onCls("flex-fan-110", active)}" data-part="flex-fan-110">
        <circle class="rim" cx="250" cy="196" r="58" />
      </g>
      <g class="hot ${onCls("an12-spruce", active)}" data-part="an12-spruce">
        <circle cx="175" cy="100" r="10" />
      </g>
      <g class="hot ${onCls("heater-hose", active)}" data-part="heater-hose">
        <path class="hose" d="M160 280 C 250 300, 300 260, 320 220" fill="none" />
      </g>
      <g class="hot ${onCls("thermostat", active)}" data-part="thermostat">
        <circle class="rim" cx="318" cy="148" r="14" />
        <circle cx="318" cy="148" r="6" />
      </g>
      ${callout(125, 78, 190, 36, "JEGS 555-51962", "jegs-rad", active)}
      ${callout(230, 118, 40, 210, sheetLabel("rad-hose", "26502 · 1-3/4"), "rad-hose", active, "replace")}
      ${callout(318, 148, 430, 48, sheetLabel("thermostat", "housing due"), "thermostat", active)}
      ${callout(250, 196, 200, 370, "model 110", "flex-fan-110", active)}
      ${callout(175, 100, 320, 72, "AN833-12D", "an12-spruce", active)}
      <text class="title-note" x="24" y="400">${sheetLabel("rad-hose", "26502 · 1-3/4")} · heater hose GAT 28432</text>
    `;
  },

  driveline(active) {
    return `
      <g class="hot ${onCls("gearbox-1442", active)}" data-part="gearbox-1442">
        <path class="block" d="M40 150 L130 150 L146 168 L146 214 L130 232 L40 232 Z" />
        <path class="bell" d="M146 164 L176 156 L184 188 L184 204 L176 226 L146 214 Z" />
      </g>
      <g class="hot ${onCls("driveshaft-1442", active)}" data-part="driveshaft-1442">
        <path class="shaft" d="M196 176 L392 176 L392 196 L196 196 Z" />
        <ellipse class="body" cx="184" cy="186" rx="18" ry="16" />
        <ellipse class="body" cx="404" cy="186" rx="18" ry="16" />
        <circle cx="184" cy="186" r="5" />
        <circle cx="404" cy="186" r="5" />
      </g>
      <rect class="axle" x="420" y="140" width="24" height="110" rx="3" />
      <g class="ghost-wheel"><ellipse cx="520" cy="185" rx="62" ry="62" /></g>
      <text class="stamp" x="288" y="250" text-anchor="middle">~27.25 in ride</text>
      ${callout(98, 148, 48, 48, "Trans rear flange", "gearbox-1442", active)}
      ${callout(288, 174, 300, 80, "Shaft 27.25 in", "driveshaft-1442", active)}
      ${callout(432, 140, 470, 48, "Axle flange", "driveshaft-1442", active)}
      <text class="title-note" x="24" y="408">Northwest Drivetrain · no gearbox SKU on a receipt</text>
    `;
  },

  fluids(active) {
    const jugs = [
      { id: "fluid-engine", x: 70, label: "Engine oil", sub: "3.0 Vortec" },
      { id: "fluid-gearbox", x: 180, label: "Gearbox", sub: "box unknown" },
      { id: "fluid-coolant", x: 290, label: "Coolant", sub: "JEGS filler" },
      { id: "fluid-brake", x: 400, label: "Brake", sub: "Wilwood MC" },
      { id: "fluid-clutch", x: 510, label: "Clutch", sub: "slave 37728" },
    ];
    return `
      ${jugs
        .map(
          (j) => `
      <g class="hot ${onCls(j.id, active)}" data-part="${j.id}">
        <rect class="jug" x="${j.x}" y="120" width="64" height="150" rx="6" />
        <rect class="jug-cap" x="${j.x + 18}" y="102" width="28" height="22" rx="3" />
        <text class="stamp" x="${j.x + 32}" y="198" text-anchor="middle">${j.label}</text>
        <text class="stamp" x="${j.x + 32}" y="216" text-anchor="middle">${j.sub}</text>
      </g>
      ${callout(j.x + 32, 102, j.x + 32, 40, j.label, j.id, active)}`
        )
        .join("")}
      <text class="title-note" x="24" y="408">No oil / ATF / coolant / DOT grade on any invoice — log Current fill</text>
    `;
  },

  chassis(active) {
    return `
      <g class="hot ${onCls("kinetic-body", active)}" data-part="kinetic-body" opacity="0.15">
        <path d="M80 180 L 160 120 L 340 110 L 420 160 L 500 150 L 540 190 L 500 230 L 80 230 Z" />
      </g>
      <g data-part="frame">
        <rect class="rail" x="90" y="200" width="420" height="16" />
        <rect class="rail" x="90" y="250" width="420" height="16" />
        <rect class="rail" x="140" y="140" width="14" height="126" />
        <rect class="rail" x="250" y="128" width="14" height="138" />
        <rect class="rail" x="360" y="150" width="14" height="116" />
        <rect class="rail" x="470" y="170" width="14" height="96" />
        <line class="ink" x1="154" y1="140" x2="257" y2="128" />
        <line class="ink" x1="264" y1="128" x2="367" y2="150" />
        <line class="ink" x1="97" y1="208" x2="147" y2="140" />
      </g>
      <g class="hot ${onCls("tube-4130", active)}" data-part="tube-4130">
        <rect class="rail" x="90" y="200" width="420" height="16" />
      </g>
      <g class="hot ${onCls("por15", active)}" data-part="por15">
        <rect class="box" x="500" y="70" width="70" height="90" rx="4" />
        <text class="stamp" x="535" y="120" text-anchor="middle">POR-15</text>
      </g>
      <text class="stamp" x="280" y="80" text-anchor="middle">1×1 TUBE · 1442</text>
      ${callout(535, 70, 500, 40, "1GB black", "por15", active)}
      <text class="title-note" x="24" y="400">4130 7/8×.188 and 3/8×.065 · AN8-25A · AOC 4043 / ER70S-6</text>
    `;
  },

  body(active) {
    return `
      <g class="hot ${onCls("kinetic-body", active)}" data-part="kinetic-body">
        <path class="nose" d="M70 200 C 90 140, 150 118, 230 122 L 250 122 L 250 248 L 90 248 C 70 240, 60 220, 70 200 Z" />
        <path class="scuttle" d="M250 122 L 340 108 L 360 150 L 340 168 L 250 168 Z" />
        <path class="tub" d="M250 168 L 430 168 L 450 150 L 500 160 L 500 248 L 250 248 Z" />
        <path class="screen" d="M338 108 L 328 42 L 470 38 L 455 108" />
        <path class="hoop" d="M430 150 A 70 70 0 0 1 430 70" fill="none" />
        <path class="fender" d="M150 248 A 55 55 0 0 1 250 248" fill="none" />
        <path class="fender" d="M430 248 A 55 55 0 0 1 530 248" fill="none" />
        <circle cx="200" cy="248" r="36" class="ghost" />
        <circle cx="480" cy="248" r="36" class="ghost" />
        <ellipse cx="118" cy="175" rx="16" ry="12" />
      </g>
      <g class="hot ${onCls("screen-glass", active)}" data-part="screen-glass">
        <path class="screen" d="M338 108 L 328 42 L 470 38 L 455 108" />
      </g>
      <g class="hot ${onCls("hood-straps", active)}" data-part="hood-straps">
        <line class="ink" x1="200" y1="130" x2="300" y2="118" />
      </g>
      <g class="hot ${onCls("exhaust-bends", active)}" data-part="exhaust-bends">
        <path class="line" d="M430 230 C 470 250, 510 250, 540 230" fill="none" />
      </g>
      ${callout(150, 150, 40, 60, "TTL nose bf01s", "kinetic-body", active)}
      ${callout(340, 108, 80, 24, "Superscuttle", "kinetic-body", active)}
      ${callout(400, 42, 500, 24, "Glass 15.5×37.5", "screen-glass", active)}
      ${callout(540, 230, 500, 330, "Bends 91013670", "exhaust-bends", active)}
      <text class="title-note" x="24" y="400">DFHS-4 straps · Patriot side pipes (sheet only) · 1-1/2 bends marked NO.</text>
    `;
  },

  electrical(active) {
    const fuseCells = [];
    for (let c = 0; c < 4; c++) {
      fuseCells.push(`<rect class="fuse-cell" x="${278 + c * 24}" y="100" width="20" height="16" rx="2" />`);
    }
    for (let c = 0; c < 3; c++) {
      fuseCells.push(`<rect class="fuse-cell" x="${290 + c * 24}" y="120" width="20" height="16" rx="2" />`);
    }
    const stripTicks = (y) =>
      Array.from({ length: 8 }, (_, i) => {
        const x = 282 + i * 12;
        return `<line class="ink" x1="${x}" y1="${y}" x2="${x}" y2="${y + 10}" />`;
      }).join("");
    return `
      <text class="panel-title" x="118" y="36" text-anchor="middle">ENGINE</text>
      <text class="panel-title" x="360" y="36" text-anchor="middle">FIREWALL</text>
      <text class="panel-title" x="575" y="36" text-anchor="middle">LIGHTS</text>
      <text class="panel-title" x="465" y="268" text-anchor="middle">STEERING COLUMN</text>

      <g class="hot ${onCls("loom-1442", active)}" data-part="loom-1442">
        <rect class="panel" x="28" y="48" width="180" height="250" rx="6" />
        <path class="wire wire-ign" d="M70 210 C 140 210, 200 160, 292 150" />
        <path class="wire wire-bat" d="M150 120 C 210 90, 250 90, 292 128" />
        <path class="wire wire-gnd" d="M118 270 C 200 300, 280 240, 360 210" />
        <path class="wire wire-light" d="M430 128 C 500 80, 530 80, 560 92" />
        <path class="wire wire-light" d="M430 150 C 490 170, 530 200, 560 210" />
        <path class="wire wire-ign" d="M400 210 C 430 250, 450 280, 470 300" />
        <path class="wire wire-bat" d="M118 160 C 160 40, 520 48, 560 92" />
      </g>

      <g class="hot ${onCls("fan-motor", active)}" data-part="fan-motor">
        <circle class="rim" cx="88" cy="200" r="30" />
        <circle cx="88" cy="200" r="8" />
        ${[0,1,2,3].map((i) => {
          const a = (i * Math.PI) / 2 + 0.4;
          const x1 = (88 + 9 * Math.cos(a)).toFixed(1);
          const y1 = (200 + 9 * Math.sin(a)).toFixed(1);
          const x2 = (88 + 26 * Math.cos(a + 0.4)).toFixed(1);
          const y2 = (200 + 26 * Math.sin(a + 0.4)).toFixed(1);
          const x3 = (88 + 24 * Math.cos(a - 0.12)).toFixed(1);
          const y3 = (200 + 24 * Math.sin(a - 0.12)).toFixed(1);
          return `<path class="ink" d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z" />`;
        }).join("")}
      </g>
      <g class="ign-block">
        <rect class="box" x="128" y="88" width="58" height="44" rx="3" />
        <text class="stamp" x="157" y="114" text-anchor="middle">IGN</text>
        <circle class="coil-can" cx="157" cy="168" r="16" />
      </g>

      <rect class="panel" x="250" y="48" width="220" height="190" rx="6" />
      <g class="hot ${onCls("fuse-91064004", active)}" data-part="fuse-91064004">
        <rect class="fuse" x="272" y="78" width="122" height="68" rx="4" />
        ${fuseCells.join("")}
        <text class="stamp" x="333" y="70" text-anchor="middle">910-64004</text>
      </g>
      <g class="hot ${onCls("strip-91064006", active)}" data-part="strip-91064006">
        <rect class="strip" x="276" y="158" width="112" height="14" rx="2" />
        ${stripTicks(160)}
        <rect class="strip" x="276" y="178" width="112" height="14" rx="2" />
        ${stripTicks(180)}
      </g>
      <circle class="relay" cx="430" cy="118" r="12" />
      <circle class="relay" cx="430" cy="150" r="12" />
      <circle class="relay" cx="430" cy="182" r="12" />

      <g class="hot ${onCls("headlamps", active)}" data-part="headlamps">
        <path class="lamp" d="M534 70 L586 70 L598 92 L586 118 L534 118 L524 92 Z" />
        <path class="lamp" d="M604 70 L656 70 L668 92 L656 118 L604 118 L594 92 Z" />
        <circle cx="560" cy="94" r="10" />
        <circle cx="630" cy="94" r="10" />
      </g>
      <g class="hot ${onCls("ss-510", active)}" data-part="ss-510">
        <path class="lamp tail" d="M540 186 L582 186 L590 210 L582 234 L540 234 L532 210 Z" />
        <path class="lamp tail" d="M608 186 L650 186 L658 210 L650 234 L608 234 L600 210 Z" />
        <circle class="lamp tail" cx="561" cy="210" r="8" />
        <circle class="lamp tail" cx="629" cy="210" r="8" />
      </g>

      <g class="hot ${onCls("horn-s10", active)}" data-part="horn-s10">
        <rect class="panel" x="250" y="278" width="430" height="130" rx="6" />
        <circle class="ign-sw" cx="310" cy="340" r="22" />
        <circle cx="310" cy="340" r="8" />
        <rect class="stalk" x="360" y="328" width="90" height="14" rx="4" />
        <rect class="stalk" x="430" y="300" width="14" height="70" rx="4" />
        <circle class="horn" cx="520" cy="340" r="18" />
        <text class="stamp" x="310" y="382" text-anchor="middle">IGN SW</text>
        <text class="stamp" x="520" y="382" text-anchor="middle">HORN · S10</text>
        <text class="stamp" x="400" y="318" text-anchor="middle">STALK</text>
      </g>

      ${callout(390, 90, 478, 68, "7-fuse", "fuse-91064004", active)}
      ${callout(332, 192, 360, 228, "8-term ×2", "strip-91064006", active)}
      ${callout(88, 182, 155, 278, "Fan motor", "fan-motor", active)}
      ${callout(560, 66, 530, 22, "Headlamps", "headlamps", active)}
      ${callout(628, 210, 655, 188, "SS 510", "ss-510", active)}
      ${callout(520, 322, 560, 420, "S10 horn ref", "horn-s10", active)}
      ${callout(150, 70, 210, 22, "Loom sheet", "loom-1442", active)}
      <text class="title-note" x="28" y="448">7-fuse + two 8-term strips · Speedway E490308 · firewall drawing writes 30A</text>
    `;
  },

  wheels(active) {
    return `
      <g class="hot ${onCls("tires", active)}" data-part="tires">
        <ellipse class="tire" cx="250" cy="210" rx="150" ry="150" />
        <ellipse class="tire-inner" cx="250" cy="210" rx="112" ry="112" />
      </g>
      <g class="hot ${onCls("wheel-adp", active)}" data-part="wheel-adp">
        <circle class="rim" cx="250" cy="210" r="100" />
        <circle class="rim" cx="250" cy="210" r="36" />
        ${[0,1,2,3,4].map((i) => {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          return `<circle cx="${(250 + 62 * Math.cos(a)).toFixed(1)}" cy="${(210 + 62 * Math.sin(a)).toFixed(1)}" r="7" />`;
        }).join("")}
        <circle cx="250" cy="210" r="12" />
        <path class="adapter" d="M390 186 L470 186 L478 198 L478 230 L470 242 L390 242 L382 230 L382 198 Z" />
        <text class="stamp" x="430" y="220" text-anchor="middle">2 in</text>
      </g>
      ${callout(250, 60, 80, 36, "P205/75R14", "tires", active)}
      ${callout(430, 186, 500, 80, "4.75 adapter", "wheel-adp", active)}
      <text class="title-note" x="72" y="400">Geometry size as-built · update Current size if you swapped them</text>
    `;
  },
};

window.sketchSVG = function sketchSVG(systemId, activePart) {
  const wide = systemId === "electrical";
  BOX = { w: wide ? 720 : 640, h: wide ? 460 : 420 };
  const draw = SKETCH[systemId];
  const inner = draw
    ? draw(activePart)
    : `<text x="320" y="200" text-anchor="middle" class="call">No sketch for this system yet</text>`;
  const w = BOX.w;
  const h = BOX.h;
  return `
    <svg class="branch-map sketch-map" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img">
      <rect class="paper" x="0" y="0" width="${w}" height="${h}" />
      ${inner}
    </svg>`;
};
