import { ShaderMaterial, Texture } from "three";

import cubeVertexShader from "../shaders/cube.vert?raw";
import cubeFragmentShader from "../shaders/cube.frag?raw";

import iconFragmentShader from "../shaders/icon.frag?raw";
import iconVertexShader from "../shaders/icon.vert?raw";

export function createCubeMaterial() {
  return (
    new ShaderMaterial({
      vertexShader: cubeVertexShader,
      fragmentShader: cubeFragmentShader,
    })
  );
}

type IconMaterialProps = {
  texture: Texture<unknown>
};

export function createIconMaterial({ texture }: IconMaterialProps) {
  return (
    new ShaderMaterial({
      uniforms: {
        uTexture: { value: texture }
      },
      vertexShader: iconVertexShader,
      fragmentShader: iconFragmentShader,
      transparent: true
    })
  );
}