import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface Props {
  id: string;
  width: number;
  height: number;
}

// 필수 객체 생성
const generate = ({ id, width, height }: Props) => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  const target = document.getElementById(id);
  if (target) {
    const firstChild = target?.firstChild;
    if (target.childNodes.length > 0 && firstChild) {
      target.removeChild(firstChild);
    }
    target.appendChild(renderer.domElement);
  }
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 500;
  return { scene, renderer, camera, controls };
};

// 애니메이션
const animate = ({
  scene,
  renderer,
  camera,
  controls,
  callback = () => {},
}: {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls?: OrbitControls;
  callback?: () => void;
}) => {
  requestAnimationFrame(() =>
    animate({ scene, renderer, camera, controls, callback })
  );
  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);
  callback();
};

// 주변광 추가
const createAmbientLight = ({
  scene,
  color,
  intensity,
}: {
  scene: THREE.Scene;
  color: string;
  intensity?: number;
}) => {
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
  return light;
};

// 직사광선 추가
const createDirectionalLight = ({
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
  intensity?: number;
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
  return light;
};

// 스포트라이트 생성
const createSpotLight = ({
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
  intensity?: number;
  x: number;
  y: number;
  z: number;
  showHelper?: boolean;
}) => {
  const light = new THREE.SpotLight(color, intensity);
  light.position.x = x;
  light.position.y = y;
  light.position.z = z;
  scene.add(light);
  if (showHelper) {
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);
  }
  return light;
};

// 육면체 생성
const createCube = ({
  scene,
  color,
  width,
  height,
  depth,
}: {
  scene: THREE.Scene;
  color: string;
  width: number;
  height: number;
  depth: number;
}) => {
  const geometry = new THREE.BoxGeometry(width, height, depth);
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

// 평면 생성
const createPlane = ({
  scene,
  color,
  width,
  height,
}: {
  scene: THREE.Scene;
  color: string;
  width: number;
  height: number;
}) => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
};

// 이십면체 생성
const createIcosahedron = ({
  scene,
  color,
  radius,
}: {
  scene: THREE.Scene;
  color: string;
  radius: number;
}) => {
  const geometry = new THREE.IcosahedronGeometry(radius);
  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
};

// 정육면체 렌더링
export const renderCube = ({ id, width, height }: Props) => {
  const { scene, renderer, camera, controls } = generate({
    id,
    width,
    height,
  });
  const mesh = createCube({
    scene,
    color: '#00ff80',
    width: 1,
    height: 1,
    depth: 1,
  });

  createAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 1,
  });
  createDirectionalLight({
    scene,
    color: '#ffffff',
    intensity: 2,
    x: 1,
    y: 2,
    z: 3,
  });
  createDirectionalLight({
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
    controls,
    callback: () => {
      const speed = 0.005;
      mesh.rotation.x += speed;
      mesh.rotation.y += speed;
    },
  });
};

// 구 렌더링
export const renderSphere = ({ id, width, height }: Props) => {
  const { scene, renderer, camera, controls } = generate({
    id,
    width,
    height,
  });
  const mesh = createSphere({
    scene,
    color: '#00ff80',
    radius: 1,
  });

  createAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 0.3,
  });
  const spotLight = createSpotLight({
    scene,
    color: '#ffffff',
    intensity: 100,
    x: 5,
    y: 5,
    z: 5,
  });

  animate({
    scene,
    renderer,
    camera,
    controls,
    callback: () => {
      const speed = Date.now() / 1000;
      spotLight.position.x = 5 * Math.sin(speed);
      spotLight.position.z = 5 * Math.cos(speed);
    },
  });
};

// 평면 렌더링
export const renderPlane = ({ id, width, height }: Props) => {
  const { scene, renderer, camera, controls } = generate({
    id,
    width,
    height,
  });
  const mesh = createPlane({
    scene,
    color: '#00ff80',
    width: 2,
    height: 2,
  });

  createAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 0.3,
  });
  const spotLight = createSpotLight({
    scene,
    color: '#ffffff',
    intensity: 20,
    x: 0,
    y: 0,
    z: 2,
  });

  animate({
    scene,
    renderer,
    camera,
    controls,
    callback: () => {
      const speed = Date.now() / 1000;
      spotLight.position.x = 2 * Math.sin(speed);
      spotLight.position.y = 2 * Math.cos(speed);
    },
  });
};

// 정이십면체 렌더링
export const renderIcosahedron = ({ id, width, height }: Props) => {
  const { scene, renderer, camera, controls } = generate({
    id,
    width,
    height,
  });
  const mesh = createIcosahedron({
    scene,
    color: '#00ff80',
    radius: 1,
  });

  createAmbientLight({
    scene,
    color: '#ffffff',
    intensity: 0.3,
  });
  createDirectionalLight({
    scene,
    color: '#ffffff',
    intensity: 2,
    x: 1,
    y: 2,
    z: 3,
  });
  createDirectionalLight({
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
    controls,
    callback: () => {
      const speed = 0.005;
      mesh.rotation.x += speed;
      mesh.rotation.y += speed;
    },
  });
};
