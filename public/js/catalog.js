/** Parts catalog. Prices are what the paperwork says, not a current quote. */

const CAT_G = 'fill="none" stroke="#d7e0d6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const CAT_F = 'fill="rgba(47,106,72,.4)" stroke="#8fd0a4" stroke-width="1.5"';
const CAT_A = 'fill="rgba(217,138,43,.32)" stroke="#e0a85a" stroke-width="1.4"';
const CAT_S = 'fill="rgba(160,170,180,.22)" stroke="#c5ced6" stroke-width="1.4"';
const CAT_D = 'fill="rgba(20,25,20,.9)" stroke="#8a93a0" stroke-width="1.4"';

function catFrame(body) {
  return `<svg class="part-sketch" viewBox="0 0 200 120" role="img">${body}</svg>`;
}

const CAT_DRAW = {
  bush: () => catFrame(`
    <rect ${CAT_F} x="48" y="38" width="104" height="44" rx="22"/>
    <rect ${CAT_D} x="78" y="48" width="44" height="24" rx="4"/>
    <line ${CAT_G} x1="100" y1="28" x2="100" y2="92"/>
    <line ${CAT_G} x1="36" y1="60" x2="164" y2="60"/>`),
  heim: () => catFrame(`
    <circle ${CAT_S} cx="62" cy="60" r="22"/>
    <circle ${CAT_D} cx="62" cy="60" r="8"/>
    <path ${CAT_G} d="M84 60 H150"/>
    <path ${CAT_G} d="M118 52 H150 M118 68 H150"/>
    <path ${CAT_A} d="M146 48 h22 v24 h-22 z"/>`),
  arm: () => catFrame(`
    <path ${CAT_F} d="M36 78 L70 78 L150 42 L168 52 L150 66 L78 96 L36 96 Z"/>
    <circle ${CAT_A} cx="48" cy="87" r="7"/>
    <circle ${CAT_A} cx="158" cy="54" r="8"/>`),
  coil: () => catFrame(`
    <rect ${CAT_S} x="88" y="18" width="24" height="84" rx="4"/>
    <path ${CAT_G} d="M78 30 h44 M74 42 h52 M74 54 h52 M74 66 h52 M74 78 h52 M78 90 h44"/>
    <circle ${CAT_A} cx="100" cy="16" r="7"/>
    <circle ${CAT_A} cx="100" cy="106" r="7"/>`),
  bar: () => catFrame(`
    <line ${CAT_G} x1="36" y1="70" x2="164" y2="46" stroke-width="4"/>
    <circle ${CAT_A} cx="34" cy="72" r="8"/>
    <circle ${CAT_A} cx="166" cy="44" r="8"/>`),
  master: () => catFrame(`
    <rect ${CAT_F} x="70" y="48" width="90" height="28" rx="4"/>
    <rect ${CAT_A} x="86" y="24" width="22" height="26" rx="3"/>
    <rect ${CAT_A} x="122" y="24" width="22" height="26" rx="3"/>
    <path ${CAT_G} d="M160 62 H184"/>
    <circle ${CAT_S} cx="48" cy="70" r="16"/>`),
  rad: () => catFrame(`
    <rect ${CAT_F} x="36" y="22" width="36" height="78" rx="3"/>
    ${Array.from({ length: 8 }, (_, i) => `<line ${CAT_G} x1="42" y1="${32 + i * 8}" x2="66" y2="${32 + i * 8}"/>`).join("")}
    <circle ${CAT_S} cx="118" cy="60" r="28"/>
    <path ${CAT_G} d="M118 60 L140 42 M118 60 L140 78 M118 60 L96 42"/>
    <path ${CAT_A} d="M72 36 C100 28 110 40 118 48"/>`),
  engine: () => catFrame(`
    <rect ${CAT_F} x="40" y="48" width="100" height="52" rx="4"/>
    <rect ${CAT_S} x="48" y="28" width="84" height="22" rx="3"/>
    ${[0, 1, 2, 3].map((i) => `<circle ${CAT_A} cx="${62 + i * 20}" cy="39" r="5"/>`).join("")}
    <circle ${CAT_S} cx="158" cy="74" r="22"/>
    <circle ${CAT_D} cx="158" cy="74" r="8"/>`),
  slave: () => catFrame(`
    <rect ${CAT_F} x="48" y="46" width="70" height="28" rx="6"/>
    <rect ${CAT_S} x="112" y="52" width="40" height="16" rx="3"/>
    <path ${CAT_G} d="M152 60 H180"/>
    <circle ${CAT_A} cx="40" cy="60" r="8"/>`),
  box: () => catFrame(`
    <rect ${CAT_F} x="36" y="40" width="78" height="44" rx="3"/>
    <path ${CAT_S} d="M114 48 h28 v28 h-28 z"/>
    <circle ${CAT_A} cx="160" cy="62" r="16"/>
    <text class="sk-lab" x="58" y="66">TRANS</text>`),
  shaft: () => catFrame(`
    <rect ${CAT_S} x="40" y="52" width="120" height="14" rx="7"/>
    <circle ${CAT_A} cx="36" cy="59" r="12"/>
    <circle ${CAT_A} cx="166" cy="59" r="12"/>`),
  jug: () => catFrame(`
    <rect ${CAT_F} x="74" y="36" width="52" height="68" rx="6"/>
    <rect ${CAT_A} x="88" y="22" width="24" height="16" rx="3"/>
    <path ${CAT_G} d="M86 58 h28 M86 72 h28"/>`),
  body: () => catFrame(`
    <path ${CAT_F} d="M24 70 C32 48 58 40 90 42 L98 42 L98 86 L36 86 C26 84 20 78 24 70 Z"/>
    <path ${CAT_F} d="M98 42 L140 34 L152 52 L140 62 L98 62 Z"/>
    <path ${CAT_F} d="M98 62 H168 L176 54 L188 58 L188 86 H98 Z"/>
    <path ${CAT_S} d="M138 34 L132 16 L176 14 L168 34"/>
    <circle ${CAT_D} cx="70" cy="88" r="12"/>
    <circle ${CAT_D} cx="160" cy="88" r="12"/>`),
  fuse: () => catFrame(`
    <rect ${CAT_F} x="36" y="28" width="128" height="64" rx="4"/>
    ${[0, 1, 2, 3].map((i) => `<rect ${CAT_A} x="${50 + i * 28}" y="40" width="16" height="28" rx="2"/>`).join("")}
    <line ${CAT_G} x1="50" y1="78" x2="150" y2="78"/>`),
  strip: () => catFrame(`
    <rect ${CAT_S} x="28" y="46" width="144" height="28" rx="3"/>
    ${Array.from({ length: 8 }, (_, i) => `<circle ${CAT_A} cx="${42 + i * 17}" cy="60" r="4"/>`).join("")}`),
  lamp: () => catFrame(`
    <ellipse ${CAT_A} cx="100" cy="60" rx="36" ry="28"/>
    <ellipse ${CAT_S} cx="100" cy="60" rx="16" ry="12"/>
    <path ${CAT_G} d="M64 60 H36 M136 60 H164"/>`),
  taillamp: () => catFrame(`
    <rect ${CAT_A} x="48" y="36" width="104" height="48" rx="8"/>
    <circle fill="rgba(196,90,42,.55)" stroke="#e07a4a" stroke-width="1.4" cx="78" cy="60" r="12"/>
    <circle fill="rgba(196,90,42,.55)" stroke="#e07a4a" stroke-width="1.4" cx="122" cy="60" r="12"/>`),
  horn: () => catFrame(`
    <path ${CAT_A} d="M48 70 C48 40 90 36 110 52 L150 40 L158 52 L118 64 C100 78 48 86 48 70 Z"/>
    <circle ${CAT_S} cx="58" cy="62" r="8"/>`),
  fan: () => catFrame(`
    <circle ${CAT_S} cx="100" cy="60" r="36"/>
    <circle ${CAT_F} cx="100" cy="60" r="8"/>
    ${[0, 1, 2, 3, 4].map((i) => {
      const a = (i * Math.PI * 2) / 5;
      const x = (100 + Math.cos(a) * 28).toFixed(1);
      const y = (60 + Math.sin(a) * 28).toFixed(1);
      return `<line ${CAT_G} x1="100" y1="60" x2="${x}" y2="${y}"/>`;
    }).join("")}`),
  tire: () => catFrame(`
    <circle ${CAT_D} cx="100" cy="60" r="40" stroke-width="10"/>
    <circle ${CAT_S} cx="100" cy="60" r="16"/>
    ${[0, 1, 2, 3, 4].map((i) => {
      const a = (i * Math.PI * 2) / 5;
      return `<line ${CAT_G} x1="${(100 + Math.cos(a) * 18).toFixed(1)}" y1="${(60 + Math.sin(a) * 18).toFixed(1)}" x2="${(100 + Math.cos(a) * 30).toFixed(1)}" y2="${(60 + Math.sin(a) * 30).toFixed(1)}"/>`;
    }).join("")}`),
  plate: () => catFrame(`
    <circle ${CAT_S} cx="70" cy="60" r="28"/>
    <circle ${CAT_D} cx="70" cy="60" r="10"/>
    <circle ${CAT_S} cx="132" cy="60" r="28"/>
    <circle ${CAT_D} cx="132" cy="60" r="10"/>
    <line ${CAT_G} x1="98" y1="60" x2="104" y2="60"/>`),
  hose: () => catFrame(`
    <path ${CAT_A} d="M30 78 C60 78 70 36 110 36 S160 70 176 48" stroke-width="6"/>
    <rect ${CAT_S} x="22" y="68" width="16" height="18" rx="2"/>
    <rect ${CAT_S} x="168" y="38" width="16" height="18" rx="2"/>`),
  cyl: () => catFrame(`
    <rect ${CAT_F} x="56" y="44" width="88" height="32" rx="16"/>
    <circle ${CAT_A} cx="78" cy="60" r="8"/>
    <path ${CAT_G} d="M110 60 H160"/>
    <path ${CAT_G} d="M148 48 v24"/>`),
  gauge: () => catFrame(`
    <circle ${CAT_S} cx="100" cy="64" r="34"/>
    <path ${CAT_G} d="M78 78 A28 28 0 0 1 122 78"/>
    <line ${CAT_A} x1="100" y1="64" x2="118" y2="48" stroke-width="2"/>
    <circle ${CAT_A} cx="100" cy="64" r="3"/>`),
  fork: () => catFrame(`
    <path ${CAT_G} d="M40 86 C70 86 80 40 120 36" stroke-width="4"/>
    <path ${CAT_F} d="M112 24 h28 v24 h-10 l-8 10 h-10 z"/>
    <circle ${CAT_A} cx="48" cy="86" r="8"/>`),
  clutch: () => catFrame(`
    <circle ${CAT_S} cx="100" cy="60" r="36"/>
    <circle ${CAT_F} cx="100" cy="60" r="14"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i * Math.PI) / 3;
      return `<line ${CAT_G} x1="${(100 + Math.cos(a) * 16).toFixed(1)}" y1="${(60 + Math.sin(a) * 16).toFixed(1)}" x2="${(100 + Math.cos(a) * 32).toFixed(1)}" y2="${(60 + Math.sin(a) * 32).toFixed(1)}"/>`;
    }).join("")}`),
  belt: () => catFrame(`
    <ellipse ${CAT_D} cx="70" cy="60" rx="22" ry="22"/>
    <ellipse ${CAT_D} cx="136" cy="60" rx="16" ry="16"/>
    <path ${CAT_A} d="M70 38 H136 A16 16 0 0 1 136 82 H70 A22 22 0 0 1 70 38" stroke-width="3"/>`),
  seal: () => catFrame(`
    <circle ${CAT_S} cx="100" cy="60" r="32"/>
    <circle ${CAT_F} cx="100" cy="60" r="20"/>
    <circle ${CAT_D} cx="100" cy="60" r="10"/>`),
  fitting: () => catFrame(`
    <path ${CAT_A} d="M40 52 h36 v16 H40 z"/>
    <path ${CAT_S} d="M76 46 h20 v28 H76 z"/>
    <path ${CAT_G} d="M96 60 H150"/>
    <path ${CAT_F} d="M140 44 h24 v32 h-24 z"/>`),
  tube: () => catFrame(`
    <rect ${CAT_S} x="30" y="28" width="140" height="10" rx="5"/>
    <rect ${CAT_S} x="40" y="48" width="120" height="10" rx="5"/>
    <rect ${CAT_A} x="50" y="68" width="100" height="10" rx="5"/>
    <rect ${CAT_F} x="36" y="88" width="128" height="8" rx="3"/>`),
  bolts: () => catFrame(`
    ${[0, 1, 2].map((i) => `<g transform="translate(${40 + i * 48} 28)"><rect ${CAT_S} x="8" y="0" width="20" height="12" rx="2"/><rect ${CAT_F} x="14" y="12" width="8" height="52"/></g>`).join("")}`),
  steel: () => catFrame(`
    <rect ${CAT_S} x="36" y="30" width="16" height="64"/>
    <rect ${CAT_S} x="64" y="30" width="16" height="64"/>
    <rect ${CAT_A} x="96" y="46" width="70" height="8"/>
    <rect ${CAT_A} x="96" y="64" width="70" height="8"/>
    <path ${CAT_G} d="M36 30 H80"/>`),
  paint: () => catFrame(`
    <path ${CAT_F} d="M70 36 h60 v58 a16 16 0 0 1 -16 16 H86 a16 16 0 0 1 -16 -16 Z"/>
    <rect ${CAT_A} x="78" y="22" width="44" height="16" rx="2"/>
    <text class="sk-lab" x="100" y="74" text-anchor="middle">POR</text>`),
  spool: () => catFrame(`
    <ellipse ${CAT_S} cx="100" cy="60" rx="34" ry="34"/>
    <ellipse ${CAT_D} cx="100" cy="60" rx="12" ry="12"/>
    <path ${CAT_A} d="M70 40 q30 20 60 0"/>`),
  bend: () => catFrame(`
    <path ${CAT_S} d="M40 86 H90 Q130 86 130 46 V28" stroke-width="8"/>
    <circle ${CAT_D} cx="40" cy="86" r="6"/>
    <circle ${CAT_D} cx="130" cy="28" r="6"/>`),
  pipes: () => catFrame(`
    <rect ${CAT_S} x="36" y="48" width="128" height="22" rx="11"/>
    <rect ${CAT_A} x="28" y="44" width="18" height="30" rx="3"/>
    <rect ${CAT_A} x="154" y="44" width="18" height="30" rx="3"/>
    <path ${CAT_G} d="M70 48 v-16 M130 48 v-16"/>`),
  strap: () => catFrame(`
    <rect ${CAT_A} x="36" y="50" width="128" height="16" rx="2"/>
    <rect ${CAT_S} x="78" y="42" width="28" height="32" rx="3"/>
    <circle ${CAT_D} cx="92" cy="58" r="4"/>`),
  glass: () => catFrame(`
    <path ${CAT_S} d="M36 86 L52 28 H160 L148 86 Z" fill="rgba(180,210,200,.18)"/>
    <path ${CAT_G} d="M36 86 L52 28 H160 L148 86 Z"/>
    <line ${CAT_G} x1="70" y1="86" x2="82" y2="28"/>`),
  sheet: () => catFrame(`
    <rect ${CAT_F} x="40" y="18" width="120" height="84" rx="2"/>
    <path ${CAT_A} d="M56 40 H144 M56 54 H130 M56 68 H144 M56 82 H110"/>`),
  mystery: () => catFrame(`
    <rect ${CAT_S} x="58" y="28" width="84" height="64" rx="4"/>
    <text class="sk-lab" x="100" y="66" text-anchor="middle">?</text>`),
  cover: () => catFrame(`
    <path ${CAT_S} d="M36 44 H164 L158 86 H42 Z"/>
    <path ${CAT_A} d="M48 36 H152 L148 44 H52 Z"/>
    ${[0, 1, 2, 3].map((i) => `<circle ${CAT_D} cx="${58 + i * 28}" cy="40" r="4"/>`).join("")}`),
  gasket: () => catFrame(`
    <path ${CAT_A} d="M40 42 H160 L154 82 H46 Z" fill="none" stroke-width="5"/>
    <path ${CAT_G} d="M52 50 H148 L144 74 H56 Z"/>
    ${[0, 1, 2, 3].map((i) => `<circle ${CAT_D} cx="${60 + i * 26}" cy="46" r="3"/>`).join("")}`),
  stat: () => catFrame(`
    <circle ${CAT_S} cx="100" cy="60" r="34"/>
    <circle ${CAT_F} cx="100" cy="60" r="18"/>
    <circle ${CAT_A} cx="100" cy="60" r="7"/>
    <path ${CAT_G} d="M100 42 v36 M82 60 h36"/>`),
  filter: () => catFrame(`
    <rect ${CAT_S} x="70" y="28" width="60" height="64" rx="18"/>
    <path ${CAT_G} d="M100 16 v12 M100 92 v12"/>
    <circle ${CAT_A} cx="100" cy="28" r="6"/>
    <circle ${CAT_A} cx="100" cy="92" r="6"/>
    <path ${CAT_G} d="M82 50 H118 M82 62 H118"/>`),
};

