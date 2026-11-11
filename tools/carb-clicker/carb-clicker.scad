// Carb click screwdriver — bench tool only, not for running.
// Visible 12-tooth gear. Printed PH2 tip. Short shaft.
//
// 12 clicks = 1 turn ≈ 0.8 mm
//  3 = 1/4 turn ·  6 = 1/2 ·  15 = 1-1/4 ·  21 = 1-3/4
//
// Print
//  shaft.stl   standing, Phillips tip on the bed. 5 walls, 40% infill.
//  handle.stl  wings flat on the bed.
//  collar.stl  standing. This is what you hold — the pawl clicks on the gear.
//
// Hardware: 1× M3×12, 1× M3 nut.

part = "preview"; // preview | shaft | handle | collar | all

$fn = 48;

clicks      = 12;
click_angle = 360 / clicks;

// Short fat shaft — strength, not reach
ph_h        = 7.5;
neck_d      = 11;
neck_h      = 18;
tenon       = 7.6;
tenon_h     = 8;

gear_h      = 10;
root_r      = 13;     // 26 mm root
tip_r       = 18;     // 36 mm tips — teeth stick out where you can see them
tooth_w     = 5.2;
tooth_tip_w = 2.2;

flange_d    = 28;
flange_h    = 2.0;

collar_od   = 44;
collar_h    = gear_h + 1.2;

wing_span   = 70;
wing_w      = 16;
wing_h      = 9;
hub_d       = 32;
hub_h       = 11;

m3_d        = 3.3;
m3_head     = 6.2;
m3_nut      = 5.6;
m3_nut_h    = 2.5;

module phillips() {
    // PH2-ish plus, stubby. Two tapered blades.
    module blade() {
        hull() {
            translate([0, 0, 0.25]) cube([7.4, 1.85, 0.5], center=true);
            translate([0, 0, ph_h]) cube([0.9, 0.45, 0.2], center=true);
        }
    }
    blade();
    rotate([0,0,90]) blade();
    // fat root so the tip is not a skinny stick
    cylinder(d1=9.5, d2=neck_d, h=2.4);
}

module tooth() {
    linear_extrude(gear_h)
        polygon([
            [root_r - 0.4, -tooth_w/2],
            [tip_r,        -tooth_tip_w/2],
            [tip_r,         tooth_tip_w/2],
            [root_r - 0.4,  tooth_w/2]
        ]);
}

module gear() {
    cylinder(r=root_r, h=gear_h);
    for (i = [0:clicks-1]) rotate([0,0, i * click_angle]) tooth();
}

module shaft() {
    gear_z = ph_h + neck_h;
    union() {
        phillips();
        translate([0,0,ph_h]) cylinder(d=neck_d, h=neck_h);
        // lower flange (collar sits on this)
        translate([0,0,gear_z]) cylinder(d=flange_d, h=flange_h);
        // VISIBLE gear
        translate([0,0,gear_z + flange_h]) gear();
        // upper flange
        translate([0,0,gear_z + flange_h + gear_h]) cylinder(d=flange_d, h=flange_h);
        // square tenon
        translate([-tenon/2, -tenon/2, gear_z + flange_h*2 + gear_h])
            cube([tenon, tenon, tenon_h]);
    }
    // M3 hole through tenon — difference on the whole union
}

module shaft_cut() {
    gear_z = ph_h + neck_h;
    difference() {
        shaft();
        translate([0,0, gear_z + flange_h*2 + gear_h - 1])
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
        translate([wing_span/2 - 8, 0, wing_h + 3])
            rotate([90,0,0]) cylinder(d=16, h=wing_w + 2, center=true);
    }
}

module tick(r, len=2.2, w=0.7) {
    translate([0, -r, 0]) cube([w, len, 0.8], center=true);
}

module handle() {
    difference() {
        union() {
            cylinder(d=hub_d, h=hub_h);
            for (a = [0, 180]) rotate([0,0,a]) wing();
            for (i = [0:clicks-1]) rotate([0,0, i * click_angle])
                translate([0, 0, hub_h])
                    tick(hub_d/2 - 2.6, i % 3 == 0 ? 3.4 : 2.0, i % 3 == 0 ? 1.1 : 0.6);
        }
        translate([-tenon/2 - 0.15, -tenon/2 - 0.15, -0.2])
            cube([tenon + 0.3, tenon + 0.3, tenon_h + 0.6]);
        translate([0,0,-1]) cylinder(d=m3_d, h=hub_h + 2);
        translate([0,0, hub_h - m3_nut_h - 0.4])
            cylinder(d=m3_nut * 2 / sqrt(3) + 0.25, h=m3_nut_h + 0.6, $fn=6);
        translate([0,0, hub_h - 0.2]) cylinder(d=m3_head, h=2);
    }
    labels = ["0", ".2", ".4", ".6"];
    for (i = [0:3]) rotate([0,0, i * 90])
        translate([0, -hub_d/2 + 7.2, hub_h])
            linear_extrude(0.8)
                text(labels[i], size=4.2, font="Liberation Sans:style=Bold",
                     halign="center", valign="center");
    translate([8.4, 0, hub_h])
        linear_extrude(0.7)
            text("mm", size=2.6, font="Liberation Sans:style=Bold",
                 halign="center", valign="center");
}

module collar() {
    // Hold ring around the gear. Big windows so the teeth stay visible.
    // One pawl tooth rides in a gear gap — that is the click.
    id = root_r * 2 + 0.8;
    difference() {
        union() {
            cylinder(d=collar_od, h=collar_h);
            // pointer beside the dial
            translate([-1.5, collar_od/2 - 0.4, 0]) cube([3, 8, 20]);
            translate([0, collar_od/2 + 7.2, 17])
                rotate([90,0,180]) linear_extrude(2.4)
                    polygon([[-5,0],[5,0],[0,6]]);
        }
        translate([0,0,-1]) cylinder(d=id, h=collar_h + 8);
        // windows — cut most of the wall so the gear shows
        for (a = [30, 150, 270]) rotate([0,0,a])
            translate([0, collar_od/2, collar_h/2])
                cube([16, 20, collar_h - 3], center=true);
        // knurl leftovers
        for (i = [0:11]) rotate([0,0, i * 30 + 15])
            translate([collar_od/2 + 1.4, 0, -1]) cylinder(d=4.8, h=collar_h + 2);
    }
    // visible pawl — a gear tooth pointing inward at 0°
    translate([0,0, (collar_h - gear_h)/2 + 0.2])
        rotate([0,0, 0])
            linear_extrude(gear_h - 0.4)
                polygon([
                    [id/2 - 0.2, -2.4],
                    [id/2 + 4.6, -1.0],
                    [id/2 + 4.6,  1.0],
                    [id/2 - 0.2,  2.4]
                ]);
}

module preview() {
    gear_z = ph_h + neck_h;
    color("silver") shaft_cut();
    color("DimGray")
        translate([0,0, gear_z + flange_h - 0.1])
            collar();
    color("Goldenrod")
        translate([0,0, gear_z + flange_h*2 + gear_h])
            handle();
}

if (part == "shaft") shaft_cut();
else if (part == "handle") handle();
else if (part == "collar") collar();
else if (part == "all") {
    translate([-45,0,0]) shaft_cut();
    translate([40,0,0]) handle();
    translate([95,0,0]) collar();
}
else preview();
