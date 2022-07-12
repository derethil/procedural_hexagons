import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Hexagon from "./objects/Hexagon";

export default function Fiber() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Environment files="/assets/envmap.hdr" />
      </Suspense>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Hexagon height={1} newPosition={new THREE.Vector2(0, 0)}>
        <meshStandardMaterial roughness={0} metalness={1} />
      </Hexagon>

      <OrbitControls dampingFactor={0.05} enableDamping />
    </Canvas>
  );
}
