import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";

export default function Fiber() {
  return (
    <Canvas>
      <ThreeConfig />

      <Suspense fallback={null}>
        <Environment files="/assets/envmap.hdr" />
      </Suspense>

      <OrbitControls
        dampingFactor={0.5}
        minDistance={35}
        enableZoom={false}
        position={[0, 10, 0]}
      />

      <Hexagons pseudoRadius={20} maxHeight={10}>
        <meshStandardMaterial flatShading />
      </Hexagons>
    </Canvas>
  );
}
