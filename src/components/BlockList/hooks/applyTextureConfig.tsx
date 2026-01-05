import { ClampToEdgeWrapping, LinearFilter, RGBAFormat, SRGBColorSpace, Texture } from "three";

export const textureAssets: Record<string, { default: string }> = import.meta.glob("/src/assets/textures/*.{png,jpg}", { eager: true });

export function applyTextureConfig(texture: Texture<unknown>) {
  texture.colorSpace = SRGBColorSpace;
  texture.format = RGBAFormat;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  // console.debug("Modified " + texture.id);
}