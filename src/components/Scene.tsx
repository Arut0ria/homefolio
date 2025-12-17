import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import Background from "./Background";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <Background />
      <ambientLight intensity={1.0} color={new Color(1, 1, 1)} />
      <OrbitControls />
    </Canvas>
  );
}