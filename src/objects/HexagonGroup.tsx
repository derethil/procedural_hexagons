import { BufferGeometry, Color } from "three";
import { MeshProps } from "@react-three/fiber";

type HexagonGroupProps = {
  geometry: BufferGeometry;
  // texture: Texture;
  color: Color;
} & MeshProps;

export default function HexagonGroup(props: HexagonGroupProps) {
  return (
    <mesh {...props} geometry={props.geometry} castShadow receiveShadow>
      <meshStandardMaterial envMapIntensity={0.135} color={props.color} />
    </mesh>
  );
}
