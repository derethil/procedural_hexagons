import { Vector2 } from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Hexagon from "./objects/Hexagon";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";

export default function Fiber() {
  return (
    <Canvas>
      <ThreeConfig />

      <Suspense fallback={null}>
        <Environment files="/assets/envmap.hdr" />
      </Suspense>

      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <OrbitControls dampingFactor={0.05} enableDamping />

      <Hexagons>
        <meshStandardMaterial roughness={0} metalness={1} />
      </Hexagons>
    </Canvas>
  );
}
