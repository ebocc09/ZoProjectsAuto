/** Workshop-style 2D sketches for each Locost system. Clickable groups use data-part. */

let BOX = { w: 640, h: 420 };

function onCls(id, active) {
  return id === active ? "on" : "";
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
      <g class="hot ghost-wheel" data-part="tires" data-goto="wheels">
        <ellipse cx="508" cy="208" rx="96" ry="96" />
        <ellipse cx="508" cy="208" rx="62" ry="62" />
        ${[0,1,2,3,4,5,6,7].map((i) => {
          const a = (i * Math.PI) / 4;
          return `<line class="ink faint" x1="${(508 + 66 * Math.cos(a)).toFixed(1)}" y1="${(208 + 66 * Math.sin(a)).toFixed(1)}" x2="${(508 + 90 * Math.cos(a)).toFixed(1)}" y2="${(208 + 90 * Math.sin(a)).toFixed(1)}" />`;
        }).join("")}
      </g>
      <g class="chassis-bay">
        <rect class="rail" x="58" y="64" width="22" height="292" rx="2" />
        <rect class="rail" x="92" y="86" width="16" height="248" rx="2" />
        <line class="ink" x1="80" y1="110" x2="108" y2="96" />
        <line class="ink" x1="80" y1="162" x2="108" y2="150" />
        <line class="ink" x1="80" y1="268" x2="108" y2="256" />
        <line class="ink" x1="80" y1="318" x2="108" y2="308" />
      </g>
      <g class="hot ${onCls("lower-wishbone", active)}" data-part="lower-wishbone">
        <path class="arm" d="M118 252 L 132 252 L 378 232 L 392 246 L 378 268 L 132 318 L 108 318 L 108 268 Z" />
        <line class="ink" x1="118" y1="260" x2="378" y2="246" />
        <line class="ink" x1="118" y1="308" x2="378" y2="258" />
        <rect class="tube" x="102" y="248" width="28" height="22" rx="4" />
        <rect class="tube" x="102" y="298" width="28" height="22" rx="4" />
      </g>
      <g class="hot ${onCls("upper-wishbone", active)}" data-part="upper-wishbone">
        <path class="arm" d="M118 108 L 132 108 L 360 168 L 376 182 L 360 198 L 132 168 L 108 168 L 108 118 Z" />
        <line class="ink" x1="118" y1="118" x2="360" y2="176" />
        <line class="ink" x1="118" y1="158" x2="360" y2="188" />
        <rect class="tube" x="102" y="104" width="28" height="22" rx="4" />
        <rect class="tube" x="102" y="148" width="28" height="22" rx="4" />
      </g>
      <g class="hot replace ${onCls("poly-135", active)}" data-part="poly-135">
        <ellipse class="bush" cx="116" cy="115" rx="13" ry="11" />
        <ellipse class="bush" cx="116" cy="159" rx="13" ry="11" />
        <circle cx="116" cy="115" r="4" />
        <circle cx="116" cy="159" r="4" />
      </g>
      <g class="hot ${onCls("sw-91008015", active)}" data-part="sw-91008015">
        <ellipse class="bush" cx="116" cy="259" rx="12" ry="10" />
        <ellipse class="bush" cx="116" cy="309" rx="12" ry="10" />
        <circle cx="116" cy="259" r="3.5" />
        <circle cx="116" cy="309" r="3.5" />
      </g>
      <g class="upright">
        <path class="arm" d="M368 168 L 398 168 L 406 188 L 406 252 L 392 272 L 368 272 L 360 252 L 360 188 Z" />
        <line class="ink" x1="383" y1="168" x2="383" y2="272" />
        <circle cx="508" cy="208" r="22" />
        <line class="ink" x1="398" y1="208" x2="486" y2="208" />
      </g>
      <g class="hot ${onCls("napa-10269", active)}" data-part="napa-10269">
        <circle cx="370" cy="182" r="16" />
        <circle cx="370" cy="182" r="6" />
      </g>
      <g class="hot ${onCls("napa-10390", active)}" data-part="napa-10390">
        <circle cx="382" cy="258" r="16" />
        <circle cx="382" cy="258" r="6" />
      </g>
      <g class="hot coil" data-part="qa1-ur4855p" data-goto="front-dampers">
        <rect class="hit" x="226" y="76" width="44" height="188" />
        <line x1="248" y1="248" x2="248" y2="92" />
        ${[0,1,2,3,4,5,6,7].map((i) => `<ellipse class="spring" cx="248" cy="${236 - i * 16}" rx="18" ry="6" />`).join("")}
        <circle cx="248" cy="84" r="8" />
        <circle cx="248" cy="252" r="8" />
      </g>
      ${callout(116, 115, 175, 32, "135 POLY .175", "poly-135", active, "replace")}
      ${callout(200, 136, 250, 72, "Upper 1/4 in plate", "upper-wishbone", active)}
      ${callout(180, 310, 250, 372, "Lower FINAL MOD", "lower-wishbone", active)}
      ${callout(370, 182, 430, 48, "BJ 10269", "napa-10269", active)}
      ${callout(382, 258, 450, 348, "BJ 10390", "napa-10390", active)}
      ${callout(116, 259, 280, 398, "910-08015 kit", "sw-91008015", active)}
      ${callout(248, 84, 430, 28, "QA1 coilover", "qa1-ur4855p", active, "", "front-dampers")}
      <text class="title-note" x="58" y="410">Front corner · chassis 1442 · inboard looking out</text>
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
        <rect class="body" x="252" y="118" width="56" height="210" rx="10" />
        ${coils}
        <rect class="body" x="262" y="128" width="36" height="88" rx="6" />
        <text class="stamp" x="280" y="175" text-anchor="middle">QA1</text>
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
      <g class="ghost-wheel"><ellipse cx="500" cy="210" rx="72" ry="72" /><ellipse cx="500" cy="210" rx="44" ry="44" /></g>
      <g class="hot ${onCls("tie-rods", active)}" data-part="tie-rods">
        <rect class="rack" x="90" y="228" width="250" height="22" rx="4" />
        <line class="ink thick" x1="340" y1="239" x2="455" y2="210" />
        <circle cx="340" cy="239" r="7" />
        <circle cx="455" cy="210" r="8" />
      </g>
      <g class="hot ${onCls("heims", active)}" data-part="heims">
        <circle cx="110" cy="239" r="10" />
        <circle cx="455" cy="210" r="6" />
        <circle cx="200" cy="160" r="8" />
      </g>
      <line class="ink" x1="215" y1="228" x2="215" y2="120" />
      <line class="ink" x1="215" y1="120" x2="160" y2="70" />
      <g class="wheel-steer">
        <ellipse cx="145" cy="58" rx="42" ry="16" transform="rotate(-18 145 58)" />
        <ellipse cx="145" cy="58" rx="18" ry="7" transform="rotate(-18 145 58)" />
      </g>
      <rect class="upright" x="448" y="168" width="18" height="86" rx="2" />
      ${callout(215, 239, 40, 300, "Track rod 14.82 in", "tie-rods", active)}
      ${callout(110, 239, 40, 180, "Heims / rod ends", "heims", active)}
      ${callout(455, 210, 560, 90, "Steering arm", "tie-rods", active)}
      <text class="title-note" x="72" y="400">Rack, track rod, upright · LHD</text>
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
      <g class="ghost-wheel"><ellipse cx="490" cy="210" rx="76" ry="76" /><ellipse cx="490" cy="210" rx="48" ry="48" /></g>
      <g class="hot ${onCls("wilwood-mc", active)}" data-part="wilwood-mc">
        <path class="box" d="M80 80 L 210 80 L 210 200 L 80 200 Z" />
        <line class="ink" x1="110" y1="80" x2="90" y2="40" />
        <line class="ink" x1="150" y1="80" x2="150" y2="36" />
        <line class="ink" x1="190" y1="80" x2="210" y2="40" />
        <rect class="mc" x="220" y="110" width="88" height="36" rx="4" />
        <text class="stamp" x="264" y="133" text-anchor="middle">WILWOOD</text>
        <path class="line" d="M308 128 C 360 128, 400 160, 440 200" fill="none" />
      </g>
      <g class="disc">
        <circle cx="490" cy="210" r="38" />
        <circle cx="490" cy="210" r="18" />
      </g>
      <g class="hot ${onCls("an-lines", active)}" data-part="an-lines">
        <path class="line" d="M308 150 C 380 170, 420 190, 470 210" fill="none" />
        <rect class="mc" x="360" y="250" width="70" height="28" rx="3" />
        <text class="stamp" x="395" y="268" text-anchor="middle">AN3</text>
      </g>
      <g class="hot ${onCls("wc-37625", active)}" data-part="wc-37625">
        <rect class="mc" x="430" y="250" width="36" height="22" rx="3" />
      </g>
      ${callout(264, 110, 360, 48, "1 in tandem 260-7563", "wilwood-mc", active)}
      ${callout(150, 80, 40, 240, "Champion pedal box", "wilwood-mc", active)}
      ${callout(395, 250, 360, 330, "AN lines + switch 91031305", "an-lines", active)}
      ${callout(448, 250, 500, 330, "WC 37625", "wc-37625", active)}
      <g class="hot ${onCls("caliper-front-rh", active)}" data-part="caliper-front-rh">
        <path class="box" d="M452 168 L528 160 L536 214 L444 214 Z" />
      </g>
      ${callout(490, 160, 300, 48, "Front R 19141004 · L 19141005", "caliper-front-rh", active)}
      <text class="title-note" x="24" y="400">E499097 plumbing · NAPA 413-1206 · fronts 19141004 / 19141005</text>
    `;
  },

  engine(active) {
    return `
      <g class="hot ${onCls("gm-30", active)}" data-part="gm-30">
        <rect class="block" x="160" y="140" width="280" height="160" rx="6" />
        <rect class="head" x="170" y="92" width="260" height="52" rx="4" />
        <rect class="cover" x="190" y="70" width="220" height="28" rx="3" />
        ${[0,1,2,3].map((i) => `<circle cx="${210 + i * 52}" cy="98" r="10" />`).join("")}
        <rect class="bell" x="430" y="168" width="70" height="110" rx="8" />
        <circle cx="500" cy="224" r="48" />
        <circle cx="500" cy="224" r="22" />
        <text class="stamp" x="300" y="230" text-anchor="middle">GM 3.0 VORTEC</text>
      </g>
      <g class="hot ${onCls("clutch-fork", active)}" data-part="clutch-fork">
        <path class="line" d="M470 250 L 530 290" fill="none" />
        <circle cx="530" cy="290" r="8" />
      </g>
      <g class="hot ${onCls("fuel-hardware", active)}" data-part="fuel-hardware">
        <path class="hose" d="M170 220 C 120 240, 90 280, 80 320" fill="none" />
      </g>
      ${callout(300, 70, 80, 40, "3.0L I4 · 181 cid", "gm-30", active)}
      ${callout(500, 224, 560, 70, "AWS 04-065 clutch", "gm-30", active)}
      ${callout(530, 290, 500, 360, "Fork 15592270", "clutch-fork", active)}
      ${callout(80, 320, 40, 360, "Fuel H-176 · choke 732-1153", "fuel-hardware", active)}
      <text class="title-note" x="24" y="400">Pilot 3914000 · T/O 614018 · belt 25-7417 · 15530202 printed IRRIGATION</text>
    `;
  },

  cooling(active) {
    return `
      <g class="hot ${onCls("jegs-rad", active)}" data-part="jegs-rad">
        <rect class="rad" x="90" y="80" width="70" height="240" rx="4" />
        ${Array.from({ length: 14 }, (_, i) => `<line class="core" x1="98" y1="${92 + i * 16}" x2="152" y2="${92 + i * 16}" />`).join("")}
        <circle cx="200" cy="200" r="52" />
        ${[0,1,2,3,4,5].map((i) => {
          const a = (i * Math.PI) / 3;
          return `<line class="ink" x1="200" y1="200" x2="${(200 + 46 * Math.cos(a)).toFixed(1)}" y2="${(200 + 46 * Math.sin(a)).toFixed(1)}" />`;
        }).join("")}
        <path class="hose" d="M160 100 C 240 90, 280 120, 300 140" fill="none" />
        <path class="hose" d="M160 280 C 250 300, 300 260, 320 220" fill="none" />
        <rect class="block-ghost" x="300" y="140" width="180" height="140" rx="6" />
      </g>
      <g class="hot ${onCls("an12-spruce", active)}" data-part="an12-spruce">
        <circle cx="175" cy="100" r="10" />
      </g>
      <g class="hot ${onCls("heater-hose", active)}" data-part="heater-hose">
        <path class="hose" d="M160 280 C 250 300, 300 260, 320 220" fill="none" />
      </g>
      ${callout(125, 80, 40, 48, "JEGS 555-51962", "jegs-rad", active)}
      ${callout(200, 200, 40, 360, "12 in fan 400-110", "jegs-rad", active)}
      ${callout(175, 100, 220, 48, "AN833-12D", "an12-spruce", active)}
      <text class="title-note" x="24" y="400">Hose drain 071063700 · heater hose GAT 28432</text>
    `;
  },

  driveline(active) {
    return `
      <g class="hot ${onCls("gearbox-1442", active)}" data-part="gearbox-1442">
        <rect class="block" x="48" y="148" width="100" height="80" rx="4" />
        <rect class="bell" x="132" y="162" width="36" height="52" rx="4" />
        <text class="stamp" x="98" y="194" text-anchor="middle">TRANS</text>
      </g>
      <g class="hot ${onCls("driveshaft-1442", active)}" data-part="driveshaft-1442">
        <rect class="shaft" x="168" y="174" width="240" height="22" rx="6" />
        <circle cx="168" cy="185" r="16" />
        <circle cx="408" cy="185" r="16" />
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
        <circle class="coil-can" cx="88" cy="210" r="28" />
        <circle cx="88" cy="210" r="10" />
        <text class="stamp" x="88" y="252" text-anchor="middle">FAN MOTOR</text>
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
        <circle class="lamp" cx="560" cy="92" r="26" />
        <circle class="lamp" cx="628" cy="92" r="26" />
        <circle cx="560" cy="92" r="10" />
        <circle cx="628" cy="92" r="10" />
        <text class="stamp" x="594" y="136" text-anchor="middle">HEAD</text>
      </g>
      <g class="hot ${onCls("ss-510", active)}" data-part="ss-510">
        <circle class="lamp tail" cx="560" cy="210" r="20" />
        <circle class="lamp tail" cx="628" cy="210" r="20" />
        <text class="stamp" x="594" y="246" text-anchor="middle">SS 510</text>
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

      ${callout(333, 78, 248, 58, "7-fuse block", "fuse-91064004", active)}
      ${callout(332, 178, 455, 248, "8-term strip ×2", "strip-91064006", active)}
      ${callout(88, 182, 155, 278, "Fan motor", "fan-motor", active)}
      ${callout(560, 66, 500, 48, "Headlamps", "headlamps", active)}
      ${callout(628, 210, 655, 188, "SS 510", "ss-510", active)}
      ${callout(520, 322, 560, 420, "S10 horn ref", "horn-s10", active)}
      ${callout(150, 70, 210, 22, "Loom sheet", "loom-1442", active)}
      <text class="title-note" x="28" y="448">7-fuse + two 8-term strips · Speedway E490308 · no amp ratings on the sheet</text>
    `;
  },

  wheels(active) {
    return `
      <g class="hot ${onCls("tires", active)}" data-part="tires">
        <ellipse class="tire" cx="280" cy="210" rx="150" ry="150" />
        <ellipse class="tire-inner" cx="280" cy="210" rx="108" ry="108" />
      </g>
      <g class="hot ${onCls("wheel-adp", active)}" data-part="wheel-adp">
        <circle cx="280" cy="210" r="92" />
        ${[0,1,2,3,4].map((i) => {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          return `<circle cx="${(280 + 58 * Math.cos(a)).toFixed(1)}" cy="${(210 + 58 * Math.sin(a)).toFixed(1)}" r="8" />`;
        }).join("")}
        <circle cx="280" cy="210" r="22" />
        <rect class="adapter" x="400" y="186" width="70" height="48" rx="4" />
        <text class="stamp" x="435" y="214" text-anchor="middle">2 in</text>
      </g>
      ${callout(280, 70, 80, 36, "P205/75R14", "tires", active)}
      ${callout(435, 186, 520, 80, "4.75 adapter", "wheel-adp", active)}
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
      <defs>
        <pattern id="sheetgrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#d9d0ba" stroke-width="0.35" />
        </pattern>
      </defs>
      <rect class="paper" x="0" y="0" width="${w}" height="${h}" />
      <rect class="sheetgrid" x="0" y="0" width="${w}" height="${h}" />
      ${inner}
    </svg>`;
};
