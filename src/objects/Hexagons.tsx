import { useMemo } from "react";
import SimplexNoise from "simplex-noise";

import {
  BoxBufferGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  SphereGeometry,
  Vector2,
} from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { MeshProps } from "@react-three/fiber";

import HexagonGroup from "./HexagonGroup";

interface HexagonProps extends MeshProps {
  pseudoRadius: number;
  gridLength: number;
  maxHeight: number;
  seed: string;
}

interface Tile {
  hexagon: CylinderGeometry;
  position: Vector2;
}

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

const makeStone = (height: number, position: Vector2) => {
  const px = Math.random() * 0.4;
  const pz = Math.random() * 0.4;

  const geometry = new SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geometry.translate(position.x + px, height, position.y + pz);

  return geometry;
};

function makeTree(height: number, position: Vector2) {
  const treeHeight = Math.random() * 1 + 1.25;
  const rotation = Math.random() * Math.PI * 2;

  const geometry = new CylinderGeometry(0, 1.5, treeHeight, 3);
  geometry.rotateY(rotation);
  geometry.translate(position.x, height + treeHeight * 0 + 1, position.y);

  const geometry2 = new CylinderGeometry(0, 1.15, treeHeight, 3);
  geometry2.rotateY(rotation);
  geometry2.translate(position.x, height + treeHeight * 0.6 + 1, position.y);

  const geometry3 = new CylinderGeometry(0, 0.8, treeHeight, 3);
  geometry3.rotateY(rotation);
  geometry3.translate(position.x, height + treeHeight * 1.25 + 1, position.y);

  const tree = mergeBufferGeometries([geometry, geometry2, geometry3]);
  return tree;
}

export default function Hexagons(props: HexagonProps) {
  const maxHeights = getMaxHeights(props.maxHeight);

  // Generate each hexagon geometry individually
  const hexagons = useMemo(() => {
    let hexagons = [] as Tile[];

    const simplex = new SimplexNoise(props.seed);

    const max = props.gridLength * 0.5;
    for (let i = -max; i <= max; i++) {
      for (let j = -max; j <= max; j++) {
        const position = tileToPosition(new Vector2(i, j));
        if (position.length() > props.pseudoRadius) continue;

        let noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5; // Shrink then normalize the noise data
        noise = Math.pow(noise, 1.5);
        console.log(noise * props.maxHeight);
        hexagons.push({
          hexagon: makeHexagon(Math.max(0.5, noise * props.maxHeight), position),
          position,
        });
      }
    }

    return hexagons;
  }, [props.maxHeight, props.pseudoRadius, props.gridLength, props.seed]);

  // Merge all hexagons into their respective geometries
  const mergedHexagonGeometries = useMemo(() => {
    let mergedHexagons: { [key: string]: BufferGeometry } = {
      stone: new BoxBufferGeometry(0, 0, 0),
      dirt: new BoxBufferGeometry(0, 0, 0),
      dirt2: new BoxBufferGeometry(0, 0, 0),
      sand: new BoxBufferGeometry(0, 0, 0),
      grass: new BoxBufferGeometry(0, 0, 0),
    };

    for (let { hexagon, position } of hexagons) {
      const height = hexagon.parameters.height;

      if (height > maxHeights.stone) {
        mergedHexagons.stone = mergeBufferGeometries([mergedHexagons.stone, hexagon]);

        if (Math.random() > 0.8) {
          mergedHexagons.stone = mergeBufferGeometries([
            mergedHexagons.stone,
            makeStone(height, position),
          ]);
        }
      } else if (height > maxHeights.dirt) {
        mergedHexagons.dirt = mergeBufferGeometries([mergedHexagons.dirt, hexagon]);

        if (Math.random() > 0.8) {
          mergedHexagons.grass = mergeBufferGeometries([
            mergedHexagons.grass,
            makeTree(height, position),
          ]);
        }
      } else if (height > maxHeights.grass) {
        mergedHexagons.grass = mergeBufferGeometries([mergedHexagons.grass, hexagon]);
      } else if (height > maxHeights.sand) {
        mergedHexagons.sand = mergeBufferGeometries([mergedHexagons.sand, hexagon]);

        if (Math.random() > 0.8) {
          mergedHexagons.stone = mergeBufferGeometries([
            mergedHexagons.stone,
            makeStone(height, position),
          ]);
        }
      } else if (height > maxHeights.dirt2) {
        mergedHexagons.dirt2 = mergeBufferGeometries([mergedHexagons.dirt2, hexagon]);
      }
    }

    return mergedHexagons;
  }, [hexagons, maxHeights]);

  return (
    <>
      <HexagonGroup
        geometry={mergedHexagonGeometries.stone}
        color={new Color("#83819c")}
      />
      <HexagonGroup
        geometry={mergedHexagonGeometries.dirt}
        color={new Color("#55432c")}
      />
      <HexagonGroup
        geometry={mergedHexagonGeometries.grass}
        color={new Color("#31703a")}
      />
      <HexagonGroup
        geometry={mergedHexagonGeometries.sand}
        color={new Color("#feffae")}
      />
      <HexagonGroup
        geometry={mergedHexagonGeometries.dirt2}
        color={new Color("#795d42")}
      />
    </>
  );
}
