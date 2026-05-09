import { NodeIO } from "@gltf-transform/core";

const [input, output, scaleArg] = process.argv.slice(2);
const scale = Number(scaleArg);

if (!input || !output || !scale) {
  console.error("Uso: node scripts/scale-glb.mjs input.glb output.glb 0.1");
  process.exit(1);
}

const io = new NodeIO();
const document = await io.read(input);
const root = document.getRoot();

const scenes = root.listScenes();

for (const scene of scenes) {
  for (const node of scene.listChildren()) {
    const currentScale = node.getScale();
    node.setScale([
      currentScale[0] * scale,
      currentScale[1] * scale,
      currentScale[2] * scale,
    ]);
  }
}

await io.write(output, document);

console.log(`GLB escalado x${scale}: ${output}`);
