// Carb click screwdriver — bench tool only, not for running.
// Chassis 1442 dual S&S Super E/G. Match both screws by click count.
//
// 12 clicks = 1 turn ≈ 0.8 mm (10-32 / M5×0.8 mixture screws)
//  3 clicks = 1/4 turn
//  6 clicks = 1/2 turn
// 15 clicks = 1-1/4
// 21 clicks = 1-3/4  ← current mixture on this car
//
// How to use
// 1. Drop a 1/4 in hex bit in the bottom (PH1 or 4–5 mm slotted).
//    S&S idle screws are usually slotted. Printed tips wear out — use steel.
// 2. Seat the screw softly. Hold the knurled collar still.
// 3. Twist the numbered dial to 0 (collar pointer).
// 4. Turn the butterfly. Each click is one step. Same clicks on both carbs.
//
// Print (PLA or PETG — PETG for the collar pawl)
//  Layer 0.2  ·  5 walls  ·  30% gyroid  ·  no supports if you print as marked
//  shaft.stl    standing (bit boss on the bed)
//  handle.stl   wings flat on the bed
//  collar.stl   standing (pointer up)
//
// Hardware:  1× M3×12 button, 1× M3 nut, 1× 1/4 in hex bit,
//            1× M3×6 set screw to pinch the bit (optional — a tight press also works)

part = "preview"; // preview | shaft | handle | collar | all

$fn = 64;

clicks        = 12;
mm_per_turn   = 0.8;
click_angle   = 360 / clicks;

shaft_d       = 8.0;
shaft_len     = 72;     // under the drum, to the bit boss
tenon         = 7.6;    // square drive into the handle
tenon_h       = 9;

drum_h        = 9;
drum_d        = 24;
flange_d      = 27;
flange_h      = 1.6;
scallop_d     = 3.4;

collar_od     = 34;
collar_h      = drum_h + 0.6;
pawl_stick    = 1.7;

boss_d        = 14.5;
boss_h        = 22;
hex_af        = 6.55;   // 1/4 in across-flats + print clearance
hex_depth     = 16;
set_d         = 2.7;    // M3 tap / self-thread

wing_span     = 70;
wing_w        = 16;
wing_h        = 9;
hub_d         = 30;
hub_h         = 11;

m3_d          = 3.3;
m3_head       = 6.2;
m3_nut        = 5.6;
m3_nut_h      = 2.5;

module hex_bore(af, h) {
    // across-flats hex, centered
    r = af / sqrt(3);
    cylinder(d=r * 2, h=h, $fn=6);
}

module d_flat(d, h, cut=1.4) {
    difference() {
        cylinder(d=d, h=h);
        translate([d/2 - cut, -d, -1]) cube([d, d*2, h+2]);
    }
}

module click_drum() {
    difference() {
        union() {
            cylinder(d=flange_d, h=flange_h);
            translate([0,0,flange_h]) cylinder(d=drum_d, h=drum_h);
            translate([0,0,flange_h + drum_h]) cylinder(d=flange_d, h=flange_h);
        }
        for (i = [0:clicks-1])
            rotate([0,0, i * click_angle])
                translate([drum_d/2 + 0.55, 0, flange_h + drum_h/2])
                    cylinder(d=scallop_d, h=drum_h + 1, center=true);
    }
}

module shaft() {
    drum_z = shaft_len + boss_h;
    difference() {
        union() {
            // bit boss
            hull() {
                cylinder(d=boss_d, h=boss_h - 3);
                translate([0,0,boss_h - 3]) cylinder(d=shaft_d + 1.5, h=3);
            }
            // long shaft
            translate([0,0,boss_h]) cylinder(d=shaft_d, h=shaft_len);
            // click drum
            translate([0,0,drum_z]) click_drum();
            // square tenon above upper flange
            translate([-tenon/2, -tenon/2, drum_z + flange_h*2 + drum_h])
                cube([tenon, tenon, tenon_h]);
        }
        // 1/4 in hex
        translate([0,0,-0.2]) hex_bore(hex_af, hex_depth);
        // lead-in
        translate([0,0,-0.01]) cylinder(d1=hex_af + 1.2, d2=hex_af * 0.7, h=2.2, $fn=6);
        // M3 set screw
        translate([0,0, 8]) rotate([0,90,0]) cylinder(d=set_d, h=boss_d);
        // M3 through tenon
        translate([0,0, drum_z + flange_h*2 + drum_h - 1])
            cylinder(d=m3_d, h=tenon_h + 4);
    }
}