const CAT_KIND = {
  "poly-135": "bush",
  "sw-91008015": "bush",
  "sw-91008051": "heim",
  "mustang-rack": "bar",
  "napa-33813": "arm",
  "napa-10269": "ball",
  "napa-10390": "ball",
  "lower-wishbone": "arm",
  "upper-wishbone": "arm",
  "qa1-ur4855p": "coil",
  "qa1-b6031k": "bush",
  "trailing-bush": "bush",
  panhard: "bar",
  "wilwood-mc": "master",
  "jegs-rad": "rad",
  "gm-30": "engine",
  "valve-cover": "cover",
  "valve-cover-gasket": "gasket",
  "thermostat": "stat",
  "napa-37728": "slave",
  "gearbox-1442": "box",
  "driveshaft-1442": "shaft",
  "fluid-engine": "jug-oil",
  "fluid-gearbox": "jug-atf",
  "fluid-coolant": "jug-cool",
  "fluid-brake": "jug-brake",
  "fluid-clutch": "jug-clutch",
  "kinetic-body": "body",
  "loom-1442": "sheet",
  "fuse-91064004": "fuse",
  "strip-91064006": "strip",
  "ss-510": "taillamp",
  headlamps: "lamp",
  "horn-s10": "horn",
  "fan-motor": "fan",
  "flex-fan-110": "fan",
  "flex-fan-210": "fan",
  "loom-colors": "sheet",
  "gauges-drawn": "gauge",
  "led-blinkers": "lamp",
  "ss-carb-notes": "sheet",
  "residual-valves": "fitting",
  "prop-valve": "fitting",
  "side-exhaust-60": "pipes",
  "seats-upholstery": "sheet",
  tires: "tire",
  "wheel-adp": "plate",
  heims: "heim",
  "tie-rods": "tierod",
  "steer-shafts": "shaft",
  "an-lines": "hose",
  "wc-37625": "cyl",
  "caliper-front-rh": "caliper",
  "caliper-front-lh": "caliper",
  "spindle-459756": "arm",
  "brk-4131206": "gauge",
  "clutch-fork": "fork",
  "bucks-15530202": "mystery",
  "clutch-385": "clutch",
  "vbelt-257417": "belt",
  "seals-tim": "seal",
  "fuel-hardware": "hose",
  "fuel-filter": "filter",
  "fuel-hose": "hose",
  carb: "engine",
  "heater-hose": "hose",
  "rad-hose": "hose",
  "hose-elbow-90": "bend",
  "hose-elbow-45": "bend",
  "hose-splice": "fitting",
  "an12-spruce": "fitting",
  "tube-4130": "tube",
  "an8-bolts": "bolts",
  "huntsville-steel": "steel",
  por15: "paint",
  "weld-supply": "spool",
  "exhaust-bends": "bend",
  "patriot-pipes": "pipes",
  "hood-straps": "strap",
  "screen-glass": "glass",
};

