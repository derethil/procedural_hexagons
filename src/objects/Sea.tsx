import { Color } from "three";
import { useTexture } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

import { textureAssets } from "../assets";

interface SeaProps extends MeshProps {
  maxHeight: number;
}

export default function Sea(props: SeaProps) {
  const waterTexture = useTexture(textureAssets.water);

  return (
    <mesh {...props} receiveShadow position={[0, props.maxHeight * 0.1, 0]}>
      <cylinderGeometry attach="geometry" args={[17, 17, props.maxHeight * 0.2, 50]} />
      <meshPhysicalMaterial
        attach="material"
        color={new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3)}
        ior={1.4}
        transmission={1}
        transparent
        thickness={1.5}
        envMapIntensity={0.2}
        roughness={1}
        metalness={0.025}
        roughnessMap={waterTexture}
        metalnessMap={waterTexture}
      />
    </mesh>
  );
}
