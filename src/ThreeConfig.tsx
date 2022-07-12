import { useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";

export default function ThreeConfig() {
  const renderer = useThree((state) => state.gl);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputEncoding = sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  return <></>;
}
