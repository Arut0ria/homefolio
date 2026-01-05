import { PlaneGeometry, ShaderMaterial, TextureLoader } from "three";
import { useFrame } from "@react-three/fiber";

import fragmentSahder from "./shaders/background.frag?raw";
import vertexShader from "./shaders/background.vert?raw";

export default function Background() {
  const height = 20.0;
  const width = 30.0;
  const cuts = 10.0;
  const shape = new PlaneGeometry(width, height, cuts, 3.0);
  // const shape = new PlaneGeometry(1.0, 1.0, 1.0, 1.0);

  const loader = new TextureLoader();
  const material = new ShaderMaterial({
    uniforms: {
      uTexture: { value: loader.load("/src/assets/rounded_square.png") },
      uTime: { value: 1.0 },
      uHeight: { value: height },
      uWidth: { value: width }
    },
    // wireframe: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentSahder,
    transparent: true,
  });

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0.0, 0.0, -2.0]} geometry={shape} material={material}>
    </mesh>
  );
}