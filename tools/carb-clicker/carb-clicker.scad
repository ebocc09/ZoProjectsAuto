// Carb measuring driver — bench only, not for running.
// Two prints. Visible 12-tooth gear + two pawls that click both ways.
//
// dial.stl     numbered ring with the pawls. You hold this.
// driver.stl   wishbone + gear + arrow + 1/4 in hex for Milwaukee bits.
//
// Each click is one number. 12 clicks = one full turn.
// If the ring slips in your hand, it does not click — you do not count it.
//
// Total height 2 in (50.8 mm).

part = "preview"; // preview | dial | driver | all

$fn = 64;

inch       = 25.4;
total_h    = 2 * inch;

clicks      = 12;
click_angle = 360 / clicks;

hex_af     = 6.60;
hex_depth  = 14;
boss_d     = 14;
boss_h     = 16;
set_d      = 2.7;

shaft_d    = 10;
dial_h     = 8;
gear_h     = 8.8;               // a hair proud of the ring so the teeth show
snap_h     = 2.2;               // chamfered ring you push the dial over
hub_h      = 2.6;
horn_z     = 8;
shaft_h    = total_h - boss_h - snap_h - gear_h - hub_h - horn_z - 3.5;

root_r     = 10.6;
tip_r      = 14.8;
tooth_w    = 5.0;
tooth_tip_w= 1.8;

dial_od    = 58;
// bore clears the tooth tips; only the pawls touch the gear
dial_id    = tip_r * 2 + 1.6;
snap_d     = dial_id + 0.9;     // 0.45 mm squeeze — PETG will pop over the chamfer

m3_d       = 3.3;

module hex_bore(af, h) {
    cylinder(d = af / sqrt(3) * 2, h = h, $fn = 6);
}

module tooth() {
    linear_extrude(gear_h)
        polygon([
            [root_r - 0.3, -tooth_w/2],
            [tip_r,        -tooth_tip_w/2],
            [tip_r,         tooth_tip_w/2],
            [root_r - 0.3,  tooth_w/2]
        ]);
}

module gear() {
    // valleys sit on the 1–12 positions (0°, 30°, …) so a click = a number
    cylinder(r = root_r, h = gear_h);
    for (i = [0:clicks-1])
        rotate([0,0, i * click_angle + click_angle/2])
            tooth();
}

module arrow() {
    translate([0, 7.5, 0])
        linear_extrude(2.4)
            polygon([[-2.6, 0], [2.6, 0], [0, 9.0]]);
}

// Circumferential click finger. Slot in the inner band, bump in a tooth valley.
// Two of them, at 6 and 12, so the gear stays centered and the click is obvious.
module pawl_slot() {
    // local +X. rotate 90 → 12 o'clock, rotate 270 → 6 o'clock
    rotate([0,0, -38])
        rotate_extrude(angle = 52)
            translate([dial_id/2 + 0.45, -1])
                square([2.4, dial_h + 2]);
    rotate([0,0, 14])
        translate([dial_id/2 + 1.6, 0, dial_h/2])
            cube([3.8, 1.8, dial_h + 2], center = true);
}

module pawl_bump() {
    // same local +X as the slot, so they land in the same valley
    bump_r = (root_r + tip_r) / 2;
    hull() {
        translate([dial_id/2 - 0.2, 0, 0])
            cube([1.4, 3.6, dial_h + 1.4], center = true);
        translate([bump_r, 0, 0])
            cylinder(d = 4.0, h = dial_h + 1.4, center = true);
    }
}

module dial() {
    union() {
        difference() {
            cylinder(d = dial_od, h = dial_h);
            translate([0,0,-1]) cylinder(d = dial_id, h = dial_h + 2);
            for (i = [0:11]) rotate([0,0, i * 30 + 15])
                translate([dial_od/2 + 1.4, 0, -1])
                    cylinder(d = 5.2, h = dial_h + 2);
            rotate([0,0, 270]) pawl_slot();
            rotate([0,0, 90])  pawl_slot();
        }
        rotate([0,0, 270]) translate([0,0, dial_h/2]) pawl_bump();
        rotate([0,0, 90])  translate([0,0, dial_h/2]) pawl_bump();
        for (n = [1:12]) {
            a = 90 - n * 30;
            r_tick = dial_od/2 - 2.6;
            r_num  = dial_od/2 - 8.4;
            translate([cos(a)*r_tick, sin(a)*r_tick, dial_h - 0.3])
                rotate([0,0,a])
                    cube([2.4, 0.8, 1.1], center = true);
            translate([cos(a)*r_num, sin(a)*r_num, dial_h - 0.2])
                linear_extrude(1.2)
                    text(str(n), size = 3.8, font = "Liberation Sans:style=Bold",
                         halign = "center", valign = "center");
        }
    }
}

module wishbone() {
    cylinder(d = 11, h = hub_h + 0.2);
    translate([0,0, hub_h]) {
        cylinder(d = 9, h = 3.6);
        for (s = [-1, 1]) {
            hull() {
                cylinder(d = 8, h = 3.6);
                translate([s * 13, 0, horn_z])
                    scale([1, 0.8, 0.65])
                        sphere(d = 12);
            }
        }
    }
}

module snap_flange() {
    // cone then a small lip. Ring pushes on from the hex end and pops over.
    cylinder(d1 = dial_id - 1.6, d2 = snap_d, h = snap_h);
}

module driver() {
    difference() {
        union() {
            cylinder(d = boss_d, h = boss_h);
            translate([0,0,boss_h]) cylinder(d = shaft_d, h = shaft_h + 0.2);
            translate([0,0,boss_h + shaft_h]) snap_flange();
            translate([0,0,boss_h + shaft_h + snap_h]) {
                gear();
                translate([0, 0, gear_h - 0.4]) arrow();
            }
            translate([0,0, boss_h + shaft_h + snap_h + gear_h - 0.2])
                wishbone();
        }
        translate([0,0,-0.2]) hex_bore(hex_af, hex_depth);
        translate([0,0,-0.01])
            cylinder(d1 = hex_af + 1.4, d2 = hex_af * 0.65, h = 2, $fn = 6);
        translate([0,0, 7]) rotate([0,90,0])
            cylinder(d = set_d, h = boss_d);
        translate([0,0, boss_h + shaft_h + snap_h + gear_h - 1])
            cylinder(d = m3_d, h = hub_h + 8);
    }
}

module preview() {
    color("Goldenrod") driver();
    color("DimGray")
        translate([0,0, boss_h + shaft_h + snap_h + 0.2])
            dial();
}

echo(str("shaft_h=", shaft_h));

if (part == "dial") dial();
else if (part == "driver") driver();
else if (part == "all") {
    translate([-42,0,0]) driver();
    translate([42,0,0]) dial();
}
else preview();
