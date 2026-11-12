// Carb measuring driver — bench only, not for running.
// Two prints. No gears. Hold the numbered ring, turn the butterfly.
//
// Drawing 1   dial.stl     ring, 1–12 around, hole in the middle
// Drawing 2+3 driver.stl   pointer disc + wishbone + short shaft
//                          1/4 in hex in the bottom for Milwaukee insert bits
//
// Total height 2 in (50.8 mm).
//
// Print
//  dial.stl     flat on the bed
//  driver.stl   standing, hex boss on the bed. 5 walls, 40% infill.
// Hardware: Milwaukee 1/4 in hex insert bit (Shockwave / any kit bit).
//            Optional M3×6 set screw to pinch the bit.

part = "preview"; // preview | dial | driver | all

$fn = 64;

inch       = 25.4;
total_h    = 2 * inch;

hex_af     = 6.60;              // 1/4 in hex + FDM clearance
hex_depth  = 14;
boss_d     = 14;
boss_h     = 16;
set_d      = 2.7;

shaft_d    = 10;
pointer_h  = 7;
dial_h     = 7;
flange_h   = 2.4;
hub_h      = 3;
horn_z     = 9;                 // how high the wishbone tips sit above the hub
shaft_h    = total_h - boss_h - flange_h - pointer_h - hub_h - horn_z - 4;

dial_od    = 56;
dial_id    = 22.6;
pointer_d  = 21.6;
flange_d   = 26;

m3_d       = 3.3;

module hex_bore(af, h) {
    cylinder(d = af / sqrt(3) * 2, h = h, $fn = 6);
}

// ——— drawing 1: measuring ring ———
module dial() {
    union() {
        difference() {
            cylinder(d = dial_od, h = dial_h);
            translate([0,0,-1]) cylinder(d = dial_id, h = dial_h + 2);
        }
        // 1–12 like a clock. 12 at +Y. All digits upright.
        for (n = [1:12]) {
            a = 90 - n * 30;
            r_tick = dial_od/2 - 2.4;
            r_num  = dial_od/2 - 8.6;
            translate([cos(a)*r_tick, sin(a)*r_tick, dial_h - 0.3])
                rotate([0,0,a])
                    cube([2.4, 0.8, 1.1], center = true);
            translate([cos(a)*r_num, sin(a)*r_num, dial_h - 0.2])
                linear_extrude(1.2)
                    text(str(n), size = 4.2, font = "Liberation Sans:style=Bold",
                         halign = "center", valign = "center");
        }
    }
}

// ——— drawing 2: pointer disc that fills the ring ———
module pointer_disc() {
    difference() {
        union() {
            cylinder(d = pointer_d, h = pointer_h);
            // triangle fused into the disc, points at 12, stops short of the digit
            hull() {
                translate([0, 4, pointer_h - 0.4])
                    cube([5.2, 4, 2.0], center = true);
                translate([0, pointer_d/2 + 5.2, pointer_h - 0.4])
                    cylinder(d = 0.6, h = 2.0, center = true);
            }
        }
        translate([0,0,-1]) cylinder(d = m3_d, h = pointer_h + 2);
    }
}

// ——— drawing 3: wishbone / slingshot twist lever ———
module wishbone() {
    cylinder(d = 11, h = hub_h + 0.2);
    translate([0,0, hub_h]) {
        cylinder(d = 9, h = 4);
        for (s = [-1, 1]) {
            hull() {
                cylinder(d = 8, h = 4);
                translate([s * 13, 0, horn_z])
                    scale([1, 0.8, 0.65])
                        sphere(d = 12);
            }
        }
    }
}

module driver() {
    difference() {
        union() {
            cylinder(d = boss_d, h = boss_h);
            translate([0,0,boss_h]) cylinder(d = shaft_d, h = shaft_h + 0.2);
            translate([0,0,boss_h + shaft_h]) cylinder(d = flange_d, h = flange_h);
            translate([0,0,boss_h + shaft_h + flange_h]) pointer_disc();
            translate([0,0,boss_h + shaft_h + flange_h + pointer_h - 0.3]) wishbone();
        }
        translate([0,0,-0.2]) hex_bore(hex_af, hex_depth);
        translate([0,0,-0.01])
            cylinder(d1 = hex_af + 1.4, d2 = hex_af * 0.65, h = 2, $fn = 6);
        translate([0,0, 7]) rotate([0,90,0])
            cylinder(d = set_d, h = boss_d);
    }
}

module preview() {
    color("Goldenrod") driver();
    color("DimGray")
        translate([0,0, boss_h + shaft_h + flange_h + 0.2])
            dial();
}

echo(str("shaft_h=", shaft_h, "  driver_h=",
         boss_h + shaft_h + flange_h + pointer_h + hub_h + horn_z + 4));

if (part == "dial") dial();
else if (part == "driver") driver();
else if (part == "all") {
    translate([-40,0,0]) driver();
    translate([40,0,0]) dial();
}
else preview();
