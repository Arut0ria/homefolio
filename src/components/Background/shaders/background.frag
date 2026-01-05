// precision float highp;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;

uniform float uHeight;
uniform float uWidth;

varying vec4 vWorldPosition;
varying vec3 vNormal;

float saw(float x) {
  return 
    2.0 * abs(x - floor(x + 0.5));
}

float sdBox( vec2 p, vec2 b, float r)
{
  vec2 d = abs(p) - b;
  return
    length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

void main() {
  float ratio = uWidth / uHeight;

  float tile_size = 0.5;
  float speed = 0.05;

  vec2 tiles = vec2( 
    saw(vUv.x * uWidth * tile_size),
    saw(vUv.y * uHeight * tile_size)
  );

  vec2 moving_tiles = vec2(
    saw(vUv.x * uWidth * tile_size - uTime * speed),
    saw(vUv.y * uHeight * tile_size + uTime * speed)
  );

  vec3 minCol = vec3(1.0, 1.0, 1.0);
  float box_size = 0.5;
  float border_size = 0.2;

  float moving_box = sdBox(moving_tiles, vec2(box_size), border_size);
  float static_box = sdBox(tiles, vec2(box_size), border_size);

  float static_border = min(0.4, smoothstep(0.0, -0.1, static_box));
  float moving_border = min(0.4, smoothstep(0.0, -0.1, moving_box));

  vec4 color = vec4(
    minCol * step(min(static_box, moving_box), 0.0),
    (static_border + moving_border) / 2.0
  );

  // color = vec4(vec3(1.0) * (static_border + moving_border) / 2.0, 1.0);
  // color = vec4(1.0, 0.0, 0.0, 1.0);

  gl_FragColor = color;
}