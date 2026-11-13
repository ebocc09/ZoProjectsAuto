/* Open jobs for chassis 1442. Facts about parts come from the paperwork.
   What the car is doing now comes from the bench. */
const ZO_PROJECTS = [
  {
    id: "carb-flood",
    title: "Carb floods",
    status: "open",
    system: "engine",
    summary:
      "Idle held about 1.5k at 1-3/4 mixture, regulator 3 psi. First cover gasket (11 Nov) wept, so a Fel-Pro 17900 cork-rubber is going on 12 Nov. Then lower idle toward 900–1100.",
    why: [
      {
        title: "Harley carbs on a mechanical pump",
        body: "S&S Super E/G are shorty Harley carbs. They were built for a petcock. Enzo 10 Nov 2026: previous owner took the electric pump off. The car is on a mechanical pump — cam-driven by the engine, not a hand lever. A typical carb mechanical pump is still 4–7 psi. These needles want about 1.5–2. Taking the electric off does not fix the flood by itself. That delay — drives, then spills — is pressure rising with rpm, or a float taking on fuel."
      },
      {
        title: "Needle and seat — already circled",
        body: "The folder Super E/G page circled needle 11-2195 and seat 11-2465. Those are the Super E and G pair. Need two of each. R SIDE on one print is the right carb."
      },
      {
        title: "Float taking on fuel",
        body: "S&S float is 11-2187. Shake both. If it sloshes, it is done. S&S sheet: top of the float 1/8–3/16 in below the bowl gasket surface with the needle spring compressed."
      },
      {
        title: "Do not rip the manifold off",
        body: "A marine Rochester 2-barrel is the stock 181 carb. That needs the original intake. Custom dual S&S means that is not the easy fix. Keep these carbs and fix pressure plus needle/seat."
      }
    ],
    steps: [
      {
        id: "stop",
        title: "Stop running it flooded",
        body: "Smell the dipstick. Raw fuel in the oil from washing the walls, or from a mechanical-pump diaphragm leaking into the crankcase. Change it before the next long run."
      },
      {
        id: "eg",
        title: "Read E or G on each body",
        body: "Cast under S&S SUPER. Super E is 1-7/8 in, Super G is 2-1/16 in. Needle 11-2195 and seat 11-2465 fit both. Write which letter is on each."
      },
      {
        id: "inlet",
        title: "Find Fuel Inlet #7 on the bowl",
        body: "IMG_5937 labels it. Look at the float bowl. Find the brass barb with the fuel hose clamped on. That is #7 Fuel Inlet. Do not remove the bowl. Do not unscrew anything on the carb for the pressure test."
      },
      {
        id: "plumb",
        title: "Put the 12-804 on the single line",
        body: "One regulator. Holley 12-804 is that part — not a second one. Cut the single line after the filter, before the tee. Put 12-804 there. Arrow toward the carbs. 2 psi starved the bowls. 4 psi woke it. Running 3 psi. Keep your tee and plug the unused outlet, or drop the tee and run one 12-804 outlet to each #7. Do not put it between the tank and the pump."
      },
      {
        id: "pressure",
        title: "Measure fuel pressure at #7",
        body: "Tee a gauge into the hose that feeds #7. Engine running. Read it before the flood. If it is more than about 2 psi, add a 1–4 psi regulator. Holley 12-804 has two outlets, one per carb, page $51.95. Preset 2.8 — turn it down. That regulator’s inlet is limited to 7 psi. A stock mechanical carb pump is usually in that band; if the reading is hotter, 12-804 is the wrong style."
      },
      {
        id: "needle",
        title: "Needle, seat, and floats — both carbs",
        body: "11-2195 needle and 11-2465 seat, circled on IMG_5949. Also circled: o-ring 50-8009. Two of each. Shake both 11-2187 floats. Do this even if the regulator fixes the spill — the needles have been overpowered."
      },
      {
        id: "enrich",
        title: "Enrichment lever down when hot",
        body: "Big red lever on each carb — not the long red bar. Up to start. Down once it is running. If a lever stays up while hot, it stays rich."
      },
      {
        id: "tune",
        title: "Tune both carbs the same",
        body: "A is mixture, the spring screw on the SIDE. In is leaner. Out is richer. Seat it softly, then count out from that stop. Print starts at 1-1/4. This car died at 1-1/4, lasted longer at 1-1/2, and held at 1-3/4 with the choke down. Leave A at 1-3/4. C is idle speed, the small screw on TOP by the cable. Catch is when the red bar just twitches. Print is 1/2 turn after that. 2k can run even when mixture is lean — that hides the stall. Do not open C to keep it alive. Last hold was about 1.5k at 3 psi. Warm idle is 900–1100. 2 psi starved the bowls; 4 psi woke it; running at 3 psi. If it spills, needles."
      },
      {
        id: "gasket-first",
        title: "New Fel-Pro gasket, then lower idle",
        body: "11 Nov gasket went on dry at about 40 in-lb (not 40 ft-lb). Cover stayed. It ran, then the rail wept, so 12 Nov a Fel-Pro 17900 cork-rubber from O’Reilly is going on for extra precaution — same 153/181 gasket as Sierra 18-0347 / GM 14096154, not a molded all-rubber lid. Thin RTV on the cover side only. No red thread locker on those bolts. Then start B up, B down, A stays 1-3/4, C at 1.5k. If it holds, nibble C toward 900–1100."
      },
      {
        id: "log",
        title: "Write down what you found",
        body: "E or G on each body, the running pressure reading, whether the floats sloshed, and whether a regulator went on. Put it in the note below."
      }
    ],
    schematic: ["fuel"],
    photos: [
      { src: "img/carb-now/right-marked.jpg", cap: "Close-up of one carb. A mixture, B choke, C idle speed." },
      { src: "img/carb-now/both-marked.jpg", cap: "Both carbs. The long red rod is the throttle for both — not a hanging arm." },
      { src: "img/carb-now/left-marked.jpg", cap: "Other carb. Same A, B, C. The yellow paint is just a bolt." }
    ],
    parts: ["carb", "fuel-filter", "fuel-hose", "fuel-hardware", "ss-carb-notes", "valve-cover-gasket"],
    evidence: ["IMG_5937", "IMG_5949", "IMG_5877"]
  },
  {
    id: "brake-lock",
    title: "Brake lockup",
    status: "open",
    system: "brakes",
    summary:
      "The brakes are locked. The car has been sitting, and the tires and wishbone poly have already dried out.",
    why: [
      {
        title: "Wheel-cylinder cups dried in the bore",
        body: "The only wheel-end brake parts on a receipt are two NAPA wheel cylinders, 37625, bought 27 May 2008. Those are drum cylinders. The rubber cups are the same kind of part as the dried tires and the dried wishbone poly: left alone, they stick. A stuck cup holds the shoe against the drum and that wheel will not turn. The ticket does not print a bore, so measure one before you order a replacement."
      },
      {
        title: "Wilwood master not releasing",
        body: "The master is a Wilwood 1 in tandem, 835-2607563 / 260-7563, Speedway, 1 Mar 2010. No brake-fluid purchase is anywhere in the folder, so whatever is in it has been there through the sit. Wet fluid swells the cups and the piston can hang in the applied position. The pedal box is Champion plates PB1–PB4 with the holes cut to suit this master, so the pushrod length was fitted, not bought. A pushrod that is a little too long covers the compensating port with the pedal looking fully up, and then every corner stays pressurized."
      },
      {
        title: "Shoes rusted to the drums",
        body: "A long sit bonds the shoe face to the drum. That lock is mechanical. Opening a bleeder does not free it, because no pressure is holding it."
      },
      {
        title: "A hose that lets fluid out and not back",
        body: "The line on the receipts is hard line: 3/16 steel 91031810, AN3 stainless 91031840, tees, and a 10 mm banjo kit 6172960. No rubber brake hose was bought on these tickets. If you find one on the car, a collapsed hose is the usual “one pedal stroke and it stays locked” failure. Cracking the bleeder frees that wheel. The next pedal stroke locks it again."
      },
      {
        title: "A handbrake left on",
        body: "No handbrake cable is on these sheets. If one was fitted later and left applied, the shoes seize on through a sit. Look for it before you pull the master off."
      }
    ],
    steps: [
      {
        id: "which",
        title: "Find which wheels will not turn",
        body: "Leave it off the road. Jack it and turn each wheel by hand. Write down the locked ones. The two 37625 cylinders are one axle — find that axle first. The other axle is not on a receipt, so note what is actually out there (cylinder, caliper, or nothing hydraulic)."
      },
      {
        id: "pedal",
        title: "Check free play at the Wilwood",
        body: "Foot off the pedal. There should be a little slack before the pushrod moves the piston. If the pedal is already tight against the master, the compensating port can stay covered and the lines hold pressure. Do not adjust the pushrod yet. Just record what you feel."
      },
      {
        id: "bleeder",
        title: "Crack a bleeder on a locked wheel",
        body: "A quarter turn is enough. If the wheel then turns, pressure was trapped: master return, pushrod, or a one-way hose. If the wheel stays locked, the shoe or the 37625 piston is holding it and the hydraulics are not."
      },
      {
        id: "drum",
        title: "Pull the drum on a locked cylinder wheel",
        body: "If the piston will not go back in, that 37625 cup has dried to the bore. If the piston moves and the shoe is rusted to the drum, free the shoe — the cylinder may still be usable. Bore size is not on the Burton ticket."
      },
      {
        id: "master",
        title: "Only then open the master question",
        body: "Do this when a bleeder crack frees the wheel and the next pedal press locks it again. The Wilwood is not uncovering its port: swollen cup, or a long pushrod. Leave the fluid that is in it alone until you know the grade. The tickets never name one, and the wrong grade swells the cups further."
      },
      {
        id: "log",
        title: "Write down what you found",
        body: "Which wheels were locked, whether the bleeder freed them, and what the fluid looked like (clear, dark, or chunky). Put it in the note below so the next session starts from the car, not from a guess."
      }
    ],
    parts: ["wilwood-mc", "caliper-front-rh", "caliper-front-lh", "wc-37625", "an-lines", "brk-4131206", "fluid-brake"],
    evidence: ["IMG_5884", "IMG_5867", "IMG_5858", "IMG_5876"]
  }
];

