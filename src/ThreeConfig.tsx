import { useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, Color, PCFSoftShadowMap, sRGBEncoding } from "three";

export default function ThreeConfig() {
  const { gl: renderer, scene } = useThree();
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputEncoding = sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  scene.background = new Color("#FFEECC");

  return <></>;
}
