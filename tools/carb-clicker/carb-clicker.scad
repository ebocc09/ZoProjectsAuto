// Carb measuring driver — bench only, not for running.
//
// Three prints. Handle comes off so you can drop the ring on.
//
//  dial.stl     numbered ring with two click pawls. Flat on the bed.
//  driver.stl   shaft + 10-tooth mm gear + 1/4 in hex. Stand it, hex down.
//  handle.stl   flat twist bar. Flat on the bed. Fast print. No bubbles.
//
// 1 full turn of the screw = 1 mm. 10 teeth. 1 click = 0.1 mm.
//
// Hardware: Milwaukee 1/4 in hex bit. 1× M3×12 screw.

part = "preview"; // preview | dial | driver | handle | all

$fn = 64;

inch        = 25.4;
total_h     = 2 * inch;

clicks      = 10;                // 0.1 mm each, 1.0 mm around
click_angle = 360 / clicks;
click_mm    = 1.0 / clicks;      // 0.1 mm

hex_af      = 6.60;
hex_depth   = 14;
boss_d      = 14;
boss_h      = 16;
set_d       = 2.7;

shaft_d     = 10;
dial_h      = 8;
gear_h      = 8.5;
flange_h    = 2.4;
handle_h    = 8;
tenon_h     = 7.5;
tenon_d     = 8.0;
tenon_flat  = 2.4;               // D-shape so the arrow only goes on one way

shaft_h     = total_h - boss_h - flange_h - gear_h - handle_h;

root_r      = 11.0;
tip_r       = 15.2;
tooth_w     = 5.4;
tooth_tip_w = 2.0;

dial_od     = 58;
dial_id     = tip_r * 2 + 1.8;   // bore clears the tips; only the pawls touch
flange_d    = dial_id + 5;

m3_d        = 3.3;
m3_head     = 6.2;
m3_nut      = 5.6;
m3_nut_h    = 2.6;

module hex_bore(af, h) {
    cylinder(d = af / sqrt(3) * 2, h = h, $fn = 6);
}

// D-shaped tenon — handle only fits one way, arrow stays on 0 mm
module d_profile(clear = 0) {
    difference() {
        circle(d = tenon_d + clear);
        translate([tenon_d/2 + tenon_flat, 0])
            square([tenon_d, tenon_d + clear + 2], center = true);
    }
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
    // valleys on the 0.1 mm marks, 0 mm at +Y (12 o'clock)
    cylinder(r = root_r, h = gear_h);
    for (i = [0:clicks-1])
        rotate([0,0, 90 + click_angle/2 + i * click_angle])
            tooth();
}

module pawl_slot() {
    rotate([0,0, -32])
        rotate_extrude(angle = 44)
            translate([dial_id/2 + 0.45, -1])
                square([2.4, dial_h + 2]);
    rotate([0,0, 12])
        translate([dial_id/2 + 1.6, 0, dial_h/2])
            cube([3.8, 1.8, dial_h + 2], center = true);
}

module pawl_bump() {
    bump_r = (root_r + tip_r) / 2;
    hull() {
        translate([dial_id/2 - 0.2, 0, 0])
            cube([1.4, 3.6, dial_h + 1.4], center = true);
        translate([bump_r, 0, 0])
            cylinder(d = 3.8, h = dial_h + 1.4, center = true);
    }
}

module dial() {
    union() {
        difference() {
            cylinder(d = dial_od, h = dial_h);
            translate([0,0,-1]) cylinder(d = dial_id, h = dial_h + 2);
            for (i = [0:9]) rotate([0,0, i * 36 + 18])
                translate([dial_od/2 + 1.4, 0, -1])
                    cylinder(d = 5.2, h = dial_h + 2);
            rotate([0,0, 90])  pawl_slot();
            rotate([0,0, 270]) pawl_slot();
        }
        rotate([0,0, 90])  translate([0,0, dial_h/2]) pawl_bump();
        rotate([0,0, 270]) translate([0,0, dial_h/2]) pawl_bump();
        // 0, .1, .2 … .9  — 0 is 1.0 mm / a full turn, at 12 o'clock
        for (i = [0:clicks-1]) {
            a = 90 - i * click_angle;
            r_tick = dial_od/2 - 2.6;
            r_num  = dial_od/2 - 8.6;
            label  = (i == 0) ? "0" : str(".", i);
            translate([cos(a)*r_tick, sin(a)*r_tick, dial_h - 0.3])
                rotate([0,0,a])
                    cube([2.4, 0.8, 1.1], center = true);
            translate([cos(a)*r_num, sin(a)*r_num, dial_h - 0.2])
                linear_extrude(1.2)
                    text(label, size = 3.6, font = "Liberation Sans:style=Bold",
                         halign = "center", valign = "center");
        }
    }
}

module driver() {
    tenon_z = boss_h + shaft_h + flange_h + gear_h - 0.3;
    difference() {
        union() {
            cylinder(d = boss_d, h = boss_h);
            translate([0,0,boss_h]) cylinder(d = shaft_d, h = shaft_h + 0.4);
            translate([0,0,boss_h + shaft_h]) cylinder(d = flange_d, h = flange_h);
            translate([0,0,boss_h + shaft_h + flange_h - 0.3]) gear();
            translate([0,0,tenon_z - 0.5])
                linear_extrude(tenon_h + 0.5) d_profile(0);
        }
        translate([0,0,-0.2]) hex_bore(hex_af, hex_depth);
        translate([0,0,-0.01])
            cylinder(d1 = hex_af + 1.4, d2 = hex_af * 0.65, h = 2, $fn = 6);
        translate([0,0, 7]) rotate([0,90,0])
            cylinder(d = set_d, h = boss_d);
        translate([0,0, tenon_z - 1])
            cylinder(d = m3_d, h = tenon_h + 4);
    }
}

// Flat bar. Prints in one stack of 8 mm, no spheres, no supports.
module handle() {
    span  = 56;
    bar_w = 16;
    difference() {
        union() {
            // one flat bar. prints as a pancake, no spheres
            linear_extrude(handle_h) {
                hull() {
                    translate([-span/2 + bar_w/2, 0]) circle(d = bar_w);
                    translate([ span/2 - bar_w/2, 0]) circle(d = bar_w);
                }
            }
            translate([0, 3.5, handle_h - 0.5])
                linear_extrude(1.9)
                    polygon([[-2.6,0],[2.6,0],[0,8.0]]);
        }
        translate([0,0,-0.2])
            linear_extrude(tenon_h + 0.5) d_profile(0.28);
        translate([0,0,-1]) cylinder(d = m3_d, h = handle_h + 4);
        translate([0,0, handle_h - m3_nut_h - 0.2])
            cylinder(d = m3_nut * 2 / sqrt(3) + 0.3, h = m3_nut_h + 0.5, $fn = 6);
        translate([0,0, handle_h - 0.15]) cylinder(d = m3_head, h = 2);
    }
}

module preview() {
    color("Goldenrod") driver();
    color("DimGray")
        translate([0,0, boss_h + shaft_h + flange_h + 0.2])
            dial();
    color("SteelBlue")
        translate([0,0, boss_h + shaft_h + flange_h + gear_h + 0.15])
            handle();
}

echo(str("shaft_h=", shaft_h, "  click_mm=", click_mm));

if (part == "dial") dial();
else if (part == "driver") driver();
else if (part == "handle") handle();
else if (part == "all") {
    translate([-50,0,0]) driver();
    translate([  0,0,0]) dial();
    translate([ 50,0,0]) handle();
}
else preview();