const PROJECT_KEY = "zo-project-progress";

function readProjectStore() {
  try {
    return JSON.parse(localStorage.getItem(PROJECT_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeProjectStore(all) {
  localStorage.setItem(PROJECT_KEY, JSON.stringify(all));
}

window.ZO_PROJECTS = ZO_PROJECTS;

window.projectProgress = function projectProgress(id) {
  const row = readProjectStore()[id] || {};
  return { checks: row.checks || {}, note: row.note || "" };
};

window.saveProjectCheck = function saveProjectCheck(id, step, on) {
  const all = readProjectStore();
  const row = all[id] || { checks: {}, note: "" };
  row.checks = row.checks || {};
  row.checks[step] = !!on;
  all[id] = row;
  writeProjectStore(all);
};

window.saveProjectNote = function saveProjectNote(id, note) {
  const all = readProjectStore();
  const row = all[id] || { checks: {}, note: "" };
  row.note = note;
  all[id] = row;
  writeProjectStore(all);
};

window.projectDoneCount = function projectDoneCount(id) {
  const job = ZO_PROJECTS.find((p) => p.id === id);
  if (!job) return { n: 0, total: 0 };
  const prog = projectProgress(id);
  return {
    n: job.steps.filter((s) => prog.checks[s.id]).length,
    total: job.steps.length
  };
};