/** where / when / order / item / price — invoice figures only */
const CAT_PLACES = {
  "poly-135": [
    { where: "Not a bought part", when: "On the upper wishbone CAD", order: "IMG_5795", item: "Handwritten 135 POLY .175 or TOP", price: "No price" },
  ],
  "sw-91008015": [
    { where: "Speedway Motors", when: "18 May 2008", order: "E299258 / 3593107", item: "4 BAR BUSH/SLEEVES FOR 1/2", price: "$24.99" },
  ],
  "sw-91008051": [
    { where: "Speedway Motors", when: "18 May 2008", order: "E299258 / 3593107", item: "Stainless 4-bar end RH ×5", price: "$14.99 ea · $74.95" },
    { where: "Speedway Motors", when: "18 May 2008", order: "same order", item: "Jam nuts 175-6046-RH, 6/pack", price: "$3.99" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896 / 3773204", item: "91008051-STR ×8", price: "$14.99 ea · $119.92" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91001156 stainless jam nut 5/8 RH ×10", price: "$2.99 ea · $29.90" },
  ],
  "mustang-rack": [
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896 / 3773204", item: "91034340-MAN manual Mustang II rack", price: "$129.99" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91034342-2 bolt kit", price: "$6.99" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91034341 mounting bushing ×2", price: "$8.99 ea · $17.98" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91002126 moly heim 5/8-18 ×2", price: "$20.99 ea · $41.98" },
  ],
  "napa-33813": [
    { where: "Burton Auto Supply, Trinity", when: "29 May 2008", order: "NAPA cash ticket", item: "UP CM ASSY", price: "net $47.61" },
  ],
  "napa-10269": [
    { where: "Burton Auto Supply, Trinity", when: "29 May 2008", order: "same ticket as 33813", item: "FRT BALL JNT", price: "net $15.33" },
  ],
  "napa-10390": [
    { where: "Burton Auto Supply, Trinity", when: "27 May 2008", order: "PO 55251", item: "MRC BALL JNT ×2", price: "net $24.09 ea · $48.18" },
  ],
  "lower-wishbone": [
    { where: "Built on chassis 1442", when: "Owner CAD, FINAL MOD", order: "IMG_5801", item: "1/4 in plate, not a purchased arm", price: "No arm price" },
  ],
  "upper-wishbone": [
    { where: "Built on chassis 1442", when: "Owner CAD", order: "IMG_5795", item: "1/4 in plate upper", price: "No arm price" },
  ],
  "qa1-ur4855p": [
    { where: "Speedway Motors", when: "5 Sep 2008", order: "E328813", item: "721485-225 QA1 12 in kit, 225 lb", price: "$399.99" },
    { where: "Speedway Motors", when: "5 Sep 2008", order: "E328813", item: "721485-300 QA1 12 in kit, 300 lb", price: "$399.99" },
    { where: "Speedway Motors", when: "6 Sep 2008", order: "3532414", item: "Shocks 721-4855 ×4, Carrera 25510225 and 25510325", price: "order $821.76" },
  ],
  "qa1-b6031k": [
    { where: "QA1 — named on the Ultra Ride sheet", when: "Not a separate invoice", order: "IMG_5761 / IMG_5847", item: "Eye rebuild kit, two-piece urethane", price: "No price in the folder" },
  ],
  "trailing-bush": [
    { where: "Not a bought bush", when: "On the trailing-rod CAD", order: "IMG_5799", item: "Width 1.06 in only. No brand.", price: "No price" },
  ],
  panhard: [
    { where: "Built on chassis 1442", when: "Dimensioned photo", order: "IMG_5802", item: "18.36 in ball to ball", price: "No bar price" },
  ],
  "wilwood-mc": [
    { where: "Speedway Motors", when: "1 Mar 2010", order: "E472885 / 3308961", item: "835-2607563 Wilwood 1 in tandem", price: "$121.99" },
  ],
  "flex-fan-110": [
    { where: "Peyton Performance, Waxahachie", when: "5 Nov 2026", order: "972-923-1699", item: "Flex-a-lite model 110, single puller. Bought. No receipt in the folder.", price: "Page listed $130.73" },
    { where: "JEGS confirmation, then removed", when: "2 Aug 2008", order: "3195204", item: "400-110 w/Adjustable Thermostat. Same model, never shipped.", price: "$141.99 deducted" },
    { where: "Not in the boxes", when: "3 Aug 2008", order: "098828080208", item: "Box 1 is fittings and the drain. Box 2 is the radiator.", price: "No fan shipped" },
  ],
  "flex-fan-210": [
    { where: "Instruction sheet only", when: "rev 05-02-08", order: "Form 99876", item: "Model 210 underlined. Dual puller, shroud 26-1/4 in wide. This radiator is 17 in wide.", price: "No price" },
  ],
  "jegs-rad": [
    { where: "JEGS", when: "3 Aug 2008", order: "098828080208, box 2", item: "055551962 aluminum radiator −12AN", price: "$299.99" },
    { where: "JEGS", when: "3 Aug 2008", order: "098828080208, box 1", item: "Filler 055553040, fittings 055553082 ×2, drain 071063700", price: "box $119.20" },
  ],
  "gm-30": [
    { where: "Buck's Engines, Lubbock", when: "23 Oct 2007 note", order: "IMG_5809", item: "VORTEC 3.0 LITER. Flywheel handwritten 270.00. No engine total.", price: "No engine total" },
    { where: "Buck's Engines", when: "21 Mar 2008", order: "P015582B", item: "Pilot 3914000 and T/O 614018", price: "$3.00 and $15.50" },
    { where: "AutoStar / Reliable, Huntsville", when: "26 Mar 2008", order: "REF 0000202137", item: "AWS 04-065 clutch kit", price: "cost $103.39" },
    { where: "AutoStar / Reliable", when: "26 Mar 2008", order: "same ticket", item: "MTM 140052 flywheel bolts", price: "cost $5.69" },
    { where: "eBasicPower", when: "9 Mar 2010", order: "82085", item: "OSCM04-GH $7.00 and DET59565AS $30.95. Old set. Not the new valve-cover gasket.", price: "order $50.95" },
  ],
  "valve-cover": [
    { where: "Read on the car", when: "12 Nov 2026", order: "keep cover", item: "Keeping this cover. Not cracked. 8M0122491 steel will not replace this cast lid. Not on AutoZone / O’Reilly / Advance / NAPA Rayford shelves.", price: "No price" },
    { where: "Eagle Engine Sales", when: "9 Nov 2026", order: "8M0122491 analog", item: "New 181 / 3.0L steel cover. Also 3853784 / GM 02770089. Not chrome.", price: "Page $65.00", url: "https://www.eagleenginesales.com/product-page/3-0l-181-cid-valve-rocker-cover-mercruiser-8m0122491-volvo-penta-3853784-3", link: "Eagle Engine Sales listing" },
    { where: "Wholesale Marine", when: "8 Nov 2026", order: "8M0122491", item: "Need new. Mercury OEM stamped steel. Special order. Not the head.", price: "Page $115.49", url: "https://www.wholesalemarine.com/mercury-mercruiser-8m0122491-valve-cover/", link: "Wholesale Marine listing" },
    { where: "MarineEngine.com", when: "9 Nov 2026", order: "8M0122491", item: "Quicksilver current. Same OEM steel cover.", price: "Page $130.99", url: "https://www.marineengine.com/newparts/part_details.php?pnum=MER8M0122491", link: "MarineEngine listing" },
    { where: "eBasicPower", when: "9 Nov 2026", order: "QSTVC4CYL", item: "Steel cover, GM inline 4 153/181. Will not replace cast aluminum with shift linkage. Limited availability.", price: "Page $129.95", url: "https://bpi.ebasicpower.com/shop/all-applications/engine-system/tinware/valve-covers/valve-cover-for-gm-inline-4-cylinder-mercruiser-omc-volvo-penta", link: "eBasicPower listing" },
    { where: "Repower Marine", when: "8 Nov 2026", order: "8M0122491", item: "New GM steel rocker cover, same 3.0L four. UK.", price: "Page £125.00", url: "https://repowermarine.com/new-steel-rocker-valve-cover-for-3-0l-four-cylinder.html", link: "Repower Marine listing" },
  ],
  "valve-cover-gasket": [
    { where: "Read on the car", when: "12 Nov 2026", order: "gasket sealed", item: "Rear weep stopped the same night. Fel-Pro 17900. Cover kept. Next: nibble C toward 900–1100. A stays 2 turns. 3 psi.", price: "No price" },
    { where: "Read on the car", when: "12 Nov 2026", order: "rear weep", item: "Fel-Pro 17900 still weeps oil at the back of the cover only. Front rail dry. Cover kept. Idle held at 1.5k / 2 turns / 3 psi.", price: "No price" },
    { where: "O'Reilly 107 Rayford", when: "12 Nov 2026", order: "17900", item: "Fel-Pro Marine 17900 cork-rubber. Same 153/181 fit as Sierra 18-0347 / GM 14096154. On the car tonight. 11 Nov gasket was not bad — extra precaution. Cover kept. RTV layer on the cover flange and edges. No receipt.", price: "No receipt", url: "https://www.napaonline.com/en/p/FPG17900", link: "NAPA FPG17900 listing" },
    { where: "Read on the car", when: "11 Nov 2026", order: "first gasket", item: "Cork on dry at about 40 in-lb (book is 40 in-lb, not 40 ft-lb). Ran about a minute at 1.5k / 3 psi, then the rail wept. Cover is still good. No red thread locker.", price: "No price" },
    { where: "NAPA", when: "9 Nov 2026", order: "SME180347", item: "Found. Sierra 18-0347 valve cover gasket, GM 153 and 181 CID (2.5L and 3.0L). NAPA Small Engine.", price: "No receipt", url: "https://www.napaonline.com/en/p/SME180347", link: "NAPA listing" },
    { where: "Read on the car", when: "10 Nov 2026", order: "leaking", item: "Old valve cover gasket leaking oil and a little smoke. Stopped the run. New gasket due 11 Nov 2026. Do not run it until that is on.", price: "No price" },
    { where: "Marine Engine Depot", when: "8 Nov 2026", order: "801096", item: "Authentic GM 14096154 for the 181 / 3.0L valve cover.", price: "Page $30.39", url: "https://marineenginedepot.com/gasket-181-30l-valve-cover-authentic-gm", link: "Marine Engine Depot listing" },
    { where: "eBasicPower, already bought", when: "9 Mar 2010", order: "82085", item: "DET59565AS 2.5/3.0L set $30.95. Old set. Not this dedicated gasket.", price: "$30.95 on that order" },
  ],
  "thermostat": [
    { where: "Read on the car", when: "10 Nov 2026", order: "cleaned / waiting gasket", item: "Housing pulled off the block. Corrosion came off. Keeping this casting. Waiting on Sierra 18-0164-9. Lid gasket 18-2831 already on hand. 18-1910 not bought.", price: "No price" },
    { where: "AutoZone", when: "10 Nov 2026", order: "18-0164-9", item: "Body-to-block gasket, 2-pack of 18-0164. Mercury 27-8146801. SKU 1064979. Waiting. Not bought until a receipt.", price: "No receipt", url: "https://www.autozone.com/p/sierra-marine-engine-coolant-thermostat-housing-gasket-18-0164-9/1064979", link: "AutoZone listing" },
    { where: "Read on the car", when: "9 Nov 2026", order: "open / corroded", item: "Housing opened. No thermostat. Inside corroded. Marine 181 in the Locost. Same coolant in the iron jackets — scale likely, not a dead block. Clean first. Flush and look. Neck must take 26502.", price: "No price" },
    { where: "MarineEngine.com", when: "9 Nov 2026", order: "861493A07", item: "Mercury kit: lower body + top cover. Backup if the old casting is pitted through. Photo is the lower only.", price: "Page $193.49", url: "https://www.marineengine.com/newparts/part_details.php?pnum=MER861493A07", link: "MarineEngine listing" },
    { where: "Sierra / Camping World", when: "9 Nov 2026", order: "18-1910", item: "Aftermarket kit for 861493A07. Sierra catalog replaces both 47587 (lower) and 60372 (cover). Not 18-1993 (that is V8).", price: "Page $122.29", url: "https://www.campingworld.com/sierra-thermostat-housing-kit-for-mercury-marine-engine-sierra-part-%2318-1910-324958.html", link: "Camping World listing" },
    { where: "Barr / Palmer Power", when: "9 Nov 2026", order: "MC-29-47587", item: "Lower housing only — the body in the kit photo. Bolts to the block. Gasket 18-0164. ~$74.", price: "Page $74.00", url: "https://palmerpower.com/barr-mc-29-47587-mercruiser-lower-thermostat-housing/", link: "Palmer Power listing" },
    { where: "Barr / Hardin Marine", when: "9 Nov 2026", order: "MC-29-60372", item: "Top cover only, the lid not in the 861493A07 photo. Sierra 18-1969. Mercury 60372A2, superseded to the kit.", price: "Page $40.99", url: "https://www.hardin-marine.com/p-113746-mercruiser-4-and-6-cylinder-upper-thermostat-housing.aspx", link: "Hardin Marine listing" },
    { where: "Sierra", when: "9 Nov 2026", order: "18-0164", item: "Housing-to-block gasket. Mercury 27-8146801. Same gasket as AutoZone 18-0164-9. Needed to put this cleaned housing back on.", price: "Page $1.99", url: "https://www.macombmarineparts.com/products/gasket-thermostat-housing-sierra-18-0164", link: "Macomb Marine listing" },
    { where: "NAPA", when: "9 Nov 2026", order: "SME183650", item: "Marine 140° analog. Not in this housing. Not the lock.", price: "No receipt", url: "https://www.napaonline.com/en/p/SME183650", link: "NAPA listing" },
    { where: "Marine Engine Depot", when: "9 Nov 2026", order: "18-70931", item: "Molded hose, circulating pump to thermostat housing. Mercury 32-96879. Marine. Not the 26502 radiator hose.", price: "Page $37.99", url: "https://marineenginedepot.com/hose-30l181ci-circulating-water-pump-to-thermostat-housing", link: "Marine Engine Depot listing" },
    { where: "NAPA stat only", when: "9 Nov 2026", order: "SME183550", item: "Sierra 18-3550, 140°F, Mercury 59078. Inside the kit. Not the buy-list line.", price: "No receipt", url: "https://www.napaonline.com/en/p/SME183550", link: "NAPA listing" },
    { where: "NAPA 160° closed", when: "9 Nov 2026", order: "SME183649", item: "Sierra 18-3649, 160°F fresh-water / closed cooling. Mercury 8072522. Not the 140° kit.", price: "No receipt", url: "https://www.napaonline.com/en/p/SME183649", link: "NAPA listing" },
    { where: "WINCO / PSI sheet", when: "8 Nov 2026", order: "Z33001814", item: "Industrial number on the GM 3.0L sheet. Opening temp is not printed. No catalog cross to 18-3650.", price: "No receipt" },
  ],
  "napa-37728": [
    { where: "Burton Auto Supply, Trinity", when: "29 May 2008", order: "page 2 of the $213.99 ticket", item: "UP CLU SLAV", price: "net $32.57" },
  ],
  "gearbox-1442": [
    { where: "No vendor in the folder", when: "CAD label only", order: "IMG_5797", item: "TRANSMISSION REAR FLANGE. S10 5-speed was a candidate, not a receipt.", price: "No price" },
  ],
  "driveshaft-1442": [
    { where: "Northwest Drivetrain, Houston", when: "Shop note, no invoice", order: "713-937-8499", item: "11432 FM 529. Ride length ~27.25 in.", price: "No shaft price" },
  ],
  "fluid-engine": [{ where: "No oil purchase", when: "—", order: "—", item: "Grade and capacity are not on a ticket", price: "No price" }],
  "fluid-gearbox": [{ where: "No gearbox-oil purchase", when: "—", order: "—", item: "No ATF or gear oil on a ticket", price: "No price" }],
  "fluid-coolant": [{ where: "No coolant purchase", when: "—", order: "—", item: "Radiator was bought. Coolant was not.", price: "No price" }],
  "fluid-brake": [{ where: "No brake-fluid purchase", when: "—", order: "—", item: "Wilwood master was bought. DOT grade was not.", price: "No price" }],
  "fluid-clutch": [{ where: "No clutch-fluid purchase", when: "—", order: "—", item: "Slave 37728 was bought. Fluid was not.", price: "No price" }],
  "kinetic-body": [
    { where: "Kinetic Vehicles, Creswell OR", when: "5 Jun 2008", order: "Invoice 91", item: "bf01s TTL nose $189, bf04s superscuttle $189", price: "order $459.16" },
    { where: "Kinetic Vehicles", when: "Sold 2 Feb 2011, shipped 13 May 2011", order: "Invoice 406", item: "bf05s ×2 $240, bf05f ×2 $60, bw01n $150 + $10", price: "order $535.09" },
  ],
  "loom-1442": [
    { where: "Builder drawing", when: "In the L7 folder", order: "IMG_5759", item: "Not a purchased harness", price: "No price" },
  ],
  "fuse-91064004": [
    { where: "Speedway Motors", when: "12 Apr 2010", order: "E490308 / 3001472", item: "7 FUSE BLOCK", price: "$9.99" },
  ],
  "strip-91064006": [
    { where: "Speedway Motors", when: "12 Apr 2010", order: "E490308 / 3001472", item: "8 TERMINAL STRIP ×2", price: "$4.99 ea · $9.98" },
  ],
  "ss-510": [
    { where: "Irving Levine Automotive", when: "16 Feb 2011", order: "04-647641", item: "SS 510 tail lamp ×2", price: "$46.99 ea · order $103.93" },
  ],
  headlamps: [
    { where: "Demon's Cycle, Pompano Beach", when: "10 Feb 2011", order: "12082739", item: "Bobber chrome headlight with visor ×2, listed Harley-Davidson", price: "$38.99 ea · $77.98" },
  ],
  "led-blinkers": [
    { where: "Demon's Cycle, Pompano Beach", when: "10 Feb 2011", order: "12082739", item: "Mini motorcycle LED blinkers, amber diamond, qty 1 line", price: "$23.99 · invoice $101.97" },
  ],
  "loom-colors": [
    { where: "Builder sheets", when: "In the L7-1 set", order: "IMG_5943 / IMG_5951", item: "Handwritten colors and a typed TS-1 / TS-2 list. They do not match letter for letter.", price: "No price" },
  ],
  "gauges-drawn": [
    { where: "Builder drawing", when: "IMG_5952", order: "No brand", item: "Voltage, water temp, oil pressure, gas, tach", price: "No price" },
  ],
  "ss-carb-notes": [
    { where: "Printout IMG_5936", when: "11 Nov 2009 / re-read 10 Nov 2026", order: "screw map", item: "1 Idle Speed Screw. 2 Idle Mixture Screw. 3 Accelerator Pump Adjustment Screw. 4 Enrichment Device. Two carbs — same turns on both.", price: "No price" },
    { where: "Printout IMG_5937", when: "11 Nov 2009 / re-read 10 Nov 2026", order: "R SIDE page", item: "Labels #7 Fuel Inlet (brass barb on the bowl), #6 Overflow, #8 Bowl Vent, #9 Bowl Plug. Baseline: mixture 1-1/4 out, idle speed 1/2 turn from catch, accel 2 turns out.", price: "No price" },
    { where: "Printout IMG_5949", when: "11 Nov 2009 / 9 Nov 2026", order: "S&S parts page", item: "Circled needle 11-2195, seat 11-2465, o-ring 50-8009. Float 11-2187. Fuel line 19-0475.", price: "No price" },
  ],
  "horn-s10": [
    { where: "1988 S10 reference sheet", when: "Printed 13 Oct 2009", order: "IMG_5818", item: "Horn circuit diagram, not a horn purchase", price: "No price" },
  ],
  "fan-motor": [
    { where: "Labeled on the loom", when: "No motor invoice", order: "IMG_5759", item: "Fan feed on the engine block of the sheet. 400-110 was deducted.", price: "No separate motor price" },
  ],
  tires: [
    { where: "Size on the geometry sheet", when: "No tire invoice", order: "IMG_5803", item: "P205/75R14. A later size lives in the workshop log if you wrote one.", price: "No price" },
  ],
  "wheel-adp": [
    { where: "ezAccessory.com", when: "19 May 2008", order: "25124", item: "54755-54775 pair, 2 in, 12×1.5, S10 4.75", price: "$84.95 · order $99.63" },
  ],
  heims: [
    { where: "Speedway Motors", when: "1 Mar 2010", order: "E472885 / 3308961", item: "117-0720 ×1 and 175-0200 ×4", price: "$7.99 and $15.96" },
    { where: "Speedway Motors", when: "12 Apr 2010", order: "E490308 / 3001472", item: "175-0203 ×2, 175-0200 ×2, 175-0100 ×2", price: "$3.99 ea" },
  ],
  "tie-rods": [
    { where: "Auto Extra / Reliable, Huntsville", when: "20 Apr 2009", order: "REF 0000251632", item: "MET AXE52033RLT ×2, printed 1989 Chevy C/K", price: "cost $9.75 ea · pay $21.11" },
  ],
  "steer-shafts": [
    { where: "United Machine Works, New Waverly", when: "20 Apr 2009", order: "17299 / shipment 14401", item: "Two steering shafts modified", price: "$150.00 cash" },
  ],
  "spindle-459756": [
    { where: "On the knuckles — S10 donor", when: "Not on a receipt", order: "459756 right · 459755 left", item: "Casting numbers read on the spindles. G-body / 2WD S10 family. Not a caliper.", price: "No price" },
  ],
  "an-lines": [
    { where: "Speedway Motors", when: "4 May 2010", order: "E499097", item: "Brake line, AN3/AN4 fittings, switch 91031305, cap 6175021, fuel line 91011429-10", price: "order $255.84" },
    { where: "Speedway Motors", when: "14 May 2010", order: "E502605", item: "18 in AN3 line, clamps, 90° bulkhead", price: "order $50.98" },
    { where: "Speedway Motors", when: "12 May 2010", order: "3436674 exchange", item: "617-2770 ×2 and 617-2911 banjo", price: "pay $21.41" },
  ],
  "wc-37625": [
    { where: "Burton Auto Supply, Trinity", when: "27 May 2008", order: "PO 55251", item: "WC ASSY ×2", price: "net $5.90 ea · $11.80" },
  ],
  "residual-valves": [
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91031347 residual valve, 10 psi", price: "$14.99" },
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91031345 residual valve, 2 psi", price: "$14.99" },
  ],
  "prop-valve": [
    { where: "Speedway Motors", when: "8 Jun 2008", order: "E304896", item: "91031355 knob proportioning valve", price: "$32.99" },
  ],
  "brk-4131206": [
    { where: "Burton Auto Supply, Trinity", when: "13 May 2010", order: "cash ticket", item: "413-1206 brake line ×2", price: "net $4.89 ea · $9.78" },
    { where: "Burton Auto Supply, Trinity", when: "13 May 2010", order: "same ticket", item: "HR-1 gauge", price: "net $13.93 · ticket $25.73" },
  ],
  "caliper-front-rh": [
    { where: "On the car — S10 donor", when: "Not on a receipt", order: "GM 19141004", item: "Front passenger, right. ACDelco 18FR755. One piston. Bracket not included.", price: "No price" },
  ],
  "caliper-front-lh": [
    { where: "On the car — S10 donor", when: "Not on a receipt", order: "GM 19141005", item: "Front driver, left. ACDelco 18FR756. One piston. Mate to 19141004.", price: "No price" },
  ],
  "clutch-fork": [
    { where: "Buck's Engines, Lubbock", when: "21 Mar 2008", order: "P015582B", item: "15592270 clutch fork", price: "$10.00" },
    { where: "Buck's Engines, Lubbock", when: "21 Mar 2008", order: "P015582B", item: "15592268 ball stud", price: "$7.00" },
  ],
  "bucks-15530202": [
    { where: "Buck's Engines, Lubbock", when: "21 Mar 2008", order: "P015582B", item: "Printed description IRRIGATION", price: "$219.83" },
  ],
  "clutch-385": [
    { where: "Burton Auto Supply, Trinity", when: "29 May 2008", order: "page 2 with the slave", item: "CLU REP KIT ×2", price: "net $5.50 ea · $11.00" },
  ],
  "vbelt-257417": [
    { where: "Burton Auto Supply, Trinity", when: "28 Mar 2008", order: "~902206", item: "25-7417 V-belt", price: "net $12.93 · ticket $21.25" },
  ],
  "seals-tim": [
    { where: "AutoStar / Reliable", when: "27 Mar 2008", order: "REF 0000202239", item: "TIM 96138 and TIM 7412S", price: "pay $10.15" },
    { where: "AutoStar / Reliable", when: "27 Mar 2008", order: "REF 0000202238", item: "TIM 21043 and TIM 6510", price: "pay $21.30" },
  ],
  "fuel-hardware": [
    { where: "Burton Auto Supply, Trinity", when: "30 Dec 2010", order: "cash ticket", item: "H-176 ×5, hose end 05705B-C02, CL1 ×4, choke 732-1153", price: "ticket $34.12" },
    { where: "Speedway Motors", when: "4 May 2010", order: "E499097", item: "1/4 in aluminum fuel line 91011429-10 and cap 6175021", price: "$8.99 and $24.99" },
  ],
  carb: [
    { where: "Read on the car", when: "9 Nov 2026", order: "2× S&S", item: "Two S&S carbs, custom on the 181. Floods after a few minutes, idle dies. Look for E or G cast on each body.", price: "No price" },
    { where: "Read on the car", when: "10 Nov 2026", order: "mechanical pump", item: "Previous owner took the electric pump off. Engine-driven mechanical pump, not a hand lever. No SKU on a ticket.", price: "No price" },
    { where: "Read on the car", when: "10 Nov 2026", order: "one line, then tee", item: "One fuel line splits into two right at the carbs. Regulator goes on that single line after the filter, before the tee.", price: "No price" },
    { where: "Read on the car", when: "12 Nov 2026", order: "A to 2 turns", item: "Cold, 3 psi, B up, died with pops at 1-3/4. Out 1/4 on both to 2 turns. Fired, held 1.5k, one crack then ran. 4 psi plus reseated plugs was last night’s no-start wake-up, not tonight. Do not open C.", price: "No price" },
    { where: "Read on the car", when: "12 Nov 2026", order: "3 psi hold", item: "2 psi starved the bowls. 4 psi started it. Running 3 psi. Held about 1.5k at 1-3/4 mixture. Exhaust crack was lean. Do not open C to hide it. Then lower idle toward 900–1100.", price: "No price" },
    { where: "Read on the car", when: "10 Nov 2026", order: "tune both", item: "Idle held at about 1.5k on 1-3/4 mixture with the choke down. In is leaner, out is richer. 2k with the speed screw cracked hides a lean idle. Valve cover gasket leaking — due 11 Nov 2026. Then lower idle toward 900–1100.", price: "No price" },
    { where: "Folder print IMG_5937", when: "10 Nov 2026", order: "#7 Fuel Inlet", item: "Brass barb on the float bowl. Hose clamps on. Do not open the carb to measure pressure.", price: "No price" },
    { where: "Holley", when: "9 Nov 2026", order: "12-804", item: "Easy first fix if running pressure is high. 1–4 psi, two outlets, one per carb. Preset 2.8, turn down toward 1.5–2. Inlet limit 7 psi. Mechanical carb pumps are usually in that band. Not bought.", price: "Page $51.95", url: "https://www.holley.com/products/fuel_systems/fuel_pumps_regulators_and_filters/regulators/carbureted_regulators/parts/12-804", link: "Holley listing" },
    { where: "S&S / Autoplicity", when: "9 Nov 2026", order: "11-2195", item: "Float needle, Super E and G. Circled on IMG_5949. Need two.", price: "Page $19.95", url: "https://autoplicity.com/8595253-ss-cycle-float-needle", link: "Autoplicity listing" },
    { where: "S&S Cycle", when: "9 Nov 2026", order: "11-2465", item: ".160 in inlet seat, Super E and G. Circled on IMG_5949. Need two.", price: "Page $18.95", url: "https://www.sscycle.com/shop-by-products/replacement-parts/carburetor-replacement-parts/", link: "S&S listing" },
    { where: "S&S Cycle", when: "10 Nov 2026", order: "50-8009", item: "Seat/bowl plug o-ring. Also circled on IMG_5949. Replace when the seat comes out.", price: "No receipt" },
    { where: "Aardvark Cycle", when: "9 Nov 2026", order: "11-2187", item: "S&S Super E/G float. Shake both. Replace if it sloshes.", price: "Page $26.95", url: "https://www.aardvarkcycle.com/store/sscycle-carb-parts.html", link: "Aardvark listing" },
    { where: "Burton Auto Supply, Trinity", when: "30 Dec 2010", order: "732-1153", item: "Choke kit on the fuel ticket. Application not printed. Super E/G use an enrichment lever, not a choke.", price: "net $19.29" },
  ],
  "fuel-filter": [
    { where: "O'Reilly", when: "9 Nov 2026", order: "33003", item: "Buy list. Wix in-line fuel filter, 3/8 in both ends. Read on the car. Not bought.", price: "No receipt", url: "https://www.oreillyauto.com/detail/c/wix/wix-fuel-filter/wix0/33003", link: "O'Reilly listing" },
    { where: "Wix catalog", when: "9 Nov 2026", order: "33003", item: "Plastic in-line, cellulose 20 micron. NAPA Gold 3003. Metal version is 33033.", price: "No receipt", url: "https://m.wixfilters.com/Search/PartDetail?PartID=47940", link: "Wix listing" },
  ],
  "fuel-hose": [
    { where: "NAPA", when: "9 Nov 2026", order: "H350A", item: "3/8 Barricade MPI, priced per foot. Buy 1 ft, cut two ~4 in stubs for the Wix 33003. Not bought.", price: "No receipt", url: "https://www.napaonline.com/en/p/NBHH350A", link: "NAPA listing" },
    { where: "NAPA 5/16", when: "9 Nov 2026", order: "H-176", item: "Already bought 30 Dec 2010 ×5. Catalog is 5/16 in.", price: "net $1.29 on that ticket", url: "https://www.napaonline.com/en/p/NBHH176", link: "NAPA listing" },
    { where: "O'Reilly", when: "9 Nov 2026", order: "28594", item: "Gates 5/16–3/8 nylon reducer. Joins 3/8 stubs to 5/16 hose. Need two.", price: "No receipt", url: "https://www.oreillyauto.com/detail/c/gates/gates-5-16-3-8-inch-hose-connector/gat0/28594", link: "O'Reilly listing" },
    { where: "Counter cut", when: "9 Nov 2026", order: "27004 / H-177", item: "Gates Safety Stripe / NAPA H-177 3/8 reel. Ask for 1 ft if they cut. 2 ft H-172 pegboard is more than needed.", price: "No receipt", url: "https://www.oreillyauto.com/detail/c/safety-stripe/gates-safety-stripe-fuel-hose/gats/27004", link: "O'Reilly listing" },
  ],
  "heater-hose": [
    { where: "Auto Plus / Reliable", when: "23 Jun 2011", order: "REF 0000403749", item: "GAT 28432 ×2, TDL 5216 ×2, MTM terminals", price: "pay $10.11" },
  ],
  "rad-hose": [
    { where: "O'Reilly", when: "8 Nov 2026", order: "26502", item: "Official. Gates Green Stripe Vulco-Flex, 1-3/4 in both ends × 16-1/2 in. Perfect match. Other lengths: 26601 6, 26602 8-1/2, 26603 11, 26501 13-1/2, 26611 19, 26612 23-1/2.", price: "No receipt", url: "https://www.oreillyauto.com/detail/c/green-stripe-vulco-flex/gates-green-stripe-vulco-flex-coolant-hose/gaa7/26502", link: "O'Reilly listing" },
  ],
  "hose-elbow-90": [
    { where: "JEGS", when: "7 Nov 2026", order: "555-511176", item: "Aluminum 90, 1-1/2 in OD, 3-1/4 in legs. Page $19.99.", price: "No receipt", url: "https://www.jegs.com/i/jegs-555-511176-aluminum-radiator-hose-connector-90-degree-elbow-1-1-2-in-o-d-inlet-outlet", link: "JEGS listing" },
    { where: "Amazon", when: "7 Nov 2026", order: "B07HBBSTQS", item: "Same JEGS 555-511176.", price: "No receipt", url: "https://www.amazon.com/JEGS-511176-Radiator-Hose-Connector/dp/B07HBBSTQS", link: "Amazon listing" },
    { where: "Speedway", when: "7 Nov 2026", order: "32-1001-1.50", item: "Aluminum 90, 1-1/2 in OD, beaded, can be cut. Page $23.99. Amazon B01N6V6DWP.", price: "No receipt", url: "https://www.speedwaymotors.com/Aluminum-90-Degree-Radiator-Hose-Connectors,49595.html", link: "Speedway listing" },
    { where: "JEGS 1-1/4", when: "7 Nov 2026", order: "555-511175", item: "Aluminum 90, 1-1/4 in OD, 3 in legs. Amazon B07HB8BCPC.", price: "No receipt", url: "https://www.jegs.com/i/jegs-555-511175-aluminum-radiator-hose-connector-90-degree-elbow-1-1-4-in-o-d-inlet-outlet", link: "JEGS listing" },
    { where: "Amazon stainless", when: "7 Nov 2026", order: "D150A90SS", item: "304 stainless 90, 1-1/2 in OD, beaded, about 11.5 in long. Filler Neck Supply.", price: "No receipt", url: "https://www.amazon.com/Filler-Neck-Supply-D150A90SS-Stainless/dp/B01EM3S5DY", link: "Amazon listing" },
  ],
  "hose-elbow-45": [
    { where: "JEGS", when: "7 Nov 2026", order: "555-511181", item: "Aluminized steel 45, 1-1/2 in OD, legs 7 in and 3-3/4 in. Not aluminum. Page $21.99.", price: "No receipt", url: "https://www.jegs.com/i/jegs-555-511181-aluminized-steel-radiator-hose-connector-45-degree-elbow-1-1-2-in-o-d-inlet-outlet", link: "JEGS listing" },
    { where: "Amazon", when: "7 Nov 2026", order: "B00CO6NNVG", item: "Same JEGS 555-511181.", price: "No receipt", url: "https://www.amazon.com/JEGS-511181-Radiator-Hose-Connector/dp/B00CO6NNVG", link: "Amazon listing" },
  ],
  "hose-splice": [
    { where: "JEGS", when: "7 Nov 2026", order: "555-511171", item: "Aluminum straight, 1-1/2 in OD × 3 in. Page $5.99.", price: "No receipt", url: "https://www.jegs.com/i/jegs-555-511171-aluminum-radiator-hose-connector-3-in-straight-length-1-1-2-in-o-d-inlet-outlet", link: "JEGS listing" },
    { where: "JEGS 1-1/4", when: "7 Nov 2026", order: "555-511170", item: "Aluminum straight, 1-1/4 in OD × 3 in. Page $5.99.", price: "No receipt", url: "https://www.jegs.com/i/jegs-555-511170-aluminum-radiator-hose-connector-3-in-straight-length-1-1-4-in-o-d-inlet-outlet", link: "JEGS listing" },
    { where: "Speedway", when: "7 Nov 2026", order: "9108251", item: "Aluminum 1.50 OD × 6 in, beaded, pair. Page $27.99.", price: "No receipt", url: "https://www.speedwaymotors.com/Aluminum-Radiator-Hose-Connector-1-50-O-D-6-Length-2-PK,400048.html", link: "Speedway listing" },
  ],
  "an12-spruce": [
    { where: "Aircraft Spruce", when: "11 May 2009", order: "701046 / 777986", item: "AN833-12D $15.75, AN821-12D $9.30, AN924-12D $3.35, washers $0.70", price: "shipped $31.46" },
  ],
  "tube-4130": [
    { where: "Aircraft Spruce", when: "21 Jun 2008", order: "360663", item: "03-06000-4 4130 7/8×.188 ×4 ft ×5", price: "$150.00 · HW $169.90" },
    { where: "Aircraft Spruce", when: "10 Feb 2011", order: "326472", item: "03-01500-4 4130 3/8×.065 ×4 ft ×5", price: "$60.00" },
    { where: "Aircraft Spruce", when: "21 Jun 2008", order: "360784", item: "03-34510 aluminum sheet .050 ×2", price: "$279.90" },
  ],
  "an8-bolts": [
    { where: "Aircraft Spruce", when: "23 May 2008", order: "819998", item: "20 nuts, 2 AN8-25A, 40 washers", price: "paid $48.39" },
    { where: "Aircraft Spruce", when: "27 May 2008", order: "475025 backorder", item: "18 AN8-25A", price: "$34.92" },
    { where: "Aircraft Spruce", when: "4 Mar 2010", order: "709785", item: "10 nuts and 10 AN8-25A", price: "paid $46.15" },
  ],
  "huntsville-steel": [
    { where: "Huntsville Steel", when: "3 Dec 2007", order: "1322968", item: "1×1×16 ga ×336 ft and 1×1×14 ga ×144 ft", price: "$264.48" },
    { where: "Huntsville Steel", when: "1 Nov 2007", order: "1322661", item: "Cold-roll, rec tubing, flat", price: "$73.30" },
    { where: "Huntsville Steel", when: "4 Jan 2008", order: "1323276", item: "1-1/2 angle, flat, 3/4 black pipe", price: "$69.50" },
    { where: "Huntsville Steel", when: "20 Jun 2008", order: "1325050", item: "1-3/4×14 ga tube and 1/2×3 flat", price: "$52.56" },
    { where: "Huntsville Steel", when: "27 Jun 2008", order: "1325106", item: "Sheet metal ×2", price: "$124.06" },
  ],
  por15: [
    { where: "POR-15", when: "17 Feb 2010", order: "3319347 / 230480A", item: "1GB black $143, MRQ $16.50, SVQ ×2 $23.50", price: "order $195.75" },
  ],
  "weld-supply": [
    { where: "AOC Welding Supply, Huntsville", when: "18 May 2010", order: "345405", item: "4043 aluminum, ER70S-6, cutoff wheels, Weiler discs", price: "$69.61" },
  ],
  "exhaust-bends": [
    { where: "Speedway Motors", when: "21 Jun 2008", order: "E3082433", item: "91013670 1-1/2 in ×4 @ $12.99", price: "$51.96" },
    { where: "Speedway Motors", when: "21 Jun 2008", order: "E3082433", item: "91013874 2 in ×1. “NO.” is written on the 1-1/2 in line.", price: "$14.99 · order $81.78" },
  ],
  "patriot-pipes": [
    { where: "Patriot Exhaust — instruction sheet only", when: "Sheet dated 07/04", order: "IMG_5826", item: "No kit number and no invoice in the folder", price: "No price" },
  ],
  "side-exhaust-60": [
    { where: "Speedway Motors", when: "2 Aug 2008", order: "E318856 / 3259516", item: "91013460 chrome side exhaust, 60 in", price: "$172.99 · ship $31 · total $203.99" },
  ],
  "seats-upholstery": [
    { where: "The Upholstery Room, Huntsville", when: "23 Feb 2011", order: "Handwritten invoice", item: "2 seats, labor and padding. Wave / Solar Fleece, black.", price: "$525 · tax $43.31 · $568.31. Deposit $200, balance $368.31" },
  ],
  "hood-straps": [
    { where: "Hot Rod Leather, Novato", when: "14 Feb 2011", order: "16902", item: "DFHS-4 $249 and BP-4 pads $20", price: "order $287.35" },
    { where: "Hot Rod Leather, Novato", when: "8 Mar 2011", order: "16921", item: "SSGL-4 guide loops", price: "$12 · order $17" },
  ],
  "screen-glass": [
    { where: "Able Glass, Huntsville", when: "29 Jun 2011", order: "W/O 05157111", item: "15-1/2 × 37-1/2, 1/4 green lami", price: "$89.65 · $97.05 with tax" },
  ],
};

window.catalogSketch = function catalogSketch(id) {
  const kind = CAT_KIND[id] || "sheet";
  const url = window.PART_PHOTOS && window.PART_PHOTOS[kind];
  if (url) return `<img class="part-photo" alt="" data-model="${kind}" src="${url}" />`;
  const key = CAT_DRAW[kind] ? kind : kind.startsWith("jug") ? "jug" : "sheet";
  return (CAT_DRAW[key] || CAT_DRAW.sheet)();
};

window.catalogPlaces = function catalogPlaces(id) {
  return CAT_PLACES[id] || [{ where: "Not on a receipt", when: "", order: "", item: "", price: "No price" }];
};
