import { BoxBufferGeometry, CylinderGeometry, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";

import SimplexNoise from "simplex-noise";
import { useTexture } from "@react-three/drei";
import { textureAssets } from "../assets";

type HexagonProps = {
  pseudoRadius: number;
  maxHeight: number;
} & MeshProps;

// Generates max heights for each of the tile types
const getMaxHeights = (maxHeight: number) => ({
  stone: maxHeight * 0.8,
  dirt: maxHeight * 0.7,
  grass: maxHeight * 0.5,
  sand: maxHeight * 0.3,
  dirt2: maxHeight * 0,
});

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
  const maxHeights = getMaxHeights(props.maxHeight);
  const textures = useTexture(textureAssets);

  // Generate each hexagon geometry individually
  const hexagons = useMemo(() => {
    let hexagons = [] as CylinderGeometry[];

    const simplex = new SimplexNoise();

    for (let i = -props.pseudoRadius; i <= props.pseudoRadius; i++) {
      for (let j = -props.pseudoRadius; j <= props.pseudoRadius; j++) {
        const position = tileToPosition(new Vector2(i, j));
        if (position.length() > props.pseudoRadius) continue;

        let noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5; // Shrink then normalize the noise data
        noise = Math.pow(noise, 1.5);
        hexagons.push(makeHexagon(noise * props.maxHeight, position));
      }
    }

    return hexagons;
  }, [props.maxHeight, props.pseudoRadius]);

  // Merge all hexagons into a single geometry
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
