import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";

export default function Fiber() {
  return (
    <Canvas>
      <ThreeConfig />

      <Suspense fallback={null}>
        <Environment files="/assets/envmap.hdr" />
      </Suspense>

      <OrbitControls dampingFactor={0.05} enableDamping />

      <Hexagons>
        <meshStandardMaterial flatShading />
      </Hexagons>
    </Canvas>
  );
}
