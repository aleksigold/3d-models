from build123d import (
    Axis,
    BuildLine,
    BuildPart,
    BuildSketch,
    Circle,
    Line,
    Mesher,
    Mode,
    Plane,
    Polyline,
    RadiusArc,
    Rectangle,
    Unit,
    extrude,
    fillet,
    make_face,
    revolve,
)
from ocp_vscode import show

from os import path

cylinder_diameter = 5.51
cylinder_z = 15.0

triangle_point_from_top = 2.76

cap_diameter = 7.48
cap_z = 7.65
cap_thickness = 0.93

joystick_x = 3.94
joystick_y = 2.96
joystick_z = 5.00

magnet_diameter = 4.00
magnet_z = 2.00

bowl_angle = 30
bowl_inner_diameter = 30.0
bowl_thickness = 1.00
bowl_z = 10.00

with BuildPart() as part:
    with BuildSketch():
        Circle(cylinder_diameter / 2).solid()
    extrude(amount=cylinder_z)

    base = cylinder_diameter / 2
    count = 6

    for i in range(count):
        rotation = 360 / count * i
        with BuildSketch(
            Plane.XZ.shift_origin((0, 0, cylinder_z - cap_z)).rotated((0, 0, rotation))
        ) as triangle:
            with BuildLine():
                Polyline(
                    (-(base / 2), 0),
                    (base / 2, 0),
                    (0, cap_z - triangle_point_from_top),
                    (-(base / 2), 0),
                )
            make_face()
            fillet(triangle.vertices().sort_by(Axis.Y)[-1], radius=0.25)
    extrude(amount=cap_diameter / 2)

    with BuildSketch():
        Rectangle(joystick_x, joystick_y)
    extrude(amount=joystick_z, mode=Mode.SUBTRACT)

    with BuildSketch(part.faces().sort_by(Axis.Z)[-1]):
        Circle(magnet_diameter / 2)
    extrude(amount=-magnet_z, mode=Mode.SUBTRACT)

    with BuildSketch(Plane.XZ):
        with BuildLine():
            top_z = cylinder_z - cap_z + bowl_thickness
            bottom_z = top_z - bowl_z
            a1 = RadiusArc((0, top_z), (bowl_inner_diameter / 2, bottom_z), bowl_angle)
            l1 = Line(a1 @ 0, a1 @ 0 + (0, bowl_thickness))
            l2 = Line(a1 @ 1, a1 @ 1 + (bowl_thickness, 0))
            RadiusArc(l1 @ 1, l2 @ 1, bowl_angle)
        make_face()
    revolve(axis=Axis.Z)

    with BuildSketch(part.faces().sort_by(Axis.Z)[-1]):
        Circle((cap_diameter / 2) + cap_thickness)
        Circle(cap_diameter / 2, mode=Mode.SUBTRACT)
    extrude(amount=-cap_z, mode=Mode.SUBTRACT)

file = path.basename(__file__).replace(".py", ".3mf")
path = f"./output/{file}"

exporter = Mesher(unit=Unit.MM)
exporter.add_shape(part.part)
exporter.write(path)

show(part)