module wing() {
    difference() {
        hull() {
            translate([hub_d/2 - 3, 0, wing_h/2])
                cube([6, wing_w * 0.72, wing_h], center=true);
            translate([wing_span/2 - 8, 0, 0])
                cylinder(d=wing_w * 0.95, h=wing_h);
        }
        // finger dip
        translate([wing_span/2 - 8, 0, wing_h + 3])
            rotate([90,0,0]) cylinder(d=16, h=wing_w + 2, center=true);
    }
}

module tick(r, z, len=2.2, w=0.7, h=0.7) {
    translate([0, -r, z]) cube([w, len, h], center=true);
}

module handle() {
    difference() {
        union() {
            cylinder(d=hub_d, h=hub_h);
            for (a = [0, 180]) rotate([0,0,a]) wing();
            // raised ticks + numbers sit on the hub
            for (i = [0:clicks-1]) rotate([0,0, i * click_angle])
                translate([0, 0, hub_h]) tick(hub_d/2 - 2.4, 0.2, i % 3 == 0 ? 3.2 : 2.0, i % 3 == 0 ? 1.0 : 0.6);
        }
        // square socket
        translate([-tenon/2 - 0.15, -tenon/2 - 0.15, -0.2])
            cube([tenon + 0.3, tenon + 0.3, tenon_h + 0.6]);
        // M3 bolt + nut trap
        translate([0,0,-1]) cylinder(d=m3_d, h=hub_h + 2);
        translate([0,0, hub_h - m3_nut_h - 0.4])
            cylinder(d=m3_nut * 2 / sqrt(3) + 0.25, h=m3_nut_h + 0.6, $fn=6);
        translate([0,0, hub_h - 0.2]) cylinder(d=m3_head, h=2);
    }
    // mm around one turn. 0 and 0.8 are the same tick.
    labels = ["0", ".2", ".4", ".6"];
    for (i = [0:3]) rotate([0,0, i * 90])
        translate([0, -hub_d/2 + 6.8, hub_h])
            linear_extrude(0.8)
                text(labels[i], size=4.2, font="Liberation Sans:style=Bold",
                     halign="center", valign="center");
    translate([8.2, 0, hub_h])
        linear_extrude(0.7)
            text("mm", size=2.6, font="Liberation Sans:style=Bold",
                 halign="center", valign="center");
}

module collar() {
    id = drum_d + 0.7;
    difference() {
        union() {
            cylinder(d=collar_od, h=collar_h);
            // pointer tower — sits outside the ring, reads the mm dial
            translate([-1.5, collar_od/2 - 0.5, 0]) cube([3, 7, 18]);
            translate([0, collar_od/2 + 6.2, 15.5])
                rotate([90,0,180]) linear_extrude(2.4)
                    polygon([[-5,0],[5,0],[0,6]]);
            // finger flats
            for (a = [90, 270]) rotate([0,0,a])
                translate([collar_od/2 - 1, 0, collar_h/2])
                    cube([3, 10, collar_h - 2], center=true);
        }
        translate([0,0,-1]) cylinder(d=id, h=collar_h + 6);
        // scallop the outside so it is easy to hold
        for (i = [0:11]) rotate([0,0, i * 30 + 15])
            translate([collar_od/2 + 1.2, 0, -1]) cylinder(d=4.5, h=collar_h + 2);
    }
    // flex pawl — a thin arm with a bump that drops into each scallop
    pawl_z = (collar_h - 6) / 2;
    translate([0,0,pawl_z]) {
        // arm lives in a window; bump points inward
        rotate([0,0,0])
            translate([id/2 - 0.2, 0, 0]) {
                // flex leaf
                translate([0, -1.2, 0]) cube([0.95, 11, 6]);
                // bump
                translate([0, 9.2, 3]) sphere(d=3.0);
            }
    }
}

module preview() {
    color("silver") shaft();
    color("DimGray")
        translate([0,0, boss_h + shaft_len + flange_h - 0.3])
            collar();
    color("Goldenrod")
        translate([0,0, boss_h + shaft_len + flange_h*2 + drum_h])
            handle();
}

if (part == "shaft") shaft();
else if (part == "handle") handle();
else if (part == "collar") collar();
else if (part == "all") {
    translate([-50,0,0]) shaft();
    translate([40,0,0]) handle();
    translate([90,0,0]) collar();
}
else preview();
