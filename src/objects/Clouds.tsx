import { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import { BufferGeometry, SphereGeometry } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

interface CloudProps extends MeshProps {}

export default function Clouds(props: CloudProps) {
  const mergedPuffs = useMemo(() => {
    const count = Math.floor(Math.pow(Math.random(), 0.45) * 4);
    let mergedPuffs = new SphereGeometry(0, 0, 0);

    for (let i = 0; i < count; i++) {
      const puff1 = new SphereGeometry(1.2, 7, 7);
      const puff2 = new SphereGeometry(1.5, 7, 7);
      const puff3 = new SphereGeometry(0.9, 7, 7);

      puff1.translate(-1.85, Math.random() * 0.3, 0);
      puff2.translate(0, Math.random() * 0.3, 0);
      puff3.translate(1.85, Math.random() * 0.3, 0);

      const cloudGeo = mergeBufferGeometries([puff1, puff2, puff3]);
      cloudGeo.translate(
        Math.random() * 20 - 10,
        Math.random() * 7 + 7,
        Math.random() * 20 - 10
      );
      cloudGeo.rotateY(Math.random() * Math.PI * 2);

      // @ts-ignore
      mergedPuffs = mergeBufferGeometries([mergedPuffs, cloudGeo]);
    }

    return mergedPuffs;
  }, []);

  return (
    <mesh geometry={mergedPuffs}>
      <meshStandardMaterial attach="material" flatShading envMapIntensity={0.75} />
    </mesh>
  );
}
