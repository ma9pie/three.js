import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 주변광 추가
const addAmbientLight = ({
  scene,
  color,
  intensity,
}: {
  scene: THREE.Scene;
  color: string;
  intensity: number;
}) => {
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
};

// 직사광선 추가
const addDirectionalLight = ({
  scene,
  color,
  intensity,
  x,
  y,
  z,
  showHelper,
}: {
  scene: THREE.Scene;
  color: string;
  intensity: number;
  x: number;
  y: number;
  z: number;
  showHelper?: boolean;
}) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.x = x;
  light.position.y = y;
  light.position.z = z;
  scene.add(light);
  if (showHelper) {
    const helper = new THREE.DirectionalLightHelper(light, 5);
    scene.add(helper);
  }
};

// 렌더러 생성
const createRenderer = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  const target = document.getElementById(id);
  if (target) {
    if (target.childNodes.length > 0) {
      const firstChild = target.firstChild;
      if (firstChild) {
        target.removeChild(firstChild);
      }
    }
    target.appendChild(renderer.domElement);
  }
  return renderer;
};

// 시점 생성
const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  return camera;
};

// 정육면체 생성
const createCube = ({
  scene,
  color,
  coordinate,
}: {
  scene: THREE.Scene;
  color: string;
  coordinate: [number, number, number];
}) => {
  const geometry = new THREE.BoxGeometry(...coordinate);
  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
};

// 구 생성
const createSphere = ({
  scene,
  color,
  radius,
}: {
  scene: THREE.Scene;
  color: string;
  radius: number;
}) => {
  const geometry = new THREE.SphereGeometry(radius);
  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
};

// 컨트롤 생성
const createControls = ({
  renderer,
  camera,
}: {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
}) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 500;
  return controls;
};

const animate = ({
  scene,
  renderer,
  camera,
  mesh,
  controls,
}: {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  mesh?: THREE.Mesh;
  controls?: OrbitControls;
}) => {
  requestAnimationFrame(() =>
    animate({ scene, renderer, camera, mesh, controls })
  );
  const speed = 0.005;
  if (mesh) {
    mesh.rotation.x += speed;
    mesh.rotation.y += speed;
  }
  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);
};

export const renderCube = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) => {
  const scene = new THREE.Scene();
  const renderer = createRenderer({
    id,
    width,
    height,
  });
  const camera = createCamera();
  const mesh = createCube({ scene, color: '#00ff80', coordinate: [1, 1, 1] });
  const controls = createControls({ renderer, camera });

  addAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 1,
  });
  addDirectionalLight({
    scene,
    color: '#ffffff',
    intensity: 2,
    x: 1,
    y: 2,
    z: 3,
  });
  addDirectionalLight({
    scene,
    color: '#ffffff',
    intensity: 3,
    x: -1,
    y: -2,
    z: -3,
  });

  animate({
    scene,
    renderer,
    camera,
    mesh,
    controls,
  });
};

export const renderSphere = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number;
  height: number;
}) => {
  const scene = new THREE.Scene();
  const renderer = createRenderer({
    id,
    width,
    height,
  });
  const camera = createCamera();
  const mesh = createSphere({
    scene,
    color: '#00ff80',
    radius: 1,
  });
  const controls = createControls({ renderer, camera });

  addAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 0.5,
  });
  addDirectionalLight({
    scene,
    color: '#ffffff',
    intensity: 2,
    x: 1,
    y: 2,
    z: 3,
  });

  animate({
    scene,
    renderer,
    camera,
    mesh,
    controls,
  });
};