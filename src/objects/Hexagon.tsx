import { Vector3 } from "three";
import { MeshProps } from "@react-three/fiber";

type HexagonProps = {
  height: number;
  newPosition: THREE.Vector2;
} & MeshProps;

export default function Hexagon(props: HexagonProps) {
  const position = new Vector3(
    props.newPosition.x,
    props.height * 0.5,
    props.newPosition.y
  );

  return (
    <mesh {...props} position={position}>
      <cylinderGeometry args={[1, 1, props.height, 6, 1, false]} />
      {props.children}
    </mesh>
  );
}
