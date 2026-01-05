import { useGLTF, useTexture } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { memo, useEffect, useMemo } from "react";
import { type Mesh } from "three";
import { applyTextureConfig, textureAssets } from "../hooks/applyTextureConfig";
import { createIconMaterial } from "../materials/materials";

type IconPlaneProps = ThreeElements["mesh"] & {
  texturePath: string
};

const IconPlane = memo(function IconPlane({ texturePath, ...props }: IconPlaneProps) {
  const { nodes } = useGLTF("/cube_icon.glb");
  const texture = useTexture(
    textureAssets[`/src/assets/textures/${texturePath}`].default
  );

  useEffect(() => {
    applyTextureConfig(texture);
  }, [texture]);

  const material = useMemo(() => (
    createIconMaterial({ texture })
  ), [texture]);

  return (<mesh
    geometry={(nodes.PlaneIcon as Mesh).geometry}
    material={material}
    {...props}
  >
  </mesh>);
});

export default IconPlane;