import * as THREE from "three";
import "./styles.css";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01
);
camera.position.z = 1;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.domElement.addEventListener("click", (ev: PointerEvent) => {
  scene.clear();
  const geometry = new THREE.BoxGeometry(
    ev.clientX / window.innerWidth,
    -(ev.clientY / window.innerHeight),
    0
  );
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer.render(scene, camera);
});
renderer.setSize(window.innerWidth, window.innerHeight);

function animation(_: any) {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
