varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vWorldPosition;

in vec3 position;

void main() { 
  vec3 normal = normalize(vNormal);
  vec3 light = vec3(0.0, 0.0, 1.0);
  float i = max(0.75, dot(light, normal));
  vec3 col = vec3(0.95);
  
  gl_FragColor = vec4(col * i, 1.0);
}