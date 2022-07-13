import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ThreeConfig from "./ThreeConfig";
import Hexagons from "./objects/Hexagons";
import { envmapAssets } from "./assets";
import { Color } from "three";
import Sea from "./objects/Sea";
import Floor from "./objects/Floor";
import Clouds from "./objects/Clouds";

export default function Fiber() {
  const maxHeight = 10;

  return (
    <Canvas legacy={true}>
      <ThreeConfig />

      <PerspectiveCamera position={[0, 25, 50]} makeDefault />

      <OrbitControls
        dampingFactor={0.05}
        minDistance={35}
        position={[0, 10, 0]}
        enablePan={false}
      />

      <pointLight
        position={[10, 20, 10]}
        args={[new Color("#FFCB8E").convertSRGBToLinear().convertSRGBToLinear(), 80, 200]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />

      <Suspense fallback={null}>
        <Environment files={envmapAssets.main} />
        <Hexagons pseudoRadius={16} gridLength={40} maxHeight={maxHeight}></Hexagons>
        <Sea maxHeight={maxHeight} />
        <Floor maxHeight={maxHeight} />
        <Clouds />
      </Suspense>
    </Canvas>
  );
}
