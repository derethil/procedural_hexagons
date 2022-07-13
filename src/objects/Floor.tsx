import { DoubleSide } from "three";
import { useTexture } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import { textureAssets } from "../assets";

interface FloorProps extends GroupProps {
  maxHeight: number;
}

export default function Floor(props: FloorProps) {
  const [dirtTexture, dirt2Texture] = useTexture([
    textureAssets.dirt,
    textureAssets.dirt2,
  ]);

  return (
    <group>
      <mesh receiveShadow position={[0, props.maxHeight * 0.125, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[17.1, 17.1, props.maxHeight * 0.25, 50, 1, true]}
        />
        <meshPhysicalMaterial
          attach="material"
          map={dirtTexture}
          envMapIntensity={0.2}
          side={DoubleSide}
        />
      </mesh>
      <mesh>
        <cylinderGeometry
          attach="geometry"
          args={[18.5, 18.5, props.maxHeight * 0.1, 50]}
        />
        <meshPhysicalMaterial
          attach="material"
          side={DoubleSide}
          envMapIntensity={0.1}
          map={dirt2Texture}
        />
      </mesh>
    </group>
  );
}
