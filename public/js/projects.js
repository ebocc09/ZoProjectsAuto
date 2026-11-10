/* Open jobs for chassis 1442. Facts about parts come from the paperwork.
   What the car is doing now comes from the bench. */
const ZO_PROJECTS = [
  {
    id: "carb-flood",
    title: "Carb floods",
    status: "open",
    system: "engine",
    summary:
      "After a few minutes of driving, fuel spills from the carburetor, the engine floods, idle will not hold unless you keep giving it throttle, then it dies.",
    why: [
      {
        title: "The bowl is overfilling",
        body: "Fuel coming out of the carb after it has been running is the overflow, not a hose weeping on the way there. Extra fuel dumps into the intake. Idle goes full rich and the engine stalls. Throttle adds air, so it will still pull until the overflow wins. That matches Enzo 9 Nov 2026: drives, then spills, then dies at idle."
      },
      {
        title: "Float taking on fuel",
        body: "A brass float with a pinhole, or a foam float that has soaked, holds for a few minutes and then sinks. The needle stays open and the bowl dumps. That delay is the usual tell. Shake the float once the lid is off — if it sloshes, it is done."
      },
      {
        title: "Needle and seat not sealing",
        body: "Dirt, a worn needle, or a bad seat lets fuel keep filling past the float. It can look fine until the fuel is warm. No needle/seat SKU is on a ticket. Do not order the S&S 11-2195 / 11-2465 circled on the Super E print — nothing on that page says that carb is on this 181."
      },
      {
        title: "Fuel pressure too high",
        body: "A fuel pump is not on any invoice. A Locost with a rear tank is often an electric pump. Carb needles usually want well under 7 psi. Too much pressure overpowers the float. Measure at the inlet while it is still running, before it floods. Do not lock a pump SKU until you read what is on the car."
      },
      {
        title: "Choke stuck shut",
        body: "Burton ticket 30 Dec 2010 bought choke kit 732-1153, net $19.29. Application not printed. A choke that stays closed makes it rich from the first second. Spill after a few minutes of driving is still a bowl problem first. Look at the flap once it is hot anyway."
      }
    ],
    steps: [
      {
        id: "stop",
        title: "Stop running it flooded",
        body: "Raw fuel washing the walls dilutes the oil. Smell the dipstick. If it smells like gasoline, change the oil before the next long run. Do not keep driving it in this state just to confirm the stall."
      },
      {
        id: "count",
        title: "Count the carbs and read the tag",
        body: "Enzo said carburetors, plural. Marine 181 is usually one 2-barrel. Dual would be a later fit. Write down how many, the brand, and any number stamped on the base or bowl. No carb SKU is on an invoice."
      },
      {
        id: "pump",
        title: "Key on, pump on, engine off",
        body: "If fuel spills from the carb with the engine not running, the needle is already open or pressure is wild. If it only spills after a few minutes of running, that is the delayed float/seat path."
      },
      {
        id: "float",
        title: "Pull the lid and shake the float",
        body: "If it sloshes or feels heavy, replace the float. If it is light and dry, look at the needle and seat. Do not order parts until the tag is read."
      },
      {
        id: "pressure",
        title: "Measure fuel pressure at the inlet",
        body: "Tee a gauge at the carb inlet while it is still running, before the flood. Write the number. Carb needles usually want well under 7 psi. A pump is not on the tickets."
      },
      {
        id: "log",
        title: "Write down what you found",
        body: "How many carbs, the tag, whether it spilled with the engine off, whether the float sloshed, and the pressure reading. Put it in the note below so the next session starts from the car."
      }
    ],
    parts: ["carb", "fuel-filter", "fuel-hose", "fuel-hardware", "ss-carb-notes"],
    evidence: ["IMG_5877", "IMG_5949"]
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
