// in vec3 position;
// in vec2 uv;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

out vec2 vUv;

out vec3 vNormal;
out vec4 vWorldPosition;

uniform float uWidth;
uniform float uTime;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  // Bending plane
  vec3 pos = position;
  float pi = 3.1415;
  float angle = 2.5;
  float normalized_x = ((pos.x / uWidth) - 0.5) * pi;

  pos.z = position.z + angle * sin(normalized_x);

  // Sending position
  vWorldPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * vWorldPosition;
}