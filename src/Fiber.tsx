import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";

export default function Fiber() {
  return (
    <Canvas>
      <ThreeConfig />

      <Suspense fallback={null}>
        <Environment files="/assets/envmaps/envmap.hdr" />
      </Suspense>

      <PerspectiveCamera position={[0, 25, 50]} makeDefault />

      <OrbitControls
        dampingFactor={0.5}
        minDistance={35}
        position={[0, 10, 0]}
        enablePan={false}
      />

      <Hexagons pseudoRadius={20} maxHeight={10}>
        <meshStandardMaterial flatShading />
      </Hexagons>
    </Canvas>
  );
}
