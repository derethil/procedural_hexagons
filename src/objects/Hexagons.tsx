import { BoxBufferGeometry, CylinderGeometry, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";

type HexagonProps = {} & MeshProps;

const makeHexagon = (height: number, position: Vector2) => {
  const hexagonGeometry = new CylinderGeometry(1, 1, height, 6, 1, false);
  hexagonGeometry.translate(position.x, height * 0.5, position.y);
  return hexagonGeometry;
};

export default function Hexagons(props: HexagonProps) {
  let hexagon = makeHexagon(1, new Vector2(0, 0));

  const mergedHexagons = useMemo(() => {
    const base = new BoxBufferGeometry(0, 0, 0);
    return mergeBufferGeometries([base, hexagon]);
  }, [hexagon]);

  return (
    <mesh geometry={mergedHexagons} {...props}>
      {props.children}
    </mesh>
  );
}
