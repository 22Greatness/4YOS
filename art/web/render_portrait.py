"""Render Ayo's web portrait from the existing rig without saving over Ayo.blend.

Run from the repo root with Blender, passing an output PNG after `--`.
"""

from pathlib import Path
import sys

import bpy


output = Path(sys.argv[sys.argv.index("--") + 1]).resolve()
scene = bpy.context.scene
scene.frame_set(1001)
scene.render.resolution_x = 320
scene.render.resolution_y = 320
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.threads_mode = "FIXED"
scene.render.threads = 4
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.camera.data.dof.use_dof = False

stage = bpy.data.objects.get("Sweep")
if stage is not None:
    stage.visible_camera = False

# Keep the warm key and give the shaded scales just enough separation on indigo.
fill = bpy.data.lights.get("Fill")
if fill is not None:
    fill.energy *= 1.25
rim = bpy.data.lights.get("Rim2")
if rim is not None:
    rim.energy *= 1.3
    rim.color = (0.78, 0.88, 1.0)

scene.render.filepath = str(output)
bpy.ops.render.render(write_still=True)
