uniform sampler2D uTexture;

varying vec2 vUv;

float saw(float x) {
  return 
    2.0 * abs(x - floor(x + 0.5));
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
  r.xy = (p.x>0.0)?r.xy : r.zw;
  r.x  = (p.y>0.0)?r.x  : r.y;
  vec2 q = abs(p)-b+r.x;
  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

vec2 scaleUv(vec2 uv, float scale) {
  return (uv - 0.5) / scale + 0.5;
}

float parabola( float x, float k ){
  return pow( 4.0*x*(1.0-x), k );
}

void main() {
  // Flipping uvs... cause..
  vec2 flipped_uv = vec2(
    abs(vUv.x - 1.0),
    vUv.y
  );

  float border_size = 0.03;
  float radius = 0.25;
  float border = sdRoundedBox(
    (vUv - vec2(0.5)) * 2.0,
    vec2(1.0 - border_size),
    vec4(radius, radius, radius, radius)
  );
  
  float border_grad = 0.4;
  vec4 border_col = vec4(border_grad, border_grad, border_grad, 1.0) * 
    (1.0 - smoothstep(-border_size, border_size, abs(border)));

  vec4 col = texture2D(uTexture, scaleUv(flipped_uv, 0.9));
  gl_FragColor = max(col, border_col);
  // gl_FragColor = border_col;
} 