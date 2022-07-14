import { DoubleSide } from "three";
import { GroupProps } from "@react-three/fiber";

interface FloorProps extends GroupProps {
  maxHeight: number;
}

export default function Floor(props: FloorProps) {
  return (
    <group>
      <mesh receiveShadow position={[0, props.maxHeight * 0.125, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[17.1, 17.1, props.maxHeight * 0.25, 50, 1, true]}
        />
        <meshPhysicalMaterial
          attach="material"
          color="#795d42"
          envMapIntensity={0.2}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry
          attach="geometry"
          args={[18.5, 18.5, props.maxHeight * 0.1, 50]}
        />
        <meshPhysicalMaterial
          attach="material"
          side={DoubleSide}
          envMapIntensity={0.1}
          color="#55432c"
        />
      </mesh>
    </group>
  );
}
