import { BoxBufferGeometry, CylinderGeometry, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";

type HexagonProps = {} & MeshProps;

// Converts tile index to position in the scene
const tileToPosition = (tile: Vector2) => {
  return new Vector2((tile.x + (tile.y % 2) * 0.5) * 1.77, tile.y * 1.535);
};

const makeHexagon = (height: number, position: Vector2) => {
  const hexagonGeometry = new CylinderGeometry(1, 1, height, 6, 1, false);
  hexagonGeometry.translate(position.x, height * 0.5, position.y);
  return hexagonGeometry;
};

export default function Hexagons(props: HexagonProps) {
  const hexagons = useMemo(() => {
    let hexagons = [] as CylinderGeometry[];

    for (let i = -15; i <= 15; i++) {
      for (let j = -15; j <= 15; j++) {
        const position = tileToPosition(new Vector2(i, j));
        if (position.length() > 16) continue;
        hexagons.push(makeHexagon(3, position));
      }
    }

    return hexagons;
  }, []);

  const mergedHexagons = useMemo(() => {
    const base = new BoxBufferGeometry(0, 0, 0);
    return mergeBufferGeometries([base, ...hexagons]);
  }, [hexagons]);

  return (
    <mesh geometry={mergedHexagons} {...props}>
      {props.children}
    </mesh>
  );
}
