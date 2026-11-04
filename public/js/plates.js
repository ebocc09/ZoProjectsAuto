window.PLATES = {
  hero: {
    src: "plates/l7-front34.jpg",
    caption: "Front three-quarter — click a part",
    zones: [
      { id: "body", label: "Nose & cycle fenders", shape: "poly", pts: "8,48 22,38 38,32 52,30 58,38 62,52 48,58 22,62 6,58" },
      { id: "cooling", label: "Radiator", shape: "poly", pts: "4,42 14,38 16,52 6,56" },
      { id: "front-suspension", label: "Front wishbones", shape: "poly", pts: "18,58 34,54 40,62 38,78 22,80 16,70" },
      { id: "front-dampers", label: "QA1 coilover", shape: "poly", pts: "30,48 36,46 38,62 32,64" },
      { id: "wheels", label: "Front wheel", shape: "ellipse", cx: 29, cy: 72, rx: 11, ry: 18 },
      { id: "engine", label: "Engine bay", shape: "poly", pts: "22,40 38,34 44,48 32,54" },
      { id: "steering", label: "Cockpit / steering", shape: "poly", pts: "40,34 56,30 58,48 44,50" },
      { id: "electrical", label: "Lights & loom", shape: "ellipse", cx: 12, cy: 46, rx: 5, ry: 6 },
      { id: "chassis", label: "Tubular chassis", shape: "poly", pts: "20,62 55,58 70,60 70,68 20,70" },
      { id: "rear-suspension", label: "Rear corner", shape: "poly", pts: "58,50 78,48 86,62 70,70 58,62" },
      { id: "wheels", label: "Rear wheel", shape: "ellipse", cx: 78, cy: 68, rx: 10, ry: 16 },
      { id: "body", label: "Cockpit & hoop", shape: "poly", pts: "48,22 62,18 70,28 64,42 50,40" }
    ]
  },
  side: {
    src: "plates/l7-side.jpg",
    caption: "Side elevation",
    zones: [
      { id: "wheels", label: "Rear wheel", shape: "ellipse", cx: 27, cy: 72, rx: 9, ry: 16 },
      { id: "wheels", label: "Front wheel", shape: "ellipse", cx: 73, cy: 72, rx: 9, ry: 16 },
      { id: "rear-suspension", label: "Trailing / panhard", shape: "poly", pts: "22,58 36,56 38,70 24,72" },
      { id: "front-suspension", label: "Front wishbones", shape: "poly", pts: "62,56 72,54 76,68 64,72 60,64" },
      { id: "front-dampers", label: "QA1 Ultra Ride", shape: "poly", pts: "66,42 71,40 73,58 68,60" },
      { id: "engine", label: "3.0L Vortec", shape: "poly", pts: "58,38 72,36 74,52 60,54" },
      { id: "cooling", label: "Nose radiator", shape: "poly", pts: "80,40 90,42 90,58 80,56" },
      { id: "body", label: "Kinetic body", shape: "poly", pts: "18,40 40,28 58,32 80,42 78,56 20,56" },
      { id: "steering", label: "Steering", shape: "ellipse", cx: 48, cy: 42, rx: 6, ry: 7 },
      { id: "brakes", label: "Pedal box / master", shape: "poly", pts: "50,50 58,50 58,62 50,62" },
      { id: "electrical", label: "Roll hoop / loom", shape: "poly", pts: "40,18 50,16 52,36 42,38" },
      { id: "chassis", label: "Chassis 1442", shape: "poly", pts: "24,60 78,60 78,68 24,68" },
      { id: "driveline", label: "Driveline", shape: "poly", pts: "32,58 50,58 50,66 32,66" }
    ]
  },
  front: {
    src: "plates/l7-front-corner.jpg",
    caption: "Front corner — inner bushes in amber",
    zones: [
      { id: "front-suspension", label: "Upper wishbone · 135 POLY", shape: "poly", pts: "8,28 48,22 52,38 18,48 6,42" },
      { id: "front-suspension", label: "Lower wishbone", shape: "poly", pts: "10,52 50,48 58,68 20,78 8,66" },
      { id: "front-suspension", label: "Inner pivot bushes", shape: "ellipse", cx: 14, cy: 44, rx: 6, ry: 10 },
      { id: "front-dampers", label: "QA1 coilover", shape: "poly", pts: "30,26 40,24 44,62 34,64" },
      { id: "steering", label: "Upright / ball joints", shape: "poly", pts: "48,30 62,28 66,70 50,72" },
      { id: "wheels", label: "P205/75R14", shape: "ellipse", cx: 78, cy: 52, rx: 18, ry: 32 },
      { id: "brakes", label: "Disc", shape: "ellipse", cx: 64, cy: 52, rx: 8, ry: 14 },
      { id: "chassis", label: "Chassis rail", shape: "poly", pts: "0,30 12,28 14,80 0,82" }
    ]
  },
  rear: {
    src: "plates/l7-rear.jpg",
    caption: "Rear three-quarter",
    zones: [
      { id: "rear-suspension", label: "Trailing rods / panhard", shape: "poly", pts: "28,55 55,52 62,70 30,74" },
      { id: "front-dampers", label: "Rear coilovers", shape: "poly", pts: "40,42 48,40 50,62 42,64" },
      { id: "wheels", label: "Rear wheel", shape: "ellipse", cx: 32, cy: 68, rx: 12, ry: 18 },
      { id: "wheels", label: "Front wheel", shape: "ellipse", cx: 78, cy: 62, rx: 10, ry: 16 },
      { id: "body", label: "Body & hoop", shape: "poly", pts: "30,18 62,14 78,32 70,50 32,52" },
      { id: "electrical", label: "Tail lamps", shape: "ellipse", cx: 22, cy: 48, rx: 6, ry: 5 },
      { id: "driveline", label: "Axle / shaft", shape: "poly", pts: "34,58 52,58 52,68 34,68" },
      { id: "chassis", label: "Chassis", shape: "poly", pts: "28,70 70,66 72,76 28,78" }
    ]
  },
  engine: {
    src: "plates/l7-engine.jpg",
    caption: "Engine bay",
    zones: [
      { id: "engine", label: "GM 3.0 Vortec", shape: "poly", pts: "18,28 48,18 62,42 40,62 16,54" },
      { id: "cooling", label: "Radiator & fan", shape: "poly", pts: "8,30 22,22 28,55 12,62" },
      { id: "front-suspension", label: "Wishbone", shape: "poly", pts: "8,58 28,55 34,78 10,80" },
      { id: "front-dampers", label: "Coilover", shape: "poly", pts: "22,40 30,38 32,62 24,64" },
      { id: "wheels", label: "Front wheel", shape: "ellipse", cx: 72, cy: 62, rx: 16, ry: 24 },
      { id: "body", label: "Nose / fender", shape: "poly", pts: "48,8 88,18 90,48 60,40 46,22" },
      { id: "electrical", label: "Headlight", shape: "ellipse", cx: 18, cy: 38, rx: 5, ry: 6 }
    ]
  }
};
