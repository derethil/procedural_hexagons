import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";
import { envmapAssets } from "./assets";

export default function Fiber() {
  return (
    <Canvas>
      <ThreeConfig />

      <PerspectiveCamera position={[0, 25, 50]} makeDefault />

      <OrbitControls
        dampingFactor={0.5}
        minDistance={35}
        position={[0, 10, 0]}
        enablePan={false}
      />

      <Suspense fallback={null}>
        <Environment files={envmapAssets.main} />
        <Hexagons pseudoRadius={20} maxHeight={10}>
          <meshStandardMaterial flatShading />
        </Hexagons>
      </Suspense>
    </Canvas>
  );
}
