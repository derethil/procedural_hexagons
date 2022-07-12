import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

export default function Fiber() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Environment files="/assets/envmap.hdr" />
      </Suspense>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial roughness={0} metalness={1} />
      </mesh>
      <OrbitControls dampingFactor={0.05} enableDamping />
    </Canvas>
  );
}
