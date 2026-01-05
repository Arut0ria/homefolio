out vec2 vUv;
out vec3 vNormal;

out vec4 vWorldPosition;

// attribute mat4 instanceMatrix;

void main() {
  vUv = uv;
  vNormal = normal;

  // vWorldPosition = modelViewMatrix * vec4(position.xyz, 1.0);

  vWorldPosition = modelViewMatrix * instanceMatrix * vec4(position.xyz, 1.0);

  gl_Position = projectionMatrix * vWorldPosition;
}