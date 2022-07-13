import { BoxBufferGeometry, BufferGeometry, CylinderGeometry, Vector2 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";

import SimplexNoise from "simplex-noise";
import { useTexture } from "@react-three/drei";
import { textureAssets } from "../assets";
import HexagonGroup from "./HexagonGroup";

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

  // Merge all hexagons into their respective geometries
  const mergedHexagonGeometries = useMemo(() => {
    let mergedHexagons: { [key: string]: BufferGeometry } = {
      stone: new BoxBufferGeometry(0, 0, 0),
      dirt: new BoxBufferGeometry(0, 0, 0),
      dirt2: new BoxBufferGeometry(0, 0, 0),
      sand: new BoxBufferGeometry(0, 0, 0),
      grass: new BoxBufferGeometry(0, 0, 0),
    };

    for (let hexagon of hexagons) {
      const height = hexagon.parameters.height;

      if (height > maxHeights.stone) {
        mergedHexagons.stone = mergeBufferGeometries([mergedHexagons.stone, hexagon]);
      } else if (height > maxHeights.dirt) {
        mergedHexagons.dirt = mergeBufferGeometries([mergedHexagons.dirt, hexagon]);
      } else if (height > maxHeights.grass) {
        mergedHexagons.grass = mergeBufferGeometries([mergedHexagons.grass, hexagon]);
      } else if (height > maxHeights.sand) {
        mergedHexagons.sand = mergeBufferGeometries([mergedHexagons.sand, hexagon]);
      } else if (height > maxHeights.dirt2) {
        mergedHexagons.dirt2 = mergeBufferGeometries([mergedHexagons.dirt2, hexagon]);
      }
    }

    return mergedHexagons;
  }, [hexagons, maxHeights]);

  return (
    <>
      <HexagonGroup geometry={mergedHexagonGeometries.stone} texture={textures.stone} />
      <HexagonGroup geometry={mergedHexagonGeometries.dirt} texture={textures.dirt} />
      <HexagonGroup geometry={mergedHexagonGeometries.grass} texture={textures.grass} />
      <HexagonGroup geometry={mergedHexagonGeometries.sand} texture={textures.sand} />
      <HexagonGroup geometry={mergedHexagonGeometries.dirt2} texture={textures.dirt2} />
    </>
  );
}
