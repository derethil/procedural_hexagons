import { MeshProps } from "@react-three/fiber";
import { BufferGeometry, Texture } from "three";

type HexagonGroupProps = {
  geometry: BufferGeometry;
  texture: Texture;
} & MeshProps;

export default function HexagonGroup(props: HexagonGroupProps) {
  return (
    <mesh {...props} geometry={props.geometry} castShadow receiveShadow>
      <meshPhysicalMaterial envMapIntensity={0.3} map={props.texture} />
    </mesh>
  );
}
