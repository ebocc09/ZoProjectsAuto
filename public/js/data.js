window.ZO = {
  brand: { name: "Zo Projects", unit: "Auto" },
  vehicle: {
    id: "l7",
    name: "Lotus 7",
    subtitle: "Locost — chassis 1442",
    yearRange: "2007–2011 build",
    builder: "James Bowers, Oakhurst, TX",
    identity:
      "Not a factory Lotus or Caterham. Custom Locost Seven built from Ron Champion's Build Your Own Sports Car, with Kinetic Vehicles bodywork, a GM 3.0L Vortec four, and owner-drawn wishbones on a chassis labeled 1442.",
    tags: ["Locost", "Kinetic body", "GM 3.0 Vortec", "QA1 Ultra Ride", "P205/75R14"],
    vitals: [
      { k: "Chassis", v: "1442 — rocker wishbones" },
      { k: "Engine", v: "GM Vortec 3.0L I4 (181)" },
      { k: "Track C/L", v: "58.625 in" },
      { k: "Tires", v: "P205/75R14" },
      { k: "Camber / caster", v: "−1° / +5°" },
      { k: "Ride height", v: "6.0 in (geometry)" },
      { k: "Engine oil", v: "Not on paperwork" },
      { k: "Gearbox", v: "Not on paperwork" },
      { k: "Coolant", v: "Not on paperwork" },
      { k: "Brake fluid", v: "Not on paperwork" },
      { k: "Clutch fluid", v: "Not on paperwork" }
    ]
  },
  systems: [
    {
      id: "front-suspension",
      name: "Front suspension",
      short: "Wishbones, ball joints, inner poly",
      status: "replace",
      statusLabel: "Bushings due",
      summary:
        "Owner-fabricated 1/4 in plate upper and lower wishbones on chassis 1442. Inner pivots specified as polyurethane. Outer ends are bolt-in GM-pattern ball joints. This is the system that needs new rubber.",
      geometry: [
        { k: "Upper wishbone length", v: "10.643 in" },
        { k: "Lower wishbone length", v: "16.966 in" },
        { k: "Upper front / rear legs", v: "11.050 / 11.523 in" },
        { k: "Lower forward / rear legs", v: "17.835 / 18.526 in" },
        { k: "UF–UR chassis pickups", v: "7.500 in" },
        { k: "LF–LR chassis pickups", v: "12.94 in" },
        { k: "King pin length", v: "10.957 in" },
        { k: "Track rod", v: "14.820 in" },
        { k: "Ackerman", v: "−50% nominal" }
      ]
    },
    {
      id: "front-dampers",
      name: "Front coilovers",
      short: "QA1 Ultra Ride 12 in, poly eyes",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "QA1 Ultra Ride 12 in adjustable coilovers, poly-eye (P) mounts. Two kits bought — 225 lb and 300 lb / mixed Carrera 10 in springs. Builder notes settled on ~12.5 in ride height."
    },
    {
      id: "steering",
      name: "Steering",
      short: "Mustang II rack, spindles, shafts",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Speedway manual Mustang II rack 91034340-MAN, 8 Jun 2008, with its bolt kit and mounting bushes. Custom spindle/knuckle. Castings read on the parts: right 459756, left 459755, G-body / 2WD S10 family, not on an invoice. 14.820 in track rod, steering arm 6.479 in. United Machine Works modified two steering shafts 20 Apr 2009 for $150 cash."
    },
    {
      id: "rear-suspension",
      name: "Rear suspension",
      short: "Trailing rods, panhard, 4-link notes",
      status: "watch",
      statusLabel: "Measure",
      summary:
        "4130 trailing rods with 1.06 in (1-1/16 in) bush width. Panhard/track bar drawn at 18.36 in ball-to-ball. AFCO 4-link and panhard articles are in the file as setup theory, not purchased AFCO hardware."
    },
    {
      id: "brakes",
      name: "Brakes",
      short: "Wilwood master, S10 front calipers",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Wilwood 1 in tandem 260-7563. Speedway AN3/AN4 plumbing on E499097 ($255.84) includes pressure switch 91031305. Same June 2008 Speedway order as the Mustang II rack also bought a 10 psi residual valve, a 2 psi residual valve, and a knob proportioning valve. NAPA wheel cylinders 37625, brake line 413-1206, gauge HR-1. Front calipers were read on the car, not on a receipt: passenger GM 19141004 and driver GM 19141005, single-piston S10 1983–1997. 19141914 is a rear number. Right spindle casting 459756, left 459755."
    },
    {
      id: "engine",
      name: "Engine & clutch",
      short: "GM 3.0 Vortec, S10 clutch path",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "GM Vortec 3.0L four. Kept clutch is AWS 04-065 with flywheel bolts MTM 140052, fork 15592270, ball stud 15592268, pilot 3914000, T/O 614018. NAPA V-belt 25-7417, Timken seals, fuel line H-176, choke kit 732-1153. Buck's line 15530202 is printed IRRIGATION — unidentified. Need a new valve cover (not the head) 8M0122491. Buy list: Wix 33003, gasket Sierra 18-0347 / SME180347, thermostat kit Sierra 18-3650 / SME183650. Filter stubs: two ~4 in of 3/8 (1 ft of H350A) plus Gates 28594. Not bought yet."
    },
    {
      id: "cooling",
      name: "Cooling",
      short: "JEGS −12AN roadster radiator",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "JEGS 555-51962 radiator, −12AN fittings, inline filler, hose drain 071063700. The 2008 fan line, 400-110, was deducted and never shipped. A Flex-a-lite model 110 was bought from Peyton Performance in Waxahachie. The underlined 210 is a dual wider than this radiator. Aircraft Spruce AN833-12D / AN821-12D / AN924-12D in 2009. Gates heater hose 28432 in 2011. The radiator-to-block hose burst on 7 Nov 2026. Official hose is Gates Green Stripe Vulco-Flex 26502, 1-3/4 both ends × 16-1/2 in. Perfect match. Thermostat kit on the buy list is Sierra 18-3650 / NAPA SME183650, 140°F. Not bought yet."
    },
    {
      id: "driveline",
      name: "Driveline",
      short: "Trans flange, 27.25 in shaft, Northwest",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Geometry sheets call the front of the shaft TRANSMISSION REAR FLANGE. Ride length ~27.25 in, bump 3.0 in / droop 2.25 in. Shop note: Northwest Drivetrain, 11432 FM 529, Houston, 713-937-8499. No gearbox SKU is on any invoice."
    },
    {
      id: "fluids",
      name: "Fluids",
      short: "Oil, gearbox, coolant, brake, clutch",
      status: "watch",
      statusLabel: "Log the fill",
      summary:
        "No oil grade, ATF, coolant, or DOT rating appears on an invoice or CAD sheet. Hardware around the fills is documented (3.0 Vortec, JEGS radiator filler, Wilwood tandem master, NAPA clutch slave 37728). Use Update on each jug to write what is in the car now."
    },
    {
      id: "chassis",
      name: "Chassis & steel",
      short: "1×1 tube, 4130, POR-15",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Huntsville 1×1×16/14 ga plus angle, flat, 1-3/4 tube, and sheet. Aircraft Spruce 4130 (7/8×.188 and 3/8×.065), aluminum sheet, AN8 bolts. POR-15 black gallon, Metal Ready, solvent. AOC 4043 and ER70S-6."
    },
    {
      id: "body",
      name: "Body",
      short: "Kinetic body, two black seats",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Kinetic nose, scuttle, steamroller fenders, windshield kit. Able Glass 15-1/2×37-1/2 green lami. Hot Rod Leather DFHS-4 plus SSGL-4 loops. Two seats from The Upholstery Room, Huntsville, 23 Feb 2011: Wave / Solar Fleece, black, labor and padding $525. Patriot side-pipe instructions still have no invoice. Speedway chrome side exhaust 91013460, 60 in, was bought 2 Aug 2008. Exhaust bends 91013670 / 91013874, with “NO.” written on the 1-1/2 in line."
    },
    {
      id: "electrical",
      name: "Electrical",
      short: "7-fuse, color code, Flex fan sheet",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "Hand-drawn loom with engine, lights, steering column, and firewall blocks. Speedway 7-fuse block 910-64004 and two 8-terminal strips 910-64006 bought 12 Apr 2010. A later firewall drawing writes 30A on the fuse positions. The builder’s color code and TS-1 / TS-2 terminal list are on IMG_5943 and IMG_5951, and those two sheets do not use the same letters for the same jobs. Tail lamps Irving Levine SS 510. Headlamps and amber LED blinkers were bought from Demon’s Cycle, 10 Feb 2011, with no numeric SKU."
    },
    {
      id: "wheels",
      name: "Wheels & tires",
      short: "P205/75R14, S10 4.75 adapters",
      status: "ok",
      statusLabel: "Documented",
      summary:
        "P205/75R14 at −1° camber and +5° caster. ezAccessory 54755-54775 5-lug 4.75 to 4.75 adapters, 2 in thick, 12×1.5 studs, noted as Chevy S10 1989."
    }
  ],
  parts: [
    {
      id: "poly-135",
      name: "Front upper wishbone inner poly bushing",
      pn: "135 POLY .175",
      brand: "Specified on drawing — no SKU on a receipt",
      system: "front-suspension",
      role: "Inner chassis pivot, upper A-arm",
      status: "replace",
      confidence: "On the CAD. Not on an invoice.",
      qty: "Per inner tube (left and right uppers)",
      spec: [
        { k: "Callout", v: "“135 POLY .175 or TOP”" },
        { k: "Arm", v: "1/4 in plate upper wishbone" },
        { k: "Pivot", v: "8.5° down (left side bent 8.5° up)" },
        { k: "Mount", v: "Mount hole 1. / mount bolt 5/" },
        { k: "Likely reading", v: "1.35 in poly, 0.175 in wall or ID-related" }
      ],
      notes:
        "This is the front control-arm rubber you asked about. It is a handwritten spec on the upper wishbone drawing, not a Caterham or Lotus OEM number. Measure the inner pivot tube ID, OD, and width on the car before you order. Do not assume it is the Speedway 4-bar kit — that kit's assembled width is 1.375 in and the trailing-rod drawings call 1.06 in, so they are three different joints.",
      evidence: ["IMG_5795", "IMG_5794", "IMG_5791", "IMG_5801"],
      replaceWith:
        "Pull one bush. Record tube ID, tube OD, bush width, and bolt diameter. Order polyurethane of that size (Energy / Prothane / custom lathe). If the inner ends were later converted to Speedway 4-bar eyes, use 910-08015 instead."
    },
    {
      id: "sw-91008015",
      name: "Front rod-end bushing kit, 1/2 in",
      pn: "910-08015",
      brand: "Speedway Motors",
      system: "front-suspension",
      role: "Plastic halves + 1/2 in steel sleeves for 4-bar rod ends",
      status: "replace",
      confidence: "Purchased 18 May 2008 — $24.99",
      qty: "1 kit (8 halves typical)",
      spec: [
        { k: "Packing slip", v: "4 BAR BUSH/SLEEVES FOR 1/2" },
        { k: "Email wording", v: "Front Rod End Bushing Kit, 1/2\"" },
        { k: "Fits", v: "910-08051-STR stainless RH 4-bar ends ×5, same order" },
        { k: "Jam nuts with them", v: "175-6046-RH 5/8 in steel, 6/pack" },
        { k: "Order", v: "E299258 / packing 3593107" }
      ],
      notes:
        "The only bushing kit on a receipt. These are nylon/plastic 4-bar rod-end bushes, 1/2 in bolt, for Speedway 910-08051 ends — not a pressed Locost wishbone silentbloc. Current Speedway listing is still the four-bar rod-end plastic bushing kit for 1/2 in bolt, set of 8. Individual halves also sold for 910-08051.",
      evidence: ["IMG_5882", "IMG_5883"],
      replaceWith: "Speedway 910-08015 (kit) or replacement plastic bushing halves for 910-08051, 1/2 in bolt."
    },
    {
      id: "sw-91008051",
      name: "Stainless RH 4-bar rod end",
      pn: "910-08051-STR",
      brand: "Speedway Motors",
      system: "front-suspension",
      role: "Threaded 4-bar / radius-rod end",
      status: "ok",
      confidence: "Purchased 18 May 2008 — qty 5 @ $14.99. Another 8 on 8 Jun 2008.",
      qty: "5 + 8",
      spec: [
        { k: "Thread family", v: "Speedway 5/8 4-bar end, RH" },
        { k: "Bush", v: "Takes 910-08015 1/2 in kit" },
        { k: "8 Jun 2008", v: "91008051-STR ×8 @ $14.99 on E304896, with the Mustang II rack" },
        { k: "Jam nuts, same order", v: "91001156 stainless 5/8 RH ×10 @ $2.99" }
      ],
      notes: "Five ends on the May order, eight more on the June rack order. A Seven has four front inner pivots plus spares, or these were split between front and rear bars.",
      evidence: ["IMG_5882", "IMG_5883", "IMG_5930", "IMG_5931"]
    },
    {
      id: "napa-33813",
      name: "Upper control-arm assembly",
      pn: "33813",
      brand: "NAPA (Burton Auto, Trinity TX)",
      system: "front-suspension",
      role: "UP CM ASSY — likely a GM donor arm, not the fabricated wishbone",
      status: "watch",
      confidence: "Purchased 29 May 2008 — net $47.61. Application not printed.",
      qty: "1",
      spec: [{ k: "Ticket", v: "Cash sale, Burton Auto Supply" }, { k: "List", v: "$86.57" }],
      notes:
        "Bought the same week as front ball joints. Given the S10 pattern adapters, S10 horn diagram, and S10 clutch path, this is probably a GM upper arm used as a ball-joint/bushing donor — not the 1/4 in plate arm on the car. Confirm by looking at what is actually bolted to chassis 1442.",
      evidence: ["IMG_5868"]
    },
    {
      id: "napa-10269",
      name: "Front ball joint",
      pn: "10269",
      brand: "NAPA",
      system: "front-suspension",
      role: "FRT BALL JNT",
      status: "ok",
      confidence: "Purchased 29 May 2008 — net $15.33",
      qty: "1",
      spec: [],
      notes: "Lower wishbone CAD: ball joint mounts up through the bottom, 1-3/4 in hole, 5/8-20.",
      evidence: ["IMG_5868", "IMG_5801"]
    },
    {
      id: "napa-10390",
      name: "Ball joint",
      pn: "10390",
      brand: "NAPA",
      system: "front-suspension",
      role: "MRC BALL JNT",
      status: "ok",
      confidence: "Purchased 27 May 2008 — qty 2 @ $24.09",
      qty: "2",
      spec: [],
      notes: "Bought with two wheel cylinders 37625.",
      evidence: ["IMG_5867"]
    },
    {
      id: "lower-wishbone",
      name: "Lower wishbone (fabricated)",
      pn: "FINAL MOD — 1/4 in plate",
      brand: "Owner CAD",
      system: "front-suspension",
      role: "Left shown, fwd",
      status: "ok",
      confidence: "Drawing",
      qty: "1 per side",
      spec: [
        { k: "Plate", v: "1/4 in" },
        { k: "Inner thread callout", v: "5/8-20" },
        { k: "BJ hole", v: "1-3/4 in" },
        { k: "BJ note", v: "Mount up thru bottom" },
        { k: "Perp. length", v: "16.966 in" }
      ],
      notes: "No inner-bush SKU on this sheet. Inner blocks are welded tubes / pads at the chassis end.",
      evidence: ["IMG_5801", "IMG_5794"]
    },
    {
      id: "upper-wishbone",
      name: "Upper wishbone (fabricated)",
      pn: "Left/right upper — 1/4 in plate",
      brand: "Owner CAD",
      system: "front-suspension",
      role: "Rocker / upper A-arm",
      status: "replace",
      confidence: "Drawing + poly callout",
      qty: "1 per side",
      spec: [
        { k: "Plate", v: "1/4 in, machine fit" },
        { k: "Pivot", v: "8.5° down" },
        { k: "Inner poly", v: "135 POLY .175 or TOP" },
        { k: "Perp. length", v: "10.643 in" },
        { k: "Chassis span UF–UR", v: "7.500 in" }
      ],
      notes: "Chassis title on the geometry sheet: ROCK WISHBONE FITTINGS ON 1442 CHASSIS.",
      evidence: ["IMG_5795", "IMG_5791", "IMG_5796"]
    },
    {
      id: "qa1-ur4855p",
      name: "QA1 Ultra Ride 12 in coilover (poly eye)",
      pn: "UR4855P / UR4855P-1 / 721-4855",
      brand: "QA1 via Speedway",
      system: "front-dampers",
      role: "Front and rear dampers",
      status: "ok",
      confidence: "Purchased + vendor map",
      qty: "4 shocks (two kits)",
      spec: [
        { k: "Speedway kit", v: "721-485 / 7214855" },
        { k: "Vendor PN", v: "UR4855P-1 (poly)" },
        { k: "Extended / compressed", v: "14 in / 10-1/8 in" },
        { k: "Travel (builder)", v: "3-7/8 in" },
        { k: "Ride height used", v: "12.5 in shock length" },
        { k: "Up / down at that height", v: "2.5 in / 1-5/16 in" },
        { k: "Springs", v: "Carrera 10 in 25510225 and 25510325; kits 225 lb and 300 lb also ordered" }
      ],
      notes: "P = poly bushing eyes, not spherical bearings. Rebuild eyes with QA1 B6031K (two-piece urethane, 1/2 and 5/8 sleeves), one kit per shock.",
      evidence: ["IMG_5761", "IMG_5760", "IMG_5784", "IMG_5811", "IMG_5846", "IMG_5847", "IMG_5881"],
      replaceWith: "QA1 B6031K bushing kit, 1 per shock, if the eye bushes are gone. Shocks themselves are UR4855P."
    },
    {
      id: "qa1-b6031k",
      name: "QA1 coilover eye bushing kit",
      pn: "B6031K",
      brand: "QA1",
      system: "front-dampers",
      role: "Polyurethane shock-eye rebuild",
      status: "ok",
      confidence: "Called out on the UR4855P paperwork",
      qty: "1 kit per shock × 4",
      spec: [
        { k: "Fits", v: "QA1 Ultra Ride UR4855P poly eyes" },
        { k: "Style", v: "Two-piece urethane" },
        { k: "Sleeves in the kit", v: "1/2 in and 5/8 in" },
        { k: "Not the same as", v: "Wishbone 135 POLY .175, or Speedway 910-08015 rod-end bushes" }
      ],
      notes: "These are the bushes in the coilover eyes. The shocks came as UR4855P (P = poly, not a spherical bearing). Order B6031K if the eye rubber is gone; do not order wishbone poly for this joint.",
      evidence: ["IMG_5846", "IMG_5761", "IMG_5811"],
      replaceWith: "QA1 B6031K, one kit per shock."
    },
    {
      id: "trailing-bush",
      name: "Trailing-rod bushing width",
      pn: "1.06 in = 1-1/16 in",
      brand: "Owner spec, 4130 tube",
      system: "rear-suspension",
      role: "Pressed bush in trailing rod",
      status: "watch",
      confidence: "On the fab drawing",
      qty: "Top and lower rods",
      spec: [
        { k: "Bush width", v: "1.06 in (1-1/16)" },
        { k: "Top tube", v: "Cut 4130 to 12.5, trim 0.25 → 14.38 overall" },
        { k: "Lower tube", v: "Cut 4130 to 11.25 → 13.03 overall" }
      ],
      notes: "Width only. No brand or SKU. Measure ID and bolt before ordering.",
      evidence: ["IMG_5799", "IMG_5800"]
    },
    {
      id: "panhard",
      name: "Panhard / track bar",
      pn: "18.36 in inside ball to inside ball",
      brand: "Owner",
      system: "rear-suspension",
      role: "Lateral locator",
      status: "ok",
      confidence: "Photo dimensioned",
      qty: "1",
      spec: [{ k: "Overall on photo", v: "23.28 in before trim" }],
      notes: "AFCO panhard articles are in the packet as tuning theory.",
      evidence: ["IMG_5802"]
    },
    {
      id: "wilwood-mc",
      name: "Tandem master cylinder, 1 in",
      pn: "835-2607563 / 260-7563",
      brand: "Wilwood",
      system: "brakes",
      role: "Pedal-box master",
      status: "ok",
      confidence: "Purchased 1 Mar 2010 — $121.99",
      qty: "1",
      spec: [
        { k: "Instruction sheet", v: "1 in tandem with remote reservoirs, PN 260-7563" },
        { k: "Overall on the sheet", v: "11.53 in (299.9 mm)" },
        { k: "Pushrod stroke", v: "1.10 in (27.9 mm)" },
        { k: "Outlets", v: "3/16 tube, inverted female flare" },
        { k: "Mount hole", v: "0.34 in diameter (8.6 mm), printed on the sheet" }
      ],
      notes: "Speedway 835-2607563. Pedal box from BYOSC PB1–PB4 plates, holes to suit master. The dimensioned instruction sheet is IMG_5934. The rest of the mounting figure is on that page.",
      evidence: ["IMG_5884", "IMG_5790", "IMG_5785", "IMG_5792", "IMG_5933", "IMG_5934"]
    },
    {
      id: "jegs-rad",
      name: "Roadster radiator, −12AN",
      pn: "555-51962 / 055551962",
      brand: "JEGS",
      system: "cooling",
      role: "Crossflow aluminum",
      status: "ok",
      confidence: "Purchased Aug 2008 — $299.99",
      qty: "1",
      spec: [
        { k: "Overall", v: "17 in W × 19-1/2 in H" },
        { k: "Core", v: "13-1/2 × 18-5/8 in" },
        { k: "Fittings", v: "555-530082 −12AN × 1.25 in, qty 2" },
        { k: "Filler", v: "555-530400 1.25×1.25" },
        { k: "Fan", v: "Flex-a-lite model 110, bought from Peyton. The 2008 JEGS line was deducted. See that part." },
        { k: "Hose drain", v: "071063700 radiator hose drain — $17.99, same JEGS invoice" }
      ],
      notes: "Box 1 is the filler, fittings, and hose drain. Box 2 is the radiator. The fan line is on the confirmation only. The hose from this radiator into the block is the separate radiator-hose part.",
      evidence: ["IMG_5825", "IMG_5813", "IMG_5812"]
    },
    {
      id: "rad-hose",
      name: "Radiator hose",
      pn: "26502",
      brand: "Gates",
      system: "cooling",
      role: "Radiator into the engine block. Official: Green Stripe Vulco-Flex 1-3/4.",
      status: "replace",
      confidence: "Perfect match. Official solution. Not bought yet.",
      qty: "1",
      sheet: "26502 · 1-3/4",
      spec: [
        { k: "On sheet", v: "26502 · 1-3/4" },
        { k: "This one", v: "Gates Green Stripe Vulco-Flex 26502. 1-3/4 in both ends × 16-1/2 in. Official. Perfect match. O'Reilly: https://www.oreillyauto.com/detail/c/green-stripe-vulco-flex/gates-green-stripe-vulco-flex-coolant-hose/gaa7/26502" },
        { k: "Size", v: "1-3/4 in both ends × 16-1/2 in. Official. Not 1-1/2 / 38 mm." },
        { k: "Lengths", v: "Same 1-3/4 even family: 26601 is 6 in, 26602 8-1/2, 26603 11, 26501 13-1/2, 26502 16-1/2, 26611 19, 26612 23-1/2. Trim the plain cuffs." },
        { k: "Clamps", v: "Size 32 on 1-3/4. Gates 32032." },
        { k: "Failed", v: "Not 25478 (1-1/2 Vulco-Flex II). Not 24024 stick. Not molded 22039 / 22476 / 05-3093 / 20121. Not elbows 555-511176 / 511181 / 511171. Not step hose 25530." },
        { k: "Stamps", v: "EOSA3AG1, E09 AG 1, 3093AG1. Factory marks. Not a catalog number for this hose." },
        { k: "Heater hose", v: "Gates 28432 on the 23 Jun 2011 ticket is 3/4 in heater hose. Different hose." }
      ],
      notes: "Official solution. No receipt yet, so there is no price.",
      evidence: []
    },
    {
      id: "thermostat",
      name: "Thermostat",
      pn: "18-3650",
      brand: "Sierra / NAPA",
      system: "cooling",
      role: "Marine 181 CID 3.0L thermostat kit. Need new.",
      status: "replace",
      confidence: "Buy list. NAPA SME183650 kit. Not bought. Not read off this housing.",
      qty: "1",
      sheet: "18-3650 · 140°",
      spec: [
        { k: "On sheet", v: "18-3650 · 140°" },
        { k: "This one", v: "Sierra 18-3650, NAPA SME183650. 140°F thermostat kit for 1998-and-older MCM GM in-line 4- and 6-cylinder. Includes 18-3550 thermostat and 18-2831 cover gasket. Replaces Mercury 59078T3 / 59078Q3. NAPA: https://www.napaonline.com/en/p/SME183650" },
        { k: "Inside", v: "Stat only is Sierra 18-3550 / NAPA SME183550, Mercury 59078. Kit is the one on the buy list." },
        { k: "160° closed", v: "Later closed / fresh-water GM marine cooling uses Sierra 18-3649, NAPA SME183649, 160°F, Mercury 8072522 / 807252T2." },
        { k: "WINCO sheet", v: "PSI Z33001814 was the industrial number on the WINCO GM 3.0L sheet. Opening temp is not printed. No catalog cross to 18-3650." },
        { k: "Street note", v: "140° is the boat raw-water 181 OEM. This Locost has a JEGS street radiator, closed glycol. It may run cool. Not confirmed on this housing." },
        { k: "Housing kit", v: "Marine housing is Mercury 861493A07 / Sierra 18-1910, MCM 140/3.0L s/n 0L340999 and below. Cast housing + gaskets. Stat is separate (18-3650). Not read on this engine. https://www.marineengine.com/newparts/part_details.php?pnum=MER861493A07" },
        { k: "Hoses", v: "No one SKU is housing + all hoses + stat for this street radiator. Marine pump hose is Sierra 18-70931 / Mercury 32-96879. Manifold and transom hoses are boat. This car's radiator hose is already Gates 26502." },
        { k: "Bolt-on", v: "If this housing is still the marine two-piece, unbolt the cover and drop in 18-3650. If the casting is junk, 18-1910 replaces the housing. Look at this engine first — Buck's industrial 181 may not have the boat housing." },
        { k: "Not", v: "Not TDL 5216 (C/HOUSING on the 2011 heater-hose ticket). Not Sierra 18-1993 (V8 305/350 housing). Not the Flex-a-lite fan 'adjustable thermostat' on 400-110. Not the valve-cover gasket 18-0347." }
      ],
      notes: "On the 9 Nov 2026 buy list with the fuel filter and valve-cover gasket. No receipt.",
      evidence: ["IMG_5929"]
    },
    {
      id: "hose-elbow-90",
      name: "Hose elbow 90",
      pn: "555-511176",
      brand: "JEGS",
      system: "cooling",
      role: "Failed research. Not the hose.",
      status: "replace",
      confidence: "Failed attempt. Official hose is Green Stripe Vulco-Flex 26502.",
      qty: "as needed",
      spec: [
        { k: "This one", v: "Aluminum 90, 1-1/2 in OD, 3-1/4 in legs. Tube OD is hose ID. Page $19.99. More than 10. https://www.jegs.com/i/jegs-555-511176-aluminum-radiator-hose-connector-90-degree-elbow-1-1-2-in-o-d-inlet-outlet" },
        { k: "Amazon", v: "https://www.amazon.com/JEGS-511176-Radiator-Hose-Connector/dp/B07HBBSTQS" },
        { k: "Speedway", v: "32-1001-1.50, aluminum 90, 1-1/2 in OD, beaded, can be cut. Amazon B01N6V6DWP. Page $23.99. https://www.speedwaymotors.com/Aluminum-90-Degree-Radiator-Hose-Connectors,49595.html" },
        { k: "1-1/4", v: "JEGS 555-511175, aluminum 90, 1-1/4 in OD, 3 in legs. Amazon B07HB8BCPC. Same family as 511176." },
        { k: "Stainless", v: "Filler Neck Supply D150A90SS, 304, 1-1/2 in OD, beaded 90, about 11.5 in long. Amazon B01EM3S5DY. A beaded stainless 45 was not confirmed." }
      ],
      notes: "No receipt. Page prices only.",
      evidence: []
    },
    {
      id: "hose-elbow-45",
      name: "Hose elbow 45",
      pn: "555-511181",
      brand: "JEGS",
      system: "cooling",
      role: "Failed research. Not the hose.",
      status: "replace",
      confidence: "Failed attempt. Official hose is Green Stripe Vulco-Flex 26502.",
      qty: "as needed",
      spec: [
        { k: "This one", v: "Aluminized steel 45, 1-1/2 in OD, legs 7 in and 3-3/4 in. Not aluminum. Page $21.99. More than 10. https://www.jegs.com/i/jegs-555-511181-aluminized-steel-radiator-hose-connector-45-degree-elbow-1-1-2-in-o-d-inlet-outlet" },
        { k: "Amazon", v: "https://www.amazon.com/JEGS-511181-Radiator-Hose-Connector/dp/B00CO6NNVG" },
        { k: "Long 90 steel", v: "555-511186 is the longer 90 in this steel family, 1-1/2 in OD, legs 8-1/2 and 5-1/4. Title says aluminum. Body says aluminized steel. 555-511185 is the 1-1/4 in steel 90, legs 8 in and 5 in." }
      ],
      notes: "JEGS does not list an aluminum 45 in 1-1/2. This steel 45 is the confirmed 45. No receipt.",
      evidence: []
    },
    {
      id: "hose-splice",
      name: "Hose splice",
      pn: "555-511171",
      brand: "JEGS",
      system: "cooling",
      role: "Failed research. Not the hose.",
      status: "replace",
      confidence: "Failed attempt. Official hose is Green Stripe Vulco-Flex 26502.",
      qty: "as needed",
      spec: [
        { k: "This one", v: "Aluminum straight, 1-1/2 in OD × 3 in. Page $5.99. More than 10. https://www.jegs.com/i/jegs-555-511171-aluminum-radiator-hose-connector-3-in-straight-length-1-1-2-in-o-d-inlet-outlet" },
        { k: "1-1/4", v: "JEGS 555-511170, aluminum straight, 1-1/4 in OD × 3 in. Page $5.99." },
        { k: "Speedway", v: "9108251, aluminum 1.50 OD × 6 in, beaded, pair. Page $27.99. https://www.speedwaymotors.com/Aluminum-Radiator-Hose-Connector-1-50-O-D-6-Length-2-PK,400048.html" },
        { k: "Reducer", v: "JEGS 555-511285 is silicone, not metal. 8 in straight, 1-1/2 ID to 1-1/4 ID. For the 1-1/4 radiator barb. https://www.jegs.com/i/jegs-555-511285-silicone-radiator-hose-8-in-straight-length-reducer-1-1-2-in-i-d-to-1-1-4-in-i-d" }
      ],
      notes: "No receipt. Page prices only.",
      evidence: []
    },
    {
      id: "flex-fan-110",
      name: "Radiator fan",
      pn: "110",
      brand: "Flex-a-lite",
      system: "cooling",
      role: "Single puller, bought",
      status: "ok",
      confidence: "Bought from Peyton Performance, Waxahachie. Same model as the deducted 2008 JEGS line 400-110. No receipt in the folder.",
      qty: "1",
      spec: [
        { k: "Bought", v: "Peyton Performance, 422 FM 1493, Waxahachie. 972-923-1699. Their page listed model 110 at $130.73." },
        { k: "2008 order", v: "JEGS 400-110, w/Adjustable Thermostat, $141.99. Deducted. Not in either box of invoice 098828080208." },
        { k: "What 110 is", v: "Form 99876: single fan with thermostatic control and an A/C relay." },
        { k: "Peyton listing", v: "12 in, 10 blades, 1,250 cfm, 9.5 amp, shroud 15 × 13-1/2 × 2.625. Not measured on this fan." },
        { k: "Not 111", v: "105400 is the later 8-blade S-blade. That is not the fan that was bought." },
        { k: "Not 210", v: "The underlined dual is 26-1/4 in wide. This radiator is 17 in wide, core 13-1/2 × 18-5/8." }
      ],
      notes: "JEGS prefix 400 is Flex-a-lite, so the 2008 line 400-110 is model 110. That line was pulled before it shipped. The fan now in hand is a model 110 from Peyton, the number on that order.",
      evidence: ["IMG_5825", "IMG_5812", "IMG_5813", "IMG_5939"]
    },
    {
      id: "gm-30",
      name: "GM Vortec 3.0L four",
      pn: "181 cid / 3.0L",
      brand: "GM — Buck's Engines, Lubbock",
      system: "engine",
      role: "Powerplant",
      status: "ok",
      confidence: "Handwritten on Buck's printout",
      qty: "1",
      spec: [
        { k: "Also considered", v: "1991 Chevy S10 2.5L 5-speed" },
        { k: "Gaskets 2010", v: "OSCM04-GH manifold; DET59565AS 2.5/3.0L set. That set is not the new dedicated valve-cover gasket." },
        { k: "Need now", v: "Buy list: Wix 33003, gasket Sierra 18-0347 / SME180347, thermostat kit Sierra 18-3650 / SME183650. Filter stubs: two ~4 in of 3/8 (1 ft of H350A) plus Gates 28594 onto 5/16. Valve cover 8M0122491 is separate. Not bought." },
        { k: "Pilot bushing", v: "3914000" },
        { k: "T/O bearing", v: "614018" },
        { k: "Clutch kit (kept)", v: "AWS 04-065" },
        { k: "Flywheel bolts", v: "MTM 140052" },
        { k: "Fork / ball stud", v: "15592270 / 15592268" },
        { k: "Returned clutch", v: "C1909-XL082Y + D80132-XL226C" },
        { k: "Repair kits", v: "NAPA 385 ×2 (CLU REP KIT)" },
        { k: "EPS print", v: "Engine Power Source GM 3.0L L4 industrial sheet, dated 11/26/2007" },
        { k: "Written on that print", v: "83–84 4 speed. Melling valve spring VS-380. South Carolina. 1-800-374-7522." },
        { k: "Clutch parcel", v: "Office Depot to Buck's Engines, 27 Mar 2008, marked auto clutch, 32.75 lb" }
      ],
      notes: "Flywheel face machined 0.125 in, 9 holes drilled/tapped 5/16-18 × 1 in for the pressure plate. The EPS sheet is a printout in the folder, not a measurement of this engine. An S&S Super E/G article is also in the folder and is not an invoice. Valve cover, gasket, and thermostat are the separate parts that need buying.",
      evidence: ["IMG_5809", "IMG_5807", "IMG_5793", "IMG_5871", "IMG_5863", "IMG_5929", "IMG_5957"]
    },
    {
      id: "valve-cover",
      name: "Valve cover",
      pn: "8M0122491",
      brand: "GM / Mercury",
      system: "engine",
      role: "Rocker cover. Not the head.",
      status: "replace",
      confidence: "Need new. 181 / 3.0L L4 cover. Not read off this engine. Not bought.",
      qty: "1",
      sheet: "Valve cover 8M0122491",
      spec: [
        { k: "On sheet", v: "Valve cover 8M0122491" },
        { k: "This one", v: "Steel valve cover for the GM 181 / 3.0L four. Mercury 8M0122491. Also 3853784, 65635A8, 851036T. Not the cylinder head." },
        { k: "Buy", v: "Wholesale Marine, Mercury 8M0122491, page $115.49, special order. https://www.wholesalemarine.com/mercury-mercruiser-8m0122491-valve-cover/" },
        { k: "Also", v: "Eagle Engine Sales, new 181 / 3.0L cover, $65. Replaces 8M0122491 / 3853784 / GM 02770089. Carol Stream IL. https://www.eagleenginesales.com/product-page/3-0l-181-cid-valve-rocker-cover-mercruiser-8m0122491-volvo-penta-3853784-3" },
        { k: "Look", v: "Stamped steel. No new chrome or aluminum dress-up cover is sold for this 181 four. Edelbrock chrome is V8. Cast aluminum 65635A16 is a used boat cover with shift bosses. Paint or powder the steel cover." },
        { k: "Confirm", v: "Marine covers can have a different PCV / oil-fill. Check this cover before ordering. EPS on the print: 1-800-374-7522." },
        { k: "Not", v: "Not the head. Not DET59565AS. Not OSCM04-GH. Not a small-block Chevy cover." }
      ],
      notes: "No receipt. Page prices only. Gasket is the separate part Sierra 18-0347 / NAPA SME180347.",
      evidence: ["IMG_5929", "IMG_5809"]
    },
    {
      id: "valve-cover-gasket",
      name: "Valve cover gasket",
      pn: "18-0347",
      brand: "Sierra / NAPA",
      system: "engine",
      role: "Seal under the valve cover. Not a head gasket.",
      status: "replace",
      confidence: "Need new. NAPA SME180347 found 9 Nov 2026. GM 153 / 181 CID. Not bought.",
      qty: "1",
      sheet: "18-0347",
      spec: [
        { k: "On sheet", v: "18-0347" },
        { k: "This one", v: "Sierra 18-0347, NAPA SME180347. Valve cover gasket for GM 153 and 181 CID (2.5L and 3.0L), OMC / Mercruiser / Volvo Penta. NAPA: https://www.napaonline.com/en/p/SME180347" },
        { k: "OEM", v: "Mercury 27-52145, 27-806452, 27-851040, 27-34041. OMC 913277 / 912981 / 3852693. Volvo Penta 3852693. GLM 32210. Fel-Pro Marine 17900." },
        { k: "GM analog", v: "Marine Engine Depot lists authentic GM 14096154 for the 181 / 3.0L valve cover. https://marineenginedepot.com/gasket-181-30l-valve-cover-authentic-gm" },
        { k: "2010 set", v: "DET59565AS on eBasicPower 82085 is the old 2.5/3.0L set, $30.95. That invoice is not this dedicated gasket." },
        { k: "Not", v: "Not a head gasket. Marine head-gasket analog 14096660 is not this part." }
      ],
      notes: "On the 9 Nov 2026 buy list with the fuel filter and thermostat kit. No receipt.",
      evidence: ["IMG_5863", "IMG_5929"]
    },
    {
      id: "fuel-filter",
      name: "Fuel filter",
      pn: "33003",
      brand: "Wix",
      system: "engine",
      role: "In-line fuel filter. Read on the car.",
      status: "replace",
      confidence: "Read on the car. Not on any invoice or CAD sheet. Need new. Not bought.",
      qty: "1",
      sheet: "Wix 33003",
      spec: [
        { k: "On sheet", v: "Wix 33003" },
        { k: "This one", v: "Wix 33003. Plastic in-line fuel filter, 3/8 in inlet and outlet. Read on the car. Not on the build plans. O'Reilly: https://www.oreillyauto.com/detail/c/wix/wix-fuel-filter/wix0/33003" },
        { k: "Wix sheet", v: "Complete in-line. Cellulose, 20 micron. Height 3.661 in, OD 2.087 in. Gasoline only. https://m.wixfilters.com/Search/PartDetail?PartID=47940" },
        { k: "Cross", v: "NAPA Gold 3003. NAPA ProSelect 23003. Metal version with hoses and clamps is Wix 33033." },
        { k: "Line", v: "Filter barbs are 3/8 in. The hard line on the car is a bit smaller. NAPA H-176 on the 2010 ticket catalogs as 5/16 in (.3125). Ticket itself did not print ID. Stubs are the separate fuel-hose part." },
        { k: "Not", v: "Not on any packing slip. Not an oil filter." }
      ],
      notes: "On the 9 Nov 2026 buy list with the cover gasket and thermostat kit. No receipt.",
      evidence: ["IMG_5877"]
    },
    {
      id: "fuel-hose",
      name: "Fuel filter hose stubs",
      pn: "H350A / 28594",
      brand: "NAPA / Gates",
      system: "engine",
      role: "Short rubber fuel hose from the line onto the Wix 33003. Need new.",
      status: "replace",
      confidence: "Research. ~4 in 3/8 stubs. No 4 in packaged SKU. Cut from 1 ft. Not bought.",
      qty: "two ~4 in stubs (1 ft) + 2 reducers",
      sheet: "3/8 × ~4 in",
      spec: [
        { k: "On sheet", v: "3/8 × ~4 in" },
        { k: "This one", v: "Two ~4 in stubs of 3/8 fuel hose on the Wix 33003 barbs. No packaged 4 in SKU. Ask NAPA for 1 ft of 3/8 off the reel — NAPA H350A Barricade MPI, priced per foot. Cut two 4 in pieces. https://www.napaonline.com/en/p/NBHH350A" },
        { k: "Also", v: "Same 3/8 cut from Gates 27004 / NAPA H-177 at the counter if they have the reel. H-172 2 ft pegboard is more than needed." },
        { k: "Line size", v: "Enzo: the main fuel line is a bit smaller than 3/8. NAPA H-176 catalogs as 5/16 in, ID .3125. Leftover H-176 can cover the 5/16 side." },
        { k: "Step", v: "Join 3/8 stubs to 5/16 hose with Gates 28594, 5/16–3/8 nylon reducer. Two, in and out. O'Reilly: https://www.oreillyauto.com/detail/c/gates/gates-5-16-3-8-inch-hose-connector/gat0/28594" },
        { k: "If 1/4", v: "Speedway 91011429-10 on the 2010 AN ticket is 1/4 in aluminum. Measure the hard line before buying 28594." },
        { k: "Not", v: "Not a 4 in packaged hose. Not the 2 ft H-172 pegboard. Not Wix 33033. Not stretching 5/16 onto a 3/8 barb." }
      ],
      notes: "Research, not an official lock. Not bought.",
      evidence: ["IMG_5877"]
    },
    {
      id: "napa-37728",
      name: "Clutch slave",
      pn: "37728",
      brand: "NAPA",
      system: "engine",
      role: "Hydraulic clutch slave",
      status: "ok",
      confidence: "Burton Auto Supply ticket 29 May 2008",
      qty: "1",
      spec: [
        { k: "PN", v: "37728" },
        { k: "Ticket", v: "UP CLU SLAV — net $32.57" },
        { k: "Same ticket", v: "33813 upper arm, 10269 ball joint, 385 clutch repair kit ×2" }
      ],
      notes: "There is a hydraulic clutch circuit. Fluid type is not printed on the ticket — log it under Fluids.",
      evidence: ["IMG_5869"]
    },
    {
      id: "gearbox-1442",
      name: "Gearbox",
      pn: "Not on a receipt",
      brand: "Unconfirmed — S10 5-speed was a candidate",
      system: "driveline",
      role: "Transmission behind the 3.0",
      status: "watch",
      confidence: "Named only as TRANSMISSION REAR FLANGE on the shaft drawing",
      qty: "1",
      spec: [
        { k: "On the CAD", v: "TRANSMISSION REAR FLANGE — origin of the driveshaft length" },
        { k: "Wanted note", v: "1991 Chevy S10 with 5-speed and 2.5L four — on Buck's 10/23/2007 sheet" },
        { k: "Engine actually bought", v: "GM Vortec 3.0L, not that 2.5L" },
        { k: "SKU", v: "None on any packing slip in the folder" }
      ],
      notes:
        "Do not assume a T5 or a Lotus gearbox. The paperwork never buys a transmission. Confirm what is in the tunnel, then log fluid under Fluids.",
      evidence: ["IMG_5797", "IMG_5798", "IMG_5809"]
    },
    {
      id: "driveshaft-1442",
      name: "Driveshaft",
      pn: "Ride length ~27.25 in",
      brand: "Northwest Drivetrain (shop note)",
      system: "driveline",
      role: "Trans rear flange to axle flange",
      status: "ok",
      confidence: "Owner geometry sheets IMG_5797 / IMG_5798",
      qty: "1",
      spec: [
        { k: "Ride length", v: "27.25 in (printed); HW 27 1/8 and 26.5 also on the sheet" },
        { k: "Max up / max down", v: "Printed 27.05 min/max · max down 27.30 · Dif 0.2 ≈ 3/16" },
        { k: "Rear travel from ride", v: "Up bump 3.0 in · down depression 2.25 in" },
        { k: "Shop", v: "Northwest Drivetrain, 11432 FM 529, Houston, 713-937-8499" }
      ],
      notes: "This is a length study for a shaft, not a purchased U-joint SKU.",
      evidence: ["IMG_5797", "IMG_5798"]
    },
    {
      id: "fluid-engine",
      name: "Engine oil",
      pn: "Not on paperwork",
      brand: "Log the fill",
      system: "fluids",
      role: "Sump on the 3.0 Vortec",
      status: "watch",
      confidence: "No oil grade, brand, or capacity on any invoice",
      qty: "sump",
      spec: [
        { k: "Engine", v: "GM Vortec 3.0L I4 (181)" },
        { k: "Current fill", v: "Not on paperwork" }
      ],
      notes: "Paperwork never buys a quart of oil. Update Current fill when you pour it.",
      evidence: ["IMG_5809"]
    },
    {
      id: "fluid-gearbox",
      name: "Gearbox fluid",
      pn: "Not on paperwork",
      brand: "Log the fill",
      system: "fluids",
      role: "Whatever gearbox is behind the 3.0",
      status: "watch",
      confidence: "No ATF or gear-oil SKU in the folder",
      qty: "box",
      spec: [
        { k: "Gearbox on file", v: "No SKU — see Driveline" },
        { k: "Current fill", v: "Not on paperwork" }
      ],
      notes: "Do not assume Dexron or 75W-90. Confirm the box, then log what went in.",
      evidence: ["IMG_5797", "IMG_5809"]
    },
    {
      id: "fluid-coolant",
      name: "Coolant",
      pn: "Not on paperwork",
      brand: "Log the fill",
      system: "fluids",
      role: "JEGS roadster radiator",
      status: "watch",
      confidence: "Radiator and filler bought; coolant type never invoiced",
      qty: "system",
      spec: [
        { k: "Radiator", v: "JEGS 555-51962, inline filler 555-530400" },
        { k: "Current fill", v: "Not on paperwork" }
      ],
      notes: "No Dex-Cool / Prestone / capacity on a ticket. Update Current fill after you mix it.",
      evidence: ["IMG_5825", "IMG_5813"]
    },
    {
      id: "fluid-brake",
      name: "Brake fluid",
      pn: "Not on paperwork",
      brand: "Log the fill",
      system: "fluids",
      role: "Wilwood 1 in tandem",
      status: "watch",
      confidence: "Master cylinder purchased; DOT grade not printed",
      qty: "system",
      spec: [
        { k: "Master", v: "Wilwood 835-2607563 / 260-7563" },
        { k: "Current fill", v: "Not on paperwork" }
      ],
      notes: "Do not invent DOT 3 vs DOT 4 from a typical Wilwood spec. Read the bottle you poured, then log it.",
      evidence: ["IMG_5884"]
    },
    {
      id: "fluid-clutch",
      name: "Clutch fluid",
      pn: "Not on paperwork",
      brand: "Log the fill",
      system: "fluids",
      role: "Hydraulic clutch (NAPA slave 37728)",
      status: "watch",
      confidence: "Slave is on a NAPA ticket; fluid type is not",
      qty: "circuit",
      spec: [
        { k: "Slave", v: "NAPA 37728, 29 May 2008" },
        { k: "Current fill", v: "Not on paperwork" }
      ],
      notes: "Hydraulic clutch exists. Whether it shares the Wilwood tandem or has its own reservoir is not drawn. Log the fluid you used.",
      evidence: ["IMG_5869"]
    },
    {
      id: "kinetic-body",
      name: "Kinetic Vehicles body set",
      pn: "bf01s / bf04s / bf05s / bf05f / bw01n",
      brand: "Kinetic Vehicles (OR)",
      system: "body",
      role: "Nose, scuttle, fenders, screen",
      status: "ok",
      confidence: "Invoices 2008 and 2011",
      qty: "as kits",
      spec: [
        { k: "TTL nose", v: "bf01s $189" },
        { k: "Superscuttle", v: "bf04s $189" },
        { k: "12 in steamroller fender", v: "bf05s ×2 $120" },
        { k: "30 in fender flange", v: "bf05f ×2 $30" },
        { k: "Windshield kit, no glass", v: "bw01n $150 + $10 custom" },
        { k: "Screen glass", v: "Able Glass 15-1/2 × 37-1/2 in, 1/4 in green lami" },
        { k: "Frame hole span", v: "Bottom 38-1/4 in, top 35-3/4 in" }
      ],
      notes: "Hood straps: Hot Rod Leather DFHS-4 deluxe full set + SSGL-4 guide loops. Patriot side-pipe kit with rubber hanger grommets.",
      evidence: ["IMG_5885", "IMG_5886", "IMG_5830", "IMG_5826"]
    },
    {
      id: "loom-1442",
      name: "Owner loom sheet",
      pn: "Hand-drawn — engine / lights / firewall / column",
      brand: "Builder drawing",
      system: "electrical",
      role: "The working wiring diagram",
      status: "ok",
      confidence: "IMG_5759 in the L7 folder",
      qty: "1 sheet",
      spec: [
        { k: "Blocks on the sheet", v: "Engine, Lights, Firewall, Steering column" },
        { k: "Firewall", v: "7-fuse block 910-64004 + two 8-terminal strips 910-64006 + relays" },
        { k: "Column", v: "Ignition switch, stalk, horn" }
      ],
      notes: "This is the giant folded drawing, not a factory Lotus loom. Trace a circuit from the sheet, then confirm it on the car before you cut wire.",
      evidence: ["IMG_5759"]
    },
    {
      id: "fuse-91064004",
      name: "7-fuse block",
      pn: "910-64004",
      brand: "Speedway",
      system: "electrical",
      role: "Firewall fuse panel",
      status: "ok",
      confidence: "Packing slip 3001472 + handwritten on the loom sheet",
      qty: "1",
      spec: [
        { k: "PN", v: "910-64004" },
        { k: "Packing description", v: "7 FUSE BLOCK" },
        { k: "Email description", v: "FUSE BLOCK" },
        { k: "Order", v: "E490308 / packing 3001472 — 12 Apr 2010" },
        { k: "Paid", v: "$9.99" },
        { k: "Where", v: "FIREWALL block on IMG_5759" }
      ],
      notes:
        "Bought with two 8-terminal strips on the same Speedway order. The first loom sheet does not list amps. IMG_5955, the later firewall drawing, writes 30A on the fuse positions that are readable. Read the blades on the car before you restock — the drawing and the blades can disagree.",
      evidence: ["IMG_5862", "IMG_5860", "IMG_5759", "IMG_5955"]
    },
    {
      id: "strip-91064006",
      name: "8-terminal strip",
      pn: "910-64006",
      brand: "Speedway",
      system: "electrical",
      role: "Firewall terminal strips",
      status: "ok",
      confidence: "Same Speedway order as the fuse block",
      qty: "2",
      spec: [
        { k: "PN", v: "910-64006" },
        { k: "Packing description", v: "8 TERMINAL STRIP" },
        { k: "Email description", v: "ELECTRICAL STRIP WITH EIGHT TERMINALS" },
        { k: "Order", v: "E490308 / packing 3001472 — 12 Apr 2010" },
        { k: "Paid", v: "$4.99 each · $9.98" },
        { k: "Where", v: "Two strips under the fuse block on IMG_5759" }
      ],
      notes: "Two strips. Drawn under the fuse block in the FIREWALL section of the owner loom.",
      evidence: ["IMG_5862", "IMG_5860", "IMG_5759"]
    },
    {
      id: "ss-510",
      name: "Tail lamps",
      pn: "SS 510",
      brand: "Irving Levine",
      system: "electrical",
      role: "Rear lamps",
      status: "ok",
      confidence: "Invoice in the electrical paperwork",
      qty: "2",
      spec: [{ k: "PN", v: "SS 510" }],
      notes: "Drawn on the LIGHTS side of the loom sheet.",
      evidence: ["IMG_5759"]
    },
    {
      id: "headlamps",
      name: "Headlamps",
      pn: "Bobber chrome with visor — no numeric SKU",
      brand: "Demon's Cycle",
      system: "electrical",
      role: "Front lamps, invoice says Harley-Davidson fitment",
      status: "ok",
      confidence: "Invoice 12082739, 10 Feb 2011 — qty 2 @ $38.99",
      qty: "2",
      spec: [{ k: "Source", v: "LIGHTS block on IMG_5759" }],
      notes: "The loom only draws two headlamp circles. The purchase is Demon’s Cycle invoice 12082739, 10 Feb 2011: Bobber Chrome Headlight with Visor, listed as fitting Harley-Davidson, qty 2 at $38.99. No numeric SKU on the invoice. Handwritten on the page: HEAD + TURN, and OK.",
      evidence: ["IMG_5759", "IMG_5932", "IMG_5956"]
    },
    {
      id: "horn-s10",
      name: "Horn circuit",
      pn: "1988 S10 reference diagram",
      brand: "Chevy S10 (reference, not a purchased horn SKU)",
      system: "electrical",
      role: "Column horn path",
      status: "ok",
      confidence: "Noted as an S10 reference on the build",
      qty: "circuit",
      spec: [{ k: "Reference", v: "1988 S10 horn circuit" }],
      notes: "Used as a wiring reference, not a Lotus horn part number.",
      evidence: ["IMG_5759"]
    },
    {
      id: "fan-motor",
      name: "Fan motor",
      pn: "Labeled Fan Motor on the engine block of the sheet",
      brand: "On the loom drawing",
      system: "electrical",
      role: "Engine-bay fan feed",
      status: "ok",
      confidence: "Hand-labeled on IMG_5759",
      qty: "1",
      spec: [{ k: "Sheet block", v: "ENGINE" }],
      notes: "This circle is the electrical feed on the loom. The fan now in hand is a Flex-a-lite 110. The 2008 JEGS line for that model was deducted and never shipped.",
      evidence: ["IMG_5759", "IMG_5939", "IMG_5941"]
    },
    {
      id: "flex-fan-210",
      name: "Flex-a-lite puller fan",
      pn: "Model 210 underlined",
      brand: "Flex-a-lite",
      system: "cooling",
      role: "Instruction sheet, not an invoice",
      status: "watch",
      confidence: "Sheet rev 05-02-08, form 99876. Model 210 is the underlined line.",
      qty: "sheet",
      spec: [
        { k: "110", v: "Single fan with thermostatic control and A/C relay" },
        { k: "120", v: "Single fan without that control" },
        { k: "210", v: "Dual fan with thermostatic control and A/C relay — this line is underlined" },
        { k: "220", v: "Dual fan without that control" },
        { k: "Optional switch", v: "Flex-a-lite 31148, manual, on the wiring page" },
        { k: "Motor wire", v: "12 AWG. Control wire on the sheet is 14 AWG." },
        { k: "Probe", v: "Temperature probe into the radiator fins near the inlet hose" }
      ],
      notes: "No price. Model 210 is the dual on this sheet. That shroud is 26-1/4 in wide. This radiator is 17 in wide, so the dual does not fit the core. The fan that was bought is the single, model 110.",
      evidence: ["IMG_5939", "IMG_5940", "IMG_5941", "IMG_5942"]
    },
    {
      id: "loom-colors",
      name: "Loom color code",
      pn: "Handwritten TS-1 / TS-2",
      brand: "Builder sheets",
      system: "electrical",
      role: "Wire colors and terminal letters",
      status: "watch",
      confidence: "IMG_5943 handwriting and IMG_5951 typed list. They do not match letter for letter.",
      qty: "2 sheets",
      spec: [
        { k: "Turn ribbon, as written", v: "White turn common. Lt blue left-front turn. Dk blue right turn. Yellow rear left turn and stop. Dk green rear right turn and stop." },
        { k: "Also written", v: "White from the brake switch. Brown hazard flasher in. Purple flasher in. Black, green/white, and tan bracketed as horn." },
        { k: "Gauges on TS-II", v: "Gray oil. Blue water. Yellow tach. Red fuel. Green on the last terminal." },
        { k: "Typed list", v: "IMG_5951 sends fan, lights, and gauges to TS-1 and TS-2 by letter. Use that page, not this sentence, when you land a wire." },
        { k: "Column", v: "IMG_5953: lt blue, dk blue, green, yellow, purple, white. Horn bottom. Ignition remote: 12V in, 12V out, ACC, start sol." }
      ],
      notes: "Trace the car against the sheet you are holding. Do not average the two lists into one circuit.",
      evidence: ["IMG_5943", "IMG_5951", "IMG_5952", "IMG_5953", "IMG_5955", "IMG_5956"]
    },
    {
      id: "gauges-drawn",
      name: "Instrument drawing",
      pn: "No brand on the sheet",
      brand: "Builder drawing",
      system: "electrical",
      role: "Five gauges, no sender numbers",
      status: "watch",
      confidence: "IMG_5952 only",
      qty: "drawing",
      spec: [
        { k: "Drawn", v: "Voltage, water temp, oil pressure, gas, tach" },
        { k: "Each gauge", v: "12V+, light, ground, sensor" },
        { k: "Switches drawn", v: "Headlamp off / park, and main off / on / auto" },
        { k: "Flashers drawn", v: "Turn and hazard" }
      ],
      notes: "No gauge brand and no sender part number. The firewall drawing also shows a pressure gauge and does not name it.",
      evidence: ["IMG_5952", "IMG_5955"]
    },
    {
      id: "led-blinkers",
      name: "Amber LED blinkers",
      pn: "Diamond mini motorcycle — no numeric SKU",
      brand: "Demon's Cycle",
      system: "electrical",
      role: "Turn signals, same invoice as the headlights",
      status: "ok",
      confidence: "Invoice 12082739, 10 Feb 2011 — $23.99",
      qty: "1",
      spec: [
        { k: "Line", v: "Mini Motorcycle LED Blinkers Turn Signals Amber (Diamond), listed for Harley-Davidson" },
        { k: "With them", v: "Two bobber headlights. Invoice total $101.97, shipping $0." },
        { k: "Shop", v: "Demon's Cycle South, 1407 SW 10th Ave, Pompano Beach FL" }
      ],
      notes: "The invoice quantity is 1. It does not say how many lamps are in that line.",
      evidence: ["IMG_5932"]
    },
    {
      id: "ss-carb-notes",
      name: "S&S Super carb prints",
      pn: "Circled 11-2195 and 11-2465",
      brand: "S&S Cycle — printouts, not an invoice",
      system: "engine",
      role: "Tuning article and parts page in the folder",
      status: "watch",
      confidence: "Printed 11/11/2009. No receipt.",
      qty: "pages",
      spec: [
        { k: "What it is", v: "S&S Super E and Super G tuning pages and a body-parts list" },
        { k: "Circled on the parts page", v: "Needle 11-2195. Seat 11-2465." },
        { k: "Mark", v: "“R SIDE” written on one page" }
      ],
      notes: "Do not order the rest of that parts page. Nothing here says this carb is on the 3.0.",
      evidence: ["IMG_5936", "IMG_5937", "IMG_5938", "IMG_5946", "IMG_5947", "IMG_5948", "IMG_5949"]
    },
    {
      id: "tires",
      name: "Tires",
      pn: "P205/75R14",
      brand: "Size on the 1442 geometry sheet",
      system: "wheels",
      role: "Rolling stock — update this when you mount a different tire",
      status: "ok",
      confidence: "Geometry sheet, then workshop log",
      qty: "4",
      spec: [
        { k: "As-built size", v: "P205/75R14" },
        { k: "Camber / caster", v: "−1° / +5°" },
        { k: "Current size", v: "P205/75R14" }
      ],
      notes: "Paperwork size is P205/75R14. If you replaced them, add a workshop note and set Current size — do not rewrite the geometry sheet.",
      evidence: ["IMG_5803"]
    },
    {
      id: "wheel-adp",
      name: "Wheel adapters 5×4.75",
      pn: "54755-54775",
      brand: "ezAccessory",
      system: "wheels",
      role: "S10 pattern, 2 in thick",
      status: "ok",
      confidence: "Order 25124, 19 May 2008",
      qty: "1 pair",
      spec: [
        { k: "Bolt pattern", v: "5-lug 4.75 to 5-lug 4.75" },
        { k: "Studs", v: "12×1.5" },
        { k: "Note on order", v: "Chevy / Truck / S10 / 1989" },
        { k: "Tires on geometry", v: "P205/75R14" }
      ],
      notes: "",
      evidence: ["IMG_5832", "IMG_5803"]
    },
    {
      id: "heims",
      name: "Heim joints (purchased)",
      pn: "175-0200 / 175-0203 / 175-0100 / 117-0720",
      brand: "Speedway",
      system: "steering",
      role: "Rod ends — 3/16, 3/8, 5/16",
      status: "ok",
      confidence: "Orders Apr 2010 and Mar 2010",
      qty: "mixed",
      spec: [
        { k: "3/16 RH female", v: "175-0200 — qty 2 (Apr) + qty 4 (Mar)" },
        { k: "3/8 RH female", v: "175-0203 — qty 2" },
        { k: "3/16 RH male", v: "175-0100 — qty 2" },
        { k: "5/16-24 alum RH female", v: "117-0720 — qty 1" }
      ],
      notes: "Small heims — more likely throttle, shifter, or light linkages than front A-arm inners.",
      evidence: ["IMG_5860", "IMG_5884"]
    },
    {
      id: "tie-rods",
      name: "Tie rod ends",
      pn: "MET AXE52033RLT (printed)",
      brand: "Mevotech / Auto Extra",
      system: "steering",
      role: "Application printed 1989 Chevrolet C/K",
      status: "watch",
      confidence: "Purchased 20 Apr 2009 — qty 2. Glyphs are tight.",
      qty: "2",
      spec: [{ k: "Ticket application", v: "1989 Chevrolet truck P/U C/K" }],
      notes: "Likely Mevotech ES2033RLT family. Confirm against the taper in the steering arm before ordering more.",
      evidence: ["IMG_5875"]
    },
    {
      id: "steer-shafts",
      name: "Steering shafts (modified)",
      pn: "Job 17299-01",
      brand: "United Machine Works, New Waverly",
      system: "steering",
      role: "Two shafts modified for Jim Bowers",
      status: "ok",
      confidence: "Delivery ticket 20 Apr 2009 — $150 cash",
      qty: "2",
      spec: [
        { k: "Ticket", v: "Shipment 14401, order 17299, 4/20/09" },
        { k: "Work", v: "STEERING SHAFTS MODIFICATION" },
        { k: "Paid", v: "$150.00 cash, received Jim Bowers" },
        { k: "Shop", v: "9353 Hwy 75 S, New Waverly TX, 936-344-6115" }
      ],
      notes: "No shaft diameter or spline count is on the ticket.",
      evidence: ["IMG_5810"]
    },
    {
      id: "mustang-rack",
      name: "Manual Mustang II rack",
      pn: "91034340-MAN",
      brand: "Speedway",
      system: "steering",
      role: "Rack and pinion, plain manual",
      status: "ok",
      confidence: "Order E304896, 8 Jun 2008 — $129.99",
      qty: "1",
      spec: [
        { k: "Rack", v: "91034340-MAN Manual Plain Mustang II Rack & Pinion" },
        { k: "Bolt kit", v: "91034342-2 Mustang II rack bolt kit — $6.99" },
        { k: "Mounting bushings", v: "91034341 ×2 @ $8.99" },
        { k: "Rack-end heims", v: "91002126 chrome moly RH male, 5/8-18 shank, 1/2 in hole ×2 @ $20.99" },
        { k: "Order", v: "E304896 / packing 3773204. Merchandise $409.73, shipping $28.54, total $438.27" },
        { k: "Handwriting", v: "“NO6 4HRS” on the email. Meaning is not written out." }
      ],
      notes: "These mounting bushes are for the rack, not the wishbone silentblocs. The same order bought eight more 91008051-STR rod ends and ten 91001156 jam nuts.",
      evidence: ["IMG_5930", "IMG_5931"]
    },
    {
      id: "spindle-459756",
      name: "Front spindles",
      pn: "459756 / 459755",
      brand: "GM casting",
      system: "steering",
      role: "Right and left knuckles, read on the parts",
      status: "watch",
      confidence: "Casting numbers read on the knuckles. Not on an invoice.",
      qty: "1 pair",
      spec: [
        { k: "Right", v: "459756 — passenger side, as seated in the driver seat" },
        { k: "Left", v: "459755 — driver side" },
        { k: "Family", v: "1979–1988 GM G-body disc spindle, same family used on 2WD S10 of those years" },
        { k: "Not a caliper", v: "459756 is the knuckle. The caliper numbers are 19141004 and 19141005." }
      ],
      notes: "G-body and S10 2WD share this spindle family. Ball-joint-to-tie-rod length is not identical on every listing, so measure the arm before treating a G-body spindle as a straight S10 swap. No price — these were not on a receipt.",
      evidence: []
    },
    {
      id: "an-lines",
      name: "AN brake and fuel plumbing",
      pn: "E499097 / E502605",
      brand: "Speedway",
      system: "brakes",
      role: "Lines, tees, banjos, switch, filler cap",
      status: "ok",
      confidence: "Orders 4 May 2010 ($255.84) and 14 May 2010 ($50.98)",
      qty: "as ordered",
      spec: [
        { k: "3/16 steel brake line", v: "91031810 — 25 ft roll" },
        { k: "18 in AN3 stainless", v: "91031840 — qty 2 on E499097, qty 1 on E502605" },
        { k: "AN3 steel tees", v: "6172603 ×2" },
        { k: "AN3 to 1/8 NPT straight", v: "6174244 ×8" },
        { k: "AN3 to 1/8 NPT 90°", v: "6174279 ×2" },
        { k: "AN3 / 1/8 NPT tee adapter", v: "10620312 ×1" },
        { k: "AN4 steel bulkhead", v: "324963204 ×2" },
        { k: "AN3 tube sleeves / couplers", v: "6176063 ×4 and 6176055 ×4" },
        { k: "AN4 tube sleeves / couplers", v: "6176064 ×1 and 6176056 ×1" },
        { k: "10 mm banjo kit (AN4)", v: "6172960 — bolt 6172925, washers 6173642" },
        { k: "Pressure brake switch", v: "91031305 ×1" },
        { k: "Filler-neck twist cap", v: "6175021 with aluminum bung" },
        { k: "1/4 in aluminum fuel line", v: "91011429-10, length 10" },
        { k: "Inverted flare nuts", v: "91031820, 3/8-24 for 3/16 tube, pack of 5" },
        { k: "Exchange 12 May 2010", v: "617-2770 AN3 straight bulkhead ×2, 617-2911 banjo 10 mm or 3/8 × AN3" },
        { k: "14 May 2010 add-on", v: "6176187 AN3 bulkhead nuts ×3, 6176123 90° AN3 bulkhead, clamps 91031312-3/16 and -1/4" }
      ],
      notes: "Amp or pressure rating of switch 91031305 is not printed. Fluid grade is not on these tickets.",
      evidence: ["IMG_5858", "IMG_5857", "IMG_5859"]
    },
    {
      id: "wc-37625",
      name: "Wheel cylinders",
      pn: "37625",
      brand: "NAPA",
      system: "brakes",
      role: "WC assy",
      status: "ok",
      confidence: "Burton ticket 27 May 2008",
      qty: "2",
      spec: [
        { k: "Ticket line", v: "37625 WC assy ×2" },
        { k: "Bought with", v: "Ball joints 10390 ×2, same ticket" }
      ],
      notes: "Bore size is not printed on the ticket.",
      evidence: ["IMG_5867"]
    },
    {
      id: "brk-4131206",
      name: "Brake line and gauge",
      pn: "413-1206 / HR-1",
      brand: "NAPA Burton",
      system: "brakes",
      role: "Line plus a gauge",
      status: "ok",
      confidence: "Ticket 13 May 2010 — $25.73",
      qty: "line ×2, gauge ×1",
      spec: [
        { k: "Brake line", v: "413-1206 BK BRK-LINE ×2, net $4.89 ea" },
        { k: "Gauge", v: "HR-1 NBH GAUGE ×1, net $13.93" }
      ],
      notes: "The ticket does not say what HR-1 measures (fuel, oil, temp, or vacuum).",
      evidence: ["IMG_5876"]
    },
    {
      id: "caliper-front-rh",
      name: "Front caliper, right",
      pn: "19141004",
      brand: "GM / ACDelco 18FR755",
      system: "brakes",
      role: "Passenger side, read on the part",
      status: "watch",
      confidence: "Read on the car and matched to the GM listing. Not on an invoice.",
      qty: "1",
      spec: [
        { k: "Position", v: "Front, passenger / right, as seated in the driver seat" },
        { k: "ACDelco", v: "18FR755" },
        { k: "Fitment", v: "S10 and S10 Blazer 1983–1997, one piston, cast iron, floating" },
        { k: "In the box", v: "Slides included. Bracket not included. Pads not included." },
        { k: "Check", v: "One piston is this number. Two pistons is the 1998–2004 pair, a different number." },
        { k: "Mount", v: "Bleeder ends up on top" },
        { k: "Not this", v: "19141914 and 19141006 are rear numbers" }
      ],
      notes: "No price. This was not on a 2007–2011 receipt. Current GM list price is not the catalog price.",
      evidence: []
    },
    {
      id: "caliper-front-lh",
      name: "Front caliper, left",
      pn: "19141005",
      brand: "GM / ACDelco 18FR756",
      system: "brakes",
      role: "Driver side, the mate to 19141004",
      status: "watch",
      confidence: "Mate to the passenger number read on the car. GM listing, not an invoice.",
      qty: "1",
      spec: [
        { k: "Position", v: "Front, driver / left, as seated in the driver seat" },
        { k: "ACDelco", v: "18FR756" },
        { k: "Fitment", v: "S10 and S10 Blazer 1983–1997, one piston, cast iron, floating" },
        { k: "In the box", v: "Slides included. Bracket not included. Pads not included." },
        { k: "Check", v: "Count the pistons. Two pistons means this pair is the wrong generation." },
        { k: "Mount", v: "Bleeder ends up on top" }
      ],
      notes: "No price. Pair it with 19141004. Do not use 19141914 — that listing is a rear caliper.",
      evidence: []
    },
    {
      id: "residual-valves",
      name: "Residual pressure valves",
      pn: "91031347 / 91031345",
      brand: "Speedway",
      system: "brakes",
      role: "10 psi and 2 psi, same order as the rack",
      status: "ok",
      confidence: "Order E304896, 8 Jun 2008",
      qty: "1 each",
      spec: [
        { k: "10 psi", v: "91031347 — $14.99" },
        { k: "2 psi", v: "91031345 — $14.99" },
        { k: "Which corner", v: "Not written on the order" }
      ],
      notes: "The Wilwood remote-reservoir sheet in the folder talks about residual valves in general. It does not say which of these two went to the disc end or the drum end.",
      evidence: ["IMG_5930", "IMG_5931", "IMG_5935"]
    },
    {
      id: "prop-valve",
      name: "Proportioning valve",
      pn: "91031355",
      brand: "Speedway",
      system: "brakes",
      role: "Knob style",
      status: "ok",
      confidence: "Order E304896, 8 Jun 2008 — $32.99",
      qty: "1",
      spec: [{ k: "Description", v: "Speedway Proportioning Valve, Knob Style" }],
      notes: "Bought with the residual valves and the Mustang II rack. The sheet does not say where it is mounted.",
      evidence: ["IMG_5930", "IMG_5931"]
    },
    {
      id: "clutch-fork",
      name: "Clutch fork and ball stud",
      pn: "15592270 / 15592268",
      brand: "Buck's Engines",
      system: "engine",
      role: "Fork and pivot on invoice P015582B",
      status: "ok",
      confidence: "3/21/2008 — fork $10, stud $7. Not on the return highlight.",
      qty: "1 each",
      spec: [
        { k: "Clutch fork", v: "15592270 — $10.00" },
        { k: "Ball stud", v: "15592268 BALL STUD-I — $7.00" },
        { k: "Kept with", v: "Pilot 3914000 and T/O 614018" },
        { k: "Returned", v: "GM clutch D80132-XL226C and pressure plate C1909-XL082Y" }
      ],
      notes: "The return note only highlights the clutch disc and pressure plate as not fitting the flywheel.",
      evidence: ["IMG_5807"]
    },
    {
      id: "bucks-15530202",
      name: "Buck's line 15530202",
      pn: "15530202",
      brand: "Buck's Engines",
      system: "engine",
      role: "Printed description: IRRIGATION",
      status: "watch",
      confidence: "On clutch invoice P015582B — $219.83",
      qty: "1",
      spec: [
        { k: "Printed description", v: "IRRIGATION" },
        { k: "Price", v: "$219.83" },
        { k: "Invoice", v: "P015582B, 21 Mar 2008" }
      ],
      notes: "The sheet does not say what this is on the car. Logged exactly as printed.",
      evidence: ["IMG_5807"]
    },
    {
      id: "clutch-385",
      name: "Clutch repair kit",
      pn: "385",
      brand: "NAPA",
      system: "engine",
      role: "CLU REP KIT — not the AWS clutch",
      status: "ok",
      confidence: "Same 29 May 2008 ticket as slave 37728",
      qty: "2",
      spec: [
        { k: "Ticket", v: "UP CLU REP KIT, net $5.50 each" },
        { k: "Full clutch kept", v: "AutoStar AWS 04-065, 26 Mar 2008" },
        { k: "Flywheel bolts", v: "MTM 140052, same AutoStar ticket as the AWS kit" }
      ],
      notes: "Two small repair kits. The clutch that stayed in the car is AWS 04-065.",
      evidence: ["IMG_5869", "IMG_5871"]
    },
    {
      id: "vbelt-257417",
      name: "V-belt",
      pn: "25-7417",
      brand: "NAPA",
      system: "engine",
      role: "NBH V BELT",
      status: "ok",
      confidence: "Burton invoice ~902206, 28 Mar 2008 — $21.25 with red bolts",
      qty: "1",
      spec: [
        { k: "Belt", v: "25-7417, net $12.93" },
        { k: "Also on ticket", v: "10 red bolts @ $0.40 and 6 red bolts @ $0.45" }
      ],
      notes: "Length and section are not written out beyond the NAPA number.",
      evidence: ["IMG_5870"]
    },
    {
      id: "seals-tim",
      name: "Timken seals",
      pn: "96138 / 7412S / 21043 / 6510",
      brand: "Timken — AutoStar",
      system: "engine",
      role: "Four seals, two tickets, 27 Mar 2008",
      status: "ok",
      confidence: "REF 0000202239 and 0000202238",
      qty: "1 each",
      spec: [
        { k: "96138", v: "SEAL — pay ticket $10.15 with 7412S" },
        { k: "7412S", v: "SEAL" },
        { k: "21043", v: "SEAL — pay ticket $21.30 with 6510" },
        { k: "6510", v: "SEAL" }
      ],
      notes: "Tickets say SEAL only. Shaft and housing sizes are not printed.",
      evidence: ["IMG_5873", "IMG_5874"]
    },
    {
      id: "fuel-hardware",
      name: "Fuel line, hose end, choke kit",
      pn: "H-176 / 05705B-C02 / 732-1153",
      brand: "NAPA Burton",
      system: "engine",
      role: "30 Dec 2010 fuel and choke ticket",
      status: "ok",
      confidence: "Ticket $34.12",
      qty: "as ticket",
      spec: [
        { k: "Fuel line", v: "H-176 ×5, NBH FUEL LIN, net $1.29. Ticket did not print ID. NAPA H176 catalog is 5/16 in (.3125) SAE J30R7." },
        { k: "Hose end", v: "05705B-C02 WH HOSE END ×1" },
        { k: "Clamps", v: "CL1 ×4" },
        { k: "Choke kit", v: "732-1153 BK CHOK KIT, net $19.29" },
        { k: "Also bought (Speedway)", v: "1/4 in aluminum fuel line 91011429-10 and filler cap 6175021 — see AN plumbing" }
      ],
      notes: "Ticket did not print hose ID. NAPA H176 catalog is 5/16 in. Choke kit application is not printed. The in-line fuel filter on the car is Wix 33003, a separate part. Filter stubs are the fuel-hose part.",
      evidence: ["IMG_5877", "IMG_5858"]
    },
    {
      id: "heater-hose",
      name: "Heater hose and terminals",
      pn: "GAT 28432 / TDL 5216 / MTM 85X32 / 85S10",
      brand: "Gates / Auto Plus",
      system: "cooling",
      role: "23 Jun 2011 small-parts ticket",
      status: "ok",
      confidence: "REF 0000403749 — $10.11",
      qty: "hose ×2",
      spec: [
        { k: "Heater hose", v: "GAT 28432 HEATR HOSE ×2" },
        { k: "Housing", v: "TDL 5216 C/HOUSING ×2" },
        { k: "Bullet terminal", v: "MTM 85X32 TERM BULLET 16 ×1" },
        { k: "Socket", v: "MTM 85S10 SOCKET 3 TERM H ×1" }
      ],
      notes: "Hose length is not on the ticket. Terminals are electrical hardware on a cooling-parts ticket. This is the 3/4 in heater hose. The radiator-to-block hose is Gates Green Stripe Vulco-Flex 26502, not this part.",
      evidence: ["IMG_5878"]
    },
    {
      id: "an12-spruce",
      name: "−12AN radiator fittings",
      pn: "AN833-12D / AN821-12D / AN924-12D",
      brand: "Aircraft Spruce",
      system: "cooling",
      role: "Bulkhead, elbow, nut — May 2009",
      status: "ok",
      confidence: "Order 701046 — $31.46 shipped",
      qty: "1 each",
      spec: [
        { k: "Bulkhead", v: "AN833-12D" },
        { k: "Elbow", v: "AN821-12D" },
        { k: "Nut", v: "AN924-12D" },
        { k: "Washers", v: "04-00398 #10 SS countersunk A3235-SS-020 ×10" }
      ],
      notes: "Separate from the JEGS 555-530082 radiator fittings bought in 2008.",
      evidence: ["IMG_5894"]
    },
    {
      id: "tube-4130",
      name: "4130 tube",
      pn: "03-06000-4 / 03-01500-4",
      brand: "Aircraft Spruce",
      system: "chassis",
      role: "Chromoly tube, two sizes",
      status: "ok",
      confidence: "Orders Jun 2008 and Feb 2011",
      qty: "5 sticks each",
      spec: [
        { k: "7/8 × .188 × 4 ft", v: "03-06000-4 ×5 — 21 Jun 2008, $150 + freight (HW 169.90)" },
        { k: "3/8 × .065 × 4 ft", v: "03-01500-4 ×5 — 10 Feb 2011, $60" },
        { k: "Sheet", v: "03-34510 4×12 3003-H14 .050 aluminum ×2 — 21 Jun 2008, $279.90" }
      ],
      notes: "Where each stick was cut is not on the invoices. Trailing-rod CAD is the place the 4130 shows up in the drawings.",
      evidence: ["IMG_5888", "IMG_5879", "IMG_5895"]
    },
    {
      id: "an8-bolts",
      name: "AN8 bolts, nuts, washers",
      pn: "AN8-25A / AN364-820A / AN970-8",
      brand: "Aircraft Spruce",
      system: "chassis",
      role: "Airframe hardware",
      status: "ok",
      confidence: "May 2008 plus a Mar 2010 refill",
      qty: "see spec",
      spec: [
        { k: "May 2008", v: "20 AN364-820A nuts, 2 AN8-25A bolts (18 backordered), 40 AN970-8 washers — paid $48.39" },
        { k: "Backorder 27 May 2008", v: "18 AN8-25A — $34.92" },
        { k: "4 Mar 2010", v: "10 AN364-820A + 10 AN8-25A — $46.15" }
      ],
      notes: "AN8-25A is a 1/2 in undrilled bolt. Grip length is the -25 dash number on the invoice, not a measured installed length.",
      evidence: ["IMG_5897", "IMG_5896", "IMG_5864"]
    },
    {
      id: "huntsville-steel",
      name: "Huntsville steel (beyond the 1×1)",
      pn: "Sales 1322661 / 1323276 / 1325050 / 1325106",
      brand: "Huntsville Steel & Fabrication",
      system: "chassis",
      role: "Cold-roll, angle, flat, sheet, 1-3/4 tube",
      status: "ok",
      confidence: "Four tickets, Nov 2007 – Jun 2008",
      qty: "as tickets",
      spec: [
        { k: "1 Nov 2007", v: "CR 3/8 CF ×40, CR 1/4 CF ×40, rec tubing, 3/4×1/8 flat ×40, 1/2×1/8 flat ×40 — $73.30" },
        { k: "4 Jan 2008", v: "1-1/2×1-1/2×1/8 angle ×60, 1/8×4 flat ×10, 3/4 black pipe ×10 — $69.50" },
        { k: "20 Jun 2008", v: "1-3/4×1-3/4×14 ga tube ×10, 1/2×3 flat ×6 — $52.56" },
        { k: "27 Jun 2008", v: "Sheet metal ×2 — $124.06. HW: CAR KEEP. Gauge not stated." },
        { k: "Main chassis tube", v: "1×1×16 ga ×336 ft and 1×1×14 ga ×144 ft — sale 1322968, 3 Dec 2007, $264.48" }
      ],
      notes: "Farm-use tickets. The 1×1 order is the chassis tube; the rest is stock that was bought, not a cut list.",
      evidence: ["IMG_5892", "IMG_5887", "IMG_5893", "IMG_5889"]
    },
    {
      id: "por15",
      name: "POR-15 chassis coating",
      pn: "1GB / MRQ / SVQ",
      brand: "POR-15",
      system: "chassis",
      role: "Black gallon, Metal Ready, solvent",
      status: "ok",
      confidence: "Order 3319347 / invoice 230480A — 17 Feb 2010, $195.75",
      qty: "1 gal + prep",
      spec: [
        { k: "POR-15", v: "1GB gallon, black — $143.00" },
        { k: "Metal Ready", v: "MRQ quart — $16.50" },
        { k: "Solvent", v: "SVQ quart ×2 — $23.50" },
        { k: "Ship", v: "UPS Ground $12.75" }
      ],
      notes: "Metal Ready sheet says it is for steel and is not required on galvanized, aluminum, stainless, or new smooth metal.",
      evidence: ["IMG_5817", "IMG_5902", "IMG_5821"]
    },
    {
      id: "weld-supply",
      name: "MIG wire and abrasives",
      pn: "AOC ticket 345405",
      brand: "AOC Welding Supply, Huntsville",
      system: "chassis",
      role: "4043 aluminum, ER70S-6, cutoff wheels",
      status: "ok",
      confidence: "18 May 2010 — $69.61",
      qty: "as ticket",
      spec: [
        { k: "Aluminum MIG", v: "4043 .035, 1 lb spool" },
        { k: "Steel MIG", v: "ER70S-6 .023, 11 lb" },
        { k: "Cutoff", v: "4.5 × .045 × 7/8 thin wheels ×4" },
        { k: "Flap / disc", v: "Weiler 4-1/2 × 5/8-11 60 grit ×3" }
      ],
      notes: "Consumables, not a chassis part number.",
      evidence: ["IMG_5899"]
    },
    {
      id: "exhaust-bends",
      name: "Exhaust bends",
      pn: "91013670 / 91013874",
      brand: "Speedway",
      system: "body",
      role: "Combo bends, 1-1/2 in and 2 in",
      status: "watch",
      confidence: "Order E3082433, 21 Jun 2008 — $81.78. HW “NO.” beside the 1-1/2 in line.",
      qty: "4 + 1 ordered",
      spec: [
        { k: "1-1/2 in", v: "91013670 combo exhaust bend ×4 @ $12.99" },
        { k: "2 in", v: "91013874 combo exhaust bend ×1 @ $14.99" },
        { k: "Handwriting", v: "“NO.” next to the 1-1/2 in line; a mark next to the 2 in line; “OK” at the bottom" }
      ],
      notes: "The “NO.” may mean those four bends were rejected. The sheet does not say a replacement was ordered.",
      evidence: ["IMG_5816"]
    },
    {
      id: "side-exhaust-60",
      name: "Chrome side exhaust, 60 in",
      pn: "91013460",
      brand: "Speedway",
      system: "body",
      role: "One 60 in chrome side pipe",
      status: "ok",
      confidence: "Order E318856, 2 Aug 2008 — $172.99",
      qty: "1",
      spec: [
        { k: "Description", v: "Chrome Side Exhaust, 60 in Long" },
        { k: "Packing", v: "3259516, 3 Aug 2008" },
        { k: "Money", v: "Merchandise $172.99, shipping $31.00, total $203.99" },
        { k: "Handwriting", v: "OK on the email" }
      ],
      notes: "This is a Speedway invoice. It is not the Patriot instruction sheet, which still has no receipt.",
      evidence: ["IMG_5944", "IMG_5945"]
    },
    {
      id: "seats-upholstery",
      name: "Seats",
      pn: "Wave / Solar Fleece, black",
      brand: "The Upholstery Room, Huntsville",
      system: "body",
      role: "Two seats, labor and padding",
      status: "ok",
      confidence: "Handwritten invoice 2/23/11",
      qty: "2",
      spec: [
        { k: "Material written", v: "Wave — Solar Fleece" },
        { k: "Color written", v: "Black" },
        { k: "Work", v: "Seats, labor and padding — $525.00" },
        { k: "Tax", v: "$43.31" },
        { k: "Total", v: "$568.31" },
        { k: "Deposit", v: "$200.00, balance $368.31" },
        { k: "Shop", v: "526 11th St, Huntsville TX 77340, 936-435-0211" },
        { k: "Sold to", v: "James Bowers. Phone on the ship-to line 936-891-7236" },
        { k: "Under the totals", v: "A handwritten line reads like a through-date of Apr 7. The letters in front of it are tight." }
      ],
      notes: "No foam brand, no frame number, and no stitch count beyond what is written here.",
      evidence: ["IMG_5958"]
    },
    {
      id: "patriot-pipes",
      name: "Side-pipe kit",
      pn: "Patriot kit — no SKU on the sheet",
      brand: "Patriot Exhaust",
      system: "body",
      role: "Instruction sheet only",
      status: "watch",
      confidence: "Install sheet dated 07/04. No invoice in the folder.",
      qty: "kit as drawn",
      spec: [
        { k: "In the kit", v: "2 muffler cases, 2 chrome inlets, 2 chrome outlets, 2 heat shields" },
        { k: "Hangers", v: "4 female grommets, 4 male grommets, 4 flat washers, 4 × 3/8×1 MS, 4 BRL4 brackets" },
        { k: "Clamps", v: "4 assembled 3 in clamps, 8 × 10×1/2 SMS" }
      ],
      notes: "Bought-or-not is not proven by a receipt. The instruction sheet is in the paperwork.",
      evidence: ["IMG_5826"]
    },
    {
      id: "hood-straps",
      name: "Hood straps",
      pn: "DFHS-4 / SSGL-4 / BP-4",
      brand: "Hot Rod Leather, Novato",
      system: "body",
      role: "Deluxe full set, buckle pads, guide loops",
      status: "ok",
      confidence: "Invoices 16902 (14 Feb 2011, $287.35) and 16921 (8 Mar 2011, $17)",
      qty: "1 set + 4 loops",
      spec: [
        { k: "Straps", v: "DFHS-4 deluxe full hood strap set — $249" },
        { k: "Pads", v: "BP-4 buckle pads — $20" },
        { k: "Loops", v: "SSGL-4 stainless guide loops, set of 4 — $12, invoiced a month later" },
        { k: "Handwriting", v: "+ 4 LOOPS. Mailed straps back Feb 24 via Priority." }
      ],
      notes: "Instructions say a secondary hood latch, and 1/2 to 1 in spring stretch from rest.",
      evidence: ["IMG_5830", "IMG_5831"]
    },
    {
      id: "screen-glass",
      name: "Windscreen glass",
      pn: "W/O 05157111",
      brand: "Able Glass, Huntsville",
      system: "body",
      role: "1/4 in green laminate, cut to pattern",
      status: "ok",
      confidence: "29 Jun 2011 — $97.05",
      qty: "1",
      spec: [
        { k: "Size", v: "15-1/2 × 37-1/2 in" },
        { k: "Glass", v: "1/4 in green lami, code printed 4GRL" },
        { k: "Shop", v: "13000 Ave Q, Huntsville, 936-295-5784" },
        { k: "Frame it fits", v: "Kinetic bw01n. Bottom frame hole span 38-1/4 in, top 35-3/4 in" }
      ],
      notes: "Kinetic kit was sold as windshield kit, no glass. This is the glass.",
      evidence: ["IMG_5833", "IMG_5886"]
    }
  ],
  evidenceIndex: {
    IMG_5759: "Owner wiring diagram — engine, lights, column, firewall",
    IMG_5760: "QA1 UR4855P ride-height worksheet",
    IMG_5761: "QA1 Ultra Ride UR4855P spec sheet",
    IMG_5784: "Shock travel scratch pad — 12.5 in ride",
    IMG_5785: "BYOSC pedal plates PB1–PB4 + accelerator",
    IMG_5790: "BYOSC pedal box",
    IMG_5791: "1442 chassis — rocker wishbone fittings",
    IMG_5792: "BYOSC brake and clutch pedals",
    IMG_5793: "Flywheel / pressure-plate machine notes",
    IMG_5794: "Front link lengths and wishbone spans",
    IMG_5795: "Upper wishbone CAD — 135 POLY callout",
    IMG_5796: "1442 chassis geometry, right side",
    IMG_5797: "Transmission rear flange / driveshaft ride length",
    IMG_5798: "Northwest Drivetrain — shaft study + shop note",
    IMG_5799: "Trailing rod top — 1.06 in bush",
    IMG_5800: "Trailing rod lower",
    IMG_5801: "Lower wishbone CAD — FINAL MOD",
    IMG_5802: "Panhard 18.36 in",
    IMG_5803: "P205/75R14, −1° camber, +5° caster",
    IMG_5804: "Front corner overlay",
    IMG_5805: "Spindle dimensions",
    IMG_5807: "Buck's Engines clutch invoice / return",
    IMG_5809: "3.0L Vortec notes",
    IMG_5810: "United Machine Works steering shafts",
    IMG_5811: "Speedway QA1 coilover kits + Carrera springs",
    IMG_5812: "JEGS radiator fittings",
    IMG_5813: "JEGS −12AN radiator",
    IMG_5825: "JEGS cooling confirmation",
    IMG_5826: "Patriot side-pipe kit",
    IMG_5830: "Hot Rod Leather hood straps",
    IMG_5832: "S10 4.75 wheel adapters",
    IMG_5846: "Speedway maps 7214855 → UR4855P-1",
    IMG_5847: "Ultra Ride poly vs bearing eyes",
    IMG_5860: "Speedway E490308 — fuse block, 8-term strips, heims",
    IMG_5862: "Speedway packing 3001472 — 7 FUSE BLOCK 910-64004",
    IMG_5863: "GM 3.0L gasket set",
    IMG_5867: "NAPA ball joints 10390",
    IMG_5868: "NAPA 33813 upper arm + 10269 ball joint",
    IMG_5869: "NAPA clutch slave / kits",
    IMG_5871: "AWS 04-065 clutch kit",
    IMG_5875: "Tie rod ends, 1989 C/K",
    IMG_5881: "QA1 225 lb and 300 lb kits",
    IMG_5882: "910-08015 bushing kit packing slip",
    IMG_5883: "910-08015 email — Front Rod End Bushing Kit 1/2 in",
    IMG_5884: "Wilwood master + heims",
    IMG_5885: "Kinetic TTL nose + superscuttle",
    IMG_5886: "Kinetic steamroller fenders + screen",
    IMG_5892: "Huntsville Steel 1×1 tube",
    IMG_5854: "Book Geometry P8-6 vs updated 1442 rear geometry",
    IMG_5808: "Buck's P015582B — clean copy of the clutch invoice",
    IMG_5816: "Speedway E3082433 — exhaust bends 91013670 / 91013874",
    IMG_5817: "POR-15 invoice 230480A — black gallon, Metal Ready, solvent",
    IMG_5821: "POR-15 Metal Ready application sheet",
    IMG_5831: "Hot Rod Leather SSGL-4 guide loops",
    IMG_5833: "Able Glass 15-1/2 × 37-1/2 green lami",
    IMG_5857: "Speedway E502605 — AN3 line, clamps, 90° bulkhead",
    IMG_5858: "Speedway E499097 — brake and fuel AN plumbing",
    IMG_5859: "Speedway exchange — AN3 bulkhead and 10 mm banjo",
    IMG_5864: "Aircraft Spruce AN364-820A and AN8-25A, Mar 2010",
    IMG_5870: "NAPA V-belt 25-7417",
    IMG_5873: "Timken seals 96138 and 7412S",
    IMG_5874: "Timken seals 21043 and 6510",
    IMG_5876: "NAPA brake line 413-1206 and gauge HR-1",
    IMG_5877: "NAPA fuel line H-176 and choke kit 732-1153",
    IMG_5878: "Gates heater hose 28432 and terminals",
    IMG_5879: "Aircraft Spruce 4130 3/8 × .065",
    IMG_5887: "Huntsville cold-roll, rec tubing, flat bar",
    IMG_5888: "Aircraft Spruce 4130 7/8 × .188",
    IMG_5889: "Huntsville 1-3/4 tube and 1/2×3 flat",
    IMG_5893: "Huntsville angle, flat, 3/4 black pipe",
    IMG_5894: "Aircraft Spruce −12AN fittings",
    IMG_5895: "Aircraft Spruce 3003-H14 aluminum sheet",
    IMG_5896: "Aircraft Spruce AN8-25A backorder",
    IMG_5897: "Aircraft Spruce AN8 bolts, nuts, washers",
    IMG_5899: "AOC welding — 4043, ER70S-6, cutoff wheels",
    IMG_5902: "POR-15 web confirmation 3319347",
    IMG_5929: "Engine Power Source GM 3.0L L4 print, 11/26/2007, with 83–84 4-speed and VS-380 notes",
    IMG_5930: "Speedway E304896 — Mustang II rack, residual valves, proportioning valve",
    IMG_5931: "Speedway packing 3773204 for E304896",
    IMG_5932: "Demon's Cycle 12082739 — two bobber headlights and amber LED blinkers",
    IMG_5933: "Wilwood 260-7563 remote-reservoir instruction, page 1",
    IMG_5934: "Wilwood 260-7563 mounting dimensions",
    IMG_5935: "Wilwood remote reservoir and residual-valve notes",
    IMG_5936: "S&S Super carb adjustments, page 1 — not an invoice",
    IMG_5937: "S&S Super carb adjustments, page 2, marked R SIDE",
    IMG_5938: "S&S Super carb adjustments, page 3",
    IMG_5939: "Flex-a-lite 110/120/210/220 instructions, model 210 underlined",
    IMG_5940: "Flex-a-lite puller fan install, form 99876 page 1",
    IMG_5941: "Flex-a-lite fan wiring, form 99876 page 2",
    IMG_5942: "Flex-a-lite fan wiring, form 99876 page 3, probe in the fins",
    IMG_5943: "Handwritten TS-1 / TS-2 color code over the fan wiring page",
    IMG_5944: "Speedway E318856 — chrome side exhaust 91013460, 60 in",
    IMG_5945: "Speedway packing 3259516 for the 60 in side exhaust",
    IMG_5946: "Carburetor exploded view, page 25, no parts list on this photo",
    IMG_5947: "S&S jetting chart print, 11/11/2009",
    IMG_5948: "S&S jetting chart page 2",
    IMG_5949: "S&S Super E/G parts list, needle 11-2195 and seat 11-2465 circled",
    IMG_5950: "Coldspring shop form for 4961 Old Staley — no part lines",
    IMG_5951: "Typed terminal list — fan, lights, and gauges to TS-1 and TS-2",
    IMG_5952: "Instrument drawing — voltage, water, oil, gas, tach",
    IMG_5953: "Steering-column switch drawing and horn bottom",
    IMG_5955: "Firewall drawing — fuse positions marked 30A, TS-1, TS-2, ground",
    IMG_5956: "Lights drawing — head high/low, turn/park, tail/stop, dimmer",
    IMG_5957: "Office Depot parcel to Buck's Engines, marked auto clutch, 27 Mar 2008",
    IMG_5958: "Upholstery Room invoice — two seats, Wave / Solar Fleece, black"
  },
  guide: {
    title: "Chassis 1442 build book",
    kicker: "From the L7 folder — not a reprint of Champion",
    note:
      "Ron Champion's Build Your Own Sports Car (the Locost book) is the method this car started from. Only three plates from that book were in the folder: p.54 pedal box, p.186 pedal plates, p.187 brake and clutch pedals. The rest of Champion is copyrighted — buy the Haynes edition if you want the full published text. The working blueprint for THIS car is the builder's own CAD on chassis 1442, plus the invoices. That is what this guide is.",
    chapters: [
      {
        id: "origin",
        n: "01",
        title: "What this car is",
        system: "chassis",
        body: "Locost Seven, not a factory Lotus or a Caterham. Built 2007–2011 by James Bowers in Oakhurst, TX. Donor language throughout is Chevy S10 (4.75 pattern, clutch, horn diagram). Body is Kinetic Vehicles. Engine is a GM 3.0 Vortec four.",
        evidence: ["IMG_5809", "IMG_5885"]
      },
      {
        id: "champion",
        n: "02",
        title: "Champion plates on file",
        system: "brakes",
        body: "Three pages from Build Your Own Sports Car, with the builder's inch conversions written on them. Fig. 4.37 fabricated pedal box (p.54). Pedal box plates PB1–PB4 and accelerator (p.186). Brake and clutch pedals (p.187). Holes to suit the master — later a Wilwood 1 in tandem.",
        evidence: ["IMG_5790", "IMG_5785", "IMG_5792"]
      },
      {
        id: "book-geo",
        n: "03",
        title: "Book geometry vs 1442",
        system: "rear-suspension",
        body: "Sheet labeled Book Geometry (P8-6) / book.frshp.pdf next to Updated Book Geometry and Rear Geometry (P8-6). This is where the Locost book numbers were redrawn for this chassis. Do not order from the faint dimensions — use the later 1442 wishbone sheets.",
        evidence: ["IMG_5854", "IMG_5791", "IMG_5794"]
      },
      {
        id: "frame",
        n: "04",
        title: "Spaceframe",
        system: "chassis",
        body: "Huntsville Steel: 336 ft of 1×1×16 ga plus 144 ft of 1×1×14 ga (Dec 2007), then cold-roll, 1-1/2 angle, 1-3/4×14 ga tube, and sheet. Aircraft Spruce 4130 03-06000-4 (7/8×.188) and 03-01500-4 (3/8×.065), plus AN8-25A bolts. POR-15 black gallon 1GB, Metal Ready MRQ, solvent SVQ. AOC 4043 aluminum and ER70S-6. Chassis tag 1442.",
        evidence: ["IMG_5892", "IMG_5791"]
      },
      {
        id: "front",
        n: "05",
        title: "Front wishbones — this car's blueprint",
        system: "front-suspension",
        body: "Owner CAD, 1/4 in plate. Upper: 10.643 in, 8.5° pivot, handwritten 135 POLY .175 or TOP on the inner tubes. Lower FINAL MOD: 16.966 in, BJ up through bottom, 1-3/4 in hole, 5/8-20. This is the drawing set to use when replacing bushes — not a Caterham parts list.",
        evidence: ["IMG_5795", "IMG_5801", "IMG_5794"]
      },
      {
        id: "dampers",
        n: "06",
        title: "Coilovers",
        system: "front-dampers",
        body: "QA1 Ultra Ride 12 in, poly eyes UR4855P-1. Two Speedway kits 721-485 with Carrera 10 in springs. Builder ride-height notes settle around 12.5 in shock length.",
        evidence: ["IMG_5811", "IMG_5784", "IMG_5761"]
      },
      {
        id: "rear",
        n: "07",
        title: "Rear locate",
        system: "rear-suspension",
        body: "4130 trailing rods, bush width 1.06 in. Panhard 18.36 in ball-to-ball. Rear bump 3.0 in / droop 2.25 in. AFCO panhard and 4-link printouts are setup theory, not the hardware list.",
        evidence: ["IMG_5799", "IMG_5800", "IMG_5802"]
      },
      {
        id: "power",
        n: "08",
        title: "Engine and clutch",
        system: "engine",
        body: "GM Vortec 3.0L (181). First GM clutch returned. Kept AWS 04-065, flywheel bolts MTM 140052, fork 15592270, ball stud 15592268, pilot 3914000, T/O 614018. NAPA 385 is a clutch repair kit ×2. V-belt 25-7417. Timken seals 96138, 7412S, 21043, 6510. Fuel line H-176, choke kit 732-1153. Buck's 15530202 prints as IRRIGATION and is not identified. Flywheel faced 0.125 in, nine 5/16-18 holes. Gaskets OSCM04-GH and DET59565AS. Slave 37728. S10 5-speed was a candidate — no gearbox invoice. Need a new valve cover, not the head: 8M0122491. Buy list: Wix 33003, gasket Sierra 18-0347 / SME180347, thermostat kit Sierra 18-3650 / SME183650. Wix 33003 barbs are 3/8. The hard line is a bit smaller; H-176 catalogs as 5/16. Filter stubs: two ~4 in of 3/8, cut from 1 ft of NAPA H350A, plus Gates 28594. Not bought yet.",
        evidence: ["IMG_5809", "IMG_5793", "IMG_5871", "IMG_5869"]
      },
      {
        id: "cool",
        n: "09",
        title: "Cooling",
        system: "cooling",
        body: "JEGS 555-51962 roadster radiator −12AN, 17×19-1/2 overall, core 13-1/2×18-5/8, inline filler, hose drain 071063700. Confirmation 3195204 listed 400-110 with an adjustable thermostat at $141.99. That line was deducted and is not in invoice 098828080208. A Flex-a-lite model 110 was later bought from Peyton Performance in Waxahachie. Their page listed it at $130.73. No receipt is in the folder. 111 / 105400 is a later 8-blade fan and was not bought. The underlined model 210 is the dual, 26-1/4 in wide, which does not fit this radiator. Aircraft Spruce AN833-12D, AN821-12D, AN924-12D in May 2009. Gates heater hose 28432 in June 2011 is 3/4 in. On 7 Nov 2026 the radiator-to-block hose burst. Official hose is Gates Green Stripe Vulco-Flex 26502, 1-3/4 both ends × 16-1/2 in. Perfect match. Molded SKUs, 1-1/2 Vulco-Flex II, elbows, and the 1-1/2 × 1-3/4 step were failed research. Thermostat kit on the buy list is Sierra 18-3650 / NAPA SME183650, 140°F (18-3550 + cover gasket 18-2831). Closed-cooling 160° is Sierra 18-3649 / SME183649. WINCO industrial Z33001814 has no printed temp and no catalog cross. Not bought yet.",
        evidence: ["IMG_5825", "IMG_5813"]
      },
      {
        id: "stop",
        n: "10",
        title: "Brakes and pedals",
        system: "brakes",
        body: "Champion pedal box (p.54) converted to inches. Wilwood 1 in tandem 260-7563, with the dimensioned instruction sheet in the folder. Speedway E304896, 8 Jun 2008: residual valves 91031347 (10 psi) and 91031345 (2 psi), proportioning valve 91031355. Speedway E499097: 3/16 steel line 91031810, AN3 stainless 91031840, tees, banjos, pressure switch 91031305, filler cap 6175021. Follow-up E502605 and the 617-2911 banjo exchange. NAPA wheel cylinders 37625, brake line 413-1206, gauge HR-1.",
        evidence: ["IMG_5790", "IMG_5884", "IMG_5785"]
      },
      {
        id: "skin",
        n: "11",
        title: "Body",
        system: "body",
        body: "Kinetic TTL nose bf01s, superscuttle bf04s, 12 in steamroller fenders, windshield kit bw01n. Able Glass 15-1/2×37-1/2 1/4 green lami, W/O 05157111. Hot Rod Leather DFHS-4, buckle pads BP-4, guide loops SSGL-4. The Upholstery Room, 23 Feb 2011: two seats, Wave / Solar Fleece, black, labor and padding $525. Patriot side-pipe instructions still have no invoice. Speedway chrome side exhaust 91013460, 60 in, 2 Aug 2008, $172.99. Bends 91013670 (1-1/2 in ×4, marked NO.) and 91013874 (2 in ×1).",
        evidence: ["IMG_5885", "IMG_5886", "IMG_5830"]
      },
      {
        id: "wire",
        n: "12",
        title: "Loom",
        system: "electrical",
        body: "Hand-drawn sheet: engine, lights, steering column, firewall. Speedway 7-fuse block 910-64004 and two 8-terminal strips 910-64006 (order E490308, 12 Apr 2010). IMG_5955 writes 30A on the fuse positions. Color code and the TS-1 / TS-2 list are IMG_5943 and IMG_5951 — they do not agree letter for letter, so trace the sheet you are holding. Demon’s Cycle, 10 Feb 2011: two bobber headlights and one amber LED blinker line, no numeric SKUs. SS 510 tail lamps.",
        evidence: ["IMG_5759", "IMG_5943", "IMG_5955", "IMG_5932"]
      },
      {
        id: "shaft",
        n: "13",
        title: "Shaft and gearbox",
        system: "driveline",
        body: "CAD labels TRANSMISSION REAR FLANGE. Driveshaft ride ~27.25 in, bump 3.0 / droop 2.25. Northwest Drivetrain, 11432 FM 529, Houston. No transmission SKU on a receipt.",
        evidence: ["IMG_5797", "IMG_5798", "IMG_5809"]
      },
      {
        id: "lube",
        n: "14",
        title: "Fluids",
        system: "fluids",
        body: "No oil, ATF, coolant, or DOT grade on any invoice. Hardware around the fills: 3.0 Vortec, JEGS 555-51962 with filler 555-530400, Wilwood 260-7563, NAPA slave 37728. Log Current fill on each jug.",
        evidence: ["IMG_5809", "IMG_5825", "IMG_5884", "IMG_5869"]
      }
    ]
  }
};
