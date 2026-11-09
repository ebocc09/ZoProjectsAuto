"""Shop mechanic for the Locost Seven catalog. Answers only from the paperwork."""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from workshop import blurb as workshop_blurb


def norm(s: str) -> str:
    s = s.lower()
    s = s.replace("wish bone", "wishbone").replace("a-arm", "aarm").replace("a arm", "aarm")
    s = s.replace("coil overs", "coilover").replace("coil over", "coilover").replace("coilovers", "coilover")
    s = s.replace("bushings", "bush").replace("bushes", "bush").replace("bushing", "bush")
    s = s.replace("shocks", "shock").replace("dampers", "damper")
    s = re.sub(r"[^a-z0-9.+/-]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


@dataclass
class Hit:
    topic: str
    score: int
    system: str
    view: str
    part: str | None = None
    evidence: str | None = None
    reply: str = ""
    pills: list[str] = field(default_factory=list)
    project: str | None = None


TOPICS: list[dict] = [
    {
        "id": "front-bush",
        "system": "front-suspension",
        "view": "front",
        "part": "poly-135",
        "evidence": "IMG_5795",
        "keys": [
            ("bush", 6), ("poly", 5), ("rubber", 4), ("silentbloc", 6),
            ("inner pivot", 7), ("control arm", 5), ("wishbone", 4),
            ("aarm", 4), ("front arm", 5), ("replace", 2), ("worn", 3),
            ("135", 8), ("need new", 3), ("front sus", 3),
        ],
        "reply": (
            "Front inner wishbone bushes are the job. They are not a Lotus or Caterham SKU.\n\n"
            "Specified on the upper A-arm CAD: 135 POLY .175 or TOP — polyurethane, "
            "almost certainly 1.35 in, 0.175 in wall. No receipt matches that size, so measure "
            "tube ID, OD, width, and bolt before you order.\n\n"
            "The only bushing kit on a receipt is Speedway 910-08015, a 1/2 in 4-bar rod-end "
            "kit bought 18 May 2008 with five 910-08051-STR stainless ends. That is a different joint.\n\n"
            "I opened the front-corner photo and the CAD with the poly note."
        ),
        "pills": [
            "What can I order today?",
            "Show the Speedway kit",
            "Lower wishbone ball joints",
            "Rear trailing bushes",
        ],
    },
    {
        "id": "order-bush",
        "system": "front-suspension",
        "view": "front",
        "part": "sw-91008015",
        "evidence": "IMG_5883",
        "keys": [
            ("910-08015", 12), ("91008015", 12), ("4-bar", 5), ("4 bar", 5),
            ("rod end bush", 8), ("speedway bush", 7), ("order today", 4),
            ("buy", 2), ("can i order", 5), ("kit i bought", 4),
        ],
        "reply": (
            "Purchased 18 May 2008: Speedway 910-08015, packing slip “4 BAR BUSH/SLEEVES FOR 1/2”, "
            "email “Front Rod End Bushing Kit, 1/2 in”, $24.99. Same order as five 910-08051-STR "
            "stainless RH 4-bar ends and 175-6046-RH 5/8 jam nuts.\n\n"
            "Still sold as the four-bar rod-end plastic bushing kit for a 1/2 in bolt, set of 8. "
            "Individual halves fit 910-08051. This is not the pressed 1.35 in poly in the fabricated wishbone tubes."
        ),
        "pills": ["Front inner poly spec", "Show the packing slip", "QA1 shock eye bushes"],
    },
    {
        "id": "shock-bush",
        "system": "front-dampers",
        "view": "front",
        "part": "qa1-b6031k",
        "evidence": "IMG_5846",
        "keys": [
            ("shock bush", 10), ("eye bush", 10), ("coilover bush", 12),
            ("bush for the coilover", 12), ("bush for the shock", 12),
            ("bush on the coilover", 10), ("poly eye", 8), ("b6031k", 14),
            ("b6031", 12), ("ur4855", 6), ("shock eye", 8), ("damper bush", 8),
            ("mount bush", 7), ("rebuild the eye", 8),
        ],
        "reply": (
            "Coilover bushes are the poly eyes on the QA1 Ultra Ride shocks, not the wishbone inner poly.\n\n"
            "The shocks are UR4855P / UR4855P-1 (Speedway 721-4855). The P means polyurethane eyes, "
            "not spherical bearings. Rebuild those eyes with QA1 B6031K — two-piece urethane with 1/2 in "
            "and 5/8 in sleeves. One kit per shock, four shocks on the car.\n\n"
            "That is a different joint from the handwritten 135 POLY .175 in the front wishbone tubes."
        ),
        "pills": ["What shocks are on it?", "Front wishbone bushes", "Show the vendor map"],
    },
    {
        "id": "coilovers",
        "system": "front-dampers",
        "view": "front",
        "part": "qa1-ur4855p",
        "evidence": "IMG_5811",
        "keys": [
            ("shock", 4), ("coilover", 7), ("qa1", 6), ("ultra ride", 8),
            ("damper", 5), ("721-485", 8), ("7214855", 8), ("carrera", 5),
        ],
        "reply": (
            "QA1 Ultra Ride 12 in adjustable coilovers, poly-eye. Two kits: Speedway 721-485 / 721-4855, "
            "Carrera 10 in springs 25510225 and 25510325. Later order also lists 225 lb and 300 lb kits. "
            "Builder notes: 14 in extended, 10-1/8 compressed, 3-7/8 travel, they settled around 12.5 in ride height "
            "(about 2.5 up / 1-5/16 down)."
        ),
        "pills": ["Shock eye bushes", "Front geometry", "Rear shocks"],
    },
    {
        "id": "balljoint",
        "system": "front-suspension",
        "view": "front",
        "part": "napa-10269",
        "evidence": "IMG_5801",
        "keys": [
            ("ball joint", 8), ("balljoint", 8), ("10269", 10), ("10390", 10),
            ("outer joint", 5), ("upright", 3),
        ],
        "reply": (
            "Outer joints are GM-pattern ball joints, not heims. NAPA 10269 front BJ (29 May 2008) and "
            "NAPA 10390 ×2 (27 May 2008). Lower wishbone CAD: BJ mounts up through the bottom, 1-3/4 in hole, 5/8-20. "
            "NAPA 33813 upper arm bought the same week is probably an S10 donor, not the 1/4 in plate arm on 1442."
        ),
        "pills": ["Front bushes", "Tie rod ends"],
    },
    {
        "id": "geometry",
        "system": "front-suspension",
        "view": "front",
        "part": "upper-wishbone",
        "evidence": "IMG_5794",
        "keys": [
            ("geometry", 6), ("camber", 5), ("caster", 5), ("track", 3),
            ("wishbone length", 7), ("1442", 4), ("ackerman", 6),
        ],
        "reply": (
            "Chassis 1442, rocker wishbones. Upper arm 10.643 in, lower 16.966 in. "
            "UF–UR pickups 7.500 in, LF–LR 12.94 in, track rod 14.820 in, king pin 10.957 in. "
            "Tires P205/75R14 at −1° camber and +5° caster. Track C/L 58.625 in. Ride height on the geometry sheet is 6.0 in."
        ),
        "pills": ["Front bushes", "Tire size", "Wheel adapters"],
    },
    {
        "id": "trailing",
        "system": "rear-suspension",
        "view": "rear",
        "part": "trailing-bush",
        "evidence": "IMG_5799",
        "keys": [
            ("trailing", 7), ("rear bush", 7), ("1.06", 8), ("1-1/16", 8),
            ("4130", 4), ("panhard", 6), ("4-link", 5), ("4link", 5),
        ],
        "reply": (
            "Rear trailing rods are 4130. Bush width on the drawing is 1.06 in (1-1/16). "
            "Top tube cut to 12.5 then trim 0.25. Lower cut to 11.25. No brand or SKU — measure ID and bolt. "
            "Panhard/track bar is dimensioned 18.36 in inside ball to inside ball. AFCO 4-link pages in the file are theory, not purchased AFCO hardware."
        ),
        "pills": ["Front bushes", "Rear coilovers"],
    },
    {
        "id": "engine",
        "system": "engine",
        "view": "engine",
        "part": "gm-30",
        "evidence": "IMG_5809",
        "keys": [
            ("engine", 6), ("motor", 5), ("vortec", 8), ("3.0", 6), ("181", 5),
            ("clutch", 5), ("flywheel", 5), ("pilot", 4),
        ],
        "reply": (
            "GM Vortec 3.0L four (181 cid), Buck's Engines in Lubbock. He also wrote down a 1991 S10 2.5L 5-speed as a candidate. "
            "First GM clutch C1909-XL082Y / D80132-XL226C came back as a mismatch. Kept AutoStar AWS 04-065, "
            "flywheel bolts MTM 140052, fork 15592270, ball stud 15592268, pilot 3914000, throwout 614018. "
            "NAPA 385 is a clutch repair kit ×2. V-belt 25-7417. Fuel line H-176 and choke kit 732-1153. "
            "Buck's line 15530202 is printed IRRIGATION and is not identified. "
            "Need a new valve cover, not the head: 8M0122491. "
            "Buy list: Wix 33003, gasket Sierra 18-0347 / NAPA SME180347, "
            "thermostat kit Sierra 18-3650 / NAPA SME183650. Not bought yet."
        ),
        "pills": ["Fuel filter", "Valve cover", "Clutch kit"],
    },
    {
        "id": "fuel-filter",
        "system": "engine",
        "view": "diagram",
        "part": "fuel-filter",
        "evidence": "IMG_5877",
        "keys": [
            ("fuel filter", 14), ("wix", 10), ("33003", 12), ("3003", 8),
            ("in-line filter", 10), ("inline filter", 10),
        ],
        "reply": (
            "Fuel filter was not on the build plans. It was read on the car: Wix 33003, "
            "plastic in-line, 3/8 in inlet and outlet, cellulose 20 micron. "
            "O'Reilly listing: https://www.oreillyauto.com/detail/c/wix/wix-fuel-filter/wix0/33003 "
            "NAPA Gold 3003 is the same filter. Metal version with hoses is Wix 33033. Gasoline only. "
            "On the buy list with the cover gasket and thermostat kit. Not bought yet."
        ),
        "pills": ["Fuel line", "Engine", "Valve cover"],
    },
    {
        "id": "valve-cover",
        "system": "engine",
        "view": "diagram",
        "part": "valve-cover",
        "evidence": "IMG_5929",
        "keys": [
            ("valve cover", 12), ("rocker cover", 12), ("valvecover", 10),
            ("8m0122491", 12), ("3853784", 10),
        ],
        "reply": (
            "Need a new valve cover, not the head. GM 181 / 3.0L four cover, Mercury 8M0122491 "
            "(also 3853784 / 65635A8 / 851036T). Wholesale Marine page $115.49. Not read off this engine. "
            "Marine covers can have a different PCV / oil-fill — check this one before ordering. "
            "EPS on the print: 1-800-374-7522. Gasket is Sierra 18-0347 / NAPA SME180347. Not bought yet."
        ),
        "pills": ["Valve cover gasket", "Thermostat", "Engine"],
    },
    {
        "id": "valve-gasket",
        "system": "engine",
        "view": "diagram",
        "part": "valve-cover-gasket",
        "evidence": "IMG_5863",
        "keys": [
            ("valve cover gasket", 14), ("cover gasket", 10), ("14096154", 12),
            ("18-0347", 12), ("sme180347", 12), ("180347", 8),
        ],
        "reply": (
            "Need a new valve cover gasket, not a head gasket. Found at NAPA: Sierra 18-0347, "
            "NAPA SME180347, GM 153 and 181 CID. Mercury 27-52145 / 27-806452. "
            "Marine Engine Depot still lists authentic GM 14096154 for the same 181 cover. "
            "The 2010 eBasicPower set DET59565AS is the old 2.5/3.0L set, not this dedicated gasket. "
            "Goes on with the new cover 8M0122491. On the buy list with Wix 33003 and thermostat kit 18-3650. Not bought yet."
        ),
        "pills": ["Valve cover", "Thermostat", "Engine"],
    },
    {
        "id": "thermostat",
        "system": "cooling",
        "view": "diagram",
        "part": "thermostat",
        "evidence": "IMG_5929",
        "keys": [
            ("thermostat", 12), ("tstat", 10), ("t-stat", 10),
            ("18-3650", 12), ("183650", 12), ("18-3550", 10), ("183550", 8),
            ("59078", 10), ("z33001814", 8), ("z101488", 6),
        ],
        "reply": (
            "Buy-list thermostat is the kit: Sierra 18-3650, NAPA SME183650, 140°F. "
            "Includes 18-3550 thermostat and 18-2831 cover gasket. Mercury 59078T3 / 59078Q3. "
            "Same NAPA small-engine line as the cover gasket SME180347. "
            "Closed / fresh-water marine cooling uses the 160° Sierra 18-3649 / NAPA SME183649. "
            "WINCO industrial Z33001814 has no printed temperature and no catalog cross to 18-3650. "
            "140° is boat raw-water OEM. This car has a JEGS street radiator. Not bought yet. "
            "https://www.napaonline.com/en/p/SME183650"
        ),
        "pills": ["Valve cover", "Radiator hose", "Engine"],
    },
    {
        "id": "driveline",
        "system": "driveline",
        "view": "diagram",
        "part": "driveshaft-1442",
        "evidence": "IMG_5798",
        "keys": [
            ("driveshaft", 10), ("drive shaft", 10), ("northwest", 8),
            ("shaft", 4), ("u-joint", 5), ("ujoint", 5),
        ],
        "reply": (
            "Driveshaft geometry, not a purchased U-joint SKU. CAD origin is TRANSMISSION REAR FLANGE. "
            "Ride length printed 27.25 in (hand 27 1/8 / 26.5 also on the sheet). Rear travel from ride: "
            "up bump 3.0 in, down depression 2.25 in. Shop note: Northwest Drivetrain, 11432 FM 529, "
            "Houston, 713-937-8499."
        ),
        "pills": ["Gearbox", "Fluids"],
    },
    {
        "id": "gearbox",
        "system": "driveline",
        "view": "diagram",
        "part": "gearbox-1442",
        "evidence": "IMG_5809",
        "keys": [
            ("transmission", 10), ("gearbox", 10), ("gear box", 10), ("5-speed", 8),
            ("5 speed", 8), ("t5", 6),
        ],
        "reply": (
            "No transmission SKU is on any packing slip. The shaft drawing labels TRANSMISSION REAR FLANGE. "
            "On Buck's 10/23/2007 sheet Jim wrote he wanted a 1991 Chevy S10 with a 5-speed and a 2.5L four. "
            "The engine he actually bought is the GM 3.0 Vortec. Do not assume a T5 — confirm what is in "
            "the tunnel, then log gearbox fluid under Fluids."
        ),
        "pills": ["Driveshaft", "Engine oil", "Clutch slave"],
    },
    {
        "id": "fluids",
        "system": "fluids",
        "view": "diagram",
        "part": "fluid-engine",
        "evidence": "IMG_5809",
        "keys": [
            ("fluid", 8), ("oil", 7), ("coolant", 8), ("antifreeze", 7),
            ("atf", 8), ("dexron", 6), ("brake fluid", 10), ("dot 3", 8),
            ("dot 4", 8), ("clutch fluid", 8), ("lube", 4),
        ],
        "reply": (
            "No oil grade, ATF, coolant, or DOT rating is on any invoice. What is documented is the hardware "
            "around those fills: GM 3.0 Vortec, JEGS 555-51962 with inline filler 555-530400, Wilwood 1 in "
            "tandem 260-7563, NAPA clutch slave 37728. Open Fluids and use Update → Current fill to log "
            "what you poured. I will not invent a typical spec."
        ),
        "pills": ["Engine oil", "Gearbox", "Brake fluid"],
    },
    {
        "id": "cooling",
        "system": "cooling",
        "view": "engine",
        "part": "jegs-rad",
        "evidence": "IMG_5825",
        "keys": [
            ("radiator", 8), ("rad", 4), ("cooling", 6), ("fan", 3),
            ("12an", 6), ("jegs", 5), ("555-51962", 10),
            ("hose", 5), ("26502", 10), ("green stripe", 8), ("coolant", 4),
            ("flex", 6), ("vulco", 8),

        ],
        "reply": (
            "JEGS 555-51962 dragster/roadster radiator, 17 × 19-1/2 overall, −12AN. "
            "Fittings 555-530082 ×2, inline filler 555-530400, hose drain 071063700. "
            "The fan in hand is a Flex-a-lite model 110, bought from Peyton Performance in Waxahachie. "
            "The 2008 JEGS line 400-110 was deducted and is not in either box. "
            "Aircraft Spruce AN833-12D, AN821-12D elbow, AN924-12D nut in May 2009. Gates heater hose 28432 ×2 in June 2011 is the 3/4 in hose. "
            "The radiator-to-block hose burst. Official hose is Gates Green Stripe Vulco-Flex 26502, "
            "1-3/4 both ends × 16-1/2 in. Perfect match. Thermostat kit on the buy list is "
            "Sierra 18-3650 / NAPA SME183650. Not bought yet."
        ),
        "pills": ["Thermostat", "Engine", "AN fittings"],
    },
    {
        "id": "brakes",
        "system": "brakes",
        "view": "side",
        "part": "wilwood-mc",
        "evidence": "IMG_5884",
        "keys": [
            ("brake", 6), ("wilwood", 8), ("master", 6), ("260-7563", 10),
            ("pedal", 4), ("an3", 5),
        ],
        "reply": (
            "Wilwood 1 in tandem master 835-2607563 / 260-7563, Speedway 1 Mar 2010, $121.99. "
            "Pedal box is BYOSC plates PB1–PB4. Plumbing order E499097 ($255.84) is 3/16 steel line 91031810, "
            "AN3 stainless 91031840, tees, 10 mm banjo kit 6172960, pressure switch 91031305, filler cap 6175021. "
            "NAPA wheel cylinders 37625 ×2, brake line 413-1206 ×2, gauge HR-1."
        ),
        "pills": ["Pedal box drawings", "Front suspension"],
    },
    {
        "id": "brake-lock",
        "system": "brakes",
        "view": "diagram",
        "part": "wc-37625",
        "project": "brake-lock",
        "evidence": None,
        "keys": [
            ("locked up", 12), ("lock up", 10), ("locked", 8),
            ("brakes locked", 12), ("breaks locked", 12),
            ("brakes are locked", 12), ("breaks are locked", 12),
            ("seize", 8), ("seized", 8),
            ("brakes stuck", 10), ("breaks stuck", 10),
            ("dragging", 6), ("won't roll", 6), ("wont roll", 8),
        ],
        "reply": (
            "The brakes are locked after a sit. Same family of failure as the dried tires and the dried wishbone poly: "
            "the rubber has been sitting.\n\n"
            "On the paperwork the wheel ends are two NAPA cylinders 37625 (27 May 2008) — drum cylinders, one axle. "
            "The master is the Wilwood 1 in tandem 835-2607563, bought 1 Mar 2010. Lines on the tickets are hard line: "
            "3/16 steel 91031810, AN3 stainless, and a 10 mm banjo kit. No rubber hose, no caliper, no handbrake cable, "
            "and no brake-fluid grade is on any sheet.\n\n"
            "Likely, in order: a 37625 cup dried to the bore and holding a shoe out; the Wilwood not uncovering its "
            "compensating port (swollen cup, or the Champion pedal-box pushrod a bit long); shoes rusted to the drums; "
            "a hose that was added later and now acts as a check valve; a handbrake left on, if one is on the car.\n\n"
            "Don't roll it. Jack it, see which wheels will not turn, then crack a bleeder on a locked wheel. "
            "If it frees, pressure was trapped. If it stays locked, pull the drum. Don't pour a fluid grade in — "
            "the tickets never name one. I opened the Brake lockup project so you can check the steps off."
        ),
        "pills": ["Wheel cylinders 37625", "Wilwood master"],
    },
    {
        "id": "body",
        "system": "body",
        "view": "hero",
        "part": "kinetic-body",
        "evidence": "IMG_5885",
        "keys": [
            ("body", 4), ("fender", 6), ("nose", 5), ("scuttle", 7),
            ("kinetic", 8), ("windshield", 5), ("hood strap", 6),
        ],
        "reply": (
            "Kinetic Vehicles: TTL nose bf01s, superscuttle bf04s, 12 in steamroller fenders bf05s with 30 in flanges, "
            "windshield kit bw01n. Able Glass 15-1/2 × 37-1/2 in, 1/4 green lami, W/O 05157111. "
            "Hood straps Hot Rod Leather DFHS-4, pads BP-4, loops SSGL-4. Patriot side-pipe sheet has no invoice. "
            "Speedway bends 91013670 (1-1/2 in ×4, marked NO.) and 91013874 (2 in ×1)."
        ),
        "pills": ["Wheel adapters", "Paint / POR-15"],
    },
    {
        "id": "wheels",
        "system": "wheels",
        "view": "hero",
        "part": "tires",
        "evidence": "IMG_5832",
        "keys": [
            ("wheel", 4), ("tire", 6), ("tyre", 6), ("205", 6), ("4.75", 7),
            ("adapter", 6), ("s10", 4), ("replaced tire", 10), ("new tire", 8),
            ("mounted", 3),
        ],
        "reply": (
            "Paperwork size is P205/75R14 at −1° camber, +5° caster. Adapters ezAccessory 54755-54775, "
            "5-lug 4.75 to 4.75, 2 in thick, 12×1.5 studs, noted Chevy S10 1989. "
            "If you swapped tires, the workshop log on that part is the live size."
        ),
        "pills": ["Front geometry", "Front bushes"],
    },
    {
        "id": "fuse-block",
        "system": "electrical",
        "view": "diagram",
        "part": "fuse-91064004",
        "evidence": "IMG_5862",
        "keys": [
            ("fuse", 10), ("910-64004", 12), ("91064004", 12), ("fuse block", 12),
            ("7 fuse", 10), ("blade", 4),
        ],
        "reply": (
            "Speedway 910-64004, packing slip “7 FUSE BLOCK”, $9.99. Order E490308 / packing 3001472, "
            "12 Apr 2010, same ticket as two 8-terminal strips 910-64006. Handwritten 910-64004 on the "
            "FIREWALL block of the owner loom (IMG_5759). Amp ratings per slot are not on the sheet — "
            "read the blades on the car before you restock."
        ),
        "pills": ["Terminal strips", "Show the wiring sheet"],
    },
    {
        "id": "term-strip",
        "system": "electrical",
        "view": "diagram",
        "part": "strip-91064006",
        "evidence": "IMG_5862",
        "keys": [
            ("terminal strip", 12), ("910-64006", 12), ("91064006", 12),
            ("8 terminal", 10), ("eight terminal", 10),
        ],
        "reply": (
            "Speedway 910-64006, packing “8 TERMINAL STRIP”, email “ELECTRICAL STRIP WITH EIGHT TERMINALS”. "
            "Qty 2 @ $4.99, same 12 Apr 2010 order as the 7-fuse block. Drawn as two strips under the fuse "
            "panel on the FIREWALL section of the loom sheet."
        ),
        "pills": ["Fuse block", "Show the wiring sheet"],
    },
    {
        "id": "electrical",
        "system": "electrical",
        "view": "diagram",
        "part": "fuse-91064004",
        "evidence": "IMG_5759",
        "keys": [
            ("wiring", 7), ("loom", 7), ("electrical", 6),
            ("tail lamp", 6), ("horn", 4),
        ],
        "reply": (
            "Owner-drawn loom: engine, lights, column, firewall. Speedway 7-fuse block 910-64004 and two "
            "8-terminal strips 910-64006 (order E490308, 12 Apr 2010). 1988 S10 horn circuit used as a "
            "reference. Tail lamps Irving Levine SS 510 ×2. Fuse amps are not written on the sheet."
        ),
        "pills": ["Fuse block", "Show the wiring sheet"],
    },
    {
        "id": "exhaust",
        "system": "body",
        "view": "diagram",
        "part": "exhaust-bends",
        "evidence": "IMG_5816",
        "keys": [
            ("exhaust", 8), ("side pipe", 8), ("patriot", 8), ("91013670", 12),
            ("bend", 4), ("muffler", 4),
        ],
        "reply": (
            "Speedway order E3082433, 21 Jun 2008: combo bends 91013670 1-1/2 in ×4 and 91013874 2 in ×1, $81.78. "
            "Handwriting says NO. beside the 1-1/2 in line. Patriot side-pipe instructions are in the folder "
            "(muffler cases, chrome tips, rubber grommets) with no invoice and no kit number."
        ),
        "pills": ["Body", "Hood straps"],
    },
    {
        "id": "por15",
        "system": "chassis",
        "view": "diagram",
        "part": "por15",
        "evidence": "IMG_5817",
        "keys": [
            ("por-15", 10), ("por15", 10), ("paint", 4), ("metal ready", 8),
            ("4130", 6), ("chromoly", 6),
        ],
        "reply": (
            "POR-15 order 3319347, 17 Feb 2010: black gallon 1GB $143, Metal Ready quart MRQ, solvent SVQ ×2. Total $195.75. "
            "Chassis tube is Huntsville 1×1×16 ga (336 ft) and 1×1×14 ga (144 ft). "
            "4130 is Aircraft Spruce 03-06000-4 (7/8×.188 ×5) and 03-01500-4 (3/8×.065 ×5)."
        ),
        "pills": ["Body", "Front suspension"],
    },
    {
        "id": "what-car",
        "system": "front-suspension",
        "view": "hero",
        "part": None,
        "evidence": None,
        "keys": [
            ("what is this", 6), ("what car", 6), ("caterham", 5), ("lotus", 3),
            ("locost", 8), ("who built", 6), ("chassis", 3),
        ],
        "reply": (
            "Not a factory Lotus and not a Caterham. It is a Locost Seven on chassis 1442, built 2007–2011 by "
            "James Bowers in Oakhurst, TX from Ron Champion's Build Your Own Sports Car, Kinetic body, GM 3.0 Vortec, QA1 Ultra Ride."
        ),
        "pills": ["Front bushes", "Engine", "Body"],
    },
    {
        "id": "guide",
        "system": "brakes",
        "view": "guide",
        "part": None,
        "evidence": "IMG_5790",
        "keys": [
            ("book", 6), ("champion", 8), ("blueprint", 7), ("guide", 6),
            ("how was it built", 8), ("locost book", 8), ("haynes", 6),
            ("pedal box", 6), ("page 54", 7), ("build your own", 8),
        ],
        "reply": (
            "The method book is Ron Champion's Build Your Own Sports Car — the Locost bible. "
            "Only three plates from it are in this folder: p.54 pedal box (Fig. 4.37), p.186 plates PB1–PB4, "
            "and p.187 brake and clutch pedals. I will not reproduce the rest of that book; buy the Haynes edition for the full text.\n\n"
            "The working blueprint for THIS car is the builder's CAD on chassis 1442 (wishbones, trailing rods, "
            "Book Geometry P8-6 vs updated geometry). I opened the build book with those sheets in chapter order."
        ),
        "pills": ["Front wishbone CAD", "Pedal box page", "Book geometry"],
    },
]


FOLLOW = [
    (r"bush.*(coilover|shock|qa1|damper)|(coilover|shock|qa1|damper).*bush|eye bush|poly eye|b6031", "shock-bush"),
    (r"order|buy|purchase|sku|part number", "order-bush"),
    (r"cad|drawing|photo|sheet|evidence|show", "front-bush"),
    (r"rear|trailing", "trailing"),
    (r"shock|coilover|damper", "coilovers"),
    (r"ball", "balljoint"),
    (r"valve cover gasket|cover gasket", "valve-gasket"),
    (r"valve cover|rocker cover", "valve-cover"),
    (r"thermostat|tstat|t-stat|18-3650|183650|18-3550|59078", "thermostat"),
    (r"fuel filter|wix|33003", "fuel-filter"),
    (r"engine|motor|clutch", "engine"),
    (r"fuse|terminal strip", "fuse-block"),
    (r"lock|seize|bleeder|stuck brake|won t roll", "brake-lock"),
    (r"oil|coolant|fluid|atf|dexron", "fluids"),
    (r"trans|gearbox|driveshaft", "gearbox"),
    (r"exhaust|side pipe|patriot|bend", "exhaust"),
    (r"por-15|por15|4130|chromoly", "por15"),
    (r"fuel line|choke|fork|irrigation", "engine"),
]

# If the question names bushes AND the shocks, do not send them to wishbones or the shock spec sheet.
COMBOS = [
    (("bush",), ("coilover", "shock", "qa1", "damper", "ultra ride", "eye"), "shock-bush", 14),
    (("bush",), ("trailing", "rear", "panhard"), "trailing", 8),
    (("bush",), ("wishbone", "aarm", "control arm", "front arm", "inner pivot"), "front-bush", 8),
]


def ask(message: str, history: list[dict] | None = None, current: str | None = None) -> dict:
    history = history or []
    q = norm(message)
    if not q:
        return {
            "reply": "Ask me like you would a shop: “I need the front bushes”, “what shocks are on it”, “show the radiator”.",
            "pills": ["I need the front bushes", "Show the build book", "What engine is this"],
        }

    last_topic = None
    for m in reversed(history):
        if m.get("topic"):
            last_topic = m["topic"]
            break

    # follow-ups: short, pronouns, "those", "them"
    short = len(q.split()) <= 6
    if last_topic and short and re.search(r"\b(those|them|it|that|this|same|show|buy|order|rear|front)\b", q):
        for pat, tid in FOLLOW:
            if re.search(pat, q):
                hit = next(t for t in TOPICS if t["id"] == tid)
                return pack(hit)
        hit = next((t for t in TOPICS if t["id"] == last_topic), None)
        if hit and re.search(r"show|photo|drawing|cad", q):
            return pack(hit)

    scores: dict[str, int] = {t["id"]: 0 for t in TOPICS}
    for t in TOPICS:
        blob = q
        score = 0
        for key, w in t["keys"]:
            if key in blob:
                score += w
        if current and t["system"] == current:
            score += 1
        scores[t["id"]] = score

    for left, right, tid, bonus in COMBOS:
        if any(a in q for a in left) and any(b in q for b in right):
            scores[tid] += bonus

    best: Hit | None = None
    by_id = {t["id"]: t for t in TOPICS}
    for tid, score in scores.items():
        if score <= 0:
            continue
        if best is None or score > best.score:
            t = by_id[tid]
            best = Hit(
                topic=t["id"],
                score=score,
                system=t["system"],
                view=t["view"],
                part=t.get("part"),
                evidence=t.get("evidence"),
                reply=t["reply"],
                pills=t["pills"],
                project=t.get("project"),
            )

    if not best or best.score < 3:
        return {
            "reply": (
                "I only answer from this car's paperwork. Try a system or a part: "
                "front bushes, QA1 shocks, Wilwood master, JEGS radiator, Kinetic fenders, 3.0 Vortec."
            ),
            "pills": ["I need the front bushes", "QA1 coilovers", "Wilwood master", "Radiator"],
            "topic": None,
        }

    return pack_hit(best)


def pack(t: dict) -> dict:
    return pack_hit(
        Hit(
            topic=t["id"],
            score=99,
            system=t["system"],
            view=t["view"],
            part=t.get("part"),
            evidence=t.get("evidence"),
            reply=t["reply"],
            pills=t["pills"],
            project=t.get("project"),
        )
    )


def pack_hit(h: Hit) -> dict:
    extra = workshop_blurb(h.system, h.part)
    out = {
        "reply": h.reply + extra,
        "topic": h.topic,
        "goto": {"system": h.system, "view": h.view, "part": h.part},
        "openEvidence": h.evidence,
        "pills": h.pills,
    }
    if h.project:
        out["project"] = h.project
    return out
