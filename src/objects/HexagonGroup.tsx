import { BufferGeometry, Texture } from "three";
import { MeshProps } from "@react-three/fiber";

type HexagonGroupProps = {
  geometry: BufferGeometry;
  texture: Texture;
} & MeshProps;

export default function HexagonGroup(props: HexagonGroupProps) {
  return (
    <mesh {...props} geometry={props.geometry} castShadow receiveShadow>
      <meshPhysicalMaterial envMapIntensity={0.135} map={props.texture} />
    </mesh>
  );
}
